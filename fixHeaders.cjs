const fs = require('fs');
const path = 'src/pages/LandingPage.jsx';
let txt = fs.readFileSync(path, 'utf8');

// The messed up tag we want to revert and replace
// We will replace it with a clean h4 and a section-divider

txt = txt.replace(/<h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">I\. Thông tin chung<\/h4>/g, 
    `<h4 className="font-bold text-main mb-4 mt-2">I. Thông tin chung</h4>`);
txt = txt.replace(/<div className="w-full h-px bg-muted-light my-8"><\/div>\n                  <h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">II\. Loại công nghệ & Nhà cung cấp<\/h4>/g, 
    `<div className="section-divider"></div>\n                  <h4 className="font-bold text-main mb-4">II. Loại công nghệ & Nhà cung cấp</h4>`);
txt = txt.replace(/<div className="w-full h-px bg-muted-light my-8"><\/div>\n                  <h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">III\. Vai trò của tổ chức<\/h4>/g, 
    `<div className="section-divider"></div>\n                  <h4 className="font-bold text-main mb-4">III. Vai trò của tổ chức</h4>`);
txt = txt.replace(/<div className="w-full h-px bg-muted-light my-8"><\/div>\n                  <h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">IV\. Mục đích sử dụng dự kiến<\/h4>/g, 
    `<div className="section-divider"></div>\n                  <h4 className="font-bold text-main mb-4">IV. Mục đích sử dụng dự kiến</h4>`);
txt = txt.replace(/<div className="w-full h-px bg-muted-light my-8"><\/div>\n                  <h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">V\. Loại dữ liệu đầu vào \/ đầu ra<\/h4>/g, 
    `<div className="section-divider"></div>\n                  <h4 className="font-bold text-main mb-4">V. Loại dữ liệu đầu vào / đầu ra</h4>`);
txt = txt.replace(/<div className="w-full h-px bg-muted-light my-8"><\/div>\n                  <h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">VI\. Đối tượng sử dụng & Tác động<\/h4>/g, 
    `<div className="section-divider"></div>\n                  <h4 className="font-bold text-main mb-4">VI. Đối tượng sử dụng & Tác động</h4>`);
txt = txt.replace(/<div className="w-full h-px bg-muted-light my-8"><\/div>\n                  <h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">VII\. Các trường hợp sử dụng sai có thể dự đoán<\/h4>/g, 
    `<div className="section-divider"></div>\n                  <h4 className="font-bold text-main mb-4">VII. Các trường hợp sử dụng sai có thể dự đoán</h4>`);
txt = txt.replace(/<div className="w-full h-px bg-muted-light my-8"><\/div>\n                  <h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">VIII\. Cảnh báo cho người vận hành<\/h4>/g, 
    `<div className="section-divider"></div>\n                  <h4 className="font-bold text-main mb-4">VIII. Cảnh báo cho người vận hành</h4>`);
txt = txt.replace(/<h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">I\. Cổng pháp lý - Đối chiếu danh mục rủi ro<\/h4>/g, 
    `<h4 className="font-bold text-main mb-4 mt-2">I. Cổng pháp lý - Đối chiếu danh mục rủi ro</h4>`);
txt = txt.replace(/<div className="w-full h-px bg-muted-light my-8"><\/div>\n                  <h4 className="font-bold text-primary bg-primary-light\/40 px-4 py-2 rounded-t border-b-2 border-primary mb-5 uppercase text-sm">II\. Nhận diện nhóm chịu tác động<\/h4>/g, 
    `<div className="section-divider"></div>\n                  <h4 className="font-bold text-main mb-4">II. Nhận diện nhóm chịu tác động</h4>`);

fs.writeFileSync(path, txt);
console.log('Done reverting and adding section-divider');
