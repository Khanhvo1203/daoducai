import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, ShieldCheck, Phone, Lock, Save, ArrowLeft } from 'lucide-react';
import { getCurrentUser, getAllUsers, updateUser } from '../utils/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({ phone: '', oldPassword: '', newPassword: '', confirmPassword: '' });
  const [profileError, setProfileError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role === 'ADMIN') {
      navigate('/');
      return;
    }
    setUser(currentUser);
    
    const allUsers = getAllUsers();
    const myInfo = allUsers.find(u => u.username === currentUser.username);
    if (myInfo) {
      setProfileData({ phone: myInfo.phone || '', oldPassword: '', newPassword: '', confirmPassword: '' });
    }
  }, [navigate]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setProfileError('');
    setSuccessMsg('');
    
    let updatePayload = { phone: profileData.phone };
    let isUpdatingPassword = profileData.oldPassword || profileData.newPassword || profileData.confirmPassword;
    let successMessage = 'Cập nhật số điện thoại thành công!';
    
    if (isUpdatingPassword) {
      if (!profileData.oldPassword) {
        setProfileError('Vui lòng nhập mật khẩu hiện tại để đổi mật khẩu!');
        return;
      }
      if (!profileData.newPassword) {
        setProfileError('Vui lòng nhập mật khẩu mới!');
        return;
      }
      if (!profileData.confirmPassword) {
        setProfileError('Vui lòng xác nhận mật khẩu mới!');
        return;
      }

      const allUsers = getAllUsers();
      const myInfo = allUsers.find(u => u.username === user.username);
      
      if (profileData.oldPassword !== myInfo.password) {
        setProfileError('Mật khẩu hiện tại không chính xác!');
        return;
      }
      if (profileData.newPassword.length < 6) {
        setProfileError('Mật khẩu mới phải có ít nhất 6 ký tự!');
        return;
      }
      if (profileData.newPassword !== profileData.confirmPassword) {
        setProfileError('Xác nhận mật khẩu không khớp!');
        return;
      }
      
      updatePayload.password = profileData.newPassword;
      successMessage = 'Cập nhật thông tin và mật khẩu thành công!';
    }

    updateUser(user.username, updatePayload);
    setSuccessMsg(successMessage);
    setProfileData(prev => ({ ...prev, oldPassword: '', newPassword: '', confirmPassword: '' }));
    
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  if (!user) return null;

  return (
    <div className="container page-container fade-in min-h-[80vh]">
      <div className="breadcrumbs text-sm text-muted mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link> {'>'} 
        <span className="text-primary font-semibold">Hồ sơ tài khoản</span>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="btn btn-secondary p-2 rounded-full hover:bg-muted-light transition-colors border-none shadow-sm text-muted">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-3xl font-extrabold text-main mb-1">Hồ sơ Tài khoản</h2>
            <p className="text-muted">Quản lý thông tin cá nhân và lịch sử hồ sơ của bạn</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-10" style={{ borderColor: 'var(--border)' }}>
          {/* Header Cover */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600" style={{ background: 'linear-gradient(135deg, var(--primary), #1a56db)' }}>
          </div>
          
          <div className="px-8 pb-4">
            {/* Avatar */}
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <ShieldCheck size={40} className="text-primary" />
              </div>
              <div className="pb-2">
                <span className="inline-block bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                  Tài khoản Thành viên
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-main">{user.name || 'Người dùng'}</h3>
              <p className="text-muted flex items-center gap-2 mt-1">
                <User size={14} /> {user.username}
              </p>
            </div>

            <form onSubmit={handleUpdateProfile}>
              {profileError && (
                <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  {profileError}
                </div>
              )}
              {successMsg && (
                <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f0fdf4', border: '1px solid #4ade80', color: '#15803d', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                  {successMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Cột 1: Thông tin liên hệ */}
                <div>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b pb-2" style={{ borderColor: 'var(--border)' }}>Thông tin liên hệ</h4>
                  
                  <div className="mb-5">
                    <label className="flex items-center gap-2 text-sm font-bold text-main mb-2">
                      <Phone size={16} className="text-muted" /> Số điện thoại
                    </label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      value={profileData.phone} 
                      onChange={e => setProfileData({...profileData, phone: e.target.value})} 
                      placeholder="Vd: 0987654321" 
                    />
                    <p className="text-xs text-muted mt-2">Dùng để liên hệ khi hồ sơ đánh giá của bạn cần làm rõ.</p>
                  </div>
                </div>

                {/* Cột 2: Bảo mật */}
                <div>
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 border-b pb-2" style={{ borderColor: 'var(--border)' }}>Bảo mật</h4>
                  
                  <div className="mb-4">
                    <label className="flex items-center gap-2 text-sm font-bold text-main mb-2">
                      <Lock size={16} className="text-muted" /> Mật khẩu hiện tại
                    </label>
                    <input 
                      type="password" 
                      className="form-control" 
                      value={profileData.oldPassword} 
                      onChange={e => setProfileData({...profileData, oldPassword: e.target.value})} 
                      placeholder="Nhập để xác thực thay đổi" 
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-main mb-2">Mật khẩu mới</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      value={profileData.newPassword} 
                      onChange={e => setProfileData({...profileData, newPassword: e.target.value})} 
                      placeholder="Tối thiểu 6 ký tự" 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-main mb-2">Xác nhận mật khẩu mới</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      value={profileData.confirmPassword} 
                      onChange={e => setProfileData({...profileData, confirmPassword: e.target.value})} 
                      placeholder="Nhập lại mật khẩu mới" 
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex justify-end gap-3" style={{ borderColor: 'var(--border)' }}>
                <Link to="/" className="btn btn-secondary bg-white">Trở về</Link>
                <button type="submit" className="btn btn-primary flex items-center gap-2 shadow-md">
                  <Save size={16} /> Lưu thông tin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
