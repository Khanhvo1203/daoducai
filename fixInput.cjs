const fs = require('fs');
let txt = fs.readFileSync('src/pages/LandingPage.jsx', 'utf8');

txt = txt.replace(/<div className="flex gap-2">\s*<input type="text" name="userCount" required placeholder="Số người..." value={formData.userCount} onChange={handleChange} className="form-control" \/>\s*<div className="flex items-center text-muted px-2">\/<\/div>\s*<input type="text" name="userTargetCount" required placeholder="Đối tượng dự kiến mỗi tháng..." value={formData.userTargetCount} onChange={handleChange} className="form-control" \/>\s*<\/div>/, 
    `<input type="text" name="userCount" required placeholder="Số người/Đối tượng dự kiến mỗi tháng..." value={formData.userCount} onChange={handleChange} className="form-control" />`);

fs.writeFileSync('src/pages/LandingPage.jsx', txt);
console.log('Replaced');
