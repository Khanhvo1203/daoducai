const fs = require('fs');

let code = fs.readFileSync('Dashboard2.backup.jsx', 'utf8');

const importRegex = /import React, \{ useState \} from 'react';/;
code = code.replace(importRegex, "import React, { useState, useEffect } from 'react';");

const stateInsert = `
  const [activeView, setActiveView] = useState('weights');
  const [weights, setWeights] = useState({ C1: 25, C2: 25, C3: 25, C4: 25 });
  const [preset, setPreset] = useState('chia_deu');

  const handlePresetChange = (e) => {
    const val = e.target.value;
    setPreset(val);
    if (val === 'yt_hcc') setWeights({ C1: 40, C2: 30, C3: 20, C4: 10 });
    else if (val === 'tc_ht') setWeights({ C1: 35, C2: 30, C3: 15, C4: 20 });
    else if (val === 'dmst') setWeights({ C1: 20, C2: 15, C3: 35, C4: 30 });
    else if (val === 'chia_deu') setWeights({ C1: 25, C2: 25, C3: 25, C4: 25 });
  };

  const handleWeightChange = (key, newValue) => {
    setPreset('custom');
    let val = parseInt(newValue, 10);
    if (isNaN(val)) val = 0;
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    
    let newWeights = { ...weights, [key]: val };
    let remaining = 100 - val;
    const otherKeys = ['C1', 'C2', 'C3', 'C4'].filter(k => k !== key);
    let otherSum = otherKeys.reduce((sum, k) => sum + weights[k], 0);
    
    if (otherSum === 0) {
       otherKeys.forEach(k => newWeights[k] = Math.floor(remaining / 3));
       newWeights[otherKeys[0]] += remaining - Math.floor(remaining / 3) * 3;
    } else {
       otherKeys.forEach(k => {
         newWeights[k] = Math.round((weights[k] / otherSum) * remaining);
       });
       let currentSum = newWeights.C1 + newWeights.C2 + newWeights.C3 + newWeights.C4;
       let err = 100 - currentSum;
       if (err !== 0) {
           newWeights[otherKeys[0]] += err; 
       }
    }
    setWeights(newWeights);
  };

  const convC1 = (scoreC1 / 15) * weights.C1;
  const convC2 = (scoreC2 / 15) * weights.C2;
  const convC3 = (scoreC3 / 15) * weights.C3;
  const convC4 = (scoreC4 / 15) * weights.C4;
  const finalScore = convC1 + convC2 + convC3 + convC4;
`;

code = code.replace(/const scoreD = getScoreD\(\);[\r\n]+/, "const scoreD = getScoreD();\n" + stateInsert);

// Now replace the content area
const contentAreaRegex = /<section className="content-area">[\s\S]*?<\/section>/;

