const fs = require('fs');

function addAssessmentSearch() {
  let txt = fs.readFileSync('src/pages/AdminDashboard.jsx', 'utf8');

  // Add state
  txt = txt.replace(
    "const [searchTerm, setSearchTerm] = useState('');",
    "const [searchTerm, setSearchTerm] = useState('');\n  const [assessmentSearch, setAssessmentSearch] = useState('');"
  );

  // Add filtered list
  const filterLogic = `  const filteredUsers = users.filter(u => {`;
  const injectFilter = `  const filteredAssessments = assessments.filter(a => {
    if (!assessmentSearch) return true;
    const term = assessmentSearch.toLowerCase();
    return a.id.toLowerCase().includes(term) || 
           (a.formData?.systemName || '').toLowerCase().includes(term) || 
           a.userId.toLowerCase().includes(term);
  });

  const filteredUsers = users.filter(u => {`;

  if (txt.includes(filterLogic)) {
    txt = txt.replace(filterLogic, injectFilter);
  }

  // Update input
  const inputSearch = `<input type="text" placeholder="Tìm mã hồ sơ..." className="form-control text-sm" style={{ paddingLeft: '36px', paddingTop: '6px', paddingBottom: '6px' }} />`;
  const inputReplace = `<input type="text" placeholder="Tìm mã hồ sơ, tên hệ thống..." className="form-control text-sm" style={{ paddingLeft: '36px', paddingTop: '6px', paddingBottom: '6px' }} value={assessmentSearch} onChange={(e) => setAssessmentSearch(e.target.value)} />`;
  
  if (txt.includes(inputSearch)) {
    txt = txt.replace(inputSearch, inputReplace);
  }

  // Update list
  txt = txt.replace(/\{assessments\.length === 0 \?/g, "{filteredAssessments.length === 0 ?");
  txt = txt.replace(/assessments\.map\(a => \(/g, "filteredAssessments.map(a => (");

  fs.writeFileSync('src/pages/AdminDashboard.jsx', txt);
  console.log('Fixed search logic');
}

addAssessmentSearch();
