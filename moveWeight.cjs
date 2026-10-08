const fs = require('fs');
let txt = fs.readFileSync('src/pages/Assessment2.jsx', 'utf8');

// 1. Remove partC_weight
txt = txt.replace(
  /allSteps\.push\(\{ id: 'partC_weight', name: 'Đánh trọng số 4 nguyên tắc', group: 'Phần C: Nguyên tắc đạo đức', theme: 'blue', icon: Scale, desc: 'Thiết lập trọng số phần trăm cho 4 nguyên tắc đạo đức cốt lõi\.' \}\);\n\s*/,
  ""
);

// 2. Change conditional rendering
txt = txt.replace(
  /\{activeStep\.id === 'partC_weight' \? \(/,
  "{activeStep.id.startsWith('partC') && ("
);

txt = txt.replace(
  /<div className="card fade-in">/,
  '<div className="card fade-in mb-6">'
);

// 3. Remove the ) : ( and <> wrappers
const midReplaceRegex = /<\/table>\n\s*<\/div>\n\s*\) : \(\n\s*<>\n\s*<div className="card">/;
txt = txt.replace(midReplaceRegex, `</table>\n            </div>\n          )}\n\n          <div className="card">`);

const endReplaceRegex = /<\/div>\n\s*<\/div>\n\s*<\/>\n\s*\)\}/;
txt = txt.replace(endReplaceRegex, `</div>\n          </div>`);

fs.writeFileSync('src/pages/Assessment2.jsx', txt);
console.log('Moved weighting table into principles');
