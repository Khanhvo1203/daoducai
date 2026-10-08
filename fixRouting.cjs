const fs = require('fs');
let txt = fs.readFileSync('src/pages/AdminDashboard.jsx', 'utf8');
txt = txt.replace(/a\.selection == 2 \? '\/dashboard2' : '\/dashboard1'/g, "a.dashboardRoute || '\/dashboard1'");
fs.writeFileSync('src/pages/AdminDashboard.jsx', txt);
console.log('Fixed routing');
