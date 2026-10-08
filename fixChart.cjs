const fs = require('fs');

function fixChart(filePath) {
  let txt = fs.readFileSync(filePath, 'utf8');

  const searchRegex = /<div className="flex items-center gap-5">[\s\S]*?còn \{totalQuestions - totalAnsweredAll\} câu chưa trả lời<\/div>\s*<\/div>\s*<\/div>/;
  
  const replaceStr = `<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative', width: '84px', height: '84px', flexShrink: 0 }}>
                <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 52 52">
                  <circle strokeWidth="5" stroke="#f1f5f9" fill="transparent" r="23" cx="26" cy="26" />
                  <circle strokeWidth="5" strokeDasharray={dashArray} strokeDashoffset={dashOffset} strokeLinecap="round" stroke="var(--primary)" fill="transparent" r="23" cx="26" cy="26" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
                </svg>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                  {totalAnsweredAll}/{totalQuestions}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>ĐÃ TRẢ LỜI</div>
                <div style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-main)' }}>{totalAnsweredAll}/{totalQuestions} câu</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>còn {totalQuestions - totalAnsweredAll} câu chưa trả lời</div>
              </div>
            </div>`;

  if (searchRegex.test(txt)) {
    txt = txt.replace(searchRegex, replaceStr);
    fs.writeFileSync(filePath, txt);
    console.log('Fixed ' + filePath);
  } else {
    console.log('Not found in ' + filePath);
  }
}

fixChart('src/pages/Assessment1.jsx');
fixChart('src/pages/Assessment2.jsx');
