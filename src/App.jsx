import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
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
    return <Navigate to="/" />;
  } else if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const Navigation = () => {
  const user = getCurrentUser();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  // Ẩn Navigation ở màn hình Login Admin
  if (location.pathname === '/admin/login') return null;

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
            <>
              {/* Đã chuyển Lịch sử hồ sơ vào trong Profile */}
              <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)} 
                  className="btn btn-secondary flex items-center gap-2"
                  style={{ 
                    padding: '8px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid var(--border)',
                    backgroundColor: '#fff',
                    color: 'var(--text-main)',
                    fontSize: '14px'
                  }}
                >
                  <span className="font-bold">{user.name || user.username}</span>
                  <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
                </button>
                
                {showDropdown && (
                  <div 
                    style={{ 
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 8px)', 
                      width: '220px', 
                      backgroundColor: '#fff',
                      borderRadius: '8px', 
                      border: '1px solid var(--border)',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                      zIndex: 99999,
                      overflow: 'hidden'
                    }}
                  >
                    {user.role !== 'ADMIN' && (
                      <>
                        <Link 
                          to="/profile"
                          onClick={() => setShowDropdown(false)}
                          style={{ 
                            width: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px',
                            padding: '12px 16px', 
                            textAlign: 'left', 
                            borderBottom: '1px solid var(--border)',
                            backgroundColor: 'transparent',
                            color: 'var(--text-main)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            textDecoration: 'none'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)'; }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-main)'; }}
                        >
                          <Settings size={16} /> <span className="font-medium">Thông tin tài khoản</span>
                        </Link>
                        <Link 
                          to="/history"
                          onClick={() => setShowDropdown(false)}
                          style={{ 
                            width: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px',
                            padding: '12px 16px', 
                            textAlign: 'left', 
                            borderBottom: '1px solid var(--border)',
                            backgroundColor: 'transparent',
                            color: 'var(--text-main)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            textDecoration: 'none'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary)'; }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-main)'; }}
                        >
                          <History size={16} /> <span className="font-medium">Lịch sử hồ sơ</span>
                        </Link>
                      </>
                    )}
                    <button 
                      onClick={() => { logout(); window.location.href = user.role === 'ADMIN' ? '/admin/login' : '/login'; }}
                      style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        padding: '12px 16px', 
                        textAlign: 'left', 
                        backgroundColor: 'transparent',
                        color: 'var(--danger)',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <LogOut size={16} /> <span className="font-bold">Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            </>
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
            <Route path="/" element={<Navigate to="/ho-so-dang-ky" replace />} />
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
