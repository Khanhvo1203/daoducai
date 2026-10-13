import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  FileText,
  CheckSquare,
  BarChart2,
  FileCheck,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Bell,
  User,
  ArrowRight,
  BookOpen,
  Layers,
  LogOut,
  RotateCcw,
  Building2,
  ShieldCheck,
  Check,
  Download,
  BrainCircuit,
  Sliders,
  TrendingUp,
  PieChart
} from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Tất cả menu mở mặc định theo đúng mẫu thiết kế
  const [expandedMenus, setExpandedMenus] = useState({
    admin: true,
    systemInfo: true,
    ethicsAssessment: true,
    weightAssessment: true,
    reports: true,
    help: true
  });

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDownloadUnesco = (e) => {
    if (e) e.stopPropagation();
    const link = document.createElement('a');
    link.href = '/Khung_dao_duc_Unesco.xlsx';
    link.download = 'Khung_dao_duc_Unesco.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4 tính năng panel phải banner
  const bannerFeatures = [
    { label: 'Đơn giản', icon: CheckSquare },
    { label: 'Thực tiễn', icon: RotateCcw },
    { label: 'Phù hợp SME', icon: Building2 },
    { label: 'Bám sát Thông tư 05', icon: ShieldCheck }
  ];

  // 6 phân hệ chức năng chính
  const featureCards = [
    {
      num: 1,
      badgeColor: '#1d68e1',
      iconBg: '#e8f1fc',
      iconColor: '#1d68e1',
      icon: Users,
      title: '1. Quản trị hệ thống',
      desc: 'Quản lý người dùng, đơn vị, phân quyền và cấu hình hệ thống',
      bullets: [
        'Quản lý thông tin người dùng',
        'Phân quyền và vai trò',
        'Nhật ký hoạt động'
      ],
      link: '/admin'
    },
    {
      num: 2,
      badgeColor: '#059669',
      iconBg: '#e6f7f2',
      iconColor: '#059669',
      icon: FileText,
      title: '2. Thông tin hệ thống AI',
      desc: 'Khai báo, cập nhật thông tin, phân loại mức độ rủi ro của hệ thống AI',
      bullets: [
        'Khai báo hệ thống AI',
        'Mô tả hệ thống AI',
        'Phân loại mức độ rủi ro'
      ],
      link: '/ho-so-dang-ky'
    },
    {
      num: 3,
      badgeColor: '#7c3aed',
      iconBg: '#f3e8ff',
      iconColor: '#7c3aed',
      icon: CheckSquare,
      title: '3. Đánh giá đạo đức',
      desc: 'Tự đánh giá theo 4 nguyên tắc đạo đức, điều kiện quản trị và giám sát sau triển khai',
      bullets: [
        'Điều kiện quản trị (cắt ngang)',
        'Đánh giá theo 4 nguyên tắc',
        'Giám sát sau triển khai (cắt ngang)'
      ],
      link: '/assessment1'
    },
    {
      num: 4,
      badgeColor: '#ea580c',
      iconBg: '#fef3c7',
      iconColor: '#ea580c',
      icon: BarChart2,
      title: '4. Đánh giá theo trọng số',
      desc: 'Thực hiện đánh trọng số và xem kết quả tuân thủ kèm khuyến nghị',
      bullets: [
        'Thực hiện đánh trọng số',
        'Kết quả tuân thủ trọng số',
        'Khuyến nghị cải thiện'
      ],
      link: '/assessment2'
    },
    {
      num: 5,
      badgeColor: '#e11d48',
      iconBg: '#ffe4e6',
      iconColor: '#e11d48',
      icon: FileCheck,
      title: '5. Báo cáo tự đánh giá',
      desc: 'Xuất báo cáo chi tiết và tổng hợp phục vụ lưu trữ, báo cáo',
      bullets: [
        'Báo cáo chi tiết tự đánh giá',
        'Báo cáo kết quả tổng hợp',
        'Xuất file (PDF, Word, Excel)'
      ],
      link: '/dashboard1'
    },
    {
      num: 6,
      badgeColor: '#475569',
      iconBg: '#f1f5f9',
      iconColor: '#475569',
      icon: BookOpen,
      title: '6. Trợ giúp',
      desc: 'Tài liệu hướng dẫn, công cụ tham khảo và hỗ trợ trong quá trình đánh giá',
      bullets: [
        'Hướng dẫn sử dụng',
        'Tài liệu tham khảo (UNESCO, ASEAN, ...)',
        'Câu hỏi thường gặp'
      ],
      link: '/ho-so-dang-ky'
    }
  ];

  return (
    <div className="home-dashboard-layout">
      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="home-sidebar">
        {/* Brand: Logo Trí tuệ nhân tạo Brain Circuit */}
        <div className="sidebar-brand">
          <div className="brand-logo-container">
            <BrainCircuit size={28} className="brand-brain-icon" strokeWidth={1.8} />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-menu">
          {/* Trang chủ */}
          <div className="sidebar-menu-item active" onClick={() => navigate('/')}>
            <div className="menu-item-content">
              <Home size={16} className="menu-icon" />
              <span>Trang chủ</span>
            </div>
          </div>

          {/* 1. Quản trị hệ thống */}
          <div className="sidebar-group">
            <div
              className={`sidebar-menu-item parent ${expandedMenus.admin ? 'expanded' : ''}`}
              onClick={() => toggleMenu('admin')}
            >
              <div className="menu-item-content">
                <Users size={16} className="menu-icon" />
                <span>1. Quản trị hệ thống</span>
              </div>
              <ChevronUp size={14} className={`chevron-arrow ${expandedMenus.admin ? '' : 'chevron-rotated'}`} />
            </div>
            {expandedMenus.admin && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/admin')}>Quản lý người dùng</div>
                <div className="submenu-item" onClick={() => navigate('/admin')}>Quản lý đơn vị</div>
                <div className="submenu-item" onClick={() => navigate('/admin')}>Phân quyền</div>
                <div className="submenu-item" onClick={() => navigate('/admin')}>Nhật ký hoạt động</div>
                <div className="submenu-item" onClick={() => navigate('/admin')}>Cấu hình hệ thống</div>
              </div>
            )}
          </div>

          {/* 2. Thông tin hệ thống AI */}
          <div className="sidebar-group">
            <div
              className={`sidebar-menu-item parent ${expandedMenus.systemInfo ? 'expanded' : ''}`}
              onClick={() => toggleMenu('systemInfo')}
            >
              <div className="menu-item-content">
                <FileText size={16} className="menu-icon" />
                <span>2. Thông tin hệ thống AI</span>
              </div>
              <ChevronUp size={14} className={`chevron-arrow ${expandedMenus.systemInfo ? '' : 'chevron-rotated'}`} />
            </div>
            {expandedMenus.systemInfo && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/history')}>Danh sách hệ thống AI</div>
                <div className="submenu-item highlighted" onClick={() => navigate('/ho-so-dang-ky')}>Khai báo hệ thống AI</div>
                <div className="submenu-item" onClick={() => navigate('/ho-so-dang-ky')}>Cập nhật thông tin</div>
                <div className="submenu-item" onClick={() => navigate('/ho-so-dang-ky')}>Phân loại mức độ rủi ro</div>
              </div>
            )}
          </div>

          {/* 3. Đánh giá đạo đức */}
          <div className="sidebar-group">
            <div
              className={`sidebar-menu-item parent ${expandedMenus.ethicsAssessment ? 'expanded' : ''}`}
              onClick={() => toggleMenu('ethicsAssessment')}
            >
              <div className="menu-item-content">
                <CheckSquare size={16} className="menu-icon" />
                <span>3. Đánh giá đạo đức</span>
              </div>
              <ChevronUp size={14} className={`chevron-arrow ${expandedMenus.ethicsAssessment ? '' : 'chevron-rotated'}`} />
            </div>
            {expandedMenus.ethicsAssessment && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/assessment1')}>Điều kiện quản trị (A/B)</div>
                <div className="submenu-item" onClick={() => navigate('/assessment1')}>Đánh giá theo 4 nguyên tắc</div>
                <div className="submenu-item" onClick={() => navigate('/assessment1')}>Giám sát sau triển khai</div>
              </div>
            )}
          </div>

          {/* 4. Đánh giá theo trọng số */}
          <div className="sidebar-group">
            <div
              className={`sidebar-menu-item parent ${expandedMenus.weightAssessment ? 'expanded' : ''}`}
              onClick={() => toggleMenu('weightAssessment')}
            >
              <div className="menu-item-content">
                <BarChart2 size={16} className="menu-icon" />
                <span>4. Đánh giá theo trọng số</span>
              </div>
              <ChevronUp size={14} className={`chevron-arrow ${expandedMenus.weightAssessment ? '' : 'chevron-rotated'}`} />
            </div>
            {expandedMenus.weightAssessment && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/assessment2')}>Thực hiện đánh trọng số</div>
                <div className="submenu-item" onClick={() => navigate('/dashboard2')}>Kết quả tuân thủ trọng số</div>
                <div className="submenu-item" onClick={() => navigate('/dashboard2')}>Khuyến nghị cải thiện</div>
              </div>
            )}
          </div>

          {/* 5. Báo cáo tự đánh giá */}
          <div className="sidebar-group">
            <div
              className={`sidebar-menu-item parent ${expandedMenus.reports ? 'expanded' : ''}`}
              onClick={() => toggleMenu('reports')}
            >
              <div className="menu-item-content">
                <FileCheck size={16} className="menu-icon" />
                <span>5. Báo cáo tự đánh giá</span>
              </div>
              <ChevronUp size={14} className={`chevron-arrow ${expandedMenus.reports ? '' : 'chevron-rotated'}`} />
            </div>
            {expandedMenus.reports && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/dashboard1')}>Báo cáo chi tiết</div>
                <div className="submenu-item" onClick={() => navigate('/dashboard1')}>Báo cáo kết quả tổng hợp</div>
                <div className="submenu-item" onClick={() => navigate('/dashboard1')}>Xuất báo cáo</div>
              </div>
            )}
          </div>

          {/* 6. Trợ giúp */}
          <div className="sidebar-group">
            <div
              className={`sidebar-menu-item parent ${expandedMenus.help ? 'expanded' : ''}`}
              onClick={() => toggleMenu('help')}
            >
              <div className="menu-item-content">
                <HelpCircle size={16} className="menu-icon" />
                <span>6. Trợ giúp</span>
              </div>
              <ChevronUp size={14} className={`chevron-arrow ${expandedMenus.help ? '' : 'chevron-rotated'}`} />
            </div>
            {expandedMenus.help && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/ho-so-dang-ky')}>Hướng dẫn sử dụng</div>
                <div className="submenu-item" onClick={() => window.open('https://unesdoc.unesco.org', '_blank')}>Tài liệu tham khảo</div>
                <div
                  className="submenu-item"
                  onClick={handleDownloadUnesco}
                  title="Nhấp để tải về file Excel biểu mẫu đánh giá của UNESCO"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <span>Công cụ quốc tế (UNESCO, ...)</span>
                  <Download size={12} style={{ opacity: 0.7, flexShrink: 0 }} />
                </div>
                <div className="submenu-item" onClick={() => navigate('/ho-so-dang-ky')}>Câu hỏi thường gặp (FAQ)</div>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="home-main-container">
        {/* Top Header Bar */}
        <header className="home-topbar">
          <div className="topbar-left">
            <h2 className="portal-main-heading">CÔNG CỤ TỰ ĐÁNH GIÁ ĐẠO ĐỨC HỆ THỐNG AI</h2>
            <span className="beta-tag">Phiên bản beta</span>
          </div>

          <div className="topbar-right">
            <div className="notification-bell-btn" title="Thông báo hệ thống">
              <Bell size={18} />
              <span className="notification-badge">1</span>
            </div>

            <div className="user-profile-anchor" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <div className="user-avatar-circle">
                <User size={18} />
              </div>
              <div className="user-meta-info">
                <div className="user-fullname">
                  {currentUser?.role === 'ADMIN'
                    ? (currentUser.name || 'Quản trị viên')
                    : (currentUser ? (currentUser.name || currentUser.username) : 'Nguyễn Văn A')}
                </div>
                <div className="user-org-name">
                  {currentUser?.role === 'ADMIN'
                    ? 'Cơ quan/Đơn vị'
                    : (currentUser ? (currentUser.agency || 'Cơ quan/Đơn vị') : 'Cơ quan/Đơn vị')}
                  <ChevronDown size={12} style={{ marginLeft: 3, verticalAlign: 'middle' }} />
                </div>
              </div>

              {showUserDropdown && (
                <div className="user-menu-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="dropdown-item" onClick={() => { setShowUserDropdown(false); navigate('/profile'); }}>
                    <User size={14} /> Thông tin tài khoản
                  </div>
                  <div className="dropdown-item" onClick={() => { setShowUserDropdown(false); navigate('/history'); }}>
                    <Layers size={14} /> Lịch sử đánh giá
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item danger" onClick={() => { setShowUserDropdown(false); handleLogout(); }}>
                    <LogOut size={14} /> Đăng xuất
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Body Viewport */}
        <div className="home-body-viewport">

          {/* ===== 1. HERO BANNER ===== */}
          <div
            className="home-hero-banner"
            onClick={() => navigate('/ho-so-dang-ky')}
            title="Nhấp để bắt đầu đánh giá"
          >
            {/* Overlay gradient trái */}
            <div className="home-banner-overlay-left" />

            {/* Nội dung trái */}
            <div className="home-banner-left-content">
              <h1 className="home-banner-heading">
                <span>CÔNG CỤ TỰ ĐÁNH GIÁ</span>
                <span>ĐẠO ĐỨC HỆ THỐNG AI</span>
              </h1>
              <p className="home-banner-subtext">
                Hỗ trợ tổ chức đánh giá mức độ tuân thủ Khung đạo đức trí tuệ nhân tạo quốc gia theo Thông tư 05/2026/TT-BKHCN
              </p>
              <button
                type="button"
                className="home-banner-cta-btn"
                onClick={(e) => { e.stopPropagation(); navigate('/ho-so-dang-ky'); }}
              >
                BẮT ĐẦU ĐÁNH GIÁ <ArrowRight size={15} strokeWidth={2.5} />
              </button>
            </div>

            {/* Panel phải: 4 tính năng */}
            <div className="home-banner-right-panel">
              {bannerFeatures.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <div key={idx} className="banner-feature-item">
                    <div className="banner-feature-left">
                      <FeatIcon size={14} className="banner-feat-icon" />
                      <span className="banner-feat-text">{feat.label}</span>
                    </div>
                    <Check size={14} strokeWidth={2.8} className="banner-feat-check" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ===== 2. CÁC PHÂN HỆ CHỨC NĂNG CHÍNH ===== */}
          <section className="feature-section-viewport">
            <h3 className="section-title-compact">Các phân hệ chức năng chính</h3>

            <div className="feature-cards-grid-compact">
              {featureCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.num}
                    className="feature-card-compact"
                    onClick={() => navigate(card.link)}
                  >
                    {/* Top: Badge + Tiêu đề + Mô tả */}
                    <div className="card-top-row">
                      <div
                        className="card-num-circle-sm"
                        style={{ backgroundColor: card.badgeColor }}
                      >
                        {card.num}
                      </div>
                      <div className="card-heading-box">
                        <h4 className="card-title-sm">{card.title}</h4>
                        <p className="card-desc-sm" title={card.desc}>{card.desc}</p>
                      </div>
                    </div>

                    {/* Body: Icon + Bullets + Arrow */}
                    <div className="card-body-row">
                      <div
                        className="card-icon-box-sm"
                        style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                      >
                        <IconComponent size={20} strokeWidth={2.2} />
                      </div>

                      <ul className="card-bullets-list-sm">
                        {card.bullets.map((item, bIdx) => (
                          <li key={bIdx}>
                            <span className="bullet-dot">•</span>
                            <span className="bullet-text">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="card-arrow-sm">
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ===== 3. HÌNH ẢNH MINH HỌA MỘT SỐ CHỨC NĂNG CHÍNH ===== */}
          <section className="screenshots-section-viewport">
            <h3 className="section-title-compact">Hình ảnh minh họa một số chức năng chính</h3>

            <div className="screenshots-grid-container">
              {/* Item 1: Khai báo hệ thống AI (Phân hệ 2) */}
              <div className="screenshot-card-item" onClick={() => navigate('/ho-so-dang-ky')}>
                <div className="screenshot-preview-box mini-screen-1">
                  <div className="mini-sidebar-preview">
                    <div className="mini-sidebar-dot" />
                    <div className="mini-sidebar-line active" />
                    <div className="mini-sidebar-line" />
                    <div className="mini-sidebar-line" />
                  </div>
                  <div className="mini-content-preview">
                    <div className="mini-header-text">Khai báo hệ thống AI</div>
                    <div className="mini-form-field">
                      <span className="mini-field-label">Tên hệ thống</span>
                      <div className="mini-input-bar">Trợ lý ảo Hành chính</div>
                    </div>
                    <div className="mini-form-field">
                      <span className="mini-field-label">Loại công nghệ</span>
                      <div className="mini-input-bar">Mô hình ngôn ngữ lớn (LLM)</div>
                    </div>
                    <div className="mini-form-field">
                      <span className="mini-field-label">Mục đích chính</span>
                      <div className="mini-input-bar">Tự động trả lời thủ tục dịch vụ công</div>
                    </div>
                    <div className="mini-btn-submit">Tiếp tục →</div>
                  </div>
                </div>
                <div className="screenshot-card-label">
                  <span className="sc-title">Khai báo hệ thống AI</span>
                  <span className="sc-sub">(Phân hệ 2)</span>
                </div>
              </div>

              {/* Item 2: Đánh giá đạo đức theo 4 nguyên tắc (Phân hệ 3) */}
              <div className="screenshot-card-item" onClick={() => navigate('/assessment1')}>
                <div className="screenshot-preview-box mini-screen-2">
                  <div className="mini-table-header">
                    <span>Đánh giá đạo đức theo 4 nguyên tắc</span>
                    <div className="mini-filter-badge">Thông tư 05</div>
                  </div>
                  <div className="mini-table-content">
                    <div className="mini-table-row header">
                      <span>Mã</span>
                      <span>Nội dung kiểm tra</span>
                      <span>Kết quả</span>
                    </div>
                    <div className="mini-table-row">
                      <span className="q-tag">C1.1</span>
                      <span className="q-desc">Kiểm soát rủi ro an toàn</span>
                      <span className="q-status pass">Có</span>
                    </div>
                    <div className="mini-table-row">
                      <span className="q-tag">C1.2</span>
                      <span className="q-desc">Kiểm thử xâm nhập độc lập</span>
                      <span className="q-status pass">Có</span>
                    </div>
                    <div className="mini-table-row">
                      <span className="q-tag">C2.1</span>
                      <span className="q-desc">Quyền can thiệp của con người</span>
                      <span className="q-status pass">Có</span>
                    </div>
                    <div className="mini-table-row">
                      <span className="q-tag">C3.4</span>
                      <span className="q-desc">Tôn trọng văn hóa bản sắc</span>
                      <span className="q-status pending">Đang làm</span>
                    </div>
                  </div>
                </div>
                <div className="screenshot-card-label">
                  <span className="sc-title">Đánh giá đạo đức theo 4 nguyên tắc</span>
                  <span className="sc-sub">(Phân hệ 3)</span>
                </div>
              </div>

              {/* Item 3: Thực hiện đánh trọng số (Phân hệ 4 - Màn hình 1) */}
              <div className="screenshot-card-item" onClick={() => navigate('/assessment2')}>
                <div className="screenshot-preview-box mini-screen-3">
                  <div className="mini-weight-header">
                    <span>Thực hiện đánh trọng số</span>
                    <span className="mini-weight-chip">Tổng: 100%</span>
                  </div>
                  <div className="mini-weight-rows">
                    <div className="mini-w-row">
                      <span className="w-label">C1. An toàn & Tin cậy</span>
                      <div className="w-bar-bg"><div className="w-bar-fill" style={{ width: '40%' }}></div></div>
                      <span className="w-val">40.0%</span>
                    </div>
                    <div className="mini-w-row">
                      <span className="w-label">C2. Quyền con người</span>
                      <div className="w-bar-bg"><div className="w-bar-fill" style={{ width: '25%' }}></div></div>
                      <span className="w-val">25.0%</span>
                    </div>
                    <div className="mini-w-row">
                      <span className="w-label">C3. Bền vững & Bao trùm</span>
                      <div className="w-bar-bg"><div className="w-bar-fill" style={{ width: '20%' }}></div></div>
                      <span className="w-val">20.0%</span>
                    </div>
                    <div className="mini-w-row">
                      <span className="w-label">C4. Đổi mới trách nhiệm</span>
                      <div className="w-bar-bg"><div className="w-bar-fill" style={{ width: '15%' }}></div></div>
                      <span className="w-val">15.0%</span>
                    </div>
                  </div>
                  <div className="mini-w-footer">
                    <span className="w-calc-btn">Áp dụng trọng số</span>
                  </div>
                </div>
                <div className="screenshot-card-label">
                  <span className="sc-title">Thực hiện đánh trọng số</span>
                  <span className="sc-sub">(Phân hệ 4 - Màn hình 1)</span>
                </div>
              </div>

              {/* Item 4: Kết quả tuân thủ và khuyến nghị (Phân hệ 4 - Màn hình 2) */}
              <div className="screenshot-card-item" onClick={() => navigate('/dashboard2')}>
                <div className="screenshot-preview-box mini-screen-4">
                  <div className="mini-kpi-row">
                    <div className="mini-kpi-badge success">
                      <span className="kpi-num">68,00</span>
                      <span className="kpi-unit">/100</span>
                      <span className="kpi-tag">Tuân thủ Khá</span>
                    </div>
                    <div className="mini-kpi-badge primary">
                      <span className="kpi-num">65,00</span>
                      <span className="kpi-unit">/100</span>
                      <span className="kpi-tag">Điểm cơ sở</span>
                    </div>
                    <div className="mini-kpi-badge warning">
                      <span className="kpi-num">32,00</span>
                      <span className="kpi-unit">/100</span>
                      <span className="kpi-tag">Độ chênh</span>
                    </div>
                  </div>
                  <div className="mini-bars-area">
                    <div className="mini-bar-col">
                      <div className="bar-fill-v" style={{ height: '75%' }}></div>
                      <span>C1</span>
                    </div>
                    <div className="mini-bar-col">
                      <div className="bar-fill-v" style={{ height: '60%' }}></div>
                      <span>C2</span>
                    </div>
                    <div className="mini-bar-col">
                      <div className="bar-fill-v" style={{ height: '80%' }}></div>
                      <span>C3</span>
                    </div>
                    <div className="mini-bar-col">
                      <div className="bar-fill-v" style={{ height: '55%' }}></div>
                      <span>C4</span>
                    </div>
                    <div className="mini-bar-col">
                      <div className="bar-fill-v" style={{ height: '70%', background: '#2563eb' }}></div>
                      <span>Tổng</span>
                    </div>
                  </div>
                </div>
                <div className="screenshot-card-label">
                  <span className="sc-title">Kết quả tuân thủ và khuyến nghị</span>
                  <span className="sc-sub">(Phân hệ 4 - Màn hình 2)</span>
                </div>
              </div>

              {/* Item 5: Báo cáo tổng hợp (Phân hệ 5) */}
              <div className="screenshot-card-item" onClick={() => navigate('/dashboard1')}>
                <div className="screenshot-preview-box mini-screen-5">
                  <div className="mini-report-layout">
                    <div className="mini-report-left-items">
                      <div className="r-item-check active">Hồ sơ kê khai</div>
                      <div className="r-item-check active">Phân loại rủi ro</div>
                      <div className="r-item-check active">4 Nguyên tắc</div>
                      <div className="r-item-check active">Kế hoạch giám sát</div>
                    </div>
                    <div className="mini-report-right-chart">
                      <div className="mini-donut-wrapper">
                        <svg viewBox="0 0 36 36" className="mini-donut-svg">
                          <circle cx="18" cy="18" r="14" fill="#fff" stroke="#e2e8f0" strokeWidth="4" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="50 100" strokeDashoffset="25" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="75" />
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="5" />
                        </svg>
                        <div className="mini-donut-hole">75%</div>
                      </div>
                      <div className="mini-report-meta">Báo cáo chuẩn hóa Thông tư 05</div>
                    </div>
                  </div>
                </div>
                <div className="screenshot-card-label">
                  <span className="sc-title">Báo cáo tổng hợp</span>
                  <span className="sc-sub">(Phân hệ 5)</span>
                </div>
              </div>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default HomePage;

