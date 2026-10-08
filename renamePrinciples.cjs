const fs = require('fs');

const replacements = [
  { oldStr: 'Nguyên tắc 1: An toàn, độ tin cậy và không gây hại', newStr: 'Nguyên tắc 1: Bảo đảm an toàn, độ tin cậy và không gây hại' },
  { oldStr: 'Nguyên tắc 2: Kiểm soát của con người', newStr: 'Nguyên tắc 2: Tôn trọng quyền con người, công bằng, minh bạch' },
  { oldStr: 'Nguyên tắc 3: Lợi ích xã hội và bao trùm kỹ thuật số', newStr: 'Nguyên tắc 3: Hạnh phúc, thịnh vượng, phát triển bền vững' },
  { oldStr: 'Nguyên tắc 4: Đổi mới có trách nhiệm', newStr: 'Nguyên tắc 4: Khuyến khích đổi mới sáng tạo và trách nhiệm xã hội' }
];

const files = [
  'src/pages/Assessment1.jsx',
  'src/pages/Assessment2.jsx',
  'src/pages/Dashboard1.jsx',
  'src/pages/Dashboard2.jsx'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  for (const rep of replacements) {
    content = content.split(rep.oldStr).join(rep.newStr);
  }
  fs.writeFileSync(f, content);
  console.log('Updated ' + f);
}
