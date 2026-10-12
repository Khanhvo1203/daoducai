import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, ShieldCheck, Phone, Lock, Save, ArrowLeft } from 'lucide-react';
import { getCurrentUser, getAllUsers, updateUser } from '../utils/auth';
import './Profile.css';

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

        <div className="profile-card">
          {/* Header Cover */}
          <div className="profile-cover-banner"></div>
          
          <div className="profile-card-body">
            {/* Avatar */}
            <div className="profile-avatar-row">
              <div className="profile-avatar-box">
                <ShieldCheck size={40} className="text-primary" />
              </div>
              <div>
                <span className="profile-badge-pill">
                  Tài khoản Thành viên
                </span>
              </div>
            </div>

            <div className="profile-user-heading">
              <h3 className="profile-user-name">{user.name || 'Người dùng'}</h3>
              <p className="profile-user-username">
                <User size={15} /> {user.username}
              </p>
            </div>

            <form onSubmit={handleUpdateProfile}>
              {profileError && (
                <div style={{ marginBottom: '24px', padding: '14px 18px', backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  {profileError}
                </div>
              )}
              {successMsg && (
                <div style={{ marginBottom: '24px', padding: '14px 18px', backgroundColor: '#f0fdf4', border: '1px solid #4ade80', color: '#15803d', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                  {successMsg}
                </div>
              )}

              <div className="profile-form-grid">
                {/* Cột 1: Thông tin liên hệ */}
                <div>
                  <h4 className="profile-section-title">Thông tin liên hệ</h4>
                  
                  <div className="profile-field-group">
                    <label className="profile-field-label">
                      <Phone size={16} className="text-muted" /> Số điện thoại
                    </label>
                    <input 
                      type="tel" 
                      className="profile-input" 
                      value={profileData.phone} 
                      onChange={e => setProfileData({...profileData, phone: e.target.value})} 
                      placeholder="Vd: 0987654321" 
                    />
                    <p className="profile-field-hint">Dùng để liên hệ khi hồ sơ đánh giá của bạn cần làm rõ.</p>
                  </div>
                </div>

                {/* Cột 2: Bảo mật */}
                <div>
                  <h4 className="profile-section-title">Bảo mật</h4>
                  
                  <div className="profile-field-group">
                    <label className="profile-field-label">
                      <Lock size={16} className="text-muted" /> Mật khẩu hiện tại
                    </label>
                    <input 
                      type="password" 
                      className="profile-input" 
                      value={profileData.oldPassword} 
                      onChange={e => setProfileData({...profileData, oldPassword: e.target.value})} 
                      placeholder="Nhập để xác thực thay đổi" 
                    />
                  </div>
                  
                  <div className="profile-field-group">
                    <label className="profile-field-label">Mật khẩu mới</label>
                    <input 
                      type="password" 
                      className="profile-input" 
                      value={profileData.newPassword} 
                      onChange={e => setProfileData({...profileData, newPassword: e.target.value})} 
                      placeholder="Tối thiểu 6 ký tự" 
                    />
                  </div>
                  
                  <div className="profile-field-group">
                    <label className="profile-field-label">Xác nhận mật khẩu mới</label>
                    <input 
                      type="password" 
                      className="profile-input" 
                      value={profileData.confirmPassword} 
                      onChange={e => setProfileData({...profileData, confirmPassword: e.target.value})} 
                      placeholder="Nhập lại mật khẩu mới" 
                    />
                  </div>
                </div>
              </div>

              <div className="profile-actions-row">
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
