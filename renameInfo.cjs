const fs = require('fs');

const replaceInFile = (file, oldStr, newStr) => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.split(oldStr).join(newStr);
    fs.writeFileSync(file, content);
};

// Replace "Mô tả hệ thống AI" -> "Thông tin hệ thống"
['src/pages/LandingPage.jsx', 'src/pages/Dashboard1.jsx', 'src/pages/Dashboard2.jsx'].forEach(f => {
    replaceInFile(f, 'Mô tả hệ thống AI', 'Thông tin hệ thống');
});

// Replace "Mô tả hệ thống" -> "Thông tin hệ thống" (if not already "Thông tin hệ thống")
['src/pages/Assessment1.jsx', 'src/pages/Assessment2.jsx'].forEach(f => {
    replaceInFile(f, "name: 'Mô tả hệ thống'", "name: 'Thông tin hệ thống'");
});

console.log('Renamed Mô tả hệ thống AI -> Thông tin hệ thống');
