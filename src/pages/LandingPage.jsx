import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, HardDrive, ArrowRight, CheckSquare, Settings, Scale, AlertTriangle, FileText } from 'lucide-react';
import { getCurrentUser } from '../utils/auth';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.username : 'guest';
  
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem(`landing_step_${userId}`);
    return saved ? parseInt(saved, 10) : 1;
  }); 
  // 1 = Hồ sơ, 2 = Thông tin AI, 3 = Đánh giá rủi ro, 4 = Chọn bài đánh giá
  
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
      
      // Step 2: Thông tin hệ thống AI và thông tin quản trị đầu mối
      systemName: '',
      internalCode: '',
      version: '',
      agencyName: '',
      orgRole: 'Nhà phát triển',
      otherOrgRole: '',
      legalBasis: '',
      
      // Step 3: Mức độ Rủi ro
      riskLevel: 'Trung bình',
      riskLevelBasis: '',
      isInHighRiskList: 'Không',
      highRiskCategoryDesc: '',
      highRiskDetail: '',
      complianceAssessment: 'Chưa thực hiện',
      complianceAssessmentDetail: ''
    };
  });

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
    e.preventDefault();
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleStartAssessment = () => {
    if (!assessmentSelection.partB && !assessmentSelection.partC) {
      alert("Vui lòng chọn ít nhất 1 bài đánh giá!");
      return;
    }
    
    navigate('/assessment', { 
      state: { 
        selection: assessmentSelection,
        formData: formData
      } 
    });
  };

  return (
    <div className="declaration-page">
      <div className="container split-layout declaration-split">
        <div className="declaration-info">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={42} className="text-primary flex-shrink-0" />
            <h1 className="hero-title" style={{ margin: 0, lineHeight: 1 }}>
              {step === 1 && 'Hồ sơ đăng ký'}
              {step === 2 && 'Thông tin hệ thống'}
              {step === 3 && 'Mức độ rủi ro'}
              {step === 4 && 'Chọn nội dung đánh giá'}
            </h1>
          </div>
          <p className="hero-subtitle text-muted mt-4 mb-8">
            {step === 1 && 'Để bắt đầu, vui lòng cung cấp thông tin liên hệ của cá nhân/đơn vị đại diện.'}
            {step === 2 && 'Cung cấp các đặc tả kỹ thuật, vai trò, mục đích và giới hạn của hệ thống AI.'}
            {step === 3 && 'Đánh giá các rủi ro pháp lý và tác động đến con người, xã hội.'}
            {step === 4 && 'Hệ thống cho phép bạn tùy biến bài đánh giá theo 2 phần chính. Bạn có thể chọn 1 trong 2 hoặc cả 2.'}
          </p>

          <div className="info-steps flex-col gap-5">
            <div className="flex gap-4 items-start">
              <div className={`step-circle ${step >= 1 ? '' : 'inactive'}`}>01</div>
              <div>
                <h4 className={`font-bold mb-1 ${step >= 1 ? 'text-primary' : 'text-muted'}`}>Hồ sơ đăng ký</h4>
                <p className="text-sm text-muted">Thông tin cá nhân người đại diện.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className={`step-circle ${step >= 2 ? '' : 'inactive'}`}>02</div>
              <div>
                <h4 className={`font-bold mb-1 ${step >= 2 ? 'text-primary' : 'text-muted'}`}>Thông tin hệ thống</h4>
                <p className="text-sm text-muted">Đặc tả hệ thống, đầu vào/đầu ra, tác động.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className={`step-circle ${step >= 3 ? '' : 'inactive'}`}>03</div>
              <div>
                <h4 className={`font-bold mb-1 ${step >= 3 ? 'text-primary' : 'text-muted'}`}>Mức độ rủi ro</h4>
                <p className="text-sm text-muted">Đối chiếu pháp lý và nhận diện nhóm chịu tác động.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className={`step-circle ${step >= 4 ? '' : 'inactive'}`}>04</div>
              <div>
                <h4 className={`font-bold mb-1 ${step >= 4 ? 'text-primary' : 'text-muted'}`}>Chọn nội dung đánh giá</h4>
                <p className="text-sm text-muted">Quản trị & Đạo đức.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="declaration-form-container">
          
          {step === 1 && (
            <div className="card glass-card form-card fade-in">
              <h3 className="mb-6 border-b pb-4">Hồ sơ đăng ký đánh giá</h3>
              <form onSubmit={handleNextStep} className="flex-col gap-6">
                <div className="form-section">
                  <div className="flex items-center gap-2 mb-4">
                    <User size={18} className="text-primary" />
                    <h4 className="font-bold">Thông tin cá nhân / Đơn vị</h4>
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>Họ và tên người đại diện <span className="text-danger">*</span></label>
                    <input type="text" name="fullName" required placeholder="Nhập họ và tên" value={formData.fullName} onChange={handleChange} className="form-control" />
                  </div>
                  
                  <div className="grid-2 gap-4 mb-4">
                    <div className="form-group">
                      <label>Chức vụ / Phòng ban <span className="text-danger">*</span></label>
                      <input type="text" name="role" required placeholder="Vd: Giám đốc công nghệ" value={formData.role} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label>Email liên hệ <span className="text-danger">*</span></label>
                      <input type="email" name="email" required placeholder="email@donvi.vn" value={formData.email} onChange={handleChange} className="form-control" />
                    </div>
                  </div>
                </div>

                <div className="form-actions mt-6 pt-4 border-t flex justify-end">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Tiếp tục Thông tin hệ thống <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="card glass-card form-card fade-in" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
              <h3 className="mb-4 border-b pb-4 sticky top-0 bg-white z-10 text-xl text-primary flex items-center gap-2"><HardDrive size={22}/> 1. Thông tin hệ thống AI và thông tin quản trị đầu mối</h3>
              
              <form onSubmit={handleNextStep} className="flex-col gap-8 pb-4">
                
                <div>
                  <div className="form-group mb-4">
                    <label>1. Tên hệ thống trí tuệ nhân tạo <span className="text-danger">*</span></label>
                    <input type="text" name="systemName" required placeholder="Ghi đầy đủ tên hệ thống, không viết tắt nếu có thể" value={formData.systemName} onChange={handleChange} className="form-control" />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>2. Mã hệ thống AI (nếu có)</label>
                    <input type="text" name="internalCode" placeholder="Mã đồng bộ từ cổng dịch vụ công AI. Nếu chưa có, nên bổ sung mã nội bộ để quản lý (ví dụ: AI-01/2026)." value={formData.internalCode} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="form-group mb-4">
                    <label>3. Phiên bản hệ thống / ngày cập nhật gần nhất</label>
                    <input type="text" name="version" placeholder="Bổ sung để phục vụ theo dõi thay đổi mô hình hoặc cấu hình." value={formData.version} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="form-group mb-4">
                    <label>4. Tên cơ quan, đơn vị triển khai</label>
                    <input type="text" name="agencyName" placeholder="Ghi rõ tên pháp lý của tổ chức/đơn vị sử dụng hoặc triển khai." value={formData.agencyName} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="form-group mb-4">
                    <label>5. Vai trò chính của tổ chức</label>
                    <select name="orgRole" value={formData.orgRole} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Nhà phát triển">Nhà phát triển</option>
                      <option value="Nhà cung cấp">Nhà cung cấp</option>
                      <option value="Bên triển khai">Bên triển khai</option>
                      <option value="Người sử dụng">Người sử dụng</option>
                      <option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.orgRole === 'Khác' && (
                      <input type="text" name="otherOrgRole" required placeholder="Vui lòng ghi rõ vai trò" value={formData.otherOrgRole} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>6. Căn cứ pháp lý triển khai hệ thống (nếu có)</label>
                    <input type="text" name="legalBasis" placeholder="Ghi văn bản pháp lý, quyết định triển khai, quy chế nội bộ hoặc hợp đồng liên quan." value={formData.legalBasis} onChange={handleChange} className="form-control" />
                  </div>
                </div>

                <div className="form-actions mt-6 pt-6 border-t flex justify-between sticky bottom-0 bg-white z-10">
                  <button type="button" className="btn btn-secondary border-none" onClick={handlePrevStep}>
                    Quay lại
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Tiếp tục Đánh giá rủi ro <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="card glass-card form-card fade-in" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
              <h3 className="mb-4 border-b pb-4 sticky top-0 bg-white z-10 text-xl text-primary flex items-center gap-2"><AlertTriangle size={22}/> 2. Mức độ Rủi ro</h3>
              
              <form onSubmit={handleNextStep} className="flex-col gap-8 pb-4">
                
                <div>
                  <div className="form-group mb-4">
                    <label>1. Mức độ rủi ro của hệ thống theo quy định nội bộ hoặc theo Luật AI</label>
                    <select name="riskLevel" value={formData.riskLevel} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Rủi ro cao">Rủi ro cao</option>
                      <option value="Trung bình">Trung bình</option>
                      <option value="Thấp">Thấp</option>
                    </select>
                    <input type="text" name="riskLevelBasis" placeholder="Nêu rõ căn cứ xác định..." value={formData.riskLevelBasis} onChange={handleChange} className="form-control" />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>2. Hệ thống có thuộc danh mục DMRR / hệ thống AI rủi ro cao hay không</label>
                    <select name="isInHighRiskList" value={formData.isInHighRiskList} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Có">Có</option>
                      <option value="Không">Không</option>
                      <option value="Đang xem xét">Đang xem xét</option>
                    </select>
                    {formData.isInHighRiskList === 'Có' && (
                      <input type="text" name="highRiskCategoryDesc" placeholder="Mô tả rõ nhóm/lĩnh vực thuộc danh mục..." value={formData.highRiskCategoryDesc} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>3. Mô tả cụ thể nếu thuộc danh mục rủi ro cao</label>
                    <textarea name="highRiskDetail" rows="3" placeholder="Ghi rõ hệ thống thuộc mục nào trong danh mục liên quan" value={formData.highRiskDetail} onChange={handleChange} className="form-control"></textarea>
                  </div>

                  <div className="form-group mb-4">
                    <label>4. Đã thực hiện đánh giá sự phù hợp theo yêu cầu pháp lý hay chưa</label>
                    <select name="complianceAssessment" value={formData.complianceAssessment} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Đã thực hiện">Đã thực hiện</option>
                      <option value="Chưa thực hiện">Chưa thực hiện</option>
                      <option value="Không áp dụng">Không áp dụng</option>
                    </select>
                    {formData.complianceAssessment === 'Đã thực hiện' && (
                      <input type="text" name="complianceAssessmentDetail" placeholder="Nêu số/văn bản hoặc kết quả chính..." value={formData.complianceAssessmentDetail} onChange={handleChange} className="form-control" />
                    )}
                  </div>
                </div>

                <div className="form-actions mt-6 pt-6 border-t flex justify-between sticky bottom-0 bg-white z-10">
                  <button type="button" className="btn btn-secondary border-none" onClick={handlePrevStep}>
                    Quay lại
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Tiếp tục Chọn nội dung đánh giá <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="card glass-card form-card fade-in">
              <h3 className="mb-2">Bạn muốn đánh giá phần nào?</h3>
              <p className="text-muted text-sm mb-6 border-b pb-4">
                Chọn một hoặc cả hai để xây dựng bộ câu hỏi phù hợp cho hệ thống {formData.systemName}.
              </p>
              
              <div className="flex-col gap-4 mb-8">
                {/* Lựa chọn 1 */}
                <button 
                  type="button" 
                  className={`selection-card w-full text-left hover:border-primary transition-colors cursor-pointer ${showSubSelect ? 'border-primary' : ''}`}
                  onClick={() => setShowSubSelect(!showSubSelect)}
                  style={{ display: 'block', background: 'white', border: showSubSelect ? '2px solid var(--primary)' : '1px solid var(--border)', padding: '1.25rem', borderRadius: '0.75rem', textAlign: 'left', width: '100%' }}
                >
                  <div className="flex items-start gap-2">
                    <Settings size={18} className="text-primary flex-shrink-0" style={{ marginTop: '4px' }} />
                    <div className="flex-1" style={{ textAlign: 'left' }}>
                      <h4 className="font-bold text-main" style={{ fontSize: '1.05rem', margin: '0 0 4px 0', textAlign: 'left' }}>1. Đánh giá khung đạo đức theo thông tư 05/2026/TT-BKHCN</h4>
                      <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0, textAlign: 'left' }}>Ấn vào đây để tiến hành làm bài đánh giá trực tiếp trên hệ thống.</p>
                    </div>
                  </div>
                </button>

                {showSubSelect && (
                  <div className="mt-2 p-4 bg-muted-light rounded-md border" style={{ width: '100%' }}>
                    <label className="text-sm font-semibold mb-2 block text-main">Chọn phương thức đánh giá:</label>
                    <select 
                      className="form-control mb-4" 
                      value={selectedAssessment} 
                      onChange={(e) => setSelectedAssessment(parseInt(e.target.value))}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                    >
                      <option value={1}>1. Đánh giá khung đạo đức theo các tiêu chí</option>
                      <option value={2}>2. Đánh giá khung đạo đức theo nguyên tắc trọng số</option>
                    </select>
                    <div className="flex justify-end">
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          if (selectedAssessment === 1) {
                            navigate('/assessment1', { state: { selection: { partB: true, partC: true }, formData: formData } });
                          } else {
                            navigate('/assessment2', { state: { selection: { partB: true, partC: true }, formData: formData } });
                          }
                        }}
                      >
                        Bắt đầu đánh giá <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Lựa chọn 2 */}
                <a 
                  href="/Khung_dao_duc_Unesco.xlsx" 
                  download
                  className="selection-card block hover:border-primary transition-colors cursor-pointer mt-4"
                  style={{ display: 'block', background: 'white', border: '1px solid var(--border)', padding: '1.25rem', borderRadius: '0.75rem', textDecoration: 'none', textAlign: 'left', width: '100%' }}
                >
                  <div className="flex items-start gap-2">
                    <Scale size={18} className="text-primary flex-shrink-0" style={{ marginTop: '4px' }} />
                    <div className="flex-1" style={{ textAlign: 'left' }}>
                      <h4 className="font-bold text-main" style={{ fontSize: '1.05rem', margin: '0 0 4px 0', textAlign: 'left' }}>2. Đánh giá tham khảo khung đạo đức theo UNESCO</h4>
                      <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0, textAlign: 'left' }}>Ấn vào đây để tải về file Excel biểu mẫu đánh giá của Unesco.</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="flex justify-start items-center mt-6 pt-4 border-t">
                <button className="btn btn-secondary text-muted border-none bg-transparent" onClick={handlePrevStep}>
                  Quay lại
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
