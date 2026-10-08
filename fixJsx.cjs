const fs = require('fs');

['src/pages/Assessment1.jsx', 'src/pages/Assessment2.jsx'].forEach(f => {
  let txt = fs.readFileSync(f, 'utf8');
  txt = txt.replace(/<\/div>\s*<div className="stepper-groups">/, '</div>\n          <div className="card">\n            <div className="stepper-groups">');
  fs.writeFileSync(f, txt);
});
console.log('Fixed');
