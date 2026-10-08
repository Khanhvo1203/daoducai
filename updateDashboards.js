const fs = require('fs');

function updateDashboard(filename) {
  let txt = fs.readFileSync(filename, 'utf8');
  if (!txt.includes('getAllAssessments')) {
    txt = txt.replace(
      "import { saveAssessment, getCurrentUser } from '../utils/auth';",
      "import { saveAssessment, getCurrentUser, getAllAssessments } from '../utils/auth';"
    );
  }
  
  const regex = /const selection = location\.state\?\.selection[\s\S]*?email: 'admin@demo\.vn'\r?\n  };/;
  
  const replacement = `  const searchParams = new URLSearchParams(location.search);
  const idFromUrl = searchParams.get('id');
  let initialData = location.state;
  if (!initialData && idFromUrl) {
    const all = getAllAssessments();
    const found = all.find(a => String(a.id) === String(idFromUrl));
    if (found) {
      initialData = { selection: found.selection, formData: found.formData, answers: found.answers, assessmentCode: found.id };
    }
  }

  const selection = initialData?.selection || { partB: true, partC: true };
  const answers = initialData?.answers || {};
  const existingCode = initialData?.assessmentCode || null;

  const formData = initialData?.formData || {
    systemName: 'Hệ thống AI Demo',
    domain: 'Hành chính công',
    email: 'admin@demo.vn'
  };`;

  txt = txt.replace(regex, replacement);
  fs.writeFileSync(filename, txt);
}

updateDashboard('src/pages/Dashboard1.jsx');
updateDashboard('src/pages/Dashboard2.jsx');
