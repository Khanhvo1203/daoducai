import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft,
  Check, 
  Save,
  Settings,
  Scale
} from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import MacroStepper from '../components/MacroStepper';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.username : 'guest';
  
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem(`landing_step_${userId}`);
    return saved ? parseInt(saved, 10) : 1;
  }); 
  // 1 = Hồ sơ đại diện, 2 = Khai báo hệ thống & Rủi ro, 3 = Mô tả hệ thống, 4 = Chọn bài đánh giá

  const [step2Tab, setStep2Tab] = useState(1); // 1 = Thông tin AI (6 câu), 2 = Mức độ Rủi ro (4 câu)
  const [step3Tab, setStep3Tab] = useState(1); // 1 = Mục đích (9 câu), 2 = Công nghệ (8 câu), 3 = Quản trị (4 câu)
  
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(`landing_formData_${userId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing formData from localStorage", e);
      }
    }
    return {
      // Step 1: Hồ sơ đăng ký
      fullName: '',
      role: '',
      email: '',
      
      // Step 2: Thông tin AI
      systemName: '',
      internalCode: '',
      version: '',
      updatedDate: '',
      agencyName: '',
      legalBasis: '',
      orgRole: 'Nhà phát triển',
      otherOrgRole: '',
      
      // Step 2 (phần 2): Mức độ rủi ro
      riskLevel: 'Trung bình',
      riskLevelBasis: '',
      isInHighRiskList: 'Không',
      highRiskCategoryDesc: '',
      highRiskDetail: '',
      complianceAssessment: 'Chưa thực hiện',
      complianceAssessmentDetail: '',

      // Step 3 (Mục 1): Mục đích, phạm vi, giới hạn
      purpose: '',
      businessProblem: '',
      domain: 'Hành chính',
      otherDomain: '',
      directUser: 'Cán bộ chuyên môn',
      otherDirectUser: '',
      decisionTarget: 'Công dân',
      otherDecisionTarget: '',
      vulnerableGroup: '',
      userCount: '',
      deployScope: 'Toàn quốc',
      otherDeployScope: '',
      potentialImpact: '',

      // Step 3 (Mục 2): Công nghệ, dữ liệu, đầu vào & đầu ra
      aiTechType: 'Học máy truyền thống',
      otherAiTechType: '',
      developType: 'Tự phát triển',
      provider: '',
      inputType: 'Văn bản',
      otherInputType: '',
      inputSource: 'Người dùng nhập',
      otherInputSource: '',
      hasPersonalData: 'Không',
      personalDataDesc: '',
      outputType: 'Dự đoán',
      otherOutputType: '',
      automationLevel: 'Gợi ý cho người dùng',
      otherAutomationLevel: '',

      // Step 3 (Mục 3): Đầu mối quản trị, vận hành
      managementUnit: '',
      leaderName: '',
      leaderRole: '',
      leaderEmail: '',
      leaderPhone: '',
      technicalContact: '',
      supportChannel: ''
    };
  });

  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    localStorage.setItem(`landing_step_${userId}`, step);
  }, [step, userId]);

  useEffect(() => {
    localStorage.setItem(`landing_formData_${userId}`, JSON.stringify(formData));
  }, [formData, userId]);

  const [assessmentSelection, setAssessmentSelection] = useState({
    partB: true,
    partC: true
  });

  const [showSubSelect, setShowSubSelect] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(1);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleNextStep = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (step === 1) {
      setStep(2);
      setStep2Tab(1);
    } else if (step === 2) {
      if (step2Tab === 1) {
        setStep2Tab(2);
      } else {
        setStep(3);
        setStep3Tab(1);
      }
    } else if (step === 3) {
      if (step3Tab === 1) {
        setStep3Tab(2);
      } else if (step3Tab === 2) {
        setStep3Tab(3);
      } else {
        setStep(4);
      }
    }
  };

  const handlePrevStep = () => {
    if (step === 4) {
      setStep(3);
      setStep3Tab(3);
    } else if (step === 3) {
      if (step3Tab === 3) {
        setStep3Tab(2);
      } else if (step3Tab === 2) {
        setStep3Tab(1);
      } else {
        setStep(2);
        setStep2Tab(2);
      }
    } else if (step === 2) {
      if (step2Tab === 2) {
        setStep2Tab(1);
      } else {
        setStep(1);
      }
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem(`landing_step_${userId}`, step);
    localStorage.setItem(`landing_formData_${userId}`, JSON.stringify(formData));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleStartAssessment = () => {
    if (!assessmentSelection.partB && !assessmentSelection.partC) {
      alert("Vui lòng chọn ít nhất 1 bài đánh giá!");
      return;
    }
    
    if (selectedAssessment === 1) {
      navigate('/assessment1', { 
        state: { 
          selection: assessmentSelection,
          formData: formData
        } 
      });
    } else {
      navigate('/assessment2', { 
        state: { 
          selection: assessmentSelection,
          formData: formData
        } 
      });
    }
  };

  const subTabs = [
    { num: 1, title: '1. Hồ sơ đại diện' },
    { num: 2, title: '2. Khai báo hệ thống & Rủi ro' },
    { num: 3, title: '3. Mô tả chi tiết hệ thống' },
    { num: 4, title: '4. Chọn nội dung đánh giá' }
  ];

  return (
    <div className="portal-declaration-wrapper">
      <div className="portal-container">
        
        {saveToast && (
          <div className="portal-toast">
            ✓ Đã lưu tạm thông tin hồ sơ thành công!
          </div>
        )}

        <div className="portal-card">
          
          {/* Header Section */}
          <div className="portal-header-section">
            <h1 className="portal-page-title">
              {step === 1 && 'Hồ sơ đăng ký đánh giá'}
              {step === 2 && 'Khai báo thông tin hệ thống AI'}
              {step === 3 && 'Mô tả hệ thống AI'}
              {step === 4 && 'Chọn nội dung đánh giá'}
            </h1>
            <p className="portal-page-subtitle">
              Bước 1/3: Xác định hệ thống và sàng lọc rủi ro (gồm bước 1 + 2)
            </p>
          </div>

          {/* Macro Stepper (3 Phases Header) */}
          <MacroStepper currentPhase={1} className="flush" />

          {/* Sub-stepper Tab Pills */}
          <div className="sub-tabs-container">
            {subTabs.map((tab) => {
              const isActive = step === tab.num;
              const isCompleted = step > tab.num;
              return (
                <button
                  key={tab.num}
                  type="button"
                  className={`sub-tab-btn ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => {
                    setStep(tab.num);
                    if (tab.num === 2) setStep2Tab(1);
                    if (tab.num === 3) setStep3Tab(1);
                  }}
                >
                  {isCompleted && <Check size={13} strokeWidth={3} />}
                  {tab.title}
                </button>
              );
            })}
          </div>

          {/* Segmented Switcher for Step 2 */}
          {step === 2 && (
            <div className="portal-segmented-bar">
              <button 
                type="button" 
                className={`portal-segmented-btn ${step2Tab === 1 ? 'active' : 'inactive'}`}
                onClick={() => setStep2Tab(1)}
              >
                I. Thông tin hệ thống AI <span className="portal-badge-count">6 mục</span>
              </button>
              <button 
                type="button" 
                className={`portal-segmented-btn ${step2Tab === 2 ? 'active' : 'inactive'}`}
                onClick={() => setStep2Tab(2)}
              >
                2. Mức độ Rủi ro <span className="portal-badge-count">4 mục</span>
              </button>
            </div>
          )}

          {/* Segmented Switcher for Step 3 */}
          {step === 3 && (
            <div className="portal-segmented-bar">
              <button 
                type="button" 
                className={`portal-segmented-btn ${step3Tab === 1 ? 'active' : 'inactive'}`}
                onClick={() => setStep3Tab(1)}
              >
                1. Mục đích & Giới hạn <span className="portal-badge-count">9 mục</span>
              </button>
              <button 
                type="button" 
                className={`portal-segmented-btn ${step3Tab === 2 ? 'active' : 'inactive'}`}
                onClick={() => setStep3Tab(2)}
              >
                2. Công nghệ & Dữ liệu <span className="portal-badge-count">8 mục</span>
              </button>
              <button 
                type="button" 
                className={`portal-segmented-btn ${step3Tab === 3 ? 'active' : 'inactive'}`}
                onClick={() => setStep3Tab(3)}
              >
                3. Quản trị & Vận hành <span className="portal-badge-count">4 mục</span>
              </button>
            </div>
          )}

          {/* ============================================================
              STEP 1: HỒ SƠ ĐĂNG KÝ ĐẠI DIỆN (3 MỤC - GỌN GÀNG)
              ============================================================ */}
          {step === 1 && (
            <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <div className="portal-table-body">
                {/* Row 1 */}
                <div className="portal-row">
                  <div className="portal-col-label">
                    1. Họ và tên người đại diện <span className="text-danger">*</span>
                  </div>
                  <div className="portal-col-input">
                    <input 
                      type="text" 
                      name="fullName" 
                      required 
                      placeholder="Nhập họ và tên người đại diện" 
                      value={formData.fullName} 
                      onChange={handleChange} 
                      className="portal-input" 
                    />
                  </div>
                  <div className="portal-col-guide">
                    Ghi đầy đủ họ và tên người đại diện đăng ký hồ sơ đánh giá.
                  </div>
                </div>

                {/* Row 2 */}
                <div className="portal-row">
                  <div className="portal-col-label">
                    2. Chức vụ / Phòng ban <span className="text-danger">*</span>
                  </div>
                  <div className="portal-col-input">
                    <input 
                      type="text" 
                      name="role" 
                      required 
                      placeholder="Ví dụ: Giám đốc công nghệ, Trưởng phòng CNTT..." 
                      value={formData.role} 
                      onChange={handleChange} 
                      className="portal-input" 
                    />
                  </div>
                  <div className="portal-col-guide">
                    Ghi rõ chức danh và bộ phận công tác của người đại diện.
                  </div>
                </div>

                {/* Row 3 */}
                <div className="portal-row">
                  <div className="portal-col-label">
                    3. Email liên hệ <span className="text-danger">*</span>
                  </div>
                  <div className="portal-col-input">
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      placeholder="email@donvi.vn" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className="portal-input" 
                    />
                  </div>
                  <div className="portal-col-guide">
                    Email chính thức để nhận thông báo và gửi báo cáo kết quả đánh giá.
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="portal-actions-bar">
                <button type="button" onClick={handleSaveDraft} className="btn btn-secondary flex items-center gap-1.5">
                  <Save size={16} /> Lưu tạm
                </button>
                <button type="submit" className="btn btn-primary flex items-center gap-2">
                  Tiếp theo <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* ============================================================
              STEP 2: KHAI BÁO THÔNG TIN HỆ THỐNG AI & MỨC ĐỘ RỦI RO
              (Chia làm 2 tab con: Tab 1 = 6 câu, Tab 2 = 4 câu - KHÔNG CẦN CUỘN)
              ============================================================ */}
          {step === 2 && (
            <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              
              {/* Tab 1: I. Thông tin hệ thống AI (6 mục) */}
              {step2Tab === 1 && (
                <div className="portal-table-body">
                  {/* 1 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      1. Tên hệ thống trí tuệ nhân tạo <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="systemName" 
                        required 
                        placeholder="Nhập tên hệ thống" 
                        value={formData.systemName} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Ghi đầy đủ tên hệ thống, không viết tắt nếu có thể.
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      2. Mã hệ thống AI (nếu có)
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="internalCode" 
                        placeholder="Ví dụ: AI-01/2026" 
                        value={formData.internalCode} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Mã đồng bộ từ cổng dịch vụ công AI hoặc mã nội bộ quản lý.
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      3. Phiên bản hệ thống / ngày cập nhật
                    </div>
                    <div className="portal-col-input">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input 
                          type="text" 
                          name="version" 
                          placeholder="Phiên bản (vd: v1.0)" 
                          value={formData.version || ''} 
                          onChange={handleChange} 
                          className="portal-input" 
                        />
                        <input 
                          type="date" 
                          name="updatedDate" 
                          value={formData.updatedDate || ''} 
                          onChange={handleChange} 
                          className="portal-input" 
                        />
                      </div>
                    </div>
                    <div className="portal-col-guide">
                      Phục vụ theo dõi thay đổi mô hình hoặc cấu hình.
                    </div>
                  </div>

                  {/* 4 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      4. Tên cơ quan, đơn vị triển khai <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="agencyName" 
                        placeholder="Nhập tên cơ quan, đơn vị" 
                        value={formData.agencyName || ''} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Tên pháp lý của tổ chức/đơn vị sử dụng hoặc triển khai.
                    </div>
                  </div>

                  {/* 5 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      5. Vai trò chính của tổ chức <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="orgRole" 
                        value={formData.orgRole} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Nhà phát triển">Nhà phát triển</option>
                        <option value="Nhà cung cấp">Nhà cung cấp</option>
                        <option value="Bên triển khai">Bên triển khai</option>
                        <option value="Người sử dụng">Người sử dụng</option>
                        <option value="Khác: điền thông tin">Khác, ghi rõ</option>
                      </select>
                      {formData.orgRole === 'Khác: điền thông tin' && (
                        <input 
                          type="text" 
                          name="otherOrgRole" 
                          required 
                          placeholder="Vui lòng ghi rõ vai trò..." 
                          value={formData.otherOrgRole || ''} 
                          onChange={handleChange} 
                          className="portal-input mt-2" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Nhà phát triển / Nhà cung cấp / Bên triển khai / Người sử dụng / Khác.
                    </div>
                  </div>

                  {/* 6 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      6. Căn cứ pháp lý triển khai (nếu có)
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="legalBasis" 
                        placeholder="Văn bản pháp lý, quyết định, quy chế..." 
                        value={formData.legalBasis || ''} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Văn bản pháp lý, quyết định triển khai, quy chế nội bộ hoặc hợp đồng.
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: 2. Mức độ Rủi ro (4 mục) */}
              {step2Tab === 2 && (
                <div className="portal-table-body">
                  {/* 1 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      1. Mức độ rủi ro của hệ thống <span className="text-danger">*</span>
                      <span className="field-hint-sub">Theo quy định nội bộ hoặc theo Luật AI</span>
                    </div>
                    <div className="portal-col-input">
                      <div className="portal-radio-group mb-1.5">
                        {['Rủi ro cao', 'Trung bình', 'Thấp'].map((opt) => (
                          <label key={opt} className="portal-radio-item">
                            <input 
                              type="radio" 
                              name="riskLevel" 
                              value={opt} 
                              checked={formData.riskLevel === opt} 
                              onChange={handleChange} 
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                      <input 
                        type="text" 
                        name="riskLevelBasis" 
                        placeholder="Nêu rõ căn cứ xác định..." 
                        value={formData.riskLevelBasis || ''} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Chọn mức độ rủi ro và nêu rõ căn cứ xác định.
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      2. Thuộc danh mục DMRR / AI rủi ro cao? <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <div className="portal-radio-group mb-1.5">
                        {['Có', 'Không', 'Đang xem xét'].map((opt) => (
                          <label key={opt} className="portal-radio-item">
                            <input 
                              type="radio" 
                              name="isInHighRiskList" 
                              value={opt} 
                              checked={(formData.isInHighRiskList || 'Không') === opt} 
                              onChange={handleChange} 
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                      {formData.isInHighRiskList === 'Có' && (
                        <input 
                          type="text" 
                          name="highRiskCategoryDesc" 
                          placeholder="Mô tả rõ nhóm/lĩnh vực thuộc danh mục..." 
                          value={formData.highRiskCategoryDesc || ''} 
                          onChange={handleChange} 
                          className="portal-input" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Nếu có, mô tả rõ nhóm/lĩnh vực thuộc danh mục rủi ro cao.
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      3. Mô tả cụ thể nếu thuộc rủi ro cao
                    </div>
                    <div className="portal-col-input">
                      <textarea 
                        name="highRiskDetail" 
                        rows="2" 
                        placeholder="Ghi rõ hệ thống thuộc mục nào trong danh mục liên quan" 
                        value={formData.highRiskDetail || ''} 
                        onChange={handleChange} 
                        className="portal-textarea"
                      />
                    </div>
                    <div className="portal-col-guide">
                      Ghi rõ hệ thống thuộc mục nào trong danh mục liên quan.
                    </div>
                  </div>

                  {/* 4 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      4. Đã thực hiện đánh giá sự phù hợp?
                    </div>
                    <div className="portal-col-input">
                      <div className="portal-radio-group mb-1.5">
                        {['Đã thực hiện', 'Chưa thực hiện', 'Không áp dụng'].map((opt) => (
                          <label key={opt} className="portal-radio-item">
                            <input 
                              type="radio" 
                              name="complianceAssessment" 
                              value={opt} 
                              checked={(formData.complianceAssessment || 'Chưa thực hiện') === opt} 
                              onChange={handleChange} 
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                      {formData.complianceAssessment === 'Đã thực hiện' && (
                        <input 
                          type="text" 
                          name="complianceAssessmentDetail" 
                          placeholder="Nêu số/văn bản hoặc kết quả chính..." 
                          value={formData.complianceAssessmentDetail || ''} 
                          onChange={handleChange} 
                          className="portal-input" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Nếu đã thực hiện, nêu số/văn bản hoặc kết quả chính.
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="portal-actions-bar">
                <div className="flex gap-2">
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary flex items-center gap-1.5">
                    <ArrowLeft size={16} /> Quay lại
                  </button>
                  <button type="button" onClick={handleSaveDraft} className="btn btn-secondary flex items-center gap-1.5">
                    <Save size={16} /> Lưu tạm
                  </button>
                </div>
                <button type="submit" className="btn btn-primary flex items-center gap-2">
                  {step2Tab === 1 ? 'Tiếp: Mức độ rủi ro' : 'Tiếp theo'} <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* ============================================================
              STEP 3: MÔ TẢ HỆ THỐNG AI
              (Chia làm 3 tab con: Tab 1 = 9 câu, Tab 2 = 8 câu, Tab 3 = 4 câu - KHÔNG CẦN CUỘN)
              ============================================================ */}
          {step === 3 && (
            <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              
              {/* Tab 1: Mục đích sử dụng, phạm vi và giới hạn (9 mục) */}
              {step3Tab === 1 && (
                <div className="portal-table-body">
                  {/* 1 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      1. Mục đích chính của hệ thống AI <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text"
                        name="purpose" 
                        required 
                        placeholder="Mô tả ngắn gọn mục đích chính..." 
                        value={formData.purpose} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Mô tả ngắn gọn hệ thống được thiết kế để làm gì.
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      2. Bài toán nghiệp vụ AI giải quyết <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text"
                        name="businessProblem" 
                        placeholder="Vai trò của AI trong quy trình..." 
                        value={formData.businessProblem} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Làm rõ vai trò của AI trong quy trình nghiệp vụ.
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      3. Lĩnh vực ứng dụng <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="domain" 
                        value={formData.domain} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Y tế">Y tế</option>
                        <option value="Giáo dục">Giáo dục</option>
                        <option value="Tài chính">Tài chính</option>
                        <option value="Hành chính">Hành chính</option>
                        <option value="Lao động">Lao động</option>
                        <option value="An sinh">An sinh</option>
                        <option value="Thương mại">Thương mại</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sản xuất">Sản xuất</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Khác">Khác, ghi rõ</option>
                      </select>
                      {formData.domain === 'Khác' && (
                        <input 
                          type="text" 
                          name="otherDomain" 
                          required 
                          placeholder="Ghi rõ lĩnh vực..." 
                          value={formData.otherDomain} 
                          onChange={handleChange} 
                          className="portal-input mt-1.5" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Y tế, Giáo dục, Tài chính, Hành chính, Lao động, An sinh...
                    </div>
                  </div>

                  {/* 4 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      4. Người sử dụng trực tiếp <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="directUser" 
                        value={formData.directUser} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Cán bộ chuyên môn">Cán bộ chuyên môn</option>
                        <option value="Cán bộ vận hành">Cán bộ vận hành</option>
                        <option value="Người dùng cuối">Người dùng cuối</option>
                        <option value="Khách hàng">Khách hàng</option>
                        <option value="Đối tác">Đối tác</option>
                        <option value="Khác">Khác, ghi rõ</option>
                      </select>
                      {formData.directUser === 'Khác' && (
                        <input 
                          type="text" 
                          name="otherDirectUser" 
                          required 
                          placeholder="Ghi rõ đối tượng..." 
                          value={formData.otherDirectUser} 
                          onChange={handleChange} 
                          className="portal-input mt-1.5" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Cán bộ chuyên môn, vận hành, người dùng cuối, khách hàng...
                    </div>
                  </div>

                  {/* 5 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      5. Đối tượng chịu tác động của AI <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="decisionTarget" 
                        value={formData.decisionTarget} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Công dân">Công dân</option>
                        <option value="Khách hàng">Khách hàng</option>
                        <option value="Nhân viên">Nhân viên</option>
                        <option value="Bệnh nhân">Bệnh nhân</option>
                        <option value="Học sinh-sinh viên">Học sinh-sinh viên</option>
                        <option value="Đối tác">Đối tác</option>
                        <option value="Cộng đồng">Cộng đồng</option>
                        <option value="Khác">Khác, ghi rõ</option>
                      </select>
                      {formData.decisionTarget === 'Khác' && (
                        <input 
                          type="text" 
                          name="otherDecisionTarget" 
                          required 
                          placeholder="Ghi rõ đối tượng..." 
                          value={formData.otherDecisionTarget} 
                          onChange={handleChange} 
                          className="portal-input mt-1.5" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Công dân, Khách hàng, Nhân viên, Bệnh nhân, Cộng đồng...
                    </div>
                  </div>

                  {/* 6 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      6. Nhóm dễ tổn thương bị ảnh hưởng
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="vulnerableGroup" 
                        placeholder="Vd: trẻ em, người cao tuổi... (hoặc 'Không xác định')" 
                        value={formData.vulnerableGroup} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Trẻ em, người cao tuổi, người khuyết tật, yếu thế kinh tế-xã hội.
                    </div>
                  </div>

                  {/* 7 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      7. Ước tính số lượng người dùng
                    </div>
                    <div className="portal-col-input">
                      <div className="flex items-center gap-2">
                        <input 
                          type="text" 
                          name="userCount" 
                          placeholder="Nhập số lượng" 
                          value={formData.userCount} 
                          onChange={handleChange} 
                          className="portal-input flex-1" 
                        />
                        <span className="text-xs font-semibold text-muted px-1.5">người</span>
                      </div>
                    </div>
                    <div className="portal-col-guide">
                      Ước lượng quy mô triển khai dự kiến hoặc tần suất sử dụng.
                    </div>
                  </div>

                  {/* 8 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      8. Phạm vi triển khai <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="deployScope" 
                        value={formData.deployScope} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Toàn quốc">Toàn quốc</option>
                        <option value="Một số tỉnh-thành">Một số tỉnh-thành</option>
                        <option value="Một địa phương">Một địa phương</option>
                        <option value="Nội bộ doanh nghiệp">Nội bộ doanh nghiệp</option>
                        <option value="Quốc tế">Quốc tế</option>
                        <option value="Khác">Khác, ghi rõ</option>
                      </select>
                      {formData.deployScope === 'Khác' && (
                        <input 
                          type="text" 
                          name="otherDeployScope" 
                          required 
                          placeholder="Ghi rõ phạm vi..." 
                          value={formData.otherDeployScope} 
                          onChange={handleChange} 
                          className="portal-input mt-1.5" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Toàn quốc, một số tỉnh-thành, địa phương, nội bộ doanh nghiệp.
                    </div>
                  </div>

                  {/* 9 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      9. Tác động nếu hoạt động sai
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="potentialImpact" 
                        placeholder="Mô tả tác động tiềm tàng..." 
                        value={formData.potentialImpact} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Tác động đến quyền lợi cá nhân, xã hội, uy tín, an toàn.
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Công nghệ, dữ liệu, đầu vào và đầu ra (8 mục) */}
              {step3Tab === 2 && (
                <div className="portal-table-body">
                  {/* 1 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      1. Loại công nghệ AI <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="aiTechType" 
                        value={formData.aiTechType} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Học máy truyền thống">Học máy truyền thống</option>
                        <option value="Học sâu">Học sâu</option>
                        <option value="NLP">NLP</option>
                        <option value="Thị giác máy tính">Thị giác máy tính</option>
                        <option value="Hệ gợi ý">Hệ gợi ý</option>
                        <option value="Hệ chuyên gia">Hệ chuyên gia</option>
                        <option value="LLM-GenAI">LLM-GenAI</option>
                        <option value="Đa phương thức">Đa phương thức</option>
                        <option value="Hệ lai">Hệ lai</option>
                        <option value="Khác">Khác, ghi rõ</option>
                      </select>
                      {formData.aiTechType === 'Khác' && (
                        <input 
                          type="text" 
                          name="otherAiTechType" 
                          required 
                          placeholder="Ghi rõ công nghệ..." 
                          value={formData.otherAiTechType} 
                          onChange={handleChange} 
                          className="portal-input mt-1.5" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Học máy truyền thống, Học sâu, NLP, Thị giác, LLM-GenAI...
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      2. Tự phát triển hay bên thứ ba? <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="developType" 
                        value={formData.developType} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Tự phát triển">Tự phát triển</option>
                        <option value="Mua">Mua</option>
                        <option value="Thuê dịch vụ">Thuê dịch vụ</option>
                        <option value="API">API</option>
                        <option value="Kết hợp">Kết hợp</option>
                      </select>
                    </div>
                    <div className="portal-col-guide">
                      Tự phát triển / Mua / Thuê dịch vụ / API / Kết hợp.
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      3. Nhà cung cấp mô hình (nếu có)
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="provider" 
                        placeholder="Tên nhà cung cấp, sản phẩm..." 
                        value={formData.provider} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Ghi tên nhà cung cấp, sản phẩm/dịch vụ, quốc gia hoặc website.
                    </div>
                  </div>

                  {/* 4 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      4. Loại dữ liệu đầu vào <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="inputType" 
                        value={formData.inputType} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Văn bản">Văn bản</option>
                        <option value="Hình ảnh">Hình ảnh</option>
                        <option value="Âm thanh">Âm thanh</option>
                        <option value="Video">Video</option>
                        <option value="Số liệu">Số liệu</option>
                        <option value="Hồ sơ cá nhân">Hồ sơ cá nhân</option>
                        <option value="Dữ liệu cảm biến">Dữ liệu cảm biến</option>
                        <option value="Đa phương thức">Đa phương thức</option>
                        <option value="Khác">Khác, ghi rõ</option>
                      </select>
                      {formData.inputType === 'Khác' && (
                        <input 
                          type="text" 
                          name="otherInputType" 
                          required 
                          placeholder="Ghi rõ loại dữ liệu..." 
                          value={formData.otherInputType} 
                          onChange={handleChange} 
                          className="portal-input mt-1.5" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Văn bản, Hình ảnh, Âm thanh, Video, Số liệu, Hồ sơ...
                    </div>
                  </div>

                  {/* 5 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      5. Nguồn dữ liệu đầu vào <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="inputSource" 
                        value={formData.inputSource} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Người dùng nhập">Người dùng nhập</option>
                        <option value="CSDL nội bộ">CSDL nội bộ</option>
                        <option value="CSDL đối tác">CSDL đối tác</option>
                        <option value="API bên ngoài">API bên ngoài</option>
                        <option value="Internet">Internet</option>
                        <option value="Dữ liệu tổng hợp">Dữ liệu tổng hợp</option>
                        <option value="Khác">Khác, ghi rõ</option>
                      </select>
                      {formData.inputSource === 'Khác' && (
                        <input 
                          type="text" 
                          name="otherInputSource" 
                          required 
                          placeholder="Ghi rõ nguồn dữ liệu..." 
                          value={formData.otherInputSource} 
                          onChange={handleChange} 
                          className="portal-input mt-1.5" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Người dùng nhập, CSDL nội bộ, đối tác, API, Internet...
                    </div>
                  </div>

                  {/* 6 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      6. Dữ liệu cá nhân/nhạy cảm <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <div className="portal-radio-group mb-1">
                        {['Có', 'Không'].map((opt) => (
                          <label key={opt} className="portal-radio-item">
                            <input 
                              type="radio" 
                              name="hasPersonalData" 
                              value={opt} 
                              checked={formData.hasPersonalData === opt} 
                              onChange={handleChange} 
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                      {formData.hasPersonalData === 'Có' && (
                        <input 
                          type="text"
                          name="personalDataDesc" 
                          placeholder="Mô tả biện pháp bảo vệ (mã hóa, phân quyền...)" 
                          value={formData.personalDataDesc} 
                          onChange={handleChange} 
                          className="portal-input mt-1" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Mô tả loại dữ liệu và biện pháp kiểm soát (mã hóa, ẩn danh...).
                    </div>
                  </div>

                  {/* 7 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      7. Loại đầu ra AI <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="outputType" 
                        value={formData.outputType} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Dự đoán">Dự đoán</option>
                        <option value="Phân loại">Phân loại</option>
                        <option value="Khuyến nghị">Khuyến nghị</option>
                        <option value="Chấm điểm">Chấm điểm</option>
                        <option value="Phát hiện bất thường">Phát hiện bất thường</option>
                        <option value="Nội dung tạo sinh">Nội dung tạo sinh</option>
                        <option value="Tóm tắt">Tóm tắt</option>
                        <option value="Dịch">Dịch</option>
                        <option value="Quyết định hỗ trợ">Quyết định hỗ trợ</option>
                        <option value="Khác">Khác, ghi rõ</option>
                      </select>
                      {formData.outputType === 'Khác' && (
                        <input 
                          type="text" 
                          name="otherOutputType" 
                          required 
                          placeholder="Ghi rõ loại đầu ra..." 
                          value={formData.otherOutputType} 
                          onChange={handleChange} 
                          className="portal-input mt-1.5" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Dự đoán, phân loại, khuyến nghị, chấm điểm, tạo sinh, tóm tắt...
                    </div>
                  </div>

                  {/* 8 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      8. Mức độ tự động hóa đầu ra <span className="text-danger">*</span>
                    </div>
                    <div className="portal-col-input">
                      <select 
                        name="automationLevel" 
                        value={formData.automationLevel} 
                        onChange={handleChange} 
                        className="portal-select"
                      >
                        <option value="Gợi ý cho người dùng">Gợi ý cho người dùng</option>
                        <option value="Người kiểm tra rồi phê duyệt">Người kiểm tra rồi phê duyệt</option>
                        <option value="Tự động thực thi có giám sát">Tự động thực thi có giám sát</option>
                        <option value="Tự động thực thi">Tự động thực thi</option>
                        <option value="Khác">Khác, ghi rõ</option>
                      </select>
                      {formData.automationLevel === 'Khác' && (
                        <input 
                          type="text" 
                          name="otherAutomationLevel" 
                          required 
                          placeholder="Ghi rõ mức độ..." 
                          value={formData.otherAutomationLevel} 
                          onChange={handleChange} 
                          className="portal-input mt-1.5" 
                        />
                      )}
                    </div>
                    <div className="portal-col-guide">
                      Gợi ý người dùng, Người duyệt, Tự động có giám sát, Tự động...
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Thông tin quản trị đầu mối quản trị, vận hành (4 mục) */}
              {step3Tab === 3 && (
                <div className="portal-table-body">
                  {/* 1 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      1. Đơn vị quản lý nghiệp vụ
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="managementUnit" 
                        placeholder="Nhập đơn vị quản lý nghiệp vụ" 
                        value={formData.managementUnit} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Ví dụ: Phòng Kinh doanh / Phòng CNTT / Khối Vận hành.
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      2. Người chịu trách nhiệm cấp lãnh đạo
                    </div>
                    <div className="portal-col-input">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-semibold text-muted block">2.1 Họ và tên</label>
                          <input 
                            type="text" 
                            name="leaderName" 
                            placeholder="Nhập họ và tên..." 
                            value={formData.leaderName || ''} 
                            onChange={handleChange} 
                            className="portal-input" 
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted block">2.2 Chức vụ</label>
                          <input 
                            type="text" 
                            name="leaderRole" 
                            placeholder="Nhập chức vụ..." 
                            value={formData.leaderRole || ''} 
                            onChange={handleChange} 
                            className="portal-input" 
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted block">2.3 Email</label>
                          <input 
                            type="email" 
                            name="leaderEmail" 
                            placeholder="Nhập email..." 
                            value={formData.leaderEmail || ''} 
                            onChange={handleChange} 
                            className="portal-input" 
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted block">2.4 Điện thoại</label>
                          <input 
                            type="tel" 
                            name="leaderPhone" 
                            placeholder="Nhập số điện thoại..." 
                            value={formData.leaderPhone || ''} 
                            onChange={handleChange} 
                            className="portal-input" 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="portal-col-guide">
                      Thông tin liên hệ của lãnh đạo phụ trách để phục vụ giải trình.
                    </div>
                  </div>

                  {/* 3 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      3. Đầu mối chuyên môn / vận hành AI
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="technicalContact" 
                        placeholder="Họ tên, chức vụ, bộ phận liên hệ" 
                        value={formData.technicalContact} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Họ tên, chức vụ, bộ phận phụ trách quản lý/vận hành kỹ thuật.
                    </div>
                  </div>

                  {/* 4 */}
                  <div className="portal-row">
                    <div className="portal-col-label">
                      4. Kênh tiếp nhận sự cố / khiếu nại
                    </div>
                    <div className="portal-col-input">
                      <input 
                        type="text" 
                        name="supportChannel" 
                        placeholder="Email / hotline / ticket..." 
                        value={formData.supportChannel} 
                        onChange={handleChange} 
                        className="portal-input" 
                      />
                    </div>
                    <div className="portal-col-guide">
                      Email, hotline hoặc kênh tiếp nhận phản ánh từ người dùng.
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="portal-actions-bar">
                <div className="flex gap-2">
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary flex items-center gap-1.5">
                    <ArrowLeft size={16} /> Quay lại
                  </button>
                  <button type="button" onClick={handleSaveDraft} className="btn btn-secondary flex items-center gap-1.5">
                    <Save size={16} /> Lưu tạm
                  </button>
                </div>
                <button type="submit" className="btn btn-primary flex items-center gap-2">
                  {step3Tab === 1 ? 'Tiếp: Công nghệ & Dữ liệu' : step3Tab === 2 ? 'Tiếp: Quản trị & Vận hành' : 'Tiếp theo'} <ArrowRight size={16} />
                </button>
              </div>
            </form>
          )}

          {/* ============================================================
              STEP 4: CHỌN NỘI DUNG ĐÁNH GIÁ (GỌN GÀNG - KHÔNG CẦN CUỘN)
              ============================================================ */}
          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
              <div className="portal-table-body" style={{ padding: '1.25rem 2rem' }}>
                <p className="text-muted text-sm mb-4">
                  Chọn phương thức đánh giá phù hợp cho hệ thống <strong>{formData.systemName || '(Chưa đặt tên)'}</strong> theo Thông tư 05/2026/TT-BKHCN:
                </p>

                <div className="flex flex-col gap-3">
                  {/* Lựa chọn đánh giá */}
                  <div className="portal-selection-card selected">
                    <div className="flex items-start gap-3">
                      <Settings size={20} className="text-primary flex-shrink-0" style={{ marginTop: '2px' }} />
                      <div className="flex-1">
                        <h4 className="font-bold text-main mb-0.5" style={{ fontSize: '1rem' }}>
                          Đánh giá khung đạo đức theo Thông tư 05/2026/TT-BKHCN
                        </h4>
                        <p className="text-muted text-xs" style={{ margin: 0 }}>
                          Tiến hành làm bài đánh giá trực tiếp trên hệ thống theo tiêu chuẩn Bộ Khoa học và Công nghệ.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-muted-light rounded-md border" style={{ marginLeft: '1rem' }}>
                    <label className="text-xs font-semibold mb-1.5 block text-main">Chọn phương thức đánh giá chi tiết:</label>
                    <select 
                      className="portal-select mb-3" 
                      value={selectedAssessment} 
                      onChange={(e) => setSelectedAssessment(parseInt(e.target.value, 10))}
                    >
                      <option value={1}>1. Đánh giá khung đạo đức theo các tiêu chí (Thang điểm 60)</option>
                      <option value={2}>2. Đánh giá khung đạo đức theo nguyên tắc trọng số (Thang điểm 100)</option>
                    </select>
                    <div className="flex justify-end">
                      <button 
                        type="button"
                        className="btn btn-primary flex items-center gap-1.5"
                        onClick={handleStartAssessment}
                      >
                        Bắt đầu đánh giá <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="portal-actions-bar">
                <div className="flex gap-2">
                  <button type="button" onClick={handlePrevStep} className="btn btn-secondary flex items-center gap-1.5">
                    <ArrowLeft size={16} /> Quay lại
                  </button>
                  <button type="button" onClick={handleSaveDraft} className="btn btn-secondary flex items-center gap-1.5">
                    <Save size={16} /> Lưu tạm
                  </button>
                </div>
                <button 
                  type="button" 
                  onClick={handleStartAssessment} 
                  className="btn btn-primary flex items-center gap-2"
                >
                  Bắt đầu đánh giá <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
