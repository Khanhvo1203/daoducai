import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, User, Lock, LogIn } from 'lucide-react';
import { login, getCurrentUser } from '../utils/auth';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role === 'ADMIN') {
      navigate('/admin');
    } else {
      const saved = localStorage.getItem('savedAdminLogin');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setUsername(parsed.username || '');
          setPassword(parsed.password || '');
          setRememberMe(true);
        } catch (e) {}
      }
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const res = login(username, password, 'ADMIN');
    if (res.success) {
      if (rememberMe) {
        localStorage.setItem('savedAdminLogin', JSON.stringify({ username, password }));
      } else {
        localStorage.removeItem('savedAdminLogin');
      }
      navigate('/admin');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="container page-container flex items-center justify-center min-h-[80vh]">
      <div className="card max-w-md w-full p-8 fade-in shadow-xl" style={{ borderTop: '4px solid #dc2626' }}>
        <div className="text-center mb-8">
          <div className="icon-box-lg bg-danger text-white mx-auto mb-4">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-main mb-2">Quản trị Hệ thống</h2>
          <p className="text-muted">Cổng đăng nhập Backend dành cho Admin</p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-danger text-white rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-col gap-5">
          <div className="form-group">
            <label className="font-bold mb-2 block">Tài khoản Admin</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <input 
                type="text" 
                required 
                className="form-control pl-10" 
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="font-bold mb-2 block">Mật khẩu</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <input 
                type="password" 
                required 
                className="form-control pl-10" 
                placeholder="admin123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input 
                type="checkbox" 
                id="rememberAdmin" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="cursor-pointer"
                style={{width: '16px', height: '16px', accentColor: '#dc2626'}}
              />
              <label htmlFor="rememberAdmin" className="text-sm cursor-pointer select-none">Ghi nhớ mật khẩu</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full mt-2" style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}>
            <LogIn size={18} /> Đăng nhập Quản trị
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
