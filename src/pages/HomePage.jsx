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
  Bell, 
  User, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  Cpu, 
  LogOut,
  RotateCcw,
  Building2,
  ShieldCheck,
  Check
} from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Accordion state for sidebar sub-menus
  const [expandedMenus, setExpandedMenus] = useState({
    admin: false,
    systemInfo: true,
    ethicsAssessment: false,
    weightAssessment: false,
    reports: false,
    help: false
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

  // 4 Features on Banner matching mockup
  const bannerFeatures = [
    { label: 'Đơn giản', icon: CheckSquare },
    { label: 'Thực tiễn', icon: RotateCcw },
    { label: 'Phù hợp SME', icon: Building2 },
    { label: 'Bám sát Thông tư 05', icon: ShieldCheck }
  ];

  // 6 Feature Cards matching the mockup design
  const featureCards = [
    {
      num: 1,
      badgeColor: '#2563eb', // Blue
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
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
      badgeColor: '#059669', // Emerald Green
      iconBg: '#ecfdf5',
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
      badgeColor: '#7c3aed', // Purple
      iconBg: '#f5f3ff',
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
      badgeColor: '#ea580c', // Orange/Amber
      iconBg: '#fff7ed',
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
      badgeColor: '#e11d48', // Red / Rose
      iconBg: '#fff1f2',
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
      badgeColor: '#475569', // Slate
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
      {/* ========================================================
          LEFT SIDEBAR (Dark Navy)
          ======================================================== */}
      <aside className="home-sidebar">
        {/* Brand Logo */}
        <div className="sidebar-brand">
          <div className="brand-logo-glow">
            <Cpu size={22} className="text-cyan-400" />
          </div>
          <span className="brand-title">AI ETHICS PORTAL</span>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-menu">
          {/* Trang chủ (Active) */}
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
              <ChevronDown size={14} className={`chevron-arrow ${expandedMenus.admin ? 'rotated' : ''}`} />
            </div>
            {expandedMenus.admin && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/admin')}>
                  Quản lý người dùng
                </div>
                <div className="submenu-item" onClick={() => navigate('/admin')}>
                  Quản lý đơn vị
                </div>
                <div className="submenu-item" onClick={() => navigate('/admin')}>
                  Phân quyền
                </div>
                <div className="submenu-item" onClick={() => navigate('/admin')}>
                  Nhật ký hoạt động
                </div>
                <div className="submenu-item" onClick={() => navigate('/admin')}>
                  Cấu hình hệ thống
                </div>
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
              <ChevronDown size={14} className={`chevron-arrow ${expandedMenus.systemInfo ? 'rotated' : ''}`} />
            </div>
            {expandedMenus.systemInfo && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/history')}>
                  Danh sách hệ thống AI
                </div>
                <div className="submenu-item highlighted" onClick={() => navigate('/ho-so-dang-ky')}>
                  Khai báo hệ thống AI
                </div>
                <div className="submenu-item" onClick={() => navigate('/ho-so-dang-ky')}>
                  Cập nhật thông tin
                </div>
                <div className="submenu-item" onClick={() => navigate('/ho-so-dang-ky')}>
                  Phân loại mức độ rủi ro
                </div>
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
              <ChevronDown size={14} className={`chevron-arrow ${expandedMenus.ethicsAssessment ? 'rotated' : ''}`} />
            </div>
            {expandedMenus.ethicsAssessment && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/assessment1')}>
                  Điều kiện quản trị (A/B)
                </div>
                <div className="submenu-item" onClick={() => navigate('/assessment1')}>
                  Đánh giá theo 4 nguyên tắc
                </div>
                <div className="submenu-item" onClick={() => navigate('/assessment1')}>
                  Giám sát sau triển khai
                </div>
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
              <ChevronDown size={14} className={`chevron-arrow ${expandedMenus.weightAssessment ? 'rotated' : ''}`} />
            </div>
            {expandedMenus.weightAssessment && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/assessment2')}>
                  Thực hiện đánh trọng số
                </div>
                <div className="submenu-item" onClick={() => navigate('/dashboard2')}>
                  Kết quả tuân thủ trọng số
                </div>
                <div className="submenu-item" onClick={() => navigate('/dashboard2')}>
                  Khuyến nghị cải thiện
                </div>
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
              <ChevronDown size={14} className={`chevron-arrow ${expandedMenus.reports ? 'rotated' : ''}`} />
            </div>
            {expandedMenus.reports && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/dashboard1')}>
                  Báo cáo chi tiết
                </div>
                <div className="submenu-item" onClick={() => navigate('/dashboard1')}>
                  Báo cáo kết quả tổng hợp
                </div>
                <div className="submenu-item" onClick={() => navigate('/dashboard1')}>
                  Xuất báo cáo
                </div>
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
              <ChevronDown size={14} className={`chevron-arrow ${expandedMenus.help ? 'rotated' : ''}`} />
            </div>
            {expandedMenus.help && (
              <div className="sidebar-submenu">
                <div className="submenu-item" onClick={() => navigate('/ho-so-dang-ky')}>
                  Hướng dẫn sử dụng
                </div>
                <div className="submenu-item" onClick={() => window.open('https://unesdoc.unesco.org', '_blank')}>
                  Tài liệu tham khảo
                </div>
                <div className="submenu-item" onClick={() => window.open('https://asean.org', '_blank')}>
                  Công cụ quốc tế (UNESCO, ...)
                </div>
                <div className="submenu-item" onClick={() => navigate('/ho-so-dang-ky')}>
                  Câu hỏi thường gặp (FAQ)
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* ========================================================
          MAIN CONTENT AREA (Single Viewport - 100vh)
          ======================================================== */}
      <div className="home-main-container">
        {/* Top Header Bar */}
        <header className="home-topbar">
          <div className="topbar-left">
            <h2 className="portal-main-heading">CÔNG CỤ TỰ ĐÁNH GIÁ ĐẠO ĐỨC HỆ THỐNG AI</h2>
            <span className="beta-tag">Phiên bản beta</span>
          </div>

          <div className="topbar-right">
            {/* Notification Bell */}
            <div className="notification-bell-btn" title="Thông báo hệ thống">
              <Bell size={18} />
              <span className="notification-badge">1</span>
            </div>

            {/* User Profile */}
            <div className="user-profile-anchor" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <div className="user-avatar-circle">
                <User size={16} />
              </div>
              <div className="user-meta-info">
                <div className="user-fullname">{currentUser ? (currentUser.name || currentUser.username) : 'Nguyễn Văn A'}</div>
                <div className="user-org-name">{currentUser ? (currentUser.agency || 'Cơ quan / Đơn vị') : 'Cơ quan/Đơn vị'}</div>
              </div>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="user-menu-dropdown">
                  <div className="dropdown-item" onClick={() => navigate('/profile')}>
                    <User size={14} /> Thông tin tài khoản
                  </div>
                  <div className="dropdown-item" onClick={() => navigate('/history')}>
                    <Layers size={14} /> Lịch sử đánh giá
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item danger" onClick={handleLogout}>
                    <LogOut size={14} /> Đăng xuất
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Viewport Fitted Content (Strictly fitted without scrolling) */}
        <div className="home-body-viewport">
          {/* ========================================================
              HERO BANNER (Pixel-perfect matching user provided graphic)
              ======================================================== */}
          <div 
            className="home-hero-banner" 
            onClick={() => navigate('/ho-so-dang-ky')}
            title="Nhấp để bắt đầu đánh giá"
          >
            {/* Left dark gradient scrim for maximum text contrast */}
            <div className="home-banner-overlay-left" />

            {/* Left Main Content */}
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
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/ho-so-dang-ky');
                }}
              >
                BẮT ĐẦU ĐÁNH GIÁ <ArrowRight size={14} strokeWidth={2.4} />
              </button>
            </div>

            {/* Right Features Panel matching mockup */}
            <div className="home-banner-right-panel">
              {bannerFeatures.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <div key={idx} className="banner-feature-item">
                    <div className="banner-feature-left">
                      <FeatIcon size={14} className="banner-feat-icon" />
                      <span className="banner-feat-text">{feat.label}</span>
                    </div>
                    <Check size={14} strokeWidth={2.6} className="banner-feat-check" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              FEATURE MODULE CARDS (3 Columns x 2 Rows Grid)
              ======================================================== */}
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
                    {/* Card Top: Number badge + Title + Subtitle */}
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

                    {/* Card Body: Icon (left) + 3 Bullets (center) + Arrow (right) */}
                    <div className="card-body-row">
                      <div 
                        className="card-icon-box-sm"
                        style={{ 
                          backgroundColor: card.iconBg, 
                          color: card.iconColor 
                        }}
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
                        <ArrowRight size={14} strokeWidth={2.4} />
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
