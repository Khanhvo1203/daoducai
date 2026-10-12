import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Assessment1 from './pages/Assessment1';
import Assessment2 from './pages/Assessment2';
import Dashboard1 from './pages/Dashboard1';
import Dashboard2 from './pages/Dashboard2';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import MemberHistory from './pages/MemberHistory';
import Profile from './pages/Profile';
import { getCurrentUser, logout } from './utils/auth';
import { User, LogOut, Settings, ChevronDown, History, LogIn } from 'lucide-react';

// Component bảo vệ Route
const ProtectedRoute = ({ children, allowedRole, allowedRoles }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to={allowedRole === 'ADMIN' ? "/admin/login" : "/login"} />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/'} />;
  } else if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/'} />;
  }
  
  return children;
};

const RootRedirect = () => {
  const user = getCurrentUser();
  if (user && user.role === 'ADMIN') return <Navigate to="/admin" replace />;
  return <Navigate to="/ho-so-dang-ky" replace />;
};

const Navigation = () => {
  const user = getCurrentUser();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Ẩn Navigation ở màn hình Login Admin hoặc Trang chủ (Trang chủ có header & sidebar riêng)
  if (location.pathname === '/admin/login' || location.pathname === '/') return null;

  return (
    <header className="navbar glass">
      <div className="container flex items-center justify-between" style={{ height: 'var(--navbar-height)' }}>
        <Link to={user?.role === 'ADMIN' ? '/admin' : '/'} className="flex items-center gap-3 logo">
          <img src="/logo-most.png" alt="Bộ Khoa học và Công nghệ" style={{ height: '48px', width: '48px', borderRadius: '50%', objectFit: 'cover' }} />
          <span className="font-bold text-main" style={{ lineHeight: '1.2', fontSize: '1.1rem' }}>BỘ CÔNG CỤ ĐÁNH GIÁ<br/>ĐẠO ĐỨC AI</span>
        </Link>
        
        <nav className="nav-links flex gap-6">
          {user?.role === 'ADMIN' ? (
            <>
              <Link to="/admin" className="nav-link active">Bảng điều khiển Backend</Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link active">Trang chủ</Link>
              <Link to="/" className="nav-link">Phương pháp & Bộ chỉ số</Link>
              <Link to="/" className="nav-link">Hướng dẫn</Link>
            </>
          )}
        </nav>

        <div className="user-profile flex items-center gap-4">
          {user ? (
            <div style={{ position: 'relative' }}>
              <div 
                className="user-profile-anchor"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="user-avatar-circle">
                  <User size={18} />
                </div>
                <div className="user-meta-info">
                  <div className="user-fullname">
                    {user?.role === 'ADMIN' 
                      ? (user.name || 'Quản trị viên') 
                      : (user ? (user.name || user.username) : 'Nguyễn Văn A')}
                  </div>
                  <div className="user-org-name">
                    {user?.role === 'ADMIN' 
                      ? 'Cơ quan / Đơn vị' 
                      : (user ? (user.agency || 'Cơ quan / Đơn vị') : 'sở nội vụ')}
                  </div>
                </div>
              </div>
              
              {showDropdown && (
                <div className="user-menu-dropdown">
                  {user.role !== 'ADMIN' && (
                    <>
                      <Link 
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="dropdown-item"
                      >
                        <User size={15} /> <span>Thông tin tài khoản</span>
                      </Link>
                      <Link 
                        to="/history"
                        onClick={() => setShowDropdown(false)}
                        className="dropdown-item"
                      >
                        <History size={15} /> <span>Lịch sử đánh giá</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                    </>
                  )}
                  <div 
                    onClick={() => { logout(); window.location.href = user.role === 'ADMIN' ? '/admin/login' : '/login'; }}
                    className="dropdown-item danger"
                  >
                    <LogOut size={15} /> <span>Đăng xuất</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="btn btn-primary flex items-center gap-2" 
              style={{ fontWeight: 800, textTransform: 'uppercase', padding: '10px 20px', fontSize: '15px' }}
            >
              <LogIn size={20} strokeWidth={2.5} /> ĐĂNG NHẬP
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navigation />

        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Member Protected Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/ho-so-dang-ky" element={<ProtectedRoute allowedRole="MEMBER"><LandingPage /></ProtectedRoute>} />
            <Route path="/assessment1" element={<ProtectedRoute allowedRole="MEMBER"><Assessment1 /></ProtectedRoute>} />
            <Route path="/assessment2" element={<ProtectedRoute allowedRole="MEMBER"><Assessment2 /></ProtectedRoute>} />
            <Route path="/dashboard1" element={<ProtectedRoute allowedRoles={['MEMBER', 'ADMIN']}><Dashboard1 /></ProtectedRoute>} />
            <Route path="/dashboard2" element={<ProtectedRoute allowedRoles={['MEMBER', 'ADMIN']}><Dashboard2 /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute allowedRole="MEMBER"><MemberHistory /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute allowedRole="MEMBER"><Profile /></ProtectedRoute>} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRole="ADMIN"><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
