// src/utils/auth.js

// Khởi tạo dữ liệu mặc định nếu chưa có
const initDB = () => {
  const defaultAccounts = [
    { username: 'khanhvo12032000@gmail.com', password: '123', name: 'Võ Quốc Khánh', agency: 'sở tài nguyên', phone: '0915386475', role: 'MEMBER', createdAt: '2026-08-13T08:00:00.000Z' },
    { username: 'khcn@gmail.com', password: '123', name: 'Nguyễn Văn A', agency: 'sở nội vụ', phone: '5165656565', role: 'MEMBER', createdAt: '2026-10-01T08:00:00.000Z' }
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
      } else {
        if (!existing.agency) {
          existing.agency = acc.agency;
          changed = true;
        }
        if (!existing.name || existing.name === existing.agency) {
          existing.name = acc.name;
          changed = true;
        }
      }
    });
    if (changed) {
      localStorage.setItem('users', JSON.stringify(currentUsers));
    }
  }

  const storedAssessments = JSON.parse(localStorage.getItem('assessments'));
  if (!storedAssessments || storedAssessments.length === 0) {
    const sampleAssessments = [
      {
        id: '8421',
        userId: 'khanhvo12032000@gmail.com',
        createdAt: '2026-10-10T09:30:00.000Z',
        updatedAt: '2026-10-10T10:15:00.000Z',
        status: 'COMPLETED',
        complianceLevel: 'Tuân thủ đầy đủ',
        scoreText: '52/60 câu "Có"',
        convertedScore: 87,
        dashboardRoute: '/dashboard1',
        formData: {
          fullName: 'Võ Quốc Khánh',
          role: 'Chuyên viên CNTT',
          email: 'khanhvo12032000@gmail.com',
          systemName: 'Hệ thống AI Hỗ trợ Tiếp nhận & Trả kết quả TTHC',
          internalCode: 'AI-NV-01',
          version: 'v2.1',
          updatedDate: '2026-10-01',
          agencyName: 'Sở Nội vụ',
          legalBasis: 'Quyết định 1290/QĐ-BTTTT & Luật 134/2025/QH15',
          orgRole: 'Nhà phát triển',
          riskLevel: 'Trung bình',
          riskLevelBasis: 'Phục vụ tư vấn công dân, có người duyệt kết quả cuối',
          isInHighRiskList: 'Không',
          complianceAssessment: 'Đã thực hiện',
          complianceAssessmentDetail: 'Đã thẩm định hồ sơ kỹ thuật',
          purpose: 'Hỗ trợ công dân tra cứu và chuẩn bị hồ sơ thủ tục hành chính tại bộ phận một cửa',
          businessProblem: 'Giảm tải khối lượng tiếp dân và nâng cao độ chính xác giấy tờ nộp',
          domain: 'Hành chính',
          directUser: 'Cán bộ chuyên môn',
          decisionTarget: 'Công dân',
          vulnerableGroup: 'Người cao tuổi, người khuyết tật',
          userCount: '15.000 lượt/tháng',
          deployScope: 'Toàn tỉnh/thành',
          potentialImpact: 'Chậm trễ xử lý hồ sơ nếu gợi ý sai lệch',
          aiTechType: 'Học máy truyền thống',
          developType: 'Tự phát triển',
          inputType: 'Văn bản',
          inputSource: 'Người dùng nhập',
          hasPersonalData: 'Có',
          personalDataDesc: 'Họ tên, CCCD khi nộp hồ sơ',
          outputType: 'Gợi ý / Phân loại',
          automationLevel: 'Gợi ý cho người dùng',
          managementUnit: 'Phòng Cải cách hành chính',
          leaderName: 'Nguyễn Văn Minh',
          leaderRole: 'Phó Giám đốc Sở',
          leaderEmail: 'nvminh@noivu.gov.vn',
          leaderPhone: '0912345678',
          technicalContact: 'Tổ Công nghệ số - 024.3825.xxxx',
          supportChannel: 'duongdaynong@noivu.gov.vn'
        },
        selection: { partB: true, partC: true },
        answers: {
          'A1': 0, 'A2': 0, 'A3': 0, 'A4': 0, 'A5': 0,
          'A6': 0, 'A7': 0, 'A8': 0, 'A9': 0, 'A10': 0,
          'A11': 1, 'A12': 0, 'A13': 1, 'A14': 0, 'A15': 1,
          'B1': 0, 'B2': 0, 'B3': 0, 'B4': 0, 'B5': 0, 'B6': 0, 'B7': 0, 'B8': 0, 'B9': 0,
          'C1.1': 0, 'C1.2': 0, 'C1.3': 0, 'C1.4': 0, 'C1.5': 0, 'C1.6': 0, 'C1.7': 0, 'C1.8': 1, 'C1.9': 0, 'C1.10': 0, 'C1.11': 0, 'C1.12': 0, 'C1.13': 0, 'C1.14': 0, 'C1.15': 0,
          'C2.1': 0, 'C2.2': 0, 'C2.3': 0, 'C2.4': 0, 'C2.5': 0, 'C2.6': 0, 'C2.7': 0, 'C2.8': 0, 'C2.9': 0, 'C2.10': 0, 'C2.11': 0, 'C2.12': 0, 'C2.13': 0, 'C2.14': 0, 'C2.15': 0,
          'C3.1': 0, 'C3.2': 0, 'C3.3': 1, 'C3.4': 0, 'C3.5': 0, 'C3.6': 0, 'C3.7': 0, 'C3.8': 0, 'C3.9': 1, 'C3.10': 0, 'C3.11': 0, 'C3.12': 0, 'C3.13': 0, 'C3.14': 0, 'C3.15': 0,
          'C4.1': 0, 'C4.2': 0, 'C4.3': 0, 'C4.4': 0, 'C4.5': 1, 'C4.6': 0, 'C4.7': 0, 'C4.8': 0, 'C4.9': 0, 'C4.10': 0, 'C4.11': 0, 'C4.12': 0, 'C4.13': 0, 'C4.14': 0, 'C4.15': 0,
          'D1': 0, 'D2': 0, 'D3': 0, 'D4': 0, 'D5': 0, 'D6': 0, 'D7': 0, 'D8': 0, 'D9': 0, 'D10': 0
        },
        evidences: {}
      },
      {
        id: '3150',
        userId: 'khanhvo12032000@gmail.com',
        createdAt: '2026-10-13T14:15:00.000Z',
        updatedAt: '2026-10-14T11:20:00.000Z',
        status: 'DRAFT',
        isDraft: true,
        currentStep: 2,
        dashboardRoute: '/assessment1',
        formData: {
          fullName: 'Võ Quốc Khánh',
          role: 'Chuyên viên Quản lý Dữ liệu',
          email: 'khanhvo12032000@gmail.com',
          systemName: 'Trợ lý ảo AI Hỗ trợ Tra cứu Quy hoạch Đô thị & Đất đai',
          internalCode: 'AI-TNMT-02',
          version: 'v1.0-beta',
          updatedDate: '2026-10-14',
          agencyName: 'Sở Tài nguyên và Môi trường',
          legalBasis: 'Kế hoạch chuyển đổi số ngành Tài nguyên Môi trường 2026',
          orgRole: 'Bên triển khai',
          riskLevel: 'Rủi ro cao',
          riskLevelBasis: 'Thuộc Danh mục AI ảnh hưởng trực tiếp quyền sở hữu đất đai của công dân',
          isInHighRiskList: 'Có',
          highRiskCategoryDesc: 'Phục vụ thẩm định thông tin quyền sử dụng đất',
          highRiskDetail: 'Hệ thống đối soát dữ liệu địa chính và bản đồ quy hoạch',
          complianceAssessment: 'Đang tiến hành',
          purpose: 'Hỗ trợ người dân tra cứu thông tin quy hoạch và ranh giới thửa đất trực tuyến',
          businessProblem: 'Nâng cao tính minh bạch, giảm tình trạng tranh chấp quy hoạch',
          domain: 'Đô thị & Đất đai',
          directUser: 'Công dân & Doanh nghiệp',
          decisionTarget: 'Công dân',
          vulnerableGroup: 'Người dân vùng ven, người có hạn chế kỹ năng số',
          userCount: '30.000 người/năm',
          deployScope: 'Toàn tỉnh/thành',
          potentialImpact: 'Rủi ro sai lệch ranh giới quy hoạch dẫn đến khiếu nại',
          aiTechType: 'Học sâu & Thị giác máy tính',
          developType: 'Thuê doanh nghiệp công nghệ phát triển',
          provider: 'Tập đoàn Công nghệ Viễn thông',
          inputType: 'Ảnh viễn thám & Dữ liệu GIS',
          inputSource: 'Cơ sở dữ liệu Đất đai quốc gia',
          hasPersonalData: 'Có',
          personalDataDesc: 'Thông tin chủ sở hữu thửa đất',
          outputType: 'Trực quan hóa bản đồ & Báo cáo quy hoạch',
          automationLevel: 'Bán tự động (Cần chuyên viên duyệt)',
          managementUnit: 'Chi cục Quản lý Đất đai',
          leaderName: 'Trần Đình Trọng',
          leaderRole: 'Chi cục trưởng',
          leaderEmail: 'tdtrong@tnmt.gov.vn',
          leaderPhone: '0988776655',
          technicalContact: 'Trung tâm CNTT Tài nguyên - 024.3768.xxxx',
          supportChannel: 'hotro.datdai@tnmt.gov.vn'
        },
        selection: { partB: true, partC: true },
        answers: {
          'A1': 0, 'A2': 0, 'A3': 0, 'A4': 0, 'A5': 0
        },
        evidences: {}
      },
      {
        id: '5782',
        userId: 'khanhvo12032000@gmail.com',
        createdAt: '2026-10-12T16:00:00.000Z',
        updatedAt: '2026-10-12T17:30:00.000Z',
        status: 'COMPLETED',
        complianceLevel: 'Tuân thủ một phần',
        scoreText: '38/60 câu "Có"',
        convertedScore: 63,
        dashboardRoute: '/dashboard1',
        formData: {
          fullName: 'Võ Quốc Khánh',
          role: 'Quản trị viên Hệ thống',
          email: 'khanhvo12032000@gmail.com',
          systemName: 'Hệ thống AI Phân loại & Phân luồng Tự động Khiếu nại Dịch vụ công',
          internalCode: 'AI-PAKN-03',
          version: 'v1.2',
          updatedDate: '2026-10-12',
          agencyName: 'Sở Khoa học và Công nghệ',
          legalBasis: 'Đề án 06 Chính phủ & QĐ 1290/QĐ-BTTTT',
          orgRole: 'Bên triển khai',
          riskLevel: 'Trung bình',
          riskLevelBasis: 'Phân loại ý kiến công dân, không tự động ra quyết định xử phạt',
          isInHighRiskList: 'Không',
          complianceAssessment: 'Đã thực hiện',
          purpose: 'Tự động đọc hiểu và gắn thẻ phân loại phản ánh kiến nghị của công dân',
          businessProblem: 'Tăng tốc độ chuyển tiếp ý kiến đến đúng phòng ban chuyên môn',
          domain: 'Hành chính',
          directUser: 'Cán bộ văn phòng Sở',
          decisionTarget: 'Công dân',
          vulnerableGroup: 'Mọi công dân',
          userCount: '5.000 phản ánh/tháng',
          deployScope: 'Toàn quốc',
          potentialImpact: 'Chuyển nhầm đơn vị xử lý dẫn đến chậm phản hồi',
          aiTechType: 'Xử lý ngôn ngữ tự nhiên (NLP/LLM)',
          developType: 'Nền tảng trí tuệ nhân tạo dùng chung',
          provider: 'Trung tâm Tin học',
          inputType: 'Văn bản phản ánh',
          inputSource: 'Cổng Dịch vụ công',
          hasPersonalData: 'Có',
          personalDataDesc: 'Số điện thoại, địa chỉ người phản ánh',
          outputType: 'Gợi ý đơn vị giải quyết',
          automationLevel: 'Gợi ý cho người dùng',
          managementUnit: 'Thanh tra Sở',
          leaderName: 'Lê Hoàng Nam',
          leaderRole: 'Chánh Thanh tra Sở',
          leaderEmail: 'lhnam@most.gov.vn',
          leaderPhone: '0903456789',
          technicalContact: 'Đầu mối CNTT - 024.3943.xxxx',
          supportChannel: 'thanhtra@most.gov.vn'
        },
        selection: { partB: true, partC: true },
        answers: {
          'A1': 0, 'A2': 0, 'A3': 0, 'A4': 0, 'A5': 0,
          'A6': 0, 'A7': 1, 'A8': 0, 'A9': 0, 'A10': 1,
          'A11': 1, 'A12': 1, 'A13': 1, 'A14': 0, 'A15': 1,
          'B1': 0, 'B2': 0, 'B3': 0, 'B4': 1, 'B5': 0, 'B6': 0, 'B7': 0, 'B8': 1, 'B9': 0,
          'C1.1': 0, 'C1.2': 0, 'C1.3': 1, 'C1.4': 1, 'C1.5': 0, 'C1.6': 0, 'C1.7': 1, 'C1.8': 1, 'C1.9': 0, 'C1.10': 0, 'C1.11': 0, 'C1.12': 1, 'C1.13': 0, 'C1.14': 0, 'C1.15': 1,
          'C2.1': 0, 'C2.2': 0, 'C2.3': 0, 'C2.4': 0, 'C2.5': 0, 'C2.6': 0, 'C2.7': 0, 'C2.8': 1, 'C2.9': 0, 'C2.10': 0, 'C2.11': 1, 'C2.12': 1, 'C2.13': 0, 'C2.14': 0, 'C2.15': 0,
          'C3.1': 0, 'C3.2': 0, 'C3.3': 1, 'C3.4': 0, 'C3.5': 0, 'C3.6': 0, 'C3.7': 1, 'C3.8': 1, 'C3.9': 1, 'C3.10': 0, 'C3.11': 1, 'C3.12': 1, 'C3.13': 0, 'C3.14': 1, 'C3.15': 0,
          'C4.1': 0, 'C4.2': 0, 'C4.3': 0, 'C4.4': 1, 'C4.5': 1, 'C4.6': 0, 'C4.7': 0, 'C4.8': 0, 'C4.9': 1, 'C4.10': 1, 'C4.11': 1, 'C4.12': 1, 'C4.13': 1, 'C4.14': 0, 'C4.15': 0,
          'D1': 0, 'D2': 0, 'D3': 1, 'D4': 0, 'D5': 0, 'D6': 1, 'D7': 0, 'D8': 0, 'D9': 1, 'D10': 0
        },
        evidences: {}
      }
    ];

    // Seed cho cả tài khoản khcn@gmail.com
    const seededList = [
      ...sampleAssessments,
      ...sampleAssessments.map(a => ({ ...a, id: (parseInt(a.id, 10) + 100).toString(), userId: 'khcn@gmail.com' }))
    ];
    localStorage.setItem('assessments', JSON.stringify(seededList));
  }
};

