const fs = require('fs');

let txt = fs.readFileSync('src/pages/LandingPage.jsx', 'utf8');

const s1 = txt.indexOf('{/* II. Loại công nghệ');
const e1 = txt.indexOf('<div className="form-actions mt-6 pt-6 border-t flex justify-between sticky bottom-0 bg-white z-10">', s1);

const section2to8 = txt.substring(s1, e1);

const s2 = txt.indexOf('{/* II. Nhận diện nhóm chịu tác động');
const e2 = txt.indexOf('<div className="form-actions mt-6 pt-6 border-t flex justify-between sticky bottom-0 bg-white z-10">', s2);

const section_tacdong = txt.substring(s2, e2);

// Rebuild Step 3 Form
const new_step3_form = `{step === 3 && (
            <div className="card glass-card form-card fade-in" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
              <h3 className="mb-4 border-b pb-4 sticky top-0 bg-white z-10 text-xl text-primary flex items-center gap-2"><AlertTriangle size={22}/> Mô tả hệ thống</h3>
              
              <form onSubmit={handleNextStep} className="flex-col gap-8 pb-4">
                
` + section2to8 + section_tacdong + `
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
          )}`;

const oldStep3BlockStart = txt.indexOf("{step === 3 && ('Khai báo đánh giá rủi ro' ?"); // wait, no
const step3RenderStart = txt.indexOf("{step === 3 && (");
const step3RenderEnd = txt.indexOf(")}", txt.indexOf("Tiếp tục Chọn nội dung đánh giá", step3RenderStart)) + 2;

txt = txt.substring(0, step3RenderStart) + new_step3_form + txt.substring(step3RenderEnd);

// Now Step 2 Form
const new_step2_form = `{step === 2 && (
            <div className="card glass-card form-card fade-in" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
              <h3 className="mb-4 border-b pb-4 sticky top-0 bg-white z-10 text-xl text-primary flex items-center gap-2"><HardDrive size={22}/> Thông tin hệ thống</h3>
              
              <form onSubmit={handleNextStep} className="flex-col gap-8 pb-4">
                
                <div>
                  <h4 className="font-bold text-main mb-4 mt-2">1. Thông tin hệ thống AI và thông tin quản trị đầu mối</h4>
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
                    <input type="text" name="agencyName" placeholder="Ghi rõ tên pháp lý của tổ chức/đơn vị sử dụng hoặc triển khai." value={formData.agencyName || ''} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="form-group mb-4">
                    <label>5. Vai trò chính của tổ chức</label>
                    <select name="orgRole" value={formData.orgRole} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Nhà phát triển">Nhà phát triển</option>
                      <option value="Nhà cung cấp">Nhà cung cấp</option>
                      <option value="Bên triển khai">Bên triển khai</option>
                      <option value="Người sử dụng">Người sử dụng</option>
                      <option value="Khác: điền thông tin">Khác, ghi rõ</option>
                    </select>
                    {formData.orgRole === 'Khác: điền thông tin' && (
                      <input type="text" name="otherOrgRole" required placeholder="Vui lòng ghi rõ vai trò" value={formData.otherOrgRole} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>6. Căn cứ pháp lý triển khai hệ thống (nếu có)</label>
                    <input type="text" name="legalBasis" placeholder="Ghi văn bản pháp lý, quyết định triển khai, quy chế nội bộ hoặc hợp đồng liên quan." value={formData.legalBasis || ''} onChange={handleChange} className="form-control" />
                  </div>
                </div>

                <div>
                  <div className="section-divider"></div>
                  <h4 className="font-bold text-main mb-4 mt-2">2. Mức độ Rủi ro</h4>
                  <div className="form-group mb-4">
                    <label>1. Mức độ rủi ro của hệ thống theo quy định nội bộ hoặc theo Luật AI</label>
                    <select name="riskLevel" value={formData.riskLevel} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Rủi ro cao">Rủi ro cao</option>
                      <option value="Trung bình">Trung bình</option>
                      <option value="Thấp">Thấp</option>
                    </select>
                    <input type="text" name="riskLevelBasis" placeholder="Nêu rõ căn cứ xác định..." value={formData.riskLevelBasis || ''} onChange={handleChange} className="form-control" />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>2. Hệ thống có thuộc danh mục DMRR / hệ thống AI rủi ro cao hay không</label>
                    <select name="isInHighRiskList" value={formData.isInHighRiskList || 'Không'} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Có">Có</option>
                      <option value="Không">Không</option>
                      <option value="Đang xem xét">Đang xem xét</option>
                    </select>
                    {formData.isInHighRiskList === 'Có' && (
                      <input type="text" name="highRiskCategoryDesc" placeholder="Mô tả rõ nhóm/lĩnh vực thuộc danh mục..." value={formData.highRiskCategoryDesc || ''} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>3. Mô tả cụ thể nếu thuộc danh mục rủi ro cao</label>
                    <textarea name="highRiskDetail" rows="3" placeholder="Ghi rõ hệ thống thuộc mục nào trong danh mục liên quan" value={formData.highRiskDetail || ''} onChange={handleChange} className="form-control"></textarea>
                  </div>

                  <div className="form-group mb-4">
                    <label>4. Đã thực hiện đánh giá sự phù hợp theo yêu cầu pháp lý hay chưa</label>
                    <select name="complianceAssessment" value={formData.complianceAssessment || 'Chưa thực hiện'} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Đã thực hiện">Đã thực hiện</option>
                      <option value="Chưa thực hiện">Chưa thực hiện</option>
                      <option value="Không áp dụng">Không áp dụng</option>
                    </select>
                    {formData.complianceAssessment === 'Đã thực hiện' && (
                      <input type="text" name="complianceAssessmentDetail" placeholder="Nêu số/văn bản hoặc kết quả chính..." value={formData.complianceAssessmentDetail || ''} onChange={handleChange} className="form-control" />
                    )}
                  </div>
                </div>

                <div className="form-actions mt-6 pt-6 border-t flex justify-between sticky bottom-0 bg-white z-10">
                  <button type="button" className="btn btn-secondary border-none" onClick={handlePrevStep}>
                    Quay lại
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Tiếp tục Mô tả hệ thống <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          )}`;

