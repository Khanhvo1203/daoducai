const fs = require('fs');

function updateAssessment(filePath) {
  let txt = fs.readFileSync(filePath, 'utf8');

  // Find the place to inject total logic
  const logicSearchStr = "const progressPercent = Math.round(((activeStepIdx + (totalAnswered / currentQuestions.length)) / allSteps.length) * 100) || 0;";
  
  const injectLogic = `const progressPercent = Math.round(((activeStepIdx + (totalAnswered / currentQuestions.length)) / allSteps.length) * 100) || 0;

  const totalQuestions = allSteps.reduce((sum, step) => sum + (questionsDb[step.id] ? questionsDb[step.id].length : 0), 0);
  const totalAnsweredAll = allSteps.reduce((sum, step) => {
    const qs = questionsDb[step.id] || [];
    return sum + qs.filter(q => answers[q.id] !== undefined).length;
  }, 0);
  const totalProgressPercent = totalQuestions > 0 ? Math.round((totalAnsweredAll / totalQuestions) * 100) : 0;
  const dashArray = 2 * Math.PI * 22;
  const dashOffset = dashArray - (dashArray * totalProgressPercent) / 100;`;

  if (txt.includes(logicSearchStr)) {
    txt = txt.replace(logicSearchStr, injectLogic);
  }

  // Find the UI block to replace
  const uiSearchRegex = /<div className="card mb-4">\s*<h4 className="text-sm font-bold mb-2">TIẾN TRÌNH ĐÁNH GIÁ<\/h4>\s*<div className="text-primary font-bold mb-4">\{progressPercent\}% <span className="text-muted font-normal">hoàn thành<\/span><\/div>/;
  
  const replaceUi = `<div className="card mb-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-5">
              <div className="relative w-[72px] h-[72px] flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 52 52">
                  <circle className="text-gray-100" strokeWidth="6" stroke="currentColor" fill="transparent" r="22" cx="26" cy="26" style={{ color: '#f1f5f9' }} />
                  <circle className="text-primary" strokeWidth="6" strokeDasharray={dashArray} strokeDashoffset={dashOffset} strokeLinecap="round" stroke="currentColor" fill="transparent" r="22" cx="26" cy="26" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-main">
                  {totalAnsweredAll}/{totalQuestions}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[11px] font-bold text-muted uppercase tracking-wider mb-1">ĐÃ TRẢ LỜI</div>
                <div className="text-base font-bold text-main">{totalAnsweredAll}/{totalQuestions} câu</div>
                <div className="text-xs text-muted mt-1">còn {totalQuestions - totalAnsweredAll} câu chưa trả lời</div>
              </div>
            </div>
          </div>`;

  if (uiSearchRegex.test(txt)) {
    txt = txt.replace(uiSearchRegex, replaceUi);
    fs.writeFileSync(filePath, txt);
    console.log('Updated ' + filePath);
  } else {
    console.log('Could not find UI block in ' + filePath);
  }
}

updateAssessment('src/pages/Assessment1.jsx');
updateAssessment('src/pages/Assessment2.jsx');
