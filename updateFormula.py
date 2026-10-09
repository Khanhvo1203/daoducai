import re

with open('src/pages/Assessment2.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

old_str = """              </table>
            </div>
          )}"""

new_str = """              </table>
              <div className="mt-4 p-4 bg-muted-light rounded text-sm text-muted">
                <h5 className="font-bold mb-2 text-main">Giải thích công thức tính điểm trọng số:</h5>
                <div className="mb-2"><strong>Điểm quy đổi</strong> = (Số câu đạt được / 15) * 100% * Trọng số</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>W</strong> là trọng số.</li>
                  <li><strong>P/15</strong> là số câu đạt được.</li>
                  <li><strong>p/15</strong> là tỷ lệ từng nguyên tắc.</li>
                  <li><strong>P\\W</strong> là số điểm quy đổi (Điểm đóng góp dự kiến).</li>
                </ul>
              </div>
            </div>
          )}"""

text = text.replace(old_str, new_str)

with open('src/pages/Assessment2.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
