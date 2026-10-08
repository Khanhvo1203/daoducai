import re

def rewrite_dashboard(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    new_section3 = """{/* 3. Mô tả hệ thống */}
                <div className="mb-6">
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">3. Mô tả hệ thống</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    
                    <div className="flex flex-col md:col-span-2 mt-1 font-bold text-main">Mục đích sử dụng, phạm vi và giới hạn sử dụng</div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mục đích chính:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.purpose || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Bài toán nghiệp vụ hỗ trợ/giải quyết:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.businessProblem || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Lĩnh vực ứng dụng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.domain === 'Khác' ? formData.otherDomain : formData.domain || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Người sử dụng trực tiếp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.directUser === 'Khác' ? formData.otherDirectUser : formData.directUser || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đối tượng chịu tác động:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.decisionTarget === 'Khác' ? formData.otherDecisionTarget : formData.decisionTarget || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nhóm dễ tổn thương:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.vulnerableGroup || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Ước tính số lượng người dùng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.userCount || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Phạm vi triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.deployScope === 'Khác' ? formData.otherDeployScope : formData.deployScope || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Tác động tiềm tàng nếu hoạt động sai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.potentialImpact || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Công nghệ, dữ liệu, đầu vào và đầu ra</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại công nghệ AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.aiTechType === 'Khác' ? formData.otherAiTechType : formData.aiTechType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Phát triển/Bên thứ ba:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.developType || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Nhà cung cấp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.provider || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mô hình nền/API/Thành phần:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.foundationModel || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputType === 'Khác' ? formData.otherInputType : formData.inputType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nguồn dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputSource === 'Khác' ? formData.otherInputSource : formData.inputSource || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Dữ liệu cá nhân/nhạy cảm:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.hasPersonalData || '-'} {formData.hasPersonalData === 'Có' && formData.personalDataDesc ? `- ${formData.personalDataDesc}` : ''}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại đầu ra AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.outputType === 'Khác' ? formData.otherOutputType : formData.outputType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mức độ tự động hóa:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.automationLevel === 'Khác' ? formData.otherAutomationLevel : formData.automationLevel || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mức tham gia của con người:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.humanInvolvement || '-'}</span></div>

                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Thông tin quản trị đầu mối quản trị, vận hành</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đơn vị quản lý nghiệp vụ:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.managementUnit || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Người chịu trách nhiệm cấp lãnh đạo:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.leaderInCharge || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đầu mối chuyên môn/vận hành AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.technicalContact || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Kênh tiếp nhận phản ánh/khiếu nại/sự cố:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.supportChannel || '-'}</span></div>
                  </div>
                </div>"""

    # We need to replace from `{/* 3. Mô tả hệ thống */}` up to the closing `</div>` of that section.
    # The previous section was "2. Thông tin hệ thống". So we search for `{/* 3. Mô tả hệ thống */}` down to just before `</div>\n\n              </div>\n            )}` or similar.
    
    match = re.search(r"(\{/\* 3\. Mô tả hệ thống \*\/\}.*?<div className=\"flex flex-col md:col-span-2 mt-4 font-bold text-main\">Nhận diện nhóm chịu tác động</div>\n                    <div className=\"flex flex-col\"><span className=\"text-muted mb-1\">Người dùng trực tiếp:</span><span className=\"font-medium bg-muted-light p-2 rounded\">\{formData\.impactDirectUser \|\| '-'\}</span></div>\n                    <div className=\"flex flex-col\"><span className=\"text-muted mb-1\">Đối tượng quyết định của AI:</span><span className=\"font-medium bg-muted-light p-2 rounded\">\{formData\.impactDecisionTarget \|\| '-'\}</span></div>\n                    <div className=\"flex flex-col\"><span className=\"text-muted mb-1\">Bên thứ ba bị ảnh hưởng gián tiếp:</span><span className=\"font-medium bg-muted-light p-2 rounded\">\{formData\.impactThirdParty \|\| '-'\}</span></div>\n                    <div className=\"flex flex-col\"><span className=\"text-muted mb-1\">Nhóm dễ tổn thương:</span><span className=\"font-medium bg-muted-light p-2 rounded\">\{formData\.impactVulnerable \|\| '-'\}</span></div>\n                    <div className=\"flex flex-col\"><span className=\"text-muted mb-1\">Nhân viên tổ chức:</span><span className=\"font-medium bg-muted-light p-2 rounded\">\{formData\.impactEmployee \|\| '-'\}</span></div>\n                    <div className=\"flex flex-col\"><span className=\"text-muted mb-1\">Cộng đồng/môi trường:</span><span className=\"font-medium bg-muted-light p-2 rounded\">\{formData\.impactCommunity \|\| '-'\}</span></div>\n                  </div>\n                </div>)", text, re.DOTALL)
    
    if match:
        text = text.replace(match.group(1), new_section3)
    else:
        print(f"Could not find section 3 in {filename}")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)

rewrite_dashboard('src/pages/Dashboard1.jsx')
rewrite_dashboard('src/pages/Dashboard2.jsx')
print("Dashboards updated.")
