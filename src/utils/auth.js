// src/utils/auth.js

// Khởi tạo dữ liệu mặc định nếu chưa có
const initDB = () => {
  if (!localStorage.getItem('users')) {
    // Chỉ lưu danh sách thành viên trong users (Admin ẩn không lưu ở đây)
    const initialUsers = [
      { username: 'thanhvien@donvi.vn', password: '123', name: 'Tài khoản Thành viên (Test)', phone: '0901234567', createdAt: new Date().toISOString() }
    ];
    localStorage.setItem('users', JSON.stringify(initialUsers));
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
      const user = { username: 'admin', role: 'ADMIN', name: 'Quản trị viên' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: 'Sai tài khoản hoặc mật khẩu Quản trị.' };
  }

  // Đăng nhập thành viên
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const loggedInUser = { ...user, role: 'MEMBER' };
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

export const createUser = ({ username, password, name, phone }) => {
  if (!username.includes('@')) {
    return { success: false, message: 'Tên đăng nhập bắt buộc phải là địa chỉ Email.' };
  }
  const users = getAllUsers();
  if (users.find(u => u.username === username)) {
    return { success: false, message: 'Email này đã tồn tại trong hệ thống.' };
  }
  users.push({ username, password, name, phone, createdAt: new Date().toISOString() });
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
  
  users[userIndex] = { ...users[userIndex], ...data };
  localStorage.setItem('users', JSON.stringify(users));
  
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.username === username) {
    localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, ...data }));
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