const newContentArea = `<section className="content-area">
          <div className="flex gap-4 mb-6 border-b">
            <button 
              className={\`pb-3 px-4 font-bold flex items-center gap-2 \${activeView === 'weights' ? 'border-b-2 border-primary text-primary' : 'text-muted'}\`}
              onClick={() => setActiveView('weights')}
            >
              Màn hình 1 - Đánh trọng số 4 nguyên tắc
            </button>
            <button 
              className={\`pb-3 px-4 font-bold flex items-center gap-2 \${activeView === 'results' ? 'border-b-2 border-primary text-primary' : 'text-muted'}\`}
              onClick={() => setActiveView('results')}
            >
              Màn hình 2 - Kết quả tuân thủ có trọng số
            </button>
          </div>

          {activeView === 'weights' && (
            <div className="fade-in">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="mb-1 text-2xl uppercase">HỒ SƠ ĐANG ĐÁNH TRỌNG SỐ</h2>
                  <div className="flex gap-6 text-sm text-muted mt-2">
                    <div>Mã hồ sơ: <span className="font-bold text-main">#{assessmentCode || formData.id || 'Đang cập nhật'}</span></div>
                    <div>Hệ thống: <span className="font-bold text-main">{formData.systemName}</span></div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="text-sm font-bold mb-1">Đơn vị chọn (Loại hệ thống)</div>
                  <select className="form-control text-sm font-semibold" value={preset} onChange={handlePresetChange}>
                    <option value="chia_deu">Chia đều (25/25/25/25)</option>
                    <option value="yt_hcc">YT/HCC - Y tế & hành chính công (40/30/20/10)</option>
                    <option value="tc_ht">TC-HT - Tài chính, hạ tầng (35/30/15/20)</option>
                    <option value="dmst">ĐMST - Đổi mới sáng tạo, R&D (20/15/35/30)</option>
                    <option value="custom">Tùy chỉnh</option>
                  </select>
                </div>
              </div>

              <div className="card">
                <div className="flex justify-between items-end border-b pb-3 mb-4">
                  <h4 className="font-bold">TRỌNG SỐ 04 TRỤ CỘT</h4>
                  <div className="text-sm text-muted">Tổng trọng số 04 trụ cột = 100%</div>
                </div>
                
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs text-muted uppercase border-b">
                      <th className="pb-3 w-1/3">Nguyên tắc</th>
                      <th className="pb-3 text-center">Mã câu</th>
                      <th className="pb-3 text-center w-1/2">Trọng số (%)</th>
                      <th className="pb-3 text-right">Điểm quy đổi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 pr-4">
                        <div className="font-bold text-sm">C1 – Bảo đảm an toàn, độ tin cậy và không gây hại</div>
                      </td>
                      <td className="py-4 text-center text-sm">C1.1 - C1.15</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <input type="number" className="form-control text-center font-bold" style={{ width: '60px' }} value={weights.C1} onChange={(e) => handleWeightChange('C1', e.target.value)} />
                          <input type="range" className="w-full" min="0" max="100" value={weights.C1} onChange={(e) => handleWeightChange('C1', e.target.value)} />
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-primary">{convC1.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 pr-4">
                        <div className="font-bold text-sm">C2 – Tôn trọng quyền con người, công bằng, minh bạch</div>
                      </td>
                      <td className="py-4 text-center text-sm">C2.1 - C2.15</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <input type="number" className="form-control text-center font-bold" style={{ width: '60px' }} value={weights.C2} onChange={(e) => handleWeightChange('C2', e.target.value)} />
                          <input type="range" className="w-full" min="0" max="100" value={weights.C2} onChange={(e) => handleWeightChange('C2', e.target.value)} />
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-primary">{convC2.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 pr-4">
                        <div className="font-bold text-sm">C3 – Hạnh phúc, thịnh vượng, phát triển bền vững</div>
                      </td>
                      <td className="py-4 text-center text-sm">C3.1 - C3.15</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <input type="number" className="form-control text-center font-bold" style={{ width: '60px' }} value={weights.C3} onChange={(e) => handleWeightChange('C3', e.target.value)} />
                          <input type="range" className="w-full" min="0" max="100" value={weights.C3} onChange={(e) => handleWeightChange('C3', e.target.value)} />
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-primary">{convC3.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4">
                        <div className="font-bold text-sm">C4 – Khuyến khích đổi mới sáng tạo và trách nhiệm xã hội</div>
                      </td>
                      <td className="py-4 text-center text-sm">C4.1 - C4.15</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <input type="number" className="form-control text-center font-bold" style={{ width: '60px' }} value={weights.C4} onChange={(e) => handleWeightChange('C4', e.target.value)} />
                          <input type="range" className="w-full" min="0" max="100" value={weights.C4} onChange={(e) => handleWeightChange('C4', e.target.value)} />
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-primary">{convC4.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'results' && (
            <div className="fade-in">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="mb-1 text-2xl uppercase">KẾT QUẢ ĐÁNH GIÁ MỨC ĐỘ TUÂN THỦ (CÓ TRỌNG SỐ)</h2>
                  <div className="text-sm text-muted">Ngày đánh giá: {new Date().toLocaleDateString('vi-VN')}</div>
                </div>
                <div className="flex gap-3">
                  <button className="btn btn-secondary text-sm border-primary text-primary">
                    <Share2 size={16}/> Chia sẻ kết quả
                  </button>
                  <button className="btn btn-secondary text-sm border-primary text-primary" onClick={() => {
                    const user = getCurrentUser();
                    if (user) {
                      localStorage.removeItem(\`landing_formData_\${user.username}\`);
                      localStorage.removeItem(\`landing_step_\${user.username}\`);
                      localStorage.removeItem(\`assessment_answers_\${user.username}\`);
                      localStorage.removeItem(\`assessment_evidences_\${user.username}\`);
                      localStorage.removeItem(\`assessment_activeStepIdx_\${user.username}\`);
                    }
                    navigate('/');
                  }}>
                    <RotateCcw size={16}/> Đánh giá lại
                  </button>
                </div>
              </div>

              <div className="card mb-6">
                <h4 className="font-bold text-lg mb-4 text-primary uppercase">CẤU TRÚC THANG ĐIỂM THEO 60 CÂU HỎI:</h4>
                <ul className="list-disc pl-6 mb-4 text-sm space-y-1">
                  <li><strong>Bộ câu hỏi cấu trúc:</strong> 4 Nguyên tắc x 3 nhóm nội dung x 5 câu = <strong>60 câu hỏi</strong>.</li>
                  <li><strong>Thang điểm chuẩn:</strong> 1 câu tương ứng với 1 điểm.</li>
                  <li><strong>Mỗi tối đa nguyên tắc:</strong> 15 điểm (15/15 = 100%).</li>
                </ul>
                <div className="bg-primary-light p-3 rounded font-bold text-main border border-primary/20 mb-6">
                  Công thức tính điểm: Điểm quy đổi = (Số câu đạt được / 15) * 100% * Trọng số
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 border-r border-gray-200 font-bold">Nguyên tắc</th>
                        <th className="p-3 border-r border-gray-200 font-bold text-center">Trọng số (W)</th>
                        <th className="p-3 border-r border-gray-200 font-bold text-center">Số câu đạt thực tế (P/15)</th>
                        <th className="p-3 border-r border-gray-200 font-bold text-center">Tỷ lệ từng nguyên tắc (p/15)</th>
                        <th className="p-3 font-bold text-center">Con số quy đổi điểm (P\\W)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 border-r border-gray-200">C1 – An toàn, tin cậy</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">{weights.C1}%</td>
                        <td className="p-3 border-r border-gray-200 text-center">{scoreC1} / 15 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center">{((scoreC1/15)*100).toFixed(1)}%</td>
                        <td className="p-3 text-center">{((scoreC1/15)*100).toFixed(1)}% x {weights.C1}% = <strong>{convC1.toFixed(1)} điểm</strong></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 border-r border-gray-200">C2 – Minh bạch & Kiểm soát</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">{weights.C2}%</td>
                        <td className="p-3 border-r border-gray-200 text-center">{scoreC2} / 15 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center">{((scoreC2/15)*100).toFixed(1)}%</td>
                        <td className="p-3 text-center">{((scoreC2/15)*100).toFixed(1)}% x {weights.C2}% = <strong>{convC2.toFixed(1)} điểm</strong></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 border-r border-gray-200">C3 – Lợi ích & bao trùm</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">{weights.C3}%</td>
                        <td className="p-3 border-r border-gray-200 text-center">{scoreC3} / 15 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center">{((scoreC3/15)*100).toFixed(1)}%</td>
                        <td className="p-3 text-center">{((scoreC3/15)*100).toFixed(1)}% x {weights.C3}% = <strong>{convC3.toFixed(1)} điểm</strong></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 border-r border-gray-200">C4 – Đổi mới sáng tạo</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">{weights.C4}%</td>
                        <td className="p-3 border-r border-gray-200 text-center">{scoreC4} / 15 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center">{((scoreC4/15)*100).toFixed(1)}%</td>
                        <td className="p-3 text-center">{((scoreC4/15)*100).toFixed(1)}% x {weights.C4}% = <strong>{convC4.toFixed(1)} điểm</strong></td>
                      </tr>
                      <tr className="bg-muted-light">
                        <td className="p-3 border-r border-gray-200 font-bold uppercase">Tổng cộng</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">100%</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold">{totalCScore} / 60 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center"></td>
                        <td className="p-3 text-center font-bold text-lg text-primary">Tổng điểm: {finalScore.toFixed(1)}/100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid-2col mb-6 gap-6">
                <div className="card">
                  <h4 className="font-bold mb-6 text-sm uppercase">KẾT QUẢ TỔNG THỂ</h4>
                  <div className="flex gap-6 items-center">
                    <div className="score-circle">
                      <svg viewBox="0 0 36 36" className={\`circular-chart \${overall.color.replace('text-', '')}\`}>
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle" strokeDasharray={\`\${finalScore}, 100\`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke={overall.color === 'text-success' ? 'var(--success)' : overall.color === 'text-warning' ? 'var(--warning)' : 'var(--danger)'} />
                      </svg>
                      <div className="score-text">
                        <span className="score-number" style={{ color: overall.color === 'text-success' ? 'var(--success)' : overall.color === 'text-warning' ? 'var(--warning)' : 'var(--danger)' }}>{finalScore.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <div className={\`text-lg font-bold mb-1 \${overall.color}\`}>{overall.label}</div>
                      <p className="text-sm text-muted">{overall.desc}</p>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-bold mb-4 text-sm uppercase">ĐÁNH GIÁ 9 ĐIỀU KIỆN QUẢN TRỊ (PHẦN B)</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-black text-main">{scoreD}/9</div>
                    <div className="text-sm text-muted">điều kiện được đáp ứng hoàn toàn.</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: \`\${(scoreD/9)*100}%\` }}></div>
                  </div>
                  <p className="text-xs text-muted">Hệ thống AI cần tối thiểu 5/9 điều kiện để được phép triển khai giới hạn.</p>
                </div>
              </div>
            </div>
          )}
        </section>`;

code = code.replace(contentAreaRegex, newContentArea);

fs.writeFileSync('src/pages/Dashboard2.jsx', code);
console.log('Successfully injected weighting logic');
