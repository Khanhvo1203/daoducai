const fs = require('fs');

['Dashboard1.jsx', 'Dashboard2.jsx'].forEach(f => {
  let p = 'src/pages/'+f;
  let t = fs.readFileSync(p, 'utf8');
  
  if (!t.includes('PrincipleResult')) {
    t = t.replace("import React, { useState } from 'react';", "import React, { useState } from 'react';\nimport PrincipleResult from '../components/PrincipleResult';");
  }
  
  const s1 = t.indexOf('              {/* C1 */}');
  const s2 = t.indexOf('          <div className="card mt-6">');
  
  if (s1 !== -1 && s2 !== -1) {
    const endS2 = t.lastIndexOf('            </div>', s2 - 10) + 18; // this should point to after `</div>\n          </div>\n\n`
    const replacement = `              <PrincipleResult prefix="C1" title="C1. Nguyên tắc 1: An toàn, độ tin cậy và không gây hại" score={scoreC1} answers={answers} getComplianceLevel={getComplianceLevel} />
              <PrincipleResult prefix="C2" title="C2. Nguyên tắc 2: Kiểm soát của con người" score={scoreC2} answers={answers} getComplianceLevel={getComplianceLevel} />
              <PrincipleResult prefix="C3" title="C3. Nguyên tắc 3: Lợi ích xã hội và bao trùm kỹ thuật số" score={scoreC3} answers={answers} getComplianceLevel={getComplianceLevel} />
              <PrincipleResult prefix="C4" title="C4. Nguyên tắc 4: Đổi mới có trách nhiệm" score={scoreC4} answers={answers} getComplianceLevel={getComplianceLevel} />\n            </div>\n          </div>\n\n`;
    
    t = t.substring(0, s1) + replacement + t.substring(s2);
    fs.writeFileSync(p, t);
    console.log('Updated ' + f);
  } else {
    console.log('Markers not found in ' + f);
  }
});
