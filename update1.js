const fs = require('fs'); let txt = fs.readFileSync('src/pages/Dashboard1.jsx', 'utf8').split('\n'); txt.splice(35, 9, \  const searchParams = new URLSearchParams(location.search);
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
    systemName: 'H? th?ng AI Demo',
    domain: 'Hành chính công',
    email: 'admin@demo.vn'
  };\); fs.writeFileSync('src/pages/Dashboard1.jsx', txt.join('\n'));
