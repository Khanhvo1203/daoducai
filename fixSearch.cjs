const fs = require('fs');
let txt = fs.readFileSync('src/pages/AdminDashboard.jsx', 'utf8');

txt = txt.replace(
  /<div className="relative w-64">\s*<Search size=\{16\} className="absolute left-3 top-1\/2 transform -translate-y-1\/2 text-muted" \/>\s*<input \s*type="text" \s*placeholder="Tìm theo email, tên, sđt\.\.\." \s*className="form-control pl-9 py-1 text-sm"\s*value=\{searchTerm\}\s*onChange=\{\(e\) => setSearchTerm\(e\.target\.value\)\}\s*\/>\s*<\/div>/g,
  `<div style={{ position: 'relative', width: '256px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Tìm theo email, tên, sđt..." 
                  className="form-control text-sm"
                  style={{ paddingLeft: '36px', paddingTop: '6px', paddingBottom: '6px' }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>`
);

txt = txt.replace(
  /<div className="relative w-64">\s*<Search size=\{16\} className="absolute left-3 top-1\/2 transform -translate-y-1\/2 text-muted" \/>\s*<input type="text" placeholder="Tìm mã hồ sơ\.\.\." className="form-control pl-9 py-1 text-sm" \/>\s*<\/div>/g,
  `<div style={{ position: 'relative', width: '256px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" placeholder="Tìm mã hồ sơ..." className="form-control text-sm" style={{ paddingLeft: '36px', paddingTop: '6px', paddingBottom: '6px' }} />
            </div>`
);

fs.writeFileSync('src/pages/AdminDashboard.jsx', txt);
console.log('Fixed search bars');
