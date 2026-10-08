import re

def update_dashboard(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # Define the new "2. Thông tin hệ thống" which only contains the 10 basic fields
    new_info_system = """{/* 2. Thông tin hệ thống */}
                <div className="mb-6">
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">2. Thông tin hệ thống</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col md:col-span-2 mt-1 font-bold text-main">Thông tin quản trị đầu mối</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Tên hệ thống AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.systemName || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mã hệ thống:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.internalCode || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Phiên bản / Cập nhật:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.version || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Cơ quan/Đơn vị triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.agencyName || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Vai trò tổ chức:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.orgRole === 'Khác: điền thông tin' ? formData.otherOrgRole : formData.orgRole || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Căn cứ pháp lý:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.legalBasis || '-'}</span></div>

                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Mức độ rủi ro</div>
                    <div className="flex flex-col md:col-span-2">
                        <span className="text-muted mb-1">Mức độ rủi ro:</span>
                        <div className="bg-muted-light p-2 rounded">
                            <span className={`px-2 py-1 rounded font-bold mr-2 ${formData.riskLevel === 'Rủi ro cao' ? 'bg-danger-light text-danger' : formData.riskLevel === 'Trung bình' ? 'bg-warning-light text-warning' : formData.riskLevel === 'Thấp' ? 'bg-success-light text-success' : 'bg-muted-light text-muted'}`}>{formData.riskLevel || '-'}</span>
                            <span>{formData.riskLevelBasis ? `Căn cứ: ${formData.riskLevelBasis}` : ''}</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Thuộc danh mục rủi ro cao:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.isInHighRiskList || '-'} {formData.isInHighRiskList === 'Có' && formData.highRiskCategoryDesc ? `- ${formData.highRiskCategoryDesc}` : ''}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mô tả cụ thể (nếu thuộc DM rủi ro cao):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.highRiskDetail || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Đánh giá sự phù hợp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.complianceAssessment || '-'} {formData.complianceAssessment === 'Đã thực hiện' && formData.complianceAssessmentDetail ? `- ${formData.complianceAssessmentDetail}` : ''}</span></div>
                  </div>
                </div>

                {/* 3. Mô tả hệ thống */}
                <div>
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">3. Mô tả hệ thống</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col md:col-span-2 mt-1 font-bold text-main">Loại công nghệ & Nhà cung cấp</div>"""

    # We want to replace from `{/* 2. Thông tin hệ thống */}` up to the "Loại công nghệ AI" line
    
    match1 = re.search(r"(\{/\* 2\. Thông tin hệ thống \*\/\}.*?<div className=\"flex flex-col\"><span className=\"text-muted mb-1\">Loại công nghệ AI:</span><span className=\"font-medium bg-muted-light p-2 rounded\">\{formData\.aiTechType \|\| '-'\}</span></div>)", text, re.DOTALL)
    
    if match1:
        text = text.replace(match1.group(1), new_info_system + "\n                    <div className=\"flex flex-col\"><span className=\"text-muted mb-1\">Loại công nghệ AI:</span><span className=\"font-medium bg-muted-light p-2 rounded\">{formData.aiTechType || '-'}</span></div>")

    # Now we need to remove the "3. Khai báo đánh giá rủi ro" block entirely because it's replaced by the new "3. Mô tả hệ thống" header above, and the impact fields are already inside it!
    # Wait, in the old file, "3. Khai báo đánh giá rủi ro" contained the highRisk, decree142, riskLevel, AND impact fields.
    # I should replace the start of "3. Khai báo đánh giá rủi ro" up to the "Nhận diện nhóm chịu tác động" with NOTHING (because we already added risk level to section 2).
    
    old_risk_header = """{/* 3. Khai báo đánh giá rủi ro */}
                <div>
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">3. Khai báo đánh giá rủi ro</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col"><span className="text-muted mb-1">Thuộc DM rủi ro cao theo QĐ 33/2026/QĐ-TTg:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.isHighRisk || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đánh giá theo Điều 7 NĐ 142/NĐ-CP:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.decree142 || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Phân loại rủi ro (Tự đánh giá):</span>
                      <span className={`px-3 py-2 rounded font-bold w-fit ${formData.riskLevel === 'Cao' ? 'bg-danger-light text-danger' : formData.riskLevel === 'Trung bình' ? 'bg-warning-light text-warning' : formData.riskLevel === 'Thấp' ? 'bg-success-light text-success' : 'bg-muted-light text-muted'}`}>
                        {formData.riskLevel || 'Chưa đánh giá'}
                      </span>
                    </div>"""
                    
    # Use regex to find it, since the exact string might have variations
    match2 = re.search(r"(\{/\* 3\. Khai báo đánh giá rủi ro \*\/\}.*?<div className=\"flex flex-col md:col-span-2 mt-2 font-bold text-main\">Nhận diện nhóm chịu tác động</div>)", text, re.DOTALL)
    
    if match2:
        text = text.replace(match2.group(1), '<div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Nhận diện nhóm chịu tác động</div>')

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)

update_dashboard('src/pages/Dashboard1.jsx')
update_dashboard('src/pages/Dashboard2.jsx')
print("Dashboards updated successfully")
