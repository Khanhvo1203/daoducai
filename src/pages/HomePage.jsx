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
  BrainCircuit
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
                      <div className="card-left-col">
                        <div
                          className="card-num-circle-sm"
                          style={{ backgroundColor: card.badgeColor }}
                        >
                          {card.num}
                        </div>
                      </div>
                      <div className="card-heading-box">
                        <h4 className="card-title-sm">{card.title}</h4>
                        <p className="card-desc-sm" title={card.desc}>{card.desc}</p>
                      </div>
                    </div>

                    {/* Body: Icon + Bullets + Arrow */}
                    <div className="card-body-row">
                      <div className="card-left-col">
                        <div
                          className="card-icon-box-sm"
                          style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                        >
                          <IconComponent size={24} strokeWidth={2.3} />
                        </div>
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
                        <ArrowRight size={15} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default HomePage;

