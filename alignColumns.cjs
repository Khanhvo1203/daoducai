const fs = require('fs');
let txt = fs.readFileSync('src/pages/Assessment2.jsx', 'utf8');

const oldTable = `<table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-muted uppercase border-b">
                    <th className="pb-3 w-1/3">Nguyên tắc và ba nhóm nội dung</th>
                    <th className="pb-3 text-center">Mã câu</th>
                    <th className="pb-3 text-center w-1/4">Trọng số (Đơn vị chọn)</th>
                    <th className="pb-3 text-center">Ví dụ trọng số gợi ý<br/><span className="text-[10px] font-normal normal-case">(Theo loại hệ thống)</span></th>
                    <th className="pb-3 text-right">Điểm đóng góp<br/>dự kiến</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'C1', title: 'C1 – Bảo đảm an toàn, độ tin cậy và không gây hại', desc: 'Thiết kế an toàn • Kiểm thử và xác nhận chất lượng • Giám sát và quản lý sự cố', qRange: 'C1.1 - C1.15', suggestion: 'YT/HCC 40 % • TC-HT 35 % • ĐMST 20 %' },
                    { id: 'C2', title: 'C2 – Tôn trọng quyền con người, công bằng, minh bạch', desc: 'Kiểm soát của con người • Minh bạch và khả năng giải thích • Phòng chống phân biệt đối xử và thiên lệch', qRange: 'C2.1 - C2.15', suggestion: 'YT/HCC 30 % • TC-HT 30 % • ĐMST 15 %' },
                    { id: 'C3', title: 'C3 – Hạnh phúc, thịnh vượng, phát triển bền vững', desc: 'Lợi ích xã hội và bao trùm kỹ thuật số • Thiết kế bao trùm và giảm khoảng cách số • Tác động đến môi trường và tính bền vững', qRange: 'C3.1 - C3.15', suggestion: 'YT/HCC 20 % • TC-HT 15 % • ĐMST 35 %' },
                    { id: 'C4', title: 'C4 – Khuyến khích đổi mới sáng tạo và trách nhiệm xã hội', desc: 'Đổi mới có trách nhiệm • Trách nhiệm giải trình và năng lực quản trị • Hợp tác và phát triển hệ sinh thái AI', qRange: 'C4.1 - C4.15', suggestion: 'YT/HCC 10 % • TC-HT 20 % • ĐMST 30 %' }
                  ].map(p => {
                     // Calculate current achieved score for this principle from answers
                     const answeredYes = Object.keys(answers).filter(k => k.startsWith(p.id) && answers[k] === 'Có').length;
                     const convScore = (answeredYes / 15) * weights[p.id];
                     return (
                      <tr className="border-b" key={p.id}>
                        <td className="py-4 pr-4">
                          <div className="font-bold text-sm text-main">{p.title}</div>
                          <div className="text-xs text-muted mt-1" style={{ fontSize: '0.75rem', lineHeight: '1.2rem', color: '#64748b' }}>{p.desc}</div>
                        </td>
                        <td className="py-4 text-center text-sm text-muted font-medium">{p.qRange}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-4">
                            <input type="number" className="form-control text-center font-bold text-main" style={{ width: '70px', padding: '0.25rem 0.5rem' }} value={weights[p.id]} onChange={(e) => handleWeightChange(p.id, e.target.value)} />
                            <input type="range" className="w-full cursor-pointer accent-primary" min="0" max="100" value={weights[p.id]} onChange={(e) => handleWeightChange(p.id, e.target.value)} />
                          </div>
                        </td>
                        <td className="py-4 text-center text-xs text-muted" style={{ lineHeight: '1.4' }}>{p.suggestion}</td>
                        <td className="py-4 text-right font-bold text-main" style={{ fontSize: '1rem' }}>{convScore.toFixed(2)}</td>
                      </tr>
                     );
                  })}
                </tbody>
              </table>`;

