import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from './Components/ScrollToTop';  // adjust path as needed


// Admin Pages & Components
import LoginPage from './Admin/Pages/Login';
import AdminLayout from './Components/AdminLayout';
import CategoriesPage from './User/Pages/CategoriesPage';
import SubCategoriesPage from "./User/Pages/SubCategoriesPage";



// User Pages & Components
import UserLoginPage from './User/Pages/UserLogin';
import UserLayout from './User/UserLayout';
import HomePage from './User/Pages/HomePage';

// User Shell — visible on all user-side pages
import UserNavbar from './User/Components/Usernavbar';
import UserFooter from './User/Components/Userfooter';
import ResetPassword from './User/Pages/ResetPassword';  // ← add this import
import ForgotPassword from './User/Pages/ForgotPassword';
import BlogDetailPage from "./User/Pages/BlogDetailPage";



// driver
import DeliveryAgentApp from './Driver/Deliveryagentapp';



///////////////////////////

import ProductsPage from './User/Pages/Productspage';
import BlogPage from './User/Pages/Blogpage';
import ProductDetails from './User/Pages/Productdetails';
import ContactPage from './User/Pages/Contactpage';
import AboutUs from './User/Pages/Aboutus';
import TermsAndConditions from './User/Pages/Termsandconditions';
import PrivacyPolicy from './User/Pages/Privacypolicy';
import DeleteAccount from './User/Pages/Deleteaccount';


//////////////////////////////////////////////////////////////////////////////////

import CartToast from './User/Components/Carttoast'; // apna sahi path lagao


/////////////////////////////////////////////////////////////////////////////////

// ─────────────────────────────────────────
// Full-Page Loader Component
// ─────────────────────────────────────────







// ─────────────────────────────────────────
// Admin Protected Route — checks adminToken
// If no token → redirect to /admin/login
// ─────────────────────────────────────────
const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};


// ─────────────────────────────────────────
// User Protected Route — checks userToken
// If no token → redirect to /user/login
// ─────────────────────────────────────────
const UserProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');
  if (!token) {
    return <Navigate to="/user/login" replace />;
  }
  return children;
};


// ─────────────────────────────────────────
// Layout wrapper — shows navbar & footer
// only on non-admin routes
// ─────────────────────────────────────────
const AppLayout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');
  const isDriverRoute = pathname.startsWith('/driver');   // ← add this


  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />                              {/* ← ADD HERE */}
      {!isAdminRoute && !isDriverRoute && <UserNavbar />}   {/* ← updated */}
      <main className="flex-1">{children}</main>
      {!isAdminRoute && !isDriverRoute && <UserFooter />}   {/* ← updated */}
    </div>
  );
};


function App() {
  const [appReady, setAppReady] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulates waiting for fonts, tokens, configs, etc.
    // Replace this with real async calls if needed
    const timer = setTimeout(() => {
      setFadeOut(true);                           // trigger fade animation
      setTimeout(() => setAppReady(true), 1000);  // unmount loader after fade
    }, 500); // small intentional delay so loader doesn't flash for fast loads

    return () => clearTimeout(timer);
  }, []);

  // Show loader until app is ready

  return (
    <AppLayout>
      <CartToast />
      <Routes>

        <Route path="/" element={<HomePage />} />


        {/* 1. Default Route → redirect to home page */}

        {/* ──────────────────────────────── */}
        {/*         ADMIN ROUTES             */}
        {/* ──────────────────────────────── */}

        {/* 2. Public Route — Admin Login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* 3. Protected Admin Routes
            - Any path under /admin/* is protected
            - No token → goes back to /admin/login automatically */}
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        />

        {/* ──────────────────────────────── */}
        {/*         USER ROUTES              */}
        {/* ──────────────────────────────── */}

        {/* 4. Public Routes — no token required */}
        <Route path="/user/login" element={<UserLoginPage />} />
        <Route path="/user/product" element={<ProductsPage />} />
        <Route path="/user/blog" element={<BlogPage />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/user/contect" element={<ContactPage />} />
        <Route path="/user/about" element={<AboutUs />} />
        <Route path="/user/termcondition" element={<TermsAndConditions />} />
        <Route path="/user/privacy" element={<PrivacyPolicy />} />
        <Route path="/user/deleteaccount" element={<DeleteAccount />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/categories/:categoryId" element={<SubCategoriesPage />} />
<Route path="/user/categories" element={<CategoriesPage />} />
<Route path="/user/blog/:id" element={<BlogDetailPage />} />









        {/* /////////////////// driver /////////////////////////////////// */}


        <Route path="/driver/*" element={<DeliveryAgentApp />} />

        {/* /////////////////// driver /////////////////////////////////// */}



        {/* 5. Protected User Routes
            - Any path under /user/* is protected
            - No token → goes back to /user/login automatically */}
        <Route
          path="/user/*"
          element={
            <UserProtectedRoute>
              <UserLayout />
            </UserProtectedRoute>
          }
        />

        {/* 6. 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen font-bold text-2xl text-slate-400">
              404 - Page Not Found
            </div>
          }
        />

      </Routes>
    </AppLayout>
  );
}

export default App;