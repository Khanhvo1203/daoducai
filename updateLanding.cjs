const fs = require('fs');

function updateLanding() {
    let txt = fs.readFileSync('src/pages/LandingPage.jsx', 'utf8');

    // Update formData initialState
    const oldInitialState = /return \{\s*\/\/ Step 1: Hồ sơ đăng ký[\s\S]*?impactCommunity: ''\s*\};/;
    const newInitialState = `return {
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
    };`;
    txt = txt.replace(oldInitialState, newInitialState);

    // Update Step 2 form
    const oldStep2Form = /\{step === 2 && \([\s\S]*?<div className="form-actions mt-6 pt-6 border-t flex justify-between sticky bottom-0 bg-white z-10">/;
    const newStep2Form = `{step === 2 && (
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

                <div className="form-actions mt-6 pt-6 border-t flex justify-between sticky bottom-0 bg-white z-10">`;
    txt = txt.replace(oldStep2Form, newStep2Form);

    // Update Step 3 form
    const oldStep3Form = /\{step === 3 && \([\s\S]*?<div className="form-actions mt-6 pt-6 border-t flex justify-between sticky bottom-0 bg-white z-10">/;
    const newStep3Form = `{step === 3 && (
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

                <div className="form-actions mt-6 pt-6 border-t flex justify-between sticky bottom-0 bg-white z-10">`;
    txt = txt.replace(oldStep3Form, newStep3Form);

    fs.writeFileSync('src/pages/LandingPage.jsx', txt);
}

updateLanding();
console.log("LandingPage updated");
