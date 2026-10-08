import re

def fix_dash(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # The issue is that there are </div>\n</div> between the end of technicalLimits and Nhận diện nhóm chịu tác động.
    
    # We want to find:
    # <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các hạn chế kỹ thuật biết trước:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.technicalLimits || '-'}</span></div>
    #                 </div>
    #               </div>
    # 
    #               <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Nhận diện nhóm chịu tác động</div>
    
    match = re.search(r'(\{formData\.technicalLimits \|\| \'-\'\}</span></div>)\s*</div>\s*</div>\s*(<div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Nhận diện nhóm chịu tác động</div>)', text, re.DOTALL)
    
    if match:
        # replace by removing the two closing divs
        text = text.replace(match.group(0), match.group(1) + "\n                    " + match.group(2))
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(text)
        print("Fixed", filename)
    else:
        print("Not found in", filename)

fix_dash('src/pages/Dashboard1.jsx')
fix_dash('src/pages/Dashboard2.jsx')
