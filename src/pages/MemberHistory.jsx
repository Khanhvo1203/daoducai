import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  Search, 
  Plus, 
  Edit3, 
  Play, 
  RotateCcw, 
  Trash2, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Building2, 
  Cpu, 
  Layers, 
  Eye, 
  Calendar,
  X
} from 'lucide-react';
import { getCurrentUser, getAssessmentsByUser, deleteAssessment } from '../utils/auth';
import './MemberHistory.css';

const MemberHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab');

  const [currentUser, setCurrentUser] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [activeTab, setActiveTab] = useState(tabFromUrl || 'all'); // 'all' | 'draft' | 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Sync tab from URL if changed
  useEffect(() => {
    if (tabFromUrl && ['all', 'draft', 'completed'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Load user and assessment list
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate('/login');
      return;
    }
    setCurrentUser(user);
    loadDossiers(user.username);
  }, [navigate]);

  const loadDossiers = (userId) => {
    const list = getAssessmentsByUser(userId);
    setAssessments(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Helper calculate compliance & score for completed dossiers
  const calculateCompliance = (answers = {}) => {
    let s1 = 0, s2 = 0, s3 = 0, s4 = 0;
    for (let i = 1; i <= 15; i++) {
      if (answers[`C1.${i}`] === 0) s1++;
      if (answers[`C2.${i}`] === 0) s2++;
      if (answers[`C3.${i}`] === 0) s3++;
      if (answers[`C4.${i}`] === 0) s4++;
    }
    const totalScore = s1 + s2 + s3 + s4;
    const answeredCount = Object.keys(answers).length;

    if (answeredCount === 0) {
      return { 
        label: 'Chưa đánh giá', 
        color: '#64748b', 
        bg: '#f1f5f9', 
        score: 0, 
        percent: 0 
      };
    }

    if (s1 <= 5 || s2 <= 5 || s3 <= 5 || s4 <= 5) {
      return { 
        label: 'Không tuân thủ', 
        color: '#dc2626', 
        bg: '#fef2f2', 
        score: totalScore, 
        percent: Math.round((totalScore / 60) * 100) 
      };
    }

    if (totalScore >= 44 && s1 >= 11 && s2 >= 11 && s3 >= 11 && s4 >= 11) {
      return { 
        label: 'Tuân thủ đầy đủ', 
        color: '#15803d', 
        bg: '#dcfce7', 
        score: totalScore, 
        percent: Math.round((totalScore / 60) * 100) 
      };
    }

    return { 
      label: 'Tuân thủ một phần', 
      color: '#d97706', 
      bg: '#fef3c7', 
      score: totalScore, 
      percent: Math.round((totalScore / 60) * 100) 
    };
  };

  // Handle delete dossier
  const handleDeleteDossier = (id) => {
    if (id === 'DRAFT-ACTIVE') {
      if (currentUser) {
        localStorage.removeItem(`landing_formData_${currentUser.username}`);
        localStorage.removeItem(`landing_step_${currentUser.username}`);
      }
    } else {
      deleteAssessment(id);
    }
    if (currentUser) {
      loadDossiers(currentUser.username);
    }
    setDeleteConfirmId(null);
    showToast('Đã xóa hồ sơ thành công!');
  };

  // Stats
  const draftList = useMemo(() => {
    return assessments.filter(a => a.status === 'DRAFT' || a.isDraft);
  }, [assessments]);

  const completedList = useMemo(() => {
    return assessments.filter(a => a.status === 'COMPLETED' || (!a.isDraft && a.status !== 'DRAFT'));
  }, [assessments]);

  // Filtered dossiers based on tab, search, and risk
  const filteredDossiers = useMemo(() => {
    let list = assessments;

    if (activeTab === 'draft') {
      list = draftList;
    } else if (activeTab === 'completed') {
      list = completedList;
    }

    if (riskFilter !== 'ALL') {
      list = list.filter(a => (a.formData?.riskLevel || '').toLowerCase().includes(riskFilter.toLowerCase()));
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(a => {
        const id = String(a.id || '').toLowerCase();
        const sysName = String(a.formData?.systemName || '').toLowerCase();
        const agency = String(a.formData?.agencyName || '').toLowerCase();
        const domain = String(a.formData?.domain || '').toLowerCase();
        const code = String(a.formData?.internalCode || '').toLowerCase();
        return id.includes(q) || sysName.includes(q) || agency.includes(q) || domain.includes(q) || code.includes(q);
      });
    }

    return list;
  }, [assessments, activeTab, draftList, completedList, riskFilter, searchTerm]);

  return (
    <div className="dossier-page-container fade-in">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="dossier-toast">
          ✓ {toastMessage}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '1.75rem',
            maxWidth: '460px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#dc2626' }}>
              <AlertTriangle size={24} />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Xác nhận xóa hồ sơ</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Bạn có chắc chắn muốn xóa hồ sơ <strong>#{deleteConfirmId}</strong> không? Hành động này sẽ loại bỏ thông tin khai báo và kết quả liên quan.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => handleDeleteDossier(deleteConfirmId)}
                style={{
                  padding: '0.55rem 1.15rem',
                  borderRadius: '6px',
                  border: 'none',
                  background: '#dc2626',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="dossier-breadcrumbs">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <span className="active">1. Thông tin hệ thống AI</span>
        <span>/</span>
        <span className="active">Danh sách hồ sơ</span>
      </nav>

      {/* Page Header Bar */}
      <header className="dossier-header-bar">
        <div className="dossier-header-left">
          <div className="dossier-header-icon">
            <Layers size={28} strokeWidth={2.2} />
          </div>
          <div>
            <h1 className="dossier-header-title">
              DANH SÁCH HỒ SƠ HỆ THỐNG TRÍ TUỆ NHÂN TẠO
            </h1>
            <p className="dossier-header-subtitle">
              Quản lý hồ sơ bản nháp, hồ sơ đã đánh giá đạo đức và cập nhật thông tin khai báo theo Thông tư 05/2026/TT-BKHCN
            </p>
          </div>
        </div>
        <Link to="/ho-so-dang-ky" className="dossier-btn-create" title="Khai báo hệ thống AI mới">
          <Plus size={18} strokeWidth={2.5} />
          <span>Khai báo hồ sơ AI mới</span>
        </Link>
      </header>

      {/* KPI Summary Cards */}
      <section className="dossier-kpi-grid">
        {/* Total */}
        <div 
          className={`dossier-kpi-card kpi-total ${activeTab === 'all' ? 'active-kpi' : ''}`}
          onClick={() => setActiveTab('all')}
          title="Xem tất cả hồ sơ"
        >
          <div>
            <div className="kpi-label">Tổng số hồ sơ</div>
            <div className="kpi-value-row">
              <span className="kpi-value">{assessments.length}</span>
              <span className="kpi-unit">hệ thống AI</span>
            </div>
            <p className="kpi-desc">Tất cả bản ghi trong hệ thống</p>
          </div>
          <div className="kpi-icon-box">
            <FileText size={24} />
          </div>
        </div>

        {/* Draft */}
        <div 
          className={`dossier-kpi-card kpi-draft ${activeTab === 'draft' ? 'active-kpi' : ''}`}
          onClick={() => setActiveTab('draft')}
          title="Xem danh sách hồ sơ lưu bản nháp"
        >
          <div>
            <div className="kpi-label">Hồ sơ lưu bản nháp</div>
            <div className="kpi-value-row">
              <span className="kpi-value">{draftList.length}</span>
              <span className="kpi-unit">chưa đánh giá</span>
            </div>
            <p className="kpi-desc">Có thể sửa thông tin & tiếp tục đánh giá</p>
          </div>
          <div className="kpi-icon-box">
            <Clock size={24} />
          </div>
        </div>

        {/* Completed */}
        <div 
          className={`dossier-kpi-card kpi-completed ${activeTab === 'completed' ? 'active-kpi' : ''}`}
          onClick={() => setActiveTab('completed')}
          title="Xem danh sách hồ sơ đã đánh giá"
        >
          <div>
            <div className="kpi-label">Hồ sơ đã đánh giá</div>
            <div className="kpi-value-row">
              <span className="kpi-value">{completedList.length}</span>
              <span className="kpi-unit">hoàn thành</span>
            </div>
            <p className="kpi-desc">Đã có kết quả & báo cáo tuân thủ</p>
          </div>
          <div className="kpi-icon-box">
            <CheckCircle2 size={24} />
          </div>
        </div>
      </section>

      {/* Filter and Tabs Toolbar */}
      <section className="dossier-toolbar">
        {/* Tab selection */}
        <div className="dossier-tabs-row">
          <button
            type="button"
            className={`dossier-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <span>Tất cả hồ sơ</span>
            <span className="dossier-tab-badge">{assessments.length}</span>
          </button>
          
          <button
            type="button"
            className={`dossier-tab-btn ${activeTab === 'draft' ? 'active' : ''}`}
            onClick={() => setActiveTab('draft')}
          >
            <Clock size={16} />
            <span>Hồ sơ lưu bản nháp (Chưa đánh giá)</span>
            <span className="dossier-tab-badge">{draftList.length}</span>
          </button>

          <button
            type="button"
            className={`dossier-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <CheckCircle2 size={16} />
            <span>Hồ sơ đã đánh giá</span>
            <span className="dossier-tab-badge">{completedList.length}</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="dossier-filter-row">
          <div className="dossier-search-box">
            <Search size={16} className="dossier-search-icon" />
            <input
              type="text"
              placeholder="Tìm theo mã số, tên hệ thống, cơ quan, lĩnh vực..."
              className="dossier-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="dossier-filter-selects">
            <select
              className="dossier-select"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              title="Lọc theo mức độ rủi ro"
            >
              <option value="ALL">Tất cả mức độ rủi ro</option>
              <option value="cao">Rủi ro cao</option>
              <option value="trung bình">Rủi ro trung bình</option>
              <option value="thấp">Rủi ro thấp</option>
            </select>
          </div>
        </div>
      </section>

      {/* Dossier List */}
      <section className="dossier-list-grid">
        {filteredDossiers.length === 0 ? (
          <div className="dossier-empty-state">
            <div className="empty-icon-box">
              <Layers size={32} />
            </div>
            <h3 className="empty-title">Không tìm thấy hồ sơ nào</h3>
            <p className="empty-desc">
              {searchTerm || riskFilter !== 'ALL'
                ? 'Không có hồ sơ nào phù hợp với bộ lọc tìm kiếm hiện tại. Vui lòng thử tìm kiếm với từ khóa khác.'
                : activeTab === 'draft'
                ? 'Hiện tại chưa có hồ sơ bản nháp nào đang lưu dở dang.'
                : activeTab === 'completed'
                ? 'Hiện tại chưa có hồ sơ nào đã hoàn thành đánh giá.'
                : 'Bạn chưa có hồ sơ hệ thống AI nào trên cổng đánh giá.'}
            </p>
            <Link to="/ho-so-dang-ky" className="dossier-btn-create">
              <Plus size={16} /> Khai báo hồ sơ AI mới ngay
            </Link>
          </div>
        ) : (
          filteredDossiers.map((item) => {
            const isDraft = item.status === 'DRAFT' || item.isDraft;
            const comp = calculateCompliance(item.answers);
            const riskLevel = item.formData?.riskLevel || 'Trung bình';
            const riskLower = riskLevel.toLowerCase();

            let riskClass = 'risk-medium';
            if (riskLower.includes('cao')) riskClass = 'risk-high';
            else if (riskLower.includes('thấp')) riskClass = 'risk-low';

            const createdDate = item.createdAt 
              ? new Date(item.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' }) 
              : 'Chưa cập nhật';
            const updatedDate = item.updatedAt 
              ? new Date(item.updatedAt).toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' }) 
              : createdDate;

            return (
              <article 
                key={item.id} 
                className={`dossier-card ${isDraft ? 'card-draft' : 'card-completed'}`}
              >
                {/* Header row: Code, Date, Status Badges */}
                <div className="card-header-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span className="card-code-badge">
                      MÃ HỒ SƠ: #{item.id}
                    </span>
                    <span className="card-date-meta">
                      <Calendar size={13} />
                      Cập nhật: {updatedDate}
                    </span>
                  </div>

                  <div className="card-badges-group">
                    {/* Primary Status Badge */}
                    {isDraft ? (
                      <span className="badge-status status-draft">
                        <Clock size={13} strokeWidth={2.4} />
                        Bản nháp · Chưa đánh giá
                      </span>
                    ) : (
                      <>
                        <span className="badge-status status-completed">
                          <CheckCircle2 size={13} strokeWidth={2.4} />
                          Đã đánh giá
                        </span>
                        <span 
                          className="badge-compliance"
                          style={{ backgroundColor: comp.bg, color: comp.color }}
                        >
                          <ShieldCheck size={13} strokeWidth={2.4} />
                          {comp.label}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Main Card Body */}
                <div className="card-main-body">
                  <div className="card-system-title-row">
                    <div>
                      <h2 className="card-system-title">
                        {item.formData?.systemName || '(Hệ thống AI chưa đặt tên)'}
                      </h2>
                      <p className="card-internal-code">
                        Mã nội bộ: <strong>{item.formData?.internalCode || 'Chưa thiết lập'}</strong>
                        {item.formData?.version ? ` · Phiên bản: ${item.formData.version}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="card-details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Cơ quan chủ quản / Đơn vị</span>
                      <span className="detail-value" title={item.formData?.agencyName}>
                        <Building2 size={14} className="text-muted" />
                        {item.formData?.agencyName || 'Chưa cập nhật'}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">Lĩnh vực ứng dụng</span>
                      <span className="detail-value">
                        {item.formData?.domain || 'Chưa xác định'}
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">Mức độ rủi ro</span>
                      <span className="detail-value">
                        <span className={`badge-risk ${riskClass}`}>
                          {riskLevel}
                        </span>
                      </span>
                    </div>

                    <div className="detail-item">
                      <span className="detail-label">Công nghệ AI</span>
                      <span className="detail-value">
                        <Cpu size={14} className="text-muted" />
                        {item.formData?.aiTechType || 'Chưa cập nhật'}
                      </span>
                    </div>
                  </div>

                  {/* Informational Section based on Draft or Completed */}
                  {isDraft ? (
                    <div className="card-draft-notice">
                      <Clock size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>Hồ sơ đang lưu bản nháp:</strong> Thông tin khai báo đã được lưu tạm an toàn. Bạn có thể bấm nút <strong>"Sửa thông tin khai báo"</strong> để hiệu chỉnh các mục hoặc bấm <strong>"Tiếp tục đánh giá"</strong> để thực hiện các bước tiếp theo.
                      </div>
                    </div>
                  ) : (
                    <div className="card-score-summary">
                      <div className="score-metric-left">
                        <div>
                          <div className="score-desc-text">Điểm tuân thủ đạo đức:</div>
                          <div className="score-number-badge">
                            {comp.score}/60 <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>({comp.percent}%)</span>
                          </div>
                        </div>
                        <div className="score-progress-container" title={`Đạt ${comp.percent}% điểm số`}>
                          <div 
                            className="score-progress-fill" 
                            style={{ 
                              width: `${comp.percent}%`,
                              backgroundColor: comp.color 
                            }} 
                          />
                        </div>
                      </div>
                      <div className="score-desc-text" style={{ maxWidth: '420px', lineHeight: 1.4 }}>
                        Trạng thái: <strong style={{ color: comp.color }}>{comp.label}</strong> theo 4 nguyên tắc Khung đạo đức AI quốc gia.
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Actions Bar (Footer) */}
                <div className="card-actions-bar">
                  <div className="actions-left">
                    {/* NÚT SỬA THÔNG TIN KHAI BÁO (User requested on EVERY dossier) */}
                    <Link
                      to={`/ho-so-dang-ky?editId=${item.id}`}
                      className="btn-dossier-action btn-edit-declaration"
                      title="Chỉnh sửa thông tin hồ sơ và mô tả hệ thống AI"
                    >
                      <Edit3 size={14} strokeWidth={2.4} />
                      <span>Sửa thông tin khai báo</span>
                    </Link>

                    {/* DRAFT SPECIFIC ACTIONS */}
                    {isDraft && (
                      <Link
                        to={item.dashboardRoute || '/assessment1'}
                        state={{ 
                          selection: item.selection, 
                          formData: item.formData, 
                          answers: item.answers, 
                          evidences: item.evidences, 
                          assessmentCode: item.id 
                        }}
                        className="btn-dossier-action btn-continue-eval"
                        title="Tiếp tục thực hiện bài đánh giá"
                      >
                        <Play size={14} strokeWidth={2.4} />
                        <span>Tiếp tục đánh giá</span>
                      </Link>
                    )}

                    {/* COMPLETED SPECIFIC ACTIONS */}
                    {!isDraft && (
                      <>
                        <Link
                          to={`${item.dashboardRoute || '/dashboard1'}?id=${item.id}`}
                          state={{ 
                            selection: item.selection, 
                            formData: item.formData, 
                            answers: item.answers, 
                            evidences: item.evidences, 
                            assessmentCode: item.id 
                          }}
                          className="btn-dossier-action btn-view-result"
                          title="Xem chi tiết kết quả đánh giá và khuyến nghị"
                        >
                          <Eye size={14} strokeWidth={2.4} />
                          <span>Xem kết quả đánh giá</span>
                        </Link>

                        <Link
                          to="/assessment1"
                          state={{ 
                            selection: item.selection, 
                            formData: item.formData, 
                            assessmentCode: item.id 
                          }}
                          className="btn-dossier-action btn-reeval"
                          title="Thực hiện đánh giá lại cho hệ thống này"
                        >
                          <RotateCcw size={14} strokeWidth={2.4} />
                          <span>Đánh giá lại</span>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="actions-right">
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="btn-delete-dossier"
                      title="Xóa hồ sơ này"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
};

export default MemberHistory;
