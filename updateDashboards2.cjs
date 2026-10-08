const fs = require('fs');

function updateDashboard(file) {
    let txt = fs.readFileSync(file, 'utf8');

    const newInfo = `{/* 2. Thông tin hệ thống */}
                <div>
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">2. Thông tin hệ thống</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm mb-6">
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
                            <span className={\`px-2 py-1 rounded font-bold mr-2 \${formData.riskLevel === 'Rủi ro cao' ? 'bg-danger-light text-danger' : formData.riskLevel === 'Trung bình' ? 'bg-warning-light text-warning' : formData.riskLevel === 'Thấp' ? 'bg-success-light text-success' : 'bg-muted-light text-muted'}\`}>{formData.riskLevel || '-'}</span>
                            <span>{formData.riskLevelBasis ? \`Căn cứ: \${formData.riskLevelBasis}\` : ''}</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Thuộc danh mục rủi ro cao:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.isInHighRiskList || '-'} {formData.isInHighRiskList === 'Có' && formData.highRiskCategoryDesc ? \`- \${formData.highRiskCategoryDesc}\` : ''}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mô tả cụ thể (nếu thuộc DM rủi ro cao):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.highRiskDetail || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Đánh giá sự phù hợp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.complianceAssessment || '-'} {formData.complianceAssessment === 'Đã thực hiện' && formData.complianceAssessmentDetail ? \`- \${formData.complianceAssessmentDetail}\` : ''}</span></div>
                  </div>
                </div>

                {/* 3. Mô tả hệ thống */}
                <div>
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">3. Mô tả hệ thống</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col md:col-span-2 mt-1 font-bold text-main">Loại công nghệ & Nhà cung cấp</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại công nghệ AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.aiTechType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Hình thức phát triển:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.developType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nhà cung cấp (nếu có):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.provider || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mô hình nền (nếu có):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.foundationModel || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các thành phần AI bên thứ ba khác:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.otherThirdParty || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các vai trò phụ:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.subRole || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Mục đích và phạm vi ứng dụng</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Lĩnh vực ứng dụng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.domain === 'Khác' ? formData.otherDomain : formData.domain || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mục đích chính:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.purpose || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Giới hạn ứng dụng (Out of scope):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.outOfScope || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Quy trình xử lý và người dùng</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nguồn dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputSource || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại dữ liệu đầu ra:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.outputType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mức độ tự động hóa:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.automationLevel || '-'}</span></div>
                    
                    <div className="flex flex-col"><span className="text-muted mb-1">Người sử dụng trực tiếp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.directUser || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đối tượng quyết định của AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.decisionTarget === 'Khác: điền thông tin' ? formData.otherDecisionTarget : formData.decisionTarget || '-'}</span></div>
                    
                    <div className="flex flex-col"><span className="text-muted mb-1">Số lượng người dùng dự kiến:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.userCount || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Phạm vi triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.deployScope || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Kênh triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.deployChannel || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Các trường hợp sử dụng sai có thể dự đoán</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Sử dụng ngoài mục đích chính:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.misuseMain || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Sử dụng cho nhóm đối tượng không dự kiến:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.misuseTarget || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Cố ý lạm dụng mục đích trái pháp luật:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.misuseIllegal || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Cảnh báo cho người vận hành</div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các tình huống cần thận trọng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.cautionSituations || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các hạn chế kỹ thuật biết trước:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.technicalLimits || '-'}</span></div>

                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Nhận diện nhóm chịu tác động</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Người dùng trực tiếp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactDirectUser || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đối tượng quyết định của AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactDecisionTarget || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Bên thứ ba bị ảnh hưởng gián tiếp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactThirdParty || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nhóm dễ tổn thương:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactVulnerable || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nhân viên tổ chức:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactEmployee || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Cộng đồng/môi trường:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactCommunity || '-'}</span></div>
                  </div>
                </div>`;

    const startIdx = txt.indexOf('{/* 2. Thông tin hệ thống */}');
    const endIdx = txt.indexOf('</div>\n            </div>\n          </div>\n          <div className="print-break-before"></div>');
    
    txt = txt.substring(0, startIdx) + newInfo + '\n' + txt.substring(endIdx);
    fs.writeFileSync(file, txt);
}

updateDashboard('src/pages/Dashboard1.jsx');
updateDashboard('src/pages/Dashboard2.jsx');

