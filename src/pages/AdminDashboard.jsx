import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, logout, getAllUsers, createUser, deleteUser, getAllAssessments, updateUser } from '../utils/auth';
import { Users, FileText, Trash2, Plus, LogOut, Search, Edit } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'assessments'
  const [users, setUsers] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', name: '', phone: '', role: 'MEMBER' });
  const [searchTerm, setSearchTerm] = useState('');
  const [assessmentSearch, setAssessmentSearch] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ phone: '', password: '', role: 'MEMBER' });
  
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'ADMIN') {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = () => {
    setUsers(getAllUsers());
    setAssessments(getAllAssessments());
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const res = createUser(newUser);
    if (res.success) {
      setNewUser({ username: '', password: '', name: '', phone: '', role: 'MEMBER' });
      setShowAddUser(false);
      loadData();
    } else {
      alert(res.message);
    }
  };

  const handleDeleteUser = (username) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${username}?`)) {
      deleteUser(username);
      loadData();
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user.username);
    setEditFormData({ phone: user.phone || '', password: user.password || '', role: user.role || 'MEMBER' });
  };

  const submitEditUser = (e) => {
    e.preventDefault();
    updateUser(editingUser, editFormData);
    setEditingUser(null);
    loadData();
    alert('Cập nhật tài khoản thành công!');
  };

  const filteredAssessments = assessments.filter(a => {
    if (!assessmentSearch) return true;
    const term = assessmentSearch.toLowerCase();
    return a.id.toLowerCase().includes(term) || 
           (a.formData?.systemName || '').toLowerCase().includes(term) || 
           a.userId.toLowerCase().includes(term);
  });

  const filteredUsers = users.filter(u => {
    const term = searchTerm.toLowerCase();
    return (
      u.username.toLowerCase().includes(term) ||
      (u.name && u.name.toLowerCase().includes(term)) ||
      (u.phone && u.phone.includes(term))
    );
  });

  return (
    <div className="container page-container fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-main mb-1">Backend Quản trị</h2>
          <p className="text-muted text-sm">Quản lý tài khoản thành viên và hồ sơ đánh giá</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary text-danger border-danger">
          <LogOut size={16} /> Đăng xuất
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b">
        <button 
          className={`pb-3 px-4 font-bold flex items-center gap-2 ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} /> Quản lý Thành viên
        </button>
        <button 
          className={`pb-3 px-4 font-bold flex items-center gap-2 ${activeTab === 'assessments' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('assessments')}
        >
          <FileText size={18} /> Hồ sơ Đã đánh giá
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="card fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Danh sách Tài khoản</h3>
            <div className="flex gap-4 items-center">
              <div style={{ position: 'relative', width: '256px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Tìm theo email, tên, sđt..." 
                  className="form-control text-sm"
                  style={{ paddingLeft: '36px', paddingTop: '6px', paddingBottom: '6px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button onClick={() => setShowAddUser(!showAddUser)} className="btn btn-primary text-sm whitespace-nowrap">
                <Plus size={16} /> Thêm tài khoản
              </button>
            </div>
          </div>

          {showAddUser && (
            <form onSubmit={handleAddUser} className="bg-muted-light p-4 rounded-md mb-6 flex gap-4 items-end border">
              <div className="flex-1">
                <label className="text-xs font-bold mb-1 block">Tên đơn vị / Người dùng</label>
                <input type="text" required className="form-control" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} placeholder="Vd: Sở Thông tin Truyền thông" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold mb-1 block">Email đăng nhập</label>
                <input type="email" required className="form-control" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} placeholder="Vd: email@donvi.vn" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold mb-1 block">Số điện thoại</label>
                <input type="tel" required className="form-control" value={newUser.phone} onChange={e => setNewUser({...newUser, phone: e.target.value})} placeholder="Vd: 0987654321" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold mb-1 block">Mật khẩu</label>
                <input type="text" required className="form-control" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} placeholder="Vd: 123456" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-bold mb-1 block">Vai trò</label>
                <select className="form-control" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                  <option value="MEMBER">Thành viên</option>
                  <option value="ADMIN">Quản trị viên</option>
                </select>
              </div>
              <div>
                <button type="submit" className="btn btn-primary">Tạo mới</button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-sm font-bold text-muted">Tài khoản (Email)</th>
                  <th className="p-3 text-sm font-bold text-muted">Tên Đơn vị</th>
                  <th className="p-3 text-sm font-bold text-muted">Vai trò</th>
                  <th className="p-3 text-sm font-bold text-muted">Số điện thoại</th>
                  <th className="p-3 text-sm font-bold text-muted">Ngày tạo</th>
                  <th className="p-3 text-sm font-bold text-muted text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr><td colSpan="6" className="p-4 text-center text-muted">Không tìm thấy tài khoản nào.</td></tr>
                ) : (
                  filteredUsers.map(u => (
                    <React.Fragment key={u.username}>
                      <tr className="border-b hover:bg-muted-light">
                        <td className="p-3 font-semibold">{u.username}</td>
                        <td className="p-3">{u.name}</td>
                        <td className="p-3 text-sm">
                          {u.role === 'ADMIN' ? <span className="text-danger font-bold">Quản trị viên</span> : 'Thành viên'}
                        </td>
                        <td className="p-3 text-sm">{u.phone || 'N/A'}</td>
                        <td className="p-3 text-sm text-muted">{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button onClick={() => handleEditUser(u)} className="text-primary hover:underline text-sm flex items-center gap-1">
                              <Edit size={14}/> Sửa
                            </button>
                            <button onClick={() => handleDeleteUser(u.username)} className="text-danger hover:underline text-sm flex items-center gap-1">
                              <Trash2 size={14}/> Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                      {editingUser === u.username && (
                        <tr className="bg-primary-light/30 border-b">
                          <td colSpan="6" className="p-4">
                            <form onSubmit={submitEditUser} className="flex gap-4 items-end bg-white p-4 rounded border shadow-sm">
                              <div className="flex-1">
                                <label className="text-xs font-bold mb-1 block">Tài khoản</label>
                                <input type="text" disabled className="form-control bg-gray-100" value={u.username} />
                              </div>
                              <div className="flex-1">
                                <label className="text-xs font-bold mb-1 block">Số điện thoại mới</label>
                                <input type="tel" className="form-control" value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} placeholder="Vd: 0987654321" />
                              </div>
                              <div className="flex-1">
                                <label className="text-xs font-bold mb-1 block">Mật khẩu mới</label>
                                <input type="text" className="form-control" value={editFormData.password} onChange={e => setEditFormData({...editFormData, password: e.target.value})} placeholder="Nhập mật khẩu mới..." />
                              </div>
                              <div className="flex-1">
                                <label className="text-xs font-bold mb-1 block">Vai trò</label>
                                <select className="form-control" value={editFormData.role} onChange={e => setEditFormData({...editFormData, role: e.target.value})}>
                                  <option value="MEMBER">Thành viên</option>
                                  <option value="ADMIN">Quản trị viên</option>
                                </select>
                              </div>
                              <div className="flex items-center gap-2">
                                <button type="button" onClick={() => setEditingUser(null)} className="btn btn-secondary text-sm">Hủy</button>
                                <button type="submit" className="btn btn-primary text-sm">Lưu cập nhật</button>
                              </div>
                            </form>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'assessments' && (
        <div className="card fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Danh sách Hồ sơ Đánh giá</h3>
            <div style={{ position: 'relative', width: '256px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Tìm mã hồ sơ, tên hệ thống..." className="form-control text-sm" style={{ paddingLeft: '36px', paddingTop: '6px', paddingBottom: '6px' }} value={assessmentSearch} onChange={(e) => setAssessmentSearch(e.target.value)} />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-muted-light">
                  <th className="p-3 text-sm font-bold text-muted">Mã Hồ sơ</th>
                  <th className="p-3 text-sm font-bold text-muted">Hệ thống AI</th>
                  <th className="p-3 text-sm font-bold text-muted">Tài khoản nộp</th>
                  <th className="p-3 text-sm font-bold text-muted">Ngày hoàn thành</th>
                  <th className="p-3 text-sm font-bold text-muted text-right">Kết quả</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.length === 0 ? (
                  <tr><td colSpan="5" className="p-4 text-center text-muted">Chưa có hồ sơ đánh giá nào.</td></tr>
                ) : (
                  filteredAssessments.map(a => (
                    <tr key={a.id} className="border-b hover:bg-muted-light">
                      <td className="p-3 font-extrabold text-primary">#{a.id}</td>
                      <td className="p-3">{a.formData?.systemName || 'N/A'}</td>
                      <td className="p-3 text-sm">{a.userId}</td>
                      <td className="p-3 text-sm text-muted">{new Date(a.createdAt).toLocaleString('vi-VN')}</td>
                      <td className="p-3 text-right">
                        <Link to={(a.dashboardRoute || '/dashboard1') + '?id=' + a.id} target="_blank" className="btn btn-secondary text-xs inline-block text-center w-full">
                          Xem chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
