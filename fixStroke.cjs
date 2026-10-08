const fs = require('fs');

['src/pages/Assessment1.jsx', 'src/pages/Assessment2.jsx'].forEach(f => {
  let txt = fs.readFileSync(f, 'utf8');
  txt = txt.replace(/strokeDasharray=\{dashArray\} strokeDashoffset=\{dashOffset\}/g, 
    'strokeDasharray={`${(totalProgressPercent * 2 * Math.PI * 23) / 100} ${2 * Math.PI * 23}`} strokeDashoffset="0"');
  fs.writeFileSync(f, txt);
});
console.log('Fixed stroke');
