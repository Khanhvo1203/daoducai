import re

def rewrite_landing():
    with open('src/pages/LandingPage.jsx', 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Update the form UI
    old_leader_input = """<div className="form-group mb-4">
                    <label>2. Người chịu trách nhiệm cấp lãnh đạo</label>
                    <input type="text" name="leaderInCharge" placeholder="Họ tên, chức vụ, email/điện thoại: đây là trường nên có để phục vụ quản trị tối thiểu." value={formData.leaderInCharge} onChange={handleChange} className="form-control" />
                  </div>"""
    
    new_leader_inputs = """<div className="form-group mb-4">
                    <label className="font-bold block mb-2">2. Người chịu trách nhiệm cấp lãnh đạo</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted mb-1 block">2.1 Họ và tên</label>
                        <input type="text" name="leaderName" placeholder="Nhập họ và tên..." value={formData.leaderName || ''} onChange={handleChange} className="form-control" />
                      </div>
                      <div>
                        <label className="text-sm text-muted mb-1 block">2.2 Chức vụ</label>
                        <input type="text" name="leaderRole" placeholder="Nhập chức vụ..." value={formData.leaderRole || ''} onChange={handleChange} className="form-control" />
                      </div>
                      <div>
                        <label className="text-sm text-muted mb-1 block">2.3 Email</label>
                        <input type="email" name="leaderEmail" placeholder="Nhập email..." value={formData.leaderEmail || ''} onChange={handleChange} className="form-control" />
                      </div>
                      <div>
                        <label className="text-sm text-muted mb-1 block">2.4 Điện thoại</label>
                        <input type="tel" name="leaderPhone" placeholder="Nhập số điện thoại..." value={formData.leaderPhone || ''} onChange={handleChange} className="form-control" />
                      </div>
                    </div>
                  </div>"""
    
    text = text.replace(old_leader_input, new_leader_inputs)
    
    with open('src/pages/LandingPage.jsx', 'w', encoding='utf-8') as f:
        f.write(text)

def rewrite_dashboard(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()
    
    old_leader_view = """<div className="flex flex-col"><span className="text-muted mb-1">Người chịu trách nhiệm cấp lãnh đạo:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.leaderInCharge || '-'}</span></div>"""
    
    new_leader_view = """<div className="flex flex-col md:col-span-2">
                      <span className="text-muted mb-1">Người chịu trách nhiệm cấp lãnh đạo:</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-muted-light p-3 rounded">
                        <div><span className="text-muted text-xs">Họ và tên:</span> <span className="font-medium">{formData.leaderName || '-'}</span></div>
                        <div><span className="text-muted text-xs">Chức vụ:</span> <span className="font-medium">{formData.leaderRole || '-'}</span></div>
                        <div><span className="text-muted text-xs">Email:</span> <span className="font-medium">{formData.leaderEmail || '-'}</span></div>
                        <div><span className="text-muted text-xs">Điện thoại:</span> <span className="font-medium">{formData.leaderPhone || '-'}</span></div>
                      </div>
                    </div>"""
    
    text = text.replace(old_leader_view, new_leader_view)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)

rewrite_landing()
rewrite_dashboard('src/pages/Dashboard1.jsx')
rewrite_dashboard('src/pages/Dashboard2.jsx')
print("Updated successfully")
