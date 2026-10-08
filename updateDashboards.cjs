const fs = require('fs');

function updateDashboard(filename) {
    let txt = fs.readFileSync(filename, 'utf8');

    const oldInfoRegex = /\{\/\* 2\. Thông tin hệ thống \*\/\}\n\s*<div>[\s\S]*?(?=\{\/\* 3\. Khai báo đánh giá rủi ro \*\/\})/;
    const newInfo = `{/* 2. Thông tin hệ thống AI và thông tin quản trị đầu mối */}
                <div className="mb-6">
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">2. Thông tin hệ thống AI và thông tin quản trị đầu mối</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col"><span className="text-muted mb-1">Tên hệ thống AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.systemName || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mã hệ thống:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.internalCode || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Phiên bản / Cập nhật:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.version || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Cơ quan/Đơn vị triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.agencyName || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Vai trò tổ chức:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.orgRole === 'Khác' ? formData.otherOrgRole : formData.orgRole || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Căn cứ pháp lý:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.legalBasis || '-'}</span></div>
                  </div>
                </div>\n\n                `;
    
    txt = txt.replace(oldInfoRegex, newInfo);

    const oldRiskRegex = /\{\/\* 3\. Khai báo đánh giá rủi ro \*\/\}\n\s*<div>[\s\S]*?(?=<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<div className="print-break-before">)/;
    const newRisk = `{/* 3. Mức độ Rủi ro */}
                <div>
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">3. Mức độ Rủi ro</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
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
                </div>\n                `;
    
    txt = txt.replace(oldRiskRegex, newRisk);

    // Also change the title of step 3 in landing sidebar
    // Wait, let's just do it directly in LandingPage if needed

    fs.writeFileSync(filename, txt);
}

updateDashboard('src/pages/Dashboard1.jsx');
updateDashboard('src/pages/Dashboard2.jsx');

console.log("Dashboards updated");
