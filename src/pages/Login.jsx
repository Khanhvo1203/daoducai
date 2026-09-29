import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Target, User, Lock, LogIn } from 'lucide-react';
import { login, getCurrentUser } from '../utils/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu đã đăng nhập, chuyển hướng luôn
    const user = getCurrentUser();
    if (user) {
      if (user.role === 'ADMIN') navigate('/admin');
      else navigate('/');
    } else {
      const saved = localStorage.getItem('savedLogin');
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
    
    const res = login(username, password, 'MEMBER');
    if (res.success) {
      if (rememberMe) {
        localStorage.setItem('savedLogin', JSON.stringify({ username, password }));
      } else {
        localStorage.removeItem('savedLogin');
      }
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="container page-container flex items-center justify-center min-h-[80vh]">
      <div className="card max-w-md w-full p-8 fade-in shadow-lg">
        <div className="text-center mb-8">
          <div className="icon-box-lg bg-primary-light text-primary mx-auto mb-4">
            <Shield size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-main mb-2">Cổng Đánh Giá Đạo Đức AI</h2>
          <p className="text-muted">Đăng nhập dành cho Thành viên/Tổ chức</p>
        </div>

        {error && (
          <div className="p-3 mb-4 bg-danger text-white rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-col gap-5">
          <div className="form-group">
            <label className="font-bold mb-2 block">Email đăng nhập</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
              <input 
                type="email" 
                required 
                className="form-control pl-10" 
                placeholder="Nhập email"
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
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="cursor-pointer"
                style={{width: '16px', height: '16px', accentColor: '#2b56f5'}}
              />
              <label htmlFor="remember" className="text-sm cursor-pointer select-none">Ghi nhớ mật khẩu</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full mt-2">
            <LogIn size={18} /> Đăng nhập
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted">
          Bạn chưa có tài khoản? Vui lòng liên hệ Quản trị viên hệ thống để được cấp phát.
        </div>
      </div>
    </div>
  );
};

export default Login;
