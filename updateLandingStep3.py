import re

def rewrite_landing():
    with open('src/pages/LandingPage.jsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Update initial state
    # We will just replace everything from `// Step 3: Mức độ Rủi ro` to the end of the initial state.
    # Wait, the previous script added step 2 and step 3 fields.
    # Let's just find the whole return { ... }; block.
    
    match = re.search(r'return \{.*?// Step 3: Mức độ Rủi ro.*?complianceAssessmentDetail: \'\'\n    \};', text, re.DOTALL)
    
    if match:
        old_state = match.group(0)
        # We need to append the new fields to it.
        # Let's reconstruct the whole state to be safe.
        new_state = """return {
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
      
      // Step 2.2: Mức độ Rủi ro
      riskLevel: 'Trung bình',
      riskLevelBasis: '',
      isInHighRiskList: 'Không',
      highRiskCategoryDesc: '',
      highRiskDetail: '',
      complianceAssessment: 'Chưa thực hiện',
      complianceAssessmentDetail: '',

      // Step 3.1: Mục đích sử dụng, phạm vi và giới hạn
      purpose: '',
      businessProblem: '',
      domain: 'Hành chính',
      otherDomain: '',
      directUser: 'Cán bộ vận hành',
      otherDirectUser: '',
      decisionTarget: 'Công dân',
      otherDecisionTarget: '',
      vulnerableGroup: '',
      userCount: '',
      deployScope: 'Toàn quốc',
      otherDeployScope: '',
      potentialImpact: '',

      // Step 3.2: Công nghệ, dữ liệu, đầu vào và đầu ra
      aiTechType: 'Học máy truyền thống',
      otherAiTechType: '',
      developType: 'Tự phát triển',
      provider: '',
      foundationModel: '',
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
      humanInvolvement: '',

      // Step 3.3: Thông tin quản trị đầu mối quản trị, vận hành
      managementUnit: '',
      leaderInCharge: '',
      technicalContact: '',
      supportChannel: ''
    };"""
        text = text.replace(old_state, new_state)

    # 2. Rewrite Step 3 form
    # We will replace everything from `{step === 3 && (` to `Tiếp tục Chọn nội dung đánh giá <ArrowRight size={18} />\n                  </button>\n                </div>\n              </form>\n            </div>\n          )}`
    
    new_step3_form = """{step === 3 && (
            <div className="card glass-card form-card fade-in" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
              <h3 className="mb-4 border-b pb-4 sticky top-0 bg-white z-10 text-xl text-primary flex items-center gap-2"><AlertTriangle size={22}/> Mô tả hệ thống</h3>
              
              <form onSubmit={handleNextStep} className="flex-col gap-8 pb-4">
                
                {/* 1. Mục đích sử dụng */}
                <div>
                  <h4 className="font-bold text-main mb-4 mt-2">1. Mục đích sử dụng, phạm vi và giới hạn sử dụng</h4>
                  
                  <div className="form-group mb-4">
                    <label>1. Mục đích chính của hệ thống AI <span className="text-danger">*</span></label>
                    <textarea name="purpose" required rows="2" placeholder="Mô tả ngắn gọn hệ thống được thiết kế để làm gì." value={formData.purpose} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>2. Bài toán nghiệp vụ mà AI hỗ trợ/giải quyết</label>
                    <textarea name="businessProblem" rows="2" placeholder="Làm rõ vai trò của AI trong quy trình nghiệp vụ." value={formData.businessProblem} onChange={handleChange} className="form-control"></textarea>
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>3. Lĩnh vực ứng dụng</label>
                    <select name="domain" value={formData.domain} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Y tế">Y tế</option><option value="Giáo dục">Giáo dục</option><option value="Tài chính">Tài chính</option><option value="Hành chính">Hành chính</option><option value="Lao động">Lao động</option><option value="An sinh">An sinh</option><option value="Thương mại">Thương mại</option><option value="Marketing">Marketing</option><option value="Sản xuất">Sản xuất</option><option value="Logistics">Logistics</option><option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.domain === 'Khác' && (
                      <input type="text" name="otherDomain" required placeholder="Ghi rõ lĩnh vực..." value={formData.otherDomain} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>4. Người sử dụng trực tiếp</label>
                    <select name="directUser" value={formData.directUser} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Cán bộ chuyên môn">Cán bộ chuyên môn</option><option value="Cán bộ vận hành">Cán bộ vận hành</option><option value="Người dùng cuối">Người dùng cuối</option><option value="Khách hàng">Khách hàng</option><option value="Đối tác">Đối tác</option><option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.directUser === 'Khác' && (
                      <input type="text" name="otherDirectUser" required placeholder="Ghi rõ đối tượng..." value={formData.otherDirectUser} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>5. Đối tượng chịu tác động của kết quả AI</label>
                    <select name="decisionTarget" value={formData.decisionTarget} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Công dân">Công dân</option><option value="Khách hàng">Khách hàng</option><option value="Nhân viên">Nhân viên</option><option value="Bệnh nhân">Bệnh nhân</option><option value="Học sinh-sinh viên">Học sinh-sinh viên</option><option value="Đối tác">Đối tác</option><option value="Cộng đồng">Cộng đồng</option><option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.decisionTarget === 'Khác' && (
                      <input type="text" name="otherDecisionTarget" required placeholder="Ghi rõ đối tượng..." value={formData.otherDecisionTarget} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>6. Nhóm dễ tổn thương có thể bị ảnh hưởng</label>
                    <textarea name="vulnerableGroup" rows="2" placeholder="Ví dụ: trẻ em, người cao tuổi, người khuyết tật... Nếu không có thì ghi 'Không xác định'." value={formData.vulnerableGroup} onChange={handleChange} className="form-control"></textarea>
                  </div>

                  <div className="form-group mb-4">
                    <label>7. Ước tính số lượng người dùng dự kiến</label>
                    <input type="text" name="userCount" placeholder="Ước lượng quy mô triển khai dự kiến hoặc tần suất sử dụng." value={formData.userCount} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="form-group mb-4">
                    <label>8. Phạm vi triển khai</label>
                    <select name="deployScope" value={formData.deployScope} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Toàn quốc">Toàn quốc</option><option value="Một số tỉnh-thành">Một số tỉnh-thành</option><option value="Một địa phương">Một địa phương</option><option value="Nội bộ doanh nghiệp">Nội bộ doanh nghiệp</option><option value="Quốc tế">Quốc tế</option><option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.deployScope === 'Khác' && (
                      <input type="text" name="otherDeployScope" required placeholder="Ghi rõ phạm vi..." value={formData.otherDeployScope} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>9. Tác động tiềm tàng nếu hệ thống hoạt động sai hoặc bị lạm dụng</label>
                    <textarea name="potentialImpact" rows="2" placeholder="Mô tả tác động đến quyền lợi cá nhân, tổ chức, xã hội, uy tín, tài chính hoặc an toàn." value={formData.potentialImpact} onChange={handleChange} className="form-control"></textarea>
                  </div>
                </div>

                {/* 2. Công nghệ, dữ liệu */}
                <div>
                  <div className="section-divider"></div>
                  <h4 className="font-bold text-main mb-4 mt-2">2. Công nghệ, dữ liệu, đầu vào và đầu ra</h4>
                  
                  <div className="form-group mb-4">
                    <label>1. Loại công nghệ AI</label>
                    <select name="aiTechType" value={formData.aiTechType} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Học máy truyền thống">Học máy truyền thống</option><option value="Học sâu">Học sâu</option><option value="NLP">NLP</option><option value="Thị giác máy tính">Thị giác máy tính</option><option value="Hệ gợi ý">Hệ gợi ý</option><option value="Hệ chuyên gia">Hệ chuyên gia</option><option value="LLM-GenAI">LLM-GenAI</option><option value="Đa phương thức">Đa phương thức</option><option value="Hệ lai">Hệ lai</option><option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.aiTechType === 'Khác' && (
                      <input type="text" name="otherAiTechType" required placeholder="Ghi rõ công nghệ..." value={formData.otherAiTechType} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>2. Tự phát triển hay từ bên thứ ba</label>
                    <select name="developType" value={formData.developType} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Tự phát triển">Tự phát triển</option><option value="Mua">Mua</option><option value="Thuê dịch vụ">Thuê dịch vụ</option><option value="API">API</option><option value="Kết hợp">Kết hợp</option>
                    </select>
                  </div>

                  <div className="form-group mb-4">
                    <label>3. Nhà cung cấp hệ thống/mô hình (nếu có)</label>
                    <input type="text" name="provider" placeholder="Ghi tên nhà cung cấp, sản phẩm/dịch vụ, quốc gia hoặc website nếu cần." value={formData.provider} onChange={handleChange} className="form-control" />
                  </div>

                  <div className="form-group mb-4">
                    <label>4. Mô hình nền / API / thành phần AI bên thứ ba</label>
                    <textarea name="foundationModel" rows="2" placeholder="Bổ sung khi dùng foundation model, dịch vụ cloud AI, SDK, API hoặc dataset bên ngoài." value={formData.foundationModel} onChange={handleChange} className="form-control"></textarea>
                  </div>

                  <div className="form-group mb-4">
                    <label>5. Loại dữ liệu đầu vào</label>
                    <select name="inputType" value={formData.inputType} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Văn bản">Văn bản</option><option value="Hình ảnh">Hình ảnh</option><option value="Âm thanh">Âm thanh</option><option value="Video">Video</option><option value="Số liệu">Số liệu</option><option value="Hồ sơ cá nhân">Hồ sơ cá nhân</option><option value="Dữ liệu cảm biến">Dữ liệu cảm biến</option><option value="Đa phương thức">Đa phương thức</option><option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.inputType === 'Khác' && (
                      <input type="text" name="otherInputType" required placeholder="Ghi rõ loại dữ liệu..." value={formData.otherInputType} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>6. Nguồn dữ liệu đầu vào</label>
                    <select name="inputSource" value={formData.inputSource} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Người dùng nhập">Người dùng nhập</option><option value="CSDL nội bộ">CSDL nội bộ</option><option value="CSDL đối tác">CSDL đối tác</option><option value="API bên ngoài">API bên ngoài</option><option value="Internet">Internet</option><option value="Dữ liệu tổng hợp">Dữ liệu tổng hợp</option><option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.inputSource === 'Khác' && (
                      <input type="text" name="otherInputSource" required placeholder="Ghi rõ nguồn dữ liệu..." value={formData.otherInputSource} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>7. Dữ liệu cá nhân hoặc dữ liệu nhạy cảm có được xử lý hay không</label>
                    <select name="hasPersonalData" value={formData.hasPersonalData} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Có">Có</option><option value="Không">Không</option>
                    </select>
                    {formData.hasPersonalData === 'Có' && (
                      <textarea name="personalDataDesc" rows="2" placeholder="Mô tả loại dữ liệu và biện pháp kiểm soát. Ví dụ: phân quyền truy cập, ẩn danh hóa, mã hóa..." value={formData.personalDataDesc} onChange={handleChange} className="form-control"></textarea>
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>8. Loại đầu ra AI</label>
                    <select name="outputType" value={formData.outputType} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Dự đoán">Dự đoán</option><option value="Phân loại">Phân loại</option><option value="Khuyến nghị">Khuyến nghị</option><option value="Chấm điểm">Chấm điểm</option><option value="Phát hiện bất thường">Phát hiện bất thường</option><option value="Nội dung tạo sinh">Nội dung tạo sinh</option><option value="Tóm tắt">Tóm tắt</option><option value="Dịch">Dịch</option><option value="Quyết định hỗ trợ">Quyết định hỗ trợ</option><option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.outputType === 'Khác' && (
                      <input type="text" name="otherOutputType" required placeholder="Ghi rõ loại đầu ra..." value={formData.otherOutputType} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>9. Mức độ tự động hóa đầu ra</label>
                    <select name="automationLevel" value={formData.automationLevel} onChange={handleChange} className="form-control select-control mb-2">
                      <option value="Gợi ý cho người dùng">Gợi ý cho người dùng</option><option value="Người kiểm tra rồi phê duyệt">Người kiểm tra rồi phê duyệt</option><option value="Tự động thực thi có giám sát">Tự động thực thi có giám sát</option><option value="Tự động thực thi">Tự động thực thi</option><option value="Khác">Khác, ghi rõ</option>
                    </select>
                    {formData.automationLevel === 'Khác' && (
                      <input type="text" name="otherAutomationLevel" required placeholder="Ghi rõ mức độ..." value={formData.otherAutomationLevel} onChange={handleChange} className="form-control" />
                    )}
                  </div>

                  <div className="form-group mb-4">
                    <label>10. Mức tham gia của con người</label>
                    <textarea name="humanInvolvement" rows="2" placeholder="Mô tả: Human-in-the-loop / Human-over-the-loop / Human-out-of-the-loop hoặc mô tả tương đương: nêu quyền can thiệp/dừng hệ thống." value={formData.humanInvolvement} onChange={handleChange} className="form-control"></textarea>
                  </div>
                </div>

                {/* 3. Thông tin quản trị */}
                <div>
                  <div className="section-divider"></div>
                  <h4 className="font-bold text-main mb-4 mt-2">3. Thông tin quản trị đầu mối quản trị, vận hành</h4>
                  
                  <div className="form-group mb-4">
                    <label>1. Đơn vị quản lý nghiệp vụ</label>
                    <input type="text" name="managementUnit" placeholder="Ví dụ: Phòng Kinh doanh / Phòng CNTT / Khối Vận hành" value={formData.managementUnit} onChange={handleChange} className="form-control" />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>2. Người chịu trách nhiệm cấp lãnh đạo</label>
                    <input type="text" name="leaderInCharge" placeholder="Họ tên, chức vụ, email/điện thoại: đây là trường nên có để phục vụ quản trị tối thiểu." value={formData.leaderInCharge} onChange={handleChange} className="form-control" />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>3. Đầu mối chuyên môn / vận hành AI</label>
                    <input type="text" name="technicalContact" placeholder="Họ tên, chức vụ, bộ phận liên hệ." value={formData.technicalContact} onChange={handleChange} className="form-control" />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label>4. Kênh tiếp nhận phản ánh / khiếu nại / sự cố</label>
                    <input type="text" name="supportChannel" placeholder="Email / hotline / ticket / đầu mối tiếp nhận." value={formData.supportChannel} onChange={handleChange} className="form-control" />
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
          )}"""

    step3_match = re.search(r"\{step === 3 && \([\s\S]*?Tiếp tục Chọn nội dung đánh giá <ArrowRight size=\{18\} />\n                  </button>\n                </div>\n              </form>\n            </div>\n          \)\}", text)
    if step3_match:
        text = text.replace(step3_match.group(0), new_step3_form)

    with open('src/pages/LandingPage.jsx', 'w', encoding='utf-8') as f:
        f.write(text)

rewrite_landing()
print("LandingPage updated.")
