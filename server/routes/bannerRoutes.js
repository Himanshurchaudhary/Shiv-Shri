const express = require('express');
const router = express.Router();
const { compressAndUploadBanner } = require('../config/cloudinary');
const { addBanner, getBanners, deleteBanner } = require('../controllers/Apperance/bannerController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/list', getBanners);   

router.post('/add', protect, isAdmin,...compressAndUploadBanner('bannerImage'), addBanner);  // ← LINE 11 CHANGE
router.get('/list', protect, isAdmin, getBanners);
router.delete('/:id', protect, isAdmin, deleteBanner);
router.get('/list', getBanners);

module.exports = router;