const step2RenderStart = txt.indexOf("{step === 2 && (");
const step2RenderEnd = txt.indexOf(")}", txt.indexOf("Tiếp tục Đánh giá rủi ro", step2RenderStart)) + 2;

txt = txt.substring(0, step2RenderStart) + new_step2_form + txt.substring(step2RenderEnd);

// Sidebars & State
txt = txt.replace(
    '<p className="text-sm text-muted">Đặc tả hệ thống, đầu vào/đầu ra, tác động.</p>',
    '<p className="text-sm text-muted">Thông tin cơ bản và mức độ rủi ro.</p>'
);
txt = txt.replace(
    '<h4 className={`font-bold mb-1 ${step >= 3 ? \'text-primary\' : \'text-muted\'}`}>Khai báo đánh giá rủi ro</h4>',
    '<h4 className={`font-bold mb-1 ${step >= 3 ? \'text-primary\' : \'text-muted\'}`}>Mô tả hệ thống</h4>'
);
txt = txt.replace(
    '<p className="text-sm text-muted">Đối chiếu pháp lý và nhận diện nhóm chịu tác động.</p>',
    '<p className="text-sm text-muted">Đặc tả hệ thống, quy trình và tác động.</p>'
);

txt = txt.replace(
    "{step === 3 && 'Khai báo đánh giá rủi ro'}",
    "{step === 3 && 'Mô tả hệ thống'}"
);
txt = txt.replace(
    "{step === 3 && 'Đánh giá các rủi ro pháp lý và tác động đến con người, xã hội.'}",
    "{step === 3 && 'Mô tả chi tiết kỹ thuật và đánh giá các tác động đến con người, xã hội.'}"
);

// State
txt = txt.replace(
    /managementUnit: '',\s*personInCharge: '',/,
    `agencyName: '',
      legalBasis: '',`
);
txt = txt.replace(
    /isHighRisk: '',\s*highRiskDesc: '',\s*decree142: 'Chưa thực hiện',\s*riskLevel: '',/,
    `riskLevel: 'Trung bình',
      riskLevelBasis: '',
      isInHighRiskList: 'Không',
      highRiskCategoryDesc: '',
      highRiskDetail: '',
      complianceAssessment: 'Chưa thực hiện',
      complianceAssessmentDetail: '',`
);

fs.writeFileSync('src/pages/LandingPage.jsx', txt);
