import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Home,
  FileText, 
  CheckSquare, 
  BarChart2, 
  FileCheck, 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Bell, 
  User, 
  ArrowRight, 
  BookOpen, 
  Shield, 
  Zap, 
  Building2, 
  Layers, 
  Cpu, 
  LogOut,
  Sparkles,
  Check
} from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Accordion state for sidebar sub-menus
  const [expandedMenus, setExpandedMenus] = useState({
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

  // 5 Feature Cards (Excluding Quản trị hệ thống as requested)
  const featureCards = [
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
      badgeColor: '#e11d48', // Rose / Red
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
            <Cpu size={26} className="text-cyan-400" />
          </div>
          <span className="brand-title">AI ETHICS PORTAL</span>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-menu">
          {/* 1. Trang chủ (Active) */}
          <div className="sidebar-menu-item active" onClick={() => navigate('/')}>
            <div className="menu-item-content">
              <Home size={18} className="menu-icon" />
              <span>Trang chủ</span>
            </div>
          </div>

          {/* 2. Thông tin hệ thống AI */}
          <div className="sidebar-group">
            <div 
              className={`sidebar-menu-item parent ${expandedMenus.systemInfo ? 'expanded' : ''}`}
              onClick={() => toggleMenu('systemInfo')}
            >
              <div className="menu-item-content">
                <FileText size={18} className="menu-icon" />
                <span>2. Thông tin hệ thống AI</span>
              </div>
              <ChevronDown size={15} className={`chevron-arrow ${expandedMenus.systemInfo ? 'rotated' : ''}`} />
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
                <CheckSquare size={18} className="menu-icon" />
                <span>3. Đánh giá đạo đức</span>
              </div>
              <ChevronDown size={15} className={`chevron-arrow ${expandedMenus.ethicsAssessment ? 'rotated' : ''}`} />
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
                <BarChart2 size={18} className="menu-icon" />
                <span>4. Đánh giá theo trọng số</span>
              </div>
              <ChevronDown size={15} className={`chevron-arrow ${expandedMenus.weightAssessment ? 'rotated' : ''}`} />
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
                <FileCheck size={18} className="menu-icon" />
                <span>5. Báo cáo tự đánh giá</span>
              </div>
              <ChevronDown size={15} className={`chevron-arrow ${expandedMenus.reports ? 'rotated' : ''}`} />
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
                <HelpCircle size={18} className="menu-icon" />
                <span>6. Trợ giúp</span>
              </div>
              <ChevronDown size={15} className={`chevron-arrow ${expandedMenus.help ? 'rotated' : ''}`} />
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
          MAIN CONTENT AREA (Header + Banner + Features Grid)
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
              <Bell size={20} />
              <span className="notification-badge">1</span>
            </div>

            {/* User Profile */}
            <div className="user-profile-anchor" onClick={() => setShowUserDropdown(!showUserDropdown)}>
              <div className="user-avatar-circle">
                <User size={18} />
              </div>
              <div className="user-meta-info">
                <div className="user-fullname">{currentUser ? (currentUser.name || currentUser.username) : 'Nguyễn Văn A'}</div>
                <div className="user-org-name">{currentUser ? (currentUser.agency || 'Cơ quan / Đơn vị') : 'Cơ quan/Đơn vị'}</div>
              </div>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="user-menu-dropdown">
                  <div className="dropdown-item" onClick={() => navigate('/profile')}>
                    <User size={15} /> Thông tin tài khoản
                  </div>
                  <div className="dropdown-item" onClick={() => navigate('/history')}>
                    <Layers size={15} /> Lịch sử đánh giá
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="dropdown-item danger" onClick={handleLogout}>
                    <LogOut size={15} /> Đăng xuất
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="home-content-scroll">
          {/* ========================================================
              HERO BANNER (With provided cover image)
              ======================================================== */}
          <div className="hero-banner-card">
            {/* Background Image Container */}
            <div className="banner-bg-wrapper">
              <img src="/banner-home.jpg" alt="Cover AI Ethics" className="banner-bg-img" />
              <div className="banner-gradient-overlay"></div>
            </div>

            {/* Left Content */}
            <div className="banner-text-content">
              <h1 className="banner-headline">
                CÔNG CỤ TỰ ĐÁNH GIÁ<br />
                ĐẠO ĐỨC HỆ THỐNG AI
              </h1>
              <p className="banner-subtext">
                Hỗ trợ tổ chức đánh giá mức độ tuân thủ Khung đạo đức<br />
                trí tuệ nhân tạo quốc gia theo Thông tư 05/2026/TT-BKHCN
              </p>
              <button 
                type="button" 
                className="banner-cta-button"
                onClick={() => navigate('/ho-so-dang-ky')}
              >
                BẮT ĐẦU ĐÁNH GIÁ <ArrowRight size={17} strokeWidth={2.4} />
              </button>
            </div>

            {/* Right Overlaid Feature Pills */}
            <div className="banner-features-column">
              <div className="banner-feature-pill">
                <div className="feature-pill-icon"><CheckSquare size={17} /></div>
                <span className="feature-pill-label">Đơn giản</span>
                <Check size={17} strokeWidth={2.8} className="feature-pill-check" />
              </div>
              <div className="banner-feature-pill">
                <div className="feature-pill-icon"><Zap size={17} /></div>
                <span className="feature-pill-label">Thực tiễn</span>
                <Check size={17} strokeWidth={2.8} className="feature-pill-check" />
              </div>
              <div className="banner-feature-pill">
                <div className="feature-pill-icon"><Building2 size={17} /></div>
                <span className="feature-pill-label">Phù hợp SME</span>
                <Check size={17} strokeWidth={2.8} className="feature-pill-check" />
              </div>
              <div className="banner-feature-pill">
                <div className="feature-pill-icon"><Shield size={17} /></div>
                <span className="feature-pill-label">Bám sát Thông tư 05</span>
                <Check size={17} strokeWidth={2.8} className="feature-pill-check" />
              </div>
            </div>
          </div>

          {/* ========================================================
              FEATURE MODULE CARDS ("Các phân hệ chức năng chính")
              ======================================================== */}
          <section className="feature-section">
            <h3 className="section-title">Các phân hệ chức năng chính</h3>

            <div className="feature-cards-grid">
              {featureCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div 
                    key={card.num} 
                    className="feature-card"
                    onClick={() => navigate(card.link)}
                  >
                    {/* Card Top: Number badge + Title + Subtitle */}
                    <div className="card-header-row">
                      <div 
                        className="card-num-circle"
                        style={{ backgroundColor: card.badgeColor }}
                      >
                        {card.num}
                      </div>
                      <div className="card-header-text">
                        <h4 className="card-title">{card.title}</h4>
                        <p className="card-desc">{card.desc}</p>
                      </div>
                    </div>

                    {/* Card Body: Bullets */}
                    <ul className="card-bullets-list">
                      {card.bullets.map((item, bIdx) => (
                        <li key={bIdx}>{item}</li>
                      ))}
                    </ul>

                    {/* Card Footer: Icon left + Arrow action right */}
                    <div className="card-footer-row">
                      <div 
                        className="card-feature-icon"
                        style={{ 
                          backgroundColor: card.iconBg, 
                          color: card.iconColor 
                        }}
                      >
                        <IconComponent size={20} />
                      </div>
                      
                      <div className="card-arrow-action">
                        <ArrowRight size={16} />
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