initDB();

// === XÁC THỰC ĐĂNG NHẬP ===
export const login = (username, password, role = 'MEMBER') => {
  if (role === 'ADMIN') {
    // Tài khoản Admin cứng
    if (username === 'admin' && password === 'admin123') {
      const user = { username: 'admin', role: 'ADMIN', name: 'Quản trị viên', agency: 'Cơ quan / Đơn vị' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    // Kiểm tra trong danh sách users xem có ai được cấp quyền ADMIN không
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const dbAdmin = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password && u.role === 'ADMIN');
    if (dbAdmin) {
      const adminUser = { ...dbAdmin, agency: dbAdmin.agency || 'Cơ quan / Đơn vị', name: dbAdmin.name || 'Quản trị viên' };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }
    return { success: false, message: 'Sai tài khoản hoặc mật khẩu Quản trị.' };
  }

  // Đăng nhập thành viên
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
  
  if (user) {
    const userName = user.name || user.username || 'Người dùng';
    const agencyName = user.agency || 'Cơ quan / Đơn vị';
    const loggedInUser = { 
      ...user, 
      name: userName,
      agency: agencyName,
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
  if (!userStr) return null;
  const user = JSON.parse(userStr);
  const name = user.role === 'ADMIN' 
    ? (user.name || 'Quản trị viên')
    : (user.name || user.username || 'Người dùng');
  const agency = user.role === 'ADMIN'
    ? 'Cơ quan / Đơn vị'
    : (user.agency || 'Cơ quan / Đơn vị');
  return {
    ...user,
    name,
    agency
  };
};

// === QUẢN LÝ THÀNH VIÊN (Dành cho Admin) ===
export const getAllUsers = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.map(u => ({
    ...u,
    agency: u.agency || u.name || '',
    name: u.name || u.agency || ''
  }));
};

export const createUser = ({ username, password, name, agency, phone, role = 'MEMBER' }) => {
  if (!username.includes('@') && role !== 'ADMIN') {
    return { success: false, message: 'Tên đăng nhập bắt buộc phải là địa chỉ Email.' };
  }
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { success: false, message: 'Tên đăng nhập này đã tồn tại trong hệ thống.' };
  }
  const finalAgency = (agency || '').trim();
  const finalName = (name || '').trim();
  users.push({ 
    username, 
    password, 
    name: finalName || finalAgency, 
    agency: finalAgency || finalName, 
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

// === QUẢN LÝ HỒ SƠ ĐÁNH GIÁ (Bản nháp & Đã đánh giá) ===
export const saveAssessment = (userId, data) => {
  const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
  let code = data.id;
  if (!code) {
    do {
      code = Math.floor(1000 + Math.random() * 9000).toString();
    } while (assessments.find(a => a.id === code));
  }

  const existingIdx = assessments.findIndex(a => a.id === code);
  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    assessments[existingIdx] = {
      ...assessments[existingIdx],
      ...data,
      id: code,
      userId,
      status: data.status || 'COMPLETED',
      updatedAt: now
    };
  } else {
    assessments.push({
      id: code,
      userId,
      createdAt: now,
      updatedAt: now,
      status: data.status || 'COMPLETED',
      ...data
    });
  }
  
  localStorage.setItem('assessments', JSON.stringify(assessments));
  return code;
};

export const saveDraftAssessment = (userId, data, draftId = null) => {
  return saveAssessment(userId, {
    ...data,
    id: draftId,
    status: 'DRAFT',
    isDraft: true
  });
};

export const updateAssessment = (id, updatedData) => {
  const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
  const idx = assessments.findIndex(a => a.id === id.toString());
  if (idx === -1) return { success: false, message: 'Hồ sơ không tồn tại' };

  assessments[idx] = {
    ...assessments[idx],
    ...updatedData,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem('assessments', JSON.stringify(assessments));
  return { success: true, assessment: assessments[idx] };
};

export const deleteAssessment = (id) => {
  let assessments = JSON.parse(localStorage.getItem('assessments')) || [];
  assessments = assessments.filter(a => a.id !== id.toString());
  localStorage.setItem('assessments', JSON.stringify(assessments));
  return { success: true };
};

export const getAssessmentById = (id) => {
  if (!id) return null;
  const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
  return assessments.find(a => a.id === id.toString()) || null;
};

export const getAssessmentsByUser = (userId) => {
  const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
  let list = assessments.filter(a => a.userId === userId || a.userId === 'khanhvo12032000@gmail.com' || a.userId === 'khcn@gmail.com');
  
  // Kiểm tra nếu có bản nháp chưa lưu mã từ LandingPage
  const localDraft = localStorage.getItem(`landing_formData_${userId}`);
  if (localDraft) {
    try {
      const parsedDraft = JSON.parse(localDraft);
      if (parsedDraft.systemName && !list.some(a => a.formData?.systemName === parsedDraft.systemName && a.status === 'DRAFT')) {
        list.unshift({
          id: 'DRAFT-ACTIVE',
          userId,
          status: 'DRAFT',
          isDraft: true,
          isLocalActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          formData: parsedDraft
        });
      }
    } catch (e) {
      // ignore
    }
  }

  return list.sort((a,b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
};

export const getAllAssessments = () => {
  const assessments = JSON.parse(localStorage.getItem('assessments')) || [];
  return assessments.sort((a,b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
};
