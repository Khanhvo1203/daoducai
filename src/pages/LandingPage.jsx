import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, User, HardDrive, ArrowRight, CheckSquare, Settings, Scale, AlertTriangle, FileText } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  // 1 = Hồ sơ, 2 = Thông tin AI, 3 = Đánh giá rủi ro, 4 = Chọn bài đánh giá
  
  const [formData, setFormData] = useState({
    // Step 1: Hồ sơ đăng ký
    fullName: '',
    role: '',
    email: '',
    
    // Step 2: Thông tin AI
    systemName: '',
    aiTechType: 'ML truyền thống',
    developType: 'Tự phát triển',
    provider: '',
    foundationModel: '',
    otherThirdParty: '',
    orgRole: 'Nhà phát triển',
    otherOrgRole: '',
    purpose: '',
    domain: 'Hành chính',
    outOfScope: '',
    inputType: 'Văn bản',
    inputSource: 'Người dùng nhập',
    outputType: 'Dự đoán',
    automationLevel: 'Gợi ý cho người',
    directUser: 'Cán bộ chuyên môn',
    decisionTarget: 'Công dân',
    otherDecisionTarget: '',
    userCount: '',
    userTargetCount: '',
    deployScope: 'Cả nước',
    deployChannel: 'Nội bộ',
    misuseMain: '',
    misuseTarget: '',
    misuseIllegal: '',
    cautionSituations: '',
    technicalLimits: '',

    // Step 3: Đánh giá rủi ro
    isHighRisk: '',
    highRiskDesc: '',
    decree142: 'Chưa thực hiện',
    riskLevel: '',
    impactDirectUser: '',
    impactDecisionTarget: '',
    impactThirdParty: '',
    impactVulnerable: '',
    impactEmployee: '',
    impactCommunity: ''
  });

  const [assessmentSelection, setAssessmentSelection] = useState({
    partB: true,
    partC: true
  });

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
        {/* Left Side: Information */}
        <div className="declaration-info">
          <div className="flex items-center gap-4 mb-4">
            <div className="icon-box-lg text-primary bg-primary-light flex-shrink-0">
              <ShieldCheck size={36} />
            </div>
            <h1 className="hero-title" style={{ margin: 0 }}>
              {step === 1 && 'Hồ sơ đăng ký'}
              {step === 2 && 'Mô tả hệ thống AI'}
              {step === 3 && 'Khai báo đánh giá rủi ro'}
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
                <h4 className={`font-bold mb-1 ${step >= 2 ? 'text-primary' : 'text-muted'}`}>Mô tả hệ thống AI</h4>
                <p className="text-sm text-muted">Đặc tả hệ thống, đầu vào/đầu ra, tác động.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className={`step-circle ${step >= 3 ? '' : 'inactive'}`}>03</div>
              <div>
                <h4 className={`font-bold mb-1 ${step >= 3 ? 'text-primary' : 'text-muted'}`}>Khai báo đánh giá rủi ro</h4>
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
                    Tiếp tục Mô tả hệ thống AI <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="card glass-card form-card fade-in" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
              <h3 className="mb-4 border-b pb-4 sticky top-0 bg-white z-10 text-xl text-primary flex items-center gap-2"><HardDrive size={22}/> Mô tả hệ thống AI</h3>
              
              <form onSubmit={handleNextStep} className="flex-col gap-8 pb-4">
                
                {/* I. Thông tin chung */}
                <div>
                  <h4 className="font-bold text-main mb-3">I. Thông tin chung</h4>
                  <div className="form-group">
                    <label>1. Tên hệ thống <span className="text-danger">*</span></label>
                    <input type="text" name="systemName" required placeholder="Tên đầy đủ, không viết tắt" value={formData.systemName} onChange={handleChange} className="form-control" />
                  </div>
                </div>

                {/* II. Loại công nghệ nhà cung cấp */}
                <div>
                  <h4 className="font-bold text-main mb-3">II. Loại công nghệ & Nhà cung cấp</h4>
                  <div className="grid-2 gap-4 mb-4">
                    <div className="form-group">
                      <label>1. Loại công nghệ AI <span className="text-danger">*</span></label>
                      <select name="aiTechType" value={formData.aiTechType} onChange={handleChange} className="form-control select-control">
                        <option>ML truyền thống</option><option>Học sâu</option><option>LLM-GenAI</option><option>GPAI</option><option>Hệ thống lai</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>2. Nguồn gốc phát triển <span className="text-danger">*</span></label>
                      <select name="developType" value={formData.developType} onChange={handleChange} className="form-control select-control">
                        <option>Tự phát triển</option><option>Mua</option><option>Thuê dịch vụ</option><option>Kết hợp</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-4">
                    <label>3. Nhà cung cấp (nếu có)</label>
                    <input type="text" name="provider" placeholder="Tên nhà cung cấp, quốc gia đăng ký, sản phẩm cụ thể" value={formData.provider} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="form-group mb-4">
                    <label>4. Mô hình nền (foundation model) sử dụng (nếu có)</label>
                    <input type="text" name="foundationModel" placeholder="Tên mô hình, nhà cung cấp, phiên bản" value={formData.foundationModel} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>5. Các thành phần AI bên thứ ba khác</label>
                    <input type="text" name="otherThirdParty" placeholder="Danh sách API, SDK, dataset bên ngoài sử dụng" value={formData.otherThirdParty} onChange={handleChange} className="form-control" />
                  </div>
                </div>

                {/* III. Vai trò của tổ chức */}
                <div>
                  <h4 className="font-bold text-main mb-3">III. Vai trò của tổ chức</h4>
                  <div className="form-group mb-4">
                    <label>1. Vai trò chính <span className="text-danger">*</span></label>
                    <select name="orgRole" value={formData.orgRole} onChange={handleChange} className="form-control select-control">
                      <option>Nhà phát triển</option><option>Nhà cung cấp</option><option>Bên triển khai</option><option>Người sử dụng</option><option>Khác: điền thông tin</option>
                    </select>
                  </div>
                  {formData.orgRole === 'Khác: điền thông tin' && (
                    <div className="form-group">
                      <input type="text" name="otherOrgRole" required placeholder="Vui lòng ghi rõ vai trò" value={formData.otherOrgRole} onChange={handleChange} className="form-control" />
                    </div>
                  )}
                </div>

                {/* IV. Mục đích sử dụng dự kiến */}
                <div>
                  <h4 className="font-bold text-main mb-3">IV. Mục đích sử dụng dự kiến</h4>
                  <div className="form-group mb-4">
                    <label>1. Mục đích chính <span className="text-danger">*</span></label>
                    <textarea name="purpose" required rows="2" placeholder="Mô tả ngắn gọn" value={formData.purpose} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  <div className="form-group mb-4">
                    <label>2. Lĩnh vực ứng dụng <span className="text-danger">*</span></label>
                    <select name="domain" value={formData.domain} onChange={handleChange} className="form-control select-control">
                      <option>Y tế</option><option>Giáo dục</option><option>Tài chính</option><option>Hành chính</option><option>Khác</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>3. Giới hạn ứng dụng (Out of scope) <span className="text-danger">*</span></label>
                    <textarea name="outOfScope" required rows="2" placeholder="Các trường hợp KHÔNG ĐƯỢC sử dụng trong hệ thống" value={formData.outOfScope} onChange={handleChange} className="form-control"></textarea>
                  </div>
                </div>

                {/* V. Loại dữ liệu */}
                <div>
                  <h4 className="font-bold text-main mb-3">V. Loại dữ liệu đầu vào / đầu ra</h4>
                  <div className="grid-2 gap-4 mb-4">
                    <div className="form-group">
                      <label>1. Loại dữ liệu đầu vào <span className="text-danger">*</span></label>
                      <select name="inputType" value={formData.inputType} onChange={handleChange} className="form-control select-control">
                        <option>Văn bản</option><option>Hình ảnh</option><option>Âm thanh</option><option>Số liệu</option><option>Đa phương thức</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>2. Nguồn dữ liệu đầu vào <span className="text-danger">*</span></label>
                      <select name="inputSource" value={formData.inputSource} onChange={handleChange} className="form-control select-control">
                        <option>Người dùng nhập</option><option>CSDL nội bộ</option><option>API bên ngoài</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid-2 gap-4">
                    <div className="form-group">
                      <label>3. Loại dữ liệu đầu ra <span className="text-danger">*</span></label>
                      <select name="outputType" value={formData.outputType} onChange={handleChange} className="form-control select-control">
                        <option>Dự đoán</option><option>Phân loại</option><option>Khuyến nghị</option><option>Nội dung tạo sinh</option><option>Quyết định</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>4. Mức độ tự động hóa <span className="text-danger">*</span></label>
                      <select name="automationLevel" value={formData.automationLevel} onChange={handleChange} className="form-control select-control">
                        <option>Gợi ý cho người</option><option>Tự động thực thi</option><option>Kết hợp</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* VI. Đối tượng sử dụng */}
                <div>
                  <h4 className="font-bold text-main mb-3">VI. Đối tượng sử dụng & Tác động</h4>
                  <div className="grid-2 gap-4 mb-4">
                    <div className="form-group">
                      <label>1. Người sử dụng trực tiếp <span className="text-danger">*</span></label>
                      <select name="directUser" value={formData.directUser} onChange={handleChange} className="form-control select-control">
                        <option>Cán bộ chuyên môn</option><option>Cán bộ vận hành</option><option>Người dùng cuối</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>2. Đối tượng quyết định của AI <span className="text-danger">*</span></label>
                      <select name="decisionTarget" value={formData.decisionTarget} onChange={handleChange} className="form-control select-control">
                        <option>Công dân</option><option>Khách hàng</option><option>Nhân viên</option><option>Bệnh nhân</option><option>Khác: điền thông tin</option>
                      </select>
                    </div>
                  </div>
                  {formData.decisionTarget === 'Khác: điền thông tin' && (
                    <div className="form-group mb-4">
                      <input type="text" name="otherDecisionTarget" required placeholder="Vui lòng ghi rõ đối tượng" value={formData.otherDecisionTarget} onChange={handleChange} className="form-control" />
                    </div>
                  )}
                  <div className="form-group mb-4">
                    <label>3. Số lượng người dùng dự kiến <span className="text-danger">*</span></label>
                    <div className="flex gap-2">
                      <input type="text" name="userCount" required placeholder="Số người..." value={formData.userCount} onChange={handleChange} className="form-control" />
                      <div className="flex items-center text-muted px-2">/</div>
                      <input type="text" name="userTargetCount" required placeholder="Đối tượng dự kiến mỗi tháng..." value={formData.userTargetCount} onChange={handleChange} className="form-control" />
                    </div>
                  </div>
                  <div className="grid-2 gap-4">
                    <div className="form-group">
                      <label>4. Phạm vi triển khai <span className="text-danger">*</span></label>
                      <select name="deployScope" value={formData.deployScope} onChange={handleChange} className="form-control select-control">
                        <option>Cả nước</option><option>Một số tỉnh</option><option>Một địa phương</option><option>Quốc tế</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>5. Kênh triển khai <span className="text-danger">*</span></label>
                      <select name="deployChannel" value={formData.deployChannel} onChange={handleChange} className="form-control select-control">
                        <option>Nội bộ</option><option>Khách hàng</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* VII. Trường hợp sử dụng sai */}
                <div>
                  <h4 className="font-bold text-main mb-3">VII. Các trường hợp sử dụng sai có thể dự đoán</h4>
                  <div className="form-group mb-4">
                    <label>1. Sử dụng ngoài mục đích chính</label>
                    <textarea name="misuseMain" rows="2" placeholder="Ví dụ cụ thể..." value={formData.misuseMain} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  <div className="form-group mb-4">
                    <label>2. Sử dụng cho nhóm đối tượng không dự kiến</label>
                    <textarea name="misuseTarget" rows="2" placeholder="Ví dụ cụ thể..." value={formData.misuseTarget} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  <div className="form-group">
                    <label>3. Cố ý lạm dụng mục đích trái pháp luật</label>
                    <textarea name="misuseIllegal" rows="2" placeholder="Ví dụ cụ thể..." value={formData.misuseIllegal} onChange={handleChange} className="form-control"></textarea>
                  </div>
                </div>

                {/* VIII. Cảnh báo */}
                <div>
                  <h4 className="font-bold text-main mb-3">VIII. Cảnh báo cho người vận hành</h4>
                  <div className="form-group mb-4">
                    <label>1. Các tình huống cần thận trọng <span className="text-danger">*</span></label>
                    <textarea name="cautionSituations" required rows="2" placeholder="Liệt kê 3-5 tình huống cụ thể..." value={formData.cautionSituations} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  <div className="form-group">
                    <label>2. Các hạn chế kỹ thuật biết trước <span className="text-danger">*</span></label>
                    <textarea name="technicalLimits" required rows="2" placeholder="Các hạn chế kỹ thuật..." value={formData.technicalLimits} onChange={handleChange} className="form-control"></textarea>
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
              <h3 className="mb-4 border-b pb-4 sticky top-0 bg-white z-10 text-xl text-primary flex items-center gap-2"><AlertTriangle size={22}/> Khai báo đánh giá rủi ro</h3>
              
              <form onSubmit={handleNextStep} className="flex-col gap-8 pb-4">
                
                {/* I. Cổng pháp lý */}
                <div>
                  <h4 className="font-bold text-main mb-3">I. Cổng pháp lý - Đối chiếu danh mục rủi ro</h4>
                  <div className="form-group mb-4">
                    <label className="font-bold block mb-2">1. Hệ thống có thuộc danh mục rủi ro cao theo QĐ 33/2026/QĐ-TTg không? <span className="text-danger">*</span></label>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.isHighRisk === 'Có'} onChange={() => setFormData({...formData, isHighRisk: 'Có'})} style={{width: '18px', height: '18px'}} />
                        <span>Có</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={formData.isHighRisk === 'Không'} onChange={() => setFormData({...formData, isHighRisk: 'Không'})} style={{width: '18px', height: '18px'}} />
                        <span>Không</span>
                      </label>
                    </div>
                  </div>


                  <div className="form-group mb-4">
                    <label>2. Đã thực hiện đánh giá sự phù hợp theo Điều 7 Nghị định 142/NĐ-CP? <span className="text-danger">*</span></label>
                    <select name="decree142" value={formData.decree142} onChange={handleChange} className="form-control select-control">
                      <option>Đã thực hiện</option><option>Chưa thực hiện</option><option>Hệ thống không thuộc yêu cầu</option>
                    </select>
                  </div>

                  <div className="form-group mb-4">
                    <label className="font-bold block mb-2">3. Phân loại rủi ro (Tự đánh giá) <span className="text-danger">*</span></label>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="riskLevel" value="Thấp" checked={formData.riskLevel === 'Thấp'} onChange={handleChange} required style={{width: '16px', height: '16px', accentColor: '#2b56f5'}} />
                        <span>Thấp</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="riskLevel" value="Trung bình" checked={formData.riskLevel === 'Trung bình'} onChange={handleChange} required style={{width: '16px', height: '16px', accentColor: '#2b56f5'}} />
                        <span>Trung bình</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* II. Nhận diện nhóm chịu tác động */}
                <div>
                  <h4 className="font-bold text-main mb-3">II. Nhận diện nhóm chịu tác động</h4>
                  <div className="text-sm text-muted mb-4 border-l-4 border-secondary pl-3 py-1 bg-muted-light">
                    Mô tả rõ mức độ ảnh hưởng và quy mô (số lượng người, khu vực...) đối với từng nhóm.
                  </div>

                  <div className="form-group mb-4">
                    <label>1. Người dùng trực tiếp <span className="text-danger">*</span></label>
                    <textarea name="impactDirectUser" required rows="2" placeholder="Mô tả và quy mô..." value={formData.impactDirectUser} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  <div className="form-group mb-4">
                    <label>2. Đối tượng quyết định của AI <span className="text-danger">*</span></label>
                    <textarea name="impactDecisionTarget" required rows="2" placeholder="Mô tả và quy mô..." value={formData.impactDecisionTarget} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  <div className="form-group mb-4">
                    <label>3. Bên thứ ba bị ảnh hưởng gián tiếp <span className="text-danger">*</span></label>
                    <textarea name="impactThirdParty" required rows="2" placeholder="Mô tả và quy mô..." value={formData.impactThirdParty} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  <div className="form-group mb-4">
                    <label>4. Nhóm dễ tổn thương (trẻ em, người cao tuổi, dân tộc thiểu số, người khuyết tật) <span className="text-danger">*</span></label>
                    <textarea name="impactVulnerable" required rows="2" placeholder="Liệt kê các nhóm cụ thể và quy mô..." value={formData.impactVulnerable} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  <div className="form-group mb-4">
                    <label>5. Nhân viên tổ chức có thể bị thay đổi công việc do AI <span className="text-danger">*</span></label>
                    <textarea name="impactEmployee" required rows="2" placeholder="Mô tả..." value={formData.impactEmployee} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  <div className="form-group">
                    <label>6. Cộng đồng/môi trường rộng hơn chịu tác động <span className="text-danger">*</span></label>
                    <textarea name="impactCommunity" required rows="2" placeholder="Mô tả tác động xã hội/môi trường..." value={formData.impactCommunity} onChange={handleChange} className="form-control"></textarea>
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
                  className="selection-card w-full text-left hover:border-primary transition-colors cursor-pointer" 
                  onClick={() => {
                    navigate('/assessment', { 
                      state: { 
                        selection: { partB: true, partC: true },
                        formData: formData
                      } 
                    });
                  }}
                  style={{ display: 'block', background: 'white', border: '1px solid var(--border)', padding: '1.25rem', borderRadius: '0.75rem', textAlign: 'left', width: '100%' }}
                >
                  <div className="flex items-start gap-2">
                    <Settings size={18} className="text-primary flex-shrink-0" style={{ marginTop: '4px' }} />
                    <div className="flex-1" style={{ textAlign: 'left' }}>
                      <h4 className="font-bold text-main" style={{ fontSize: '1.05rem', margin: '0 0 4px 0', textAlign: 'left' }}>1. Đánh giá khung đạo đức theo thông tư 05/2026/TT-BKHCN</h4>
                      <p className="text-muted" style={{ fontSize: '0.9rem', margin: 0, textAlign: 'left' }}>Ấn vào đây để tiến hành làm bài đánh giá trực tiếp trên hệ thống.</p>
                    </div>
                  </div>
                </button>

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
                      <h4 className="font-bold text-main" style={{ fontSize: '1.05rem', margin: '0 0 4px 0', textAlign: 'left' }}>2. Đánh giá khung đạo đức theo Unesco</h4>
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
