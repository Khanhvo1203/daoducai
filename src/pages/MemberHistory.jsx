import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { History, FileText, ArrowRight, Search } from 'lucide-react';
import { getCurrentUser, getAssessmentsByUser } from '../utils/auth';

const MemberHistory = () => {
  const [assessments, setAssessments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== 'MEMBER') {
      navigate('/login');
      return;
    }
    setAssessments(getAssessmentsByUser(user.username));
  }, [navigate]);

  const filteredAssessments = assessments.filter(a => 
    a.id.includes(searchTerm) || 
    (a.formData?.systemName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container page-container fade-in min-h-[80vh]">
      <div className="breadcrumbs text-sm text-muted mb-4">
        <Link to="/">Trang chủ</Link> {'>'} <span className="text-primary font-semibold">Lịch sử đánh giá</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="icon-box bg-primary-light text-primary">
            <History size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-main">Hồ sơ của bạn</h2>
            <p className="text-muted">Lịch sử các bài đánh giá đạo đức AI đã thực hiện</p>
          </div>
        </div>
        
        <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
          <input 
            type="text" 
            placeholder="Tìm theo mã số hoặc tên hệ thống..." 
            className="form-control"
            style={{ paddingLeft: '36px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#718096' }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.length === 0 ? (
          <div className="col-span-full text-center p-12 bg-muted-light rounded-lg border border-dashed">
            {searchTerm ? (
              <p className="text-muted">Không tìm thấy hồ sơ nào khớp với "{searchTerm}".</p>
            ) : (
              <>
                <p className="text-muted mb-4">Bạn chưa thực hiện bài đánh giá nào.</p>
                <Link to="/" className="btn btn-primary">Thực hiện đánh giá mới</Link>
              </>
            )}
          </div>
        ) : (
          filteredAssessments.map(a => (
            <div key={a.id} className="card hover:shadow-lg transition-shadow border border-transparent hover:border-primary">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  MÃ SỐ: #{a.id}
                </div>
                <div className="text-xs text-muted font-medium">
                  {new Date(a.createdAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-1">{a.formData?.systemName}</h3>
              <p className="text-sm text-muted mb-6 flex items-center gap-2">
                <FileText size={14} /> Lĩnh vực: {a.formData?.domain}
              </p>
              
              <button 
                onClick={() => navigate('/dashboard', { state: { selection: a.selection, formData: a.formData, answers: a.answers, assessmentCode: a.id }})}
                className="btn w-full btn-secondary text-primary border-primary flex justify-center items-center gap-2"
              >
                Xem lại kết quả <ArrowRight size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemberHistory;
