// src/utils/auth.js

// Khởi tạo dữ liệu mặc định nếu chưa có
const initDB = () => {
  const defaultAccounts = [
    { username: 'khanhvo12032000@gmail.com', password: '123', name: 'sở tài nguyên', agency: 'sở tài nguyên', phone: '0915386475', role: 'MEMBER', createdAt: '2026-08-13T08:00:00.000Z' },
    { username: 'khcn@gmail.com', password: '123', name: 'sở nội vụ', agency: 'sở nội vụ', phone: '5165656565', role: 'MEMBER', createdAt: '2026-10-01T08:00:00.000Z' }
  ];

  const currentUsers = JSON.parse(localStorage.getItem('users'));
  if (!currentUsers || currentUsers.length === 0) {
    localStorage.setItem('users', JSON.stringify(defaultAccounts));
  } else {
    // Đảm bảo các tài khoản mẫu từ thiết kế có sẵn nếu chưa tồn tại
    let changed = false;
    defaultAccounts.forEach(acc => {
      const existing = currentUsers.find(u => u.username.toLowerCase() === acc.username.toLowerCase());
      if (!existing) {
        currentUsers.push(acc);
        changed = true;
      } else if (!existing.agency) {
        existing.agency = existing.name || acc.agency;
        changed = true;
      }
    });
    if (changed) {
      localStorage.setItem('users', JSON.stringify(currentUsers));
    }
  }

  if (!localStorage.getItem('assessments')) {
    localStorage.setItem('assessments', JSON.stringify([]));
  }
};

initDB();

// === XÁC THỰC ĐĂNG NHẬP ===
export const login = (username, password, role = 'MEMBER') => {
  if (role === 'ADMIN') {
    // Tài khoản Admin cứng
    if (username === 'admin' && password === 'admin123') {
      const user = { username: 'admin', role: 'ADMIN', name: 'Quản trị viên', agency: 'Quản trị viên' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    // Kiểm tra trong danh sách users xem có ai được cấp quyền ADMIN không
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const dbAdmin = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password && u.role === 'ADMIN');
    if (dbAdmin) {
      const adminUser = { ...dbAdmin, agency: dbAdmin.agency || dbAdmin.name || 'Quản trị viên', name: dbAdmin.name || 'Quản trị viên' };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }
    return { success: false, message: 'Sai tài khoản hoặc mật khẩu Quản trị.' };
  }

  // Đăng nhập thành viên
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
  
  if (user) {
    const agencyName = user.agency || user.name || '';
    const loggedInUser = { 
      ...user, 
      agency: agencyName,
      name: user.name || agencyName,
      role: user.role || 'MEMBER' 
    };
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    return { success: true, user: loggedInUser };
  }
  return { success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' };
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

// === QUẢN LÝ THÀNH VIÊN (Dành cho Admin) ===
export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem('users')) || [];
};

export const createUser = ({ username, password, name, agency, phone, role = 'MEMBER' }) => {
  if (!username.includes('@') && role !== 'ADMIN') {
    return { success: false, message: 'Tên đăng nhập bắt buộc phải là địa chỉ Email.' };
  }
  const users = getAllUsers();
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, message: 'Tên đăng nhập này đã tồn tại trong hệ thống.' };
  }
  const finalAgency = (agency || name || '').trim();
  users.push({ 
    username, 
    password, 
    name: name ? name.trim() : finalAgency, 
    agency: finalAgency, 
    phone, 
    role, 
    createdAt: new Date().toISOString() 
  });
  localStorage.setItem('users', JSON.stringify(users));
  return { success: true };
};

export const deleteUser = (username) => {
  let users = getAllUsers();
  users = users.filter(u => u.username !== username);
  localStorage.setItem('users', JSON.stringify(users));
};

export const updateUser = (username, data) => {
  let users = getAllUsers();
  const userIndex = users.findIndex(u => u.username === username);
  if (userIndex === -1) return { success: false, message: 'Tài khoản không tồn tại' };
  
  const updatedData = { ...data };
  if (data.name && !data.agency) updatedData.agency = data.name;
  if (data.agency && !data.name) updatedData.name = data.agency;

  users[userIndex] = { ...users[userIndex], ...updatedData };
  localStorage.setItem('users', JSON.stringify(users));
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.username === username) {
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, ...updatedData }));
  }
  return { success: true };
};

// === QUẢN LÝ HỒ SƠ ĐÁNH GIÁ ===
export const saveAssessment = (userId, data) => {
  const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
  // Random 4 digit code
  let code;
  do {
    code = Math.floor(1000 + Math.random() * 9000).toString();
  } while (assessments.find(a => a.id === code)); // Ensure unique
  
  const newAssessment = {
    id: code,
    userId,
    createdAt: new Date().toISOString(),
    ...data
  };
  
  assessments.push(newAssessment);
  localStorage.setItem('assessments', JSON.stringify(assessments));
  return code;
};

export const getAssessmentsByUser = (userId) => {
  const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
  return assessments.filter(a => a.userId === userId).sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getAllAssessments = () => {
  const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
  return assessments.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
};
