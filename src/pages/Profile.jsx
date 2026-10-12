import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, ShieldCheck, Phone, Lock, Save, ArrowLeft, Building2 } from 'lucide-react';
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
    <div className="container page-container fade-in">
      <div className="breadcrumbs text-sm text-muted mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link> {'>'} 
        <span className="text-primary font-semibold">Hồ sơ tài khoản</span>
      </div>

      <div className="flex items-center gap-3 mb-6" style={{ maxWidth: '680px', margin: '0 auto 1.5rem auto' }}>
        <Link to="/" className="btn btn-secondary p-2 rounded-full hover:bg-muted-light transition-colors border-none shadow-sm text-muted" title="Trở về">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-extrabold text-main" style={{ margin: 0 }}>Hồ sơ Tài khoản</h2>
          <p className="text-muted text-sm" style={{ margin: '2px 0 0 0' }}>Quản lý thông tin cá nhân và lịch sử hồ sơ của bạn</p>
        </div>
      </div>

      <div className="profile-page-container" style={{ paddingTop: 0 }}>
        <div className="profile-card">
          {/* Top row: Shield Icon left, Role Badge right */}
          <div className="profile-header-row">
            <div className="profile-shield-icon">
              <ShieldCheck size={38} strokeWidth={2.2} />
            </div>
            <div className="profile-role-title">
              Tài khoản Thành viên
            </div>
          </div>

          {/* User identity */}
          <div className="profile-identity">
            <h3 className="profile-user-fullname">{user.agency || user.name || 'Cơ quan / Đơn vị'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
              {user.name && user.name !== user.agency && (
                <p className="profile-user-email" style={{ margin: 0 }}>
                  <User size={15} /> Người đại diện: <strong style={{ color: '#1e293b' }}>{user.name}</strong>
                </p>
              )}
              <p className="profile-user-email" style={{ margin: 0 }}>
                <ShieldCheck size={15} /> Email tài khoản: {user.username}
              </p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile}>
            {profileError && (
              <div className="profile-alert-box error">
                <div className="profile-alert-dot"></div>
                {profileError}
              </div>
            )}
            {successMsg && (
              <div className="profile-alert-box success">
                <div className="profile-alert-dot"></div>
                {successMsg}
              </div>
            )}

            {/* Section 1: THÔNG TIN LIÊN HỆ */}
            <div className="profile-section-heading">Thông tin liên hệ</div>

            <div className="profile-field-item">
              <label className="profile-label-text">
                <Building2 size={16} className="text-muted" /> Tên cơ quan / Đơn vị
              </label>
              <input 
                type="text" 
                disabled
                className="profile-text-input" 
                style={{ backgroundColor: '#f8fafc', color: '#1e293b', fontWeight: 600 }}
                value={user.agency || user.name || 'Chưa cập nhật'} 
              />
              <p className="profile-hint-text">Đơn vị quản lý và triển khai hệ thống do Quản trị viên cấp.</p>
            </div>

            <div className="profile-field-item">
              <label className="profile-label-text">
                <Phone size={16} className="text-muted" /> Số điện thoại
              </label>
              <input 
                type="tel" 
                className="profile-text-input" 
                value={profileData.phone} 
                onChange={e => setProfileData({...profileData, phone: e.target.value})} 
                placeholder="Vd: 0987654321" 
              />
              <p className="profile-hint-text">Dùng để liên hệ khi hồ sơ đánh giá của bạn cần làm rõ.</p>
            </div>

            {/* Section 2: BẢO MẬT */}
            <div className="profile-section-heading security-section">Bảo mật</div>

            <div className="profile-field-item">
              <label className="profile-label-text">
                <Lock size={16} className="text-muted" /> Mật khẩu hiện tại
              </label>
              <input 
                type="password" 
                className="profile-text-input" 
                value={profileData.oldPassword} 
                onChange={e => setProfileData({...profileData, oldPassword: e.target.value})} 
                placeholder="Nhập để xác thực thay đổi" 
              />
            </div>

            <div className="profile-field-item">
              <label className="profile-label-text">
                Mật khẩu mới
              </label>
              <input 
                type="password" 
                className="profile-text-input" 
                value={profileData.newPassword} 
                onChange={e => setProfileData({...profileData, newPassword: e.target.value})} 
                placeholder="Tối thiểu 6 ký tự" 
              />
            </div>

            <div className="profile-field-item">
              <label className="profile-label-text">
                Xác nhận mật khẩu mới
              </label>
              <input 
                type="password" 
                className="profile-text-input" 
                value={profileData.confirmPassword} 
                onChange={e => setProfileData({...profileData, confirmPassword: e.target.value})} 
                placeholder="Nhập lại mật khẩu mới" 
              />
            </div>

            {/* Action buttons */}
            <div className="profile-button-group">
              <Link to="/" className="btn-profile-back">Trở về</Link>
              <button type="submit" className="btn-profile-save">
                <Save size={16} /> Lưu thông tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
