const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Sharp cache band karo — file lock problem fix
sharp.cache(false);

// Temp disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = 'uploads/temp/';
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Only jpg/jpeg/png/webp allowed'), false);
  },
});

// Safe delete — EBUSY handle karta hai
const safeUnlink = (filePath) => {
  try {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (err) {
    if (err.code === 'EBUSY' || err.code === 'EPERM') {
      setTimeout(() => {
        try {
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        } catch (_) {}
      }, 500);
    }
  }
};

// Sharp compress → WebP max 40KB
const compressToWebp = async (inputPath) => {
  let quality = 80;
  let outputBuffer;
  do {
    outputBuffer = await sharp(inputPath)
      .resize({ width: 1280, height: 960, fit: 'inside' })
      .webp({ quality })
      .toBuffer();
    if (outputBuffer.length <= 40 * 1024) break;
    quality -= 5;
  } while (quality >= 10);
  return outputBuffer;
};

// Buffer → Cloudinary
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image', format: 'webp' },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });
};

// Single file process
const processFile = async (file, folder) => {
  const buffer = await compressToWebp(file.path);
  const result = await uploadToCloudinary(buffer, folder);
  safeUnlink(file.path);
  return result.secure_url;
};

// Middleware: upload.single + compress (brand logo ke liye)
const compressAndUpload = (fieldName, folder = 'ReadyGrocery/Brands') => [
  upload.single(fieldName),
  async (req, res, next) => {
    if (!req.file) return next();
    try {
      req.file.path = await processFile(req.file, folder);
      next();
    } catch (err) {
      safeUnlink(req.file?.path);
      next(err);
    }
  },
];

// Middleware: upload.fields + compress (product thumbnail + additionalImages ke liye)
const compressAndUploadFields = (fields, folder = 'ReadyGrocery/Products') => [
  upload.fields(fields),
  async (req, res, next) => {
    if (!req.files) return next();
    try {
      for (const fieldName of Object.keys(req.files)) {
        req.files[fieldName] = await Promise.all(
          req.files[fieldName].map(async (file) => {
            file.path = await processFile(file, folder);
            return file;
          })
        );
      }
      next();
    } catch (err) {
      if (req.files) {
        Object.values(req.files).flat().forEach(file => safeUnlink(file?.path));
      }
      next(err);
    }
  },
];

// Banner compress — 12:5 ratio exact maintain karo (1920x800)
const compressBanner = async (inputPath) => {
  let quality = 90;
  let outputBuffer;
  do {
    outputBuffer = await sharp(inputPath)
      .resize({
        width: 1920,
        height: 800,          // 12:5 exact ratio — 1920/12*5 = 800
        fit: 'cover',         // poori width fill karo, sides crop
        position: 'centre',
        withoutEnlargement: false,
      })
      .webp({
        quality,
        effort: 6,
        lossless: false,
        nearLossless: quality >= 85,
      })
      .toBuffer();
    if (outputBuffer.length <= 600 * 1024) break;  // 600KB tak allow
    quality -= 3;
  } while (quality >= 65);
  return outputBuffer;
};

const processBannerFile = async (file, folder) => {
  const buffer = await compressBanner(file.path);
  const result = await uploadToCloudinary(buffer, folder);
  safeUnlink(file.path);
  return result.secure_url;
};

const compressAndUploadBanner = (fieldName, folder = 'ReadyGrocery/Banners') => [
  upload.single(fieldName),
  async (req, res, next) => {
    if (!req.file) return next();
    try {
      req.file.path = await processBannerFile(req.file, folder);
      next();
    } catch (err) {
      safeUnlink(req.file?.path);
      next(err);
    }
  },
];

module.exports = {
  upload,
  compressAndUpload,
  compressAndUploadFields,
  compressAndUploadBanner,
  // Backward compatibility — baaki purani routes ke liye
  single: upload.single.bind(upload),
  fields: upload.fields.bind(upload),
  array:  upload.array.bind(upload),
};