const newTable = `<table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs text-muted uppercase border-b">
                    <th className="pb-3 w-[35%]">Nguyên tắc và ba nhóm nội dung</th>
                    <th className="pb-3 text-center whitespace-nowrap px-2">Mã câu</th>
                    <th className="pb-3 text-center w-[25%] px-2">Trọng số (Đơn vị chọn)</th>
                    <th className="pb-3 text-center w-[25%] px-2">Ví dụ trọng số gợi ý<br/><span className="text-[10px] font-normal normal-case">(Theo loại hệ thống)</span></th>
                    <th className="pb-3 text-center whitespace-nowrap pl-2">Điểm đóng góp<br/>dự kiến</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'C1', title: 'C1 – Bảo đảm an toàn, độ tin cậy và không gây hại', desc: 'Thiết kế an toàn • Kiểm thử và xác nhận chất lượng • Giám sát và quản lý sự cố', qRange: 'C1.1 - C1.15', suggestion: 'YT/HCC 40 % • TC-HT 35 % • ĐMST 20 %' },
                    { id: 'C2', title: 'C2 – Tôn trọng quyền con người, công bằng, minh bạch', desc: 'Kiểm soát của con người • Minh bạch và khả năng giải thích • Phòng chống phân biệt đối xử và thiên lệch', qRange: 'C2.1 - C2.15', suggestion: 'YT/HCC 30 % • TC-HT 30 % • ĐMST 15 %' },
                    { id: 'C3', title: 'C3 – Hạnh phúc, thịnh vượng, phát triển bền vững', desc: 'Lợi ích xã hội và bao trùm kỹ thuật số • Thiết kế bao trùm và giảm khoảng cách số • Tác động đến môi trường và tính bền vững', qRange: 'C3.1 - C3.15', suggestion: 'YT/HCC 20 % • TC-HT 15 % • ĐMST 35 %' },
                    { id: 'C4', title: 'C4 – Khuyến khích đổi mới sáng tạo và trách nhiệm xã hội', desc: 'Đổi mới có trách nhiệm • Trách nhiệm giải trình và năng lực quản trị • Hợp tác và phát triển hệ sinh thái AI', qRange: 'C4.1 - C4.15', suggestion: 'YT/HCC 10 % • TC-HT 20 % • ĐMST 30 %' }
                  ].map(p => {
                     // Calculate current achieved score for this principle from answers
                     const answeredYes = Object.keys(answers).filter(k => k.startsWith(p.id) && answers[k] === 'Có').length;
                     const convScore = (answeredYes / 15) * weights[p.id];
                     return (
                      <tr className="border-b" key={p.id}>
                        <td className="py-4 pr-4">
                          <div className="font-bold text-sm text-main">{p.title}</div>
                          <div className="text-xs text-muted mt-1" style={{ fontSize: '0.75rem', lineHeight: '1.2rem', color: '#64748b' }}>{p.desc}</div>
                        </td>
                        <td className="py-4 text-center text-sm text-muted font-medium whitespace-nowrap px-2">{p.qRange}</td>
                        <td className="py-4 px-2">
                          <div className="flex items-center justify-center gap-3">
                            <input type="number" className="form-control text-center font-bold text-main" style={{ width: '65px', padding: '0.25rem 0.25rem' }} value={weights[p.id]} onChange={(e) => handleWeightChange(p.id, e.target.value)} />
                            <input type="range" className="w-full max-w-[120px] cursor-pointer accent-primary" min="0" max="100" value={weights[p.id]} onChange={(e) => handleWeightChange(p.id, e.target.value)} />
                          </div>
                        </td>
                        <td className="py-4 text-center text-xs text-muted px-2" style={{ lineHeight: '1.4' }}>{p.suggestion}</td>
                        <td className="py-4 text-center font-bold text-main pl-2" style={{ fontSize: '1rem' }}>{convScore.toFixed(2)}</td>
                      </tr>
                     );
                  })}
                </tbody>
              </table>`;

txt = txt.replace(oldTable, newTable);
fs.writeFileSync('src/pages/Assessment2.jsx', txt);
console.log('Fixed alignment and widths');
