const fs = require('fs');
let txt = fs.readFileSync('src/pages/Assessment2.jsx', 'utf8');

txt = txt.replace(
  /<\/>\n          \)}\n          <div className="bottom-bar flex justify-between items-center mt-8 pt-6 border-t">/,
  '<div className="bottom-bar flex justify-between items-center mt-8 pt-6 border-t">'
);

txt = txt.replace(
  /<\/div>\n        <\/section>/,
  `</div>
            </>
          )}
        </section>`
);

fs.writeFileSync('src/pages/Assessment2.jsx', txt);
console.log('Fixed syntax correctly');
