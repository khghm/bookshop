import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBooks from './pages/admin/AdminBooks';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminReports from './pages/admin/AdminReports';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <AdminProvider>
        <CartProvider>
          <Routes>
          {/* Public routes */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <CartSidebar />
              <main className="flex-1">
                <HomePage />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/books" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <CartSidebar />
              <main className="flex-1">
                <BooksPage />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/book/:id" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <CartSidebar />
              <main className="flex-1">
                <BookDetailPage />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/cart" element={
            <div className="min-h-screen flex flex-col">
              <Header />
              <CartSidebar />
              <main className="flex-1">
                <CartPage />
              </main>
              <Footer />
            </div>
          } />

          {/* Admin routes */}
          <Route path="/admin" element={
            isAdminLoggedIn ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
          } />
          <Route path="/admin/dashboard" element={
            isAdminLoggedIn ? (
              <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
                <AdminDashboard />
              </AdminLayout>
            ) : <Navigate to="/admin" />
          } />
          <Route path="/admin/books" element={
            isAdminLoggedIn ? (
              <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
                <AdminBooks />
              </AdminLayout>
            ) : <Navigate to="/admin" />
          } />
          <Route path="/admin/orders" element={
            isAdminLoggedIn ? (
              <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
                <AdminOrders />
              </AdminLayout>
            ) : <Navigate to="/admin" />
          } />
          <Route path="/admin/users" element={
            isAdminLoggedIn ? (
              <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
                <AdminUsers />
              </AdminLayout>
            ) : <Navigate to="/admin" />
          } />
          <Route path="/admin/reports" element={
            isAdminLoggedIn ? (
              <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
                <AdminReports />
              </AdminLayout>
            ) : <Navigate to="/admin" />
          } />
          <Route path="/admin/coupons" element={
            isAdminLoggedIn ? (
              <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
                <AdminCoupons />
              </AdminLayout>
            ) : <Navigate to="/admin" />
          } />
          <Route path="/admin/settings" element={
            isAdminLoggedIn ? (
              <AdminLayout onLogout={() => setIsAdminLoggedIn(false)}>
                <AdminSettings />
              </AdminLayout>
            ) : <Navigate to="/admin" />
          } />
          </Routes>
        </CartProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;
