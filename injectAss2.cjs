const fs = require('fs');
let code = fs.readFileSync('src/pages/Assessment2.jsx', 'utf8');

// Insert partC_weight step
code = code.replace(
  "if (selection.partC) {\n    allSteps.push({ id: 'partC1'",
  "if (selection.partC) {\n    allSteps.push({ id: 'partC_weight', name: 'Đánh trọng số 4 nguyên tắc', group: 'Phần C: Nguyên tắc đạo đức', theme: 'blue', icon: Scale, desc: 'Thiết lập trọng số phần trăm cho 4 nguyên tắc đạo đức cốt lõi.' });\n    allSteps.push({ id: 'partC1'"
);

// Add weight state
const stateInsert = `
  const [weights, setWeights] = useState(() => {
    const saved = localStorage.getItem(\`assessment_weights_\${userId}\`);
    return saved ? JSON.parse(saved) : { C1: 25, C2: 25, C3: 25, C4: 25 };
  });
  const [preset, setPreset] = useState(() => {
    const saved = localStorage.getItem(\`assessment_preset_\${userId}\`);
    return saved || 'chia_deu';
  });

  useEffect(() => {
    localStorage.setItem(\`assessment_weights_\${userId}\`, JSON.stringify(weights));
    localStorage.setItem(\`assessment_preset_\${userId}\`, preset);
  }, [weights, preset, userId]);

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
`;
code = code.replace(/const activeStep = allSteps\[activeStepIdx\];/, "const activeStep = allSteps[activeStepIdx];\n" + stateInsert);

// Pass weights to saveAssessment and clear localStorage
code = code.replace(
  "code = saveAssessment(user.username, { formData, selection, answers, dashboardRoute: '/dashboard2' });",
  "code = saveAssessment(user.username, { formData, selection, answers, weights, dashboardRoute: '/dashboard2' });"
);
code = code.replace(
  "localStorage.removeItem(`assessment_activeStepIdx_${user.username}`);",
  "localStorage.removeItem(`assessment_activeStepIdx_${user.username}`);\n        localStorage.removeItem(`assessment_weights_${user.username}`);\n        localStorage.removeItem(`assessment_preset_${user.username}`);"
);

// Render logic
const renderReplace = `
          {activeStep.id === 'partC_weight' ? (
            <div className="card fade-in">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold uppercase text-main">HỒ SƠ ĐANG ĐÁNH TRỌNG SỐ</h2>
                  <div className="flex gap-4 text-sm text-muted mt-1">
                    <div>Mã hồ sơ: <span className="font-semibold text-primary">#Đang cập nhật</span></div>
                    <div>Hệ thống: <span className="font-semibold text-primary">{formData.systemName}</span></div>
                  </div>
                </div>
                <div className="w-64">
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

              <div className="flex justify-between items-end border-b pb-3 mb-4">
                <h4 className="font-bold text-main">TRỌNG SỐ 04 TRỤ CỘT</h4>
                <div className="text-sm text-muted font-semibold">Tổng trọng số 04 trụ cột = 100%</div>
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
                  {[
                    { id: 'C1', title: 'C1 – Bảo đảm an toàn, độ tin cậy và không gây hại', qRange: 'C1.1 - C1.15' },
                    { id: 'C2', title: 'C2 – Tôn trọng quyền con người, công bằng, minh bạch', qRange: 'C2.1 - C2.15' },
                    { id: 'C3', title: 'C3 – Hạnh phúc, thịnh vượng, phát triển bền vững', qRange: 'C3.1 - C3.15' },
                    { id: 'C4', title: 'C4 – Khuyến khích đổi mới sáng tạo và trách nhiệm xã hội', qRange: 'C4.1 - C4.15' }
                  ].map(p => {
                     // Calculate current achieved score for this principle from answers
                     const answeredYes = Object.keys(answers).filter(k => k.startsWith(p.id) && answers[k] === 'Có').length;
                     const convScore = (answeredYes / 15) * weights[p.id];
                     return (
                      <tr className="border-b" key={p.id}>
                        <td className="py-4 pr-4">
                          <div className="font-bold text-sm text-main">{p.title}</div>
                        </td>
                        <td className="py-4 text-center text-sm text-muted font-medium">{p.qRange}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-4">
                            <input type="number" className="form-control text-center font-bold text-main" style={{ width: '60px' }} value={weights[p.id]} onChange={(e) => handleWeightChange(p.id, e.target.value)} />
                            <input type="range" className="w-full cursor-pointer accent-primary" min="0" max="100" value={weights[p.id]} onChange={(e) => handleWeightChange(p.id, e.target.value)} />
                          </div>
                        </td>
                        <td className="py-4 text-right font-bold text-primary">{convScore.toFixed(2)}</td>
                      </tr>
                     );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <div className="card">
                <div className="flex justify-end mb-4">
                  <button className="theme-text text-sm flex items-center gap-1 font-semibold" onClick={() => setOpenQuestion(null)}>
                    Thu gọn tất cả <ChevronUp size={16} />
                  </button>
                </div>

                <div className="accordion-list flex-col gap-4">
                {currentQuestions.map((q) => (
`;

code = code.replace(
  /<div className="card">\s*<div className="flex justify-end mb-4">\s*<button className="theme-text text-sm flex items-center gap-1 font-semibold" onClick=\{\(\) => setOpenQuestion\(null\)\}>\s*Thu gọn tất cả <ChevronUp size=\{16\} \/>\s*<\/button>\s*<\/div>\s*<div className="accordion-list flex-col gap-4">\s*\{currentQuestions\.map\(\(q\) => \(/,
  renderReplace
);

code = code.replace(
  /<\/div>\s*<\/div>\s*<div className="flex justify-between mt-6">/,
  "</div>\n            </div>\n            </>\n          )}\n\n          <div className=\"flex justify-between mt-6\">"
);

fs.writeFileSync('src/pages/Assessment2.jsx', code);
console.log('Injected Assessment2');
