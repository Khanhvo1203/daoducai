import React, { useState } from 'react';
import PrincipleResult from '../components/PrincipleResult';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Share2, RotateCcw, Download, CheckSquare, Target, Shield, BookOpen, AlertCircle, AlertTriangle, ArrowRight, ChevronDown, ChevronUp, User } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import { saveAssessment, getCurrentUser, getAllAssessments } from '../utils/auth';
import './Dashboard.css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
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
    systemName: 'Hệ thống AI Demo',
    domain: 'Hành chính công',
    email: 'admin@demo.vn'
  };

  const assessmentCode = existingCode;
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const getScore = (prefix) => {
    let score = 0;
    for (let i = 1; i <= 15; i++) {
      if (answers[`${prefix}.${i}`] === 0) { // 'Có' is always index 0
        score++;
      }
    }
    return score;
  };

  const scoreC1 = getScore('C1');
  const scoreC2 = getScore('C2');
  const scoreC3 = getScore('C3');
  const scoreC4 = getScore('C4');
  const totalCScore = scoreC1 + scoreC2 + scoreC3 + scoreC4;

  const getScoreD = () => {
    let score = 0;
    for (let i = 1; i <= 10; i++) {
      if (answers[`D${i}`] === 0) {
        score++;
      }
    }
    return score;
  };
  const scoreD = getScoreD();

  const getDComplianceLevel = (score) => {
    if (score >= 8) return { label: 'Tuân thủ đầy đủ', color: 'text-success', bgColor: '', desc: 'Hệ thống đáp ứng tốt các yêu cầu về kế hoạch giảm thiểu rủi ro và giám sát.' };
    if (score >= 4) return { label: 'Tuân thủ một phần', color: 'text-warning', bgColor: '', desc: 'Đã có kế hoạch giám sát nhưng còn một số nội dung cần hoàn thiện.' };
    return { label: 'Không tuân thủ', color: 'text-danger', bgColor: '', desc: 'Kế hoạch giám sát hầu như chưa đạt yêu cầu, cần cải thiện đáng kể.' };
  };
  const dLevel = getDComplianceLevel(scoreD);

  const getComplianceLevel = (score) => {
    if (score >= 11) return { label: 'Tuân thủ đầy đủ', color: 'text-success', bgColor: '', desc: 'Cơ quan, tổ chức có đầy đủ các cơ chế, chính sách, quy trình và biện pháp bảo vệ để bảo đảm nguyên tắc này được thực thi xuyên suốt vòng đời của hệ thống AI; minh chứng đầy đủ, nhất quán, có cơ chế giám sát và cải tiến liên tục.' };
    if (score >= 6) return { label: 'Tuân thủ một phần', color: 'text-warning', bgColor: '', desc: 'Cơ quan, tổ chức đã có những nỗ lực và biện pháp ban đầu hướng tới nguyên tắc này, nhưng vẫn còn khoảng trống hoặc thiếu minh chứng ở một số nội dung và cần tiếp tục cải thiện để đáp ứng đầy đủ.' };
    return { label: 'Không tuân thủ', color: 'text-danger', bgColor: '', desc: 'Nguyên tắc này hầu như chưa được tuân thủ; các hoạt động còn thiếu sót ở phần lớn nội dung và cần nỗ lực đáng kể để bảo đảm tuân thủ.' };
  };

  const getOverallComplianceLevel = (totalScore, s1, s2, s3, s4) => {
    // Không tuân thủ: Có ít nhất 01 nguyên tắc đạt 0-5 câu
    if (s1 <= 5 || s2 <= 5 || s3 <= 5 || s4 <= 5) {
      return { 
        label: 'Không tuân thủ', 
        color: 'text-danger', 
        desc: 'Thiếu biện pháp bảo vệ cốt lõi, chưa có đầu mối trách nhiệm rõ ràng hoặc chưa có minh chứng; cần nỗ lực đáng kể để bảo đảm tuân thủ.' 
      };
    }
    
    // Tuân thủ đầy đủ: 44-60 câu, trong đó cả 04 nguyên tắc đạt 11-15 câu
    if (totalScore >= 44 && s1 >= 11 && s2 >= 11 && s3 >= 11 && s4 >= 11) {
      return { 
        label: 'Tuân thủ đầy đủ', 
        color: 'text-success', 
        desc: 'Biện pháp bảo vệ cơ bản đã có đầy đủ, có minh chứng; có cơ chế giám sát của con người, kênh khiếu nại và quy trình khắc phục sự cố; sẵn sàng duy trì và cải tiến liên tục.' 
      };
    }

    // Tuân thủ một phần: 24-43 câu và không có nguyên tắc nào đạt dưới 6 câu, HOẶC không thỏa mãn Tuân thủ đầy đủ (nhưng không có nguyên tắc < 6)
    return { 
      label: 'Tuân thủ một phần', 
      color: 'text-warning', 
      desc: 'Đã có khung quản trị nhưng còn thiếu bằng chứng hoặc chưa bảo đảm đầy đủ ở một hoặc nhiều nguyên tắc; cần xây dựng kế hoạch cải thiện có thời hạn.' 
    };
  };

  const overall = getOverallComplianceLevel(totalCScore, scoreC1, scoreC2, scoreC3, scoreC4);

  let labels = ['An toàn', 'Quyền con người', 'Bền vững', 'Đổi mới'];
  let dataPoints = [
    (scoreC1 / 15) * 100,
    (scoreC2 / 15) * 100,
    (scoreC3 / 15) * 100,
    (scoreC4 / 15) * 100
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Mức độ tuân thủ (%)',
        data: dataPoints,
        backgroundColor: 'rgba(43, 86, 245, 0.2)',
        borderColor: 'rgba(43, 86, 245, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(43, 86, 245, 1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        pointLabels: {
          font: { size: 12, family: "'Inter', sans-serif" },
          color: '#718096'
        },
        ticks: { display: false, max: 100, min: 0, stepSize: 25 }
      }
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  const barChartData = {
    labels: [
      'NT1 - An toàn, độ tin cậy & không gây hại',
      'NT2 - Kiểm soát của con người',
      'NT3 - Lợi ích xã hội & bao trùm kỹ thuật số',
      'NT4 - Đổi mới có trách nhiệm'
    ],
    datasets: [
      {
        label: 'Trả lời "Có"',
        data: [scoreC1, scoreC2, scoreC3, scoreC4],
        backgroundColor: '#475569',
      },
      {
        label: 'Trả lời "Không"',
        data: [15 - scoreC1, 15 - scoreC2, 15 - scoreC3, 15 - scoreC4],
        backgroundColor: '#cbd5e1',
      }
    ]
  };

  const barChartOptions = {
    indexAxis: 'y',
    scales: {
      x: { stacked: true, max: 15, ticks: { stepSize: 5 } },
      y: { stacked: true, ticks: { font: { size: 12, family: "'Inter', sans-serif" }, color: '#475569' } }
    },
    plugins: {
      legend: { position: 'bottom' }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="container page-container fade-in">
      <div className="breadcrumbs text-sm text-muted mb-4">
        <Link to="/">Trang chủ</Link> {'>'} Kết quả đánh giá
      </div>

      <div className="split-layout">
        <aside className="sidebar">
          <div className="card mb-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-bold">THÔNG TIN HỆ THỐNG</h4>
            </div>
            <div className="info-group mb-3">
              <div className="text-muted text-sm">Tên hệ thống</div>
              <div className="font-semibold">{formData.systemName}</div>
            </div>
            <div className="info-group mb-3">
              <div className="text-muted text-sm">Lĩnh vực ứng dụng</div>
              <div className="font-semibold">{formData.domain === 'Khác' ? formData.otherDomain : formData.domain}</div>
            </div>
          </div>

          <div className="card mb-4">
            <h4 className="text-sm font-bold mb-2">TIẾN TRÌNH</h4>
            <div className="text-success font-bold mb-4">Hoàn tất 4/4 Bước</div>
            
            <div className="stepper result-stepper">
              <div className="step completed">
                <div className="step-num"><CheckSquare size={14}/></div>
                <div className="step-name text-muted">01. Xác định phạm vi</div>
              </div>
              <div className="step completed">
                <div className="step-num"><CheckSquare size={14}/></div>
                <div className="step-name text-muted">02. Quản trị rủi ro</div>
              </div>
              <div className="step completed">
                <div className="step-num"><CheckSquare size={14}/></div>
                <div className="step-name text-muted">03. Đạo đức AI</div>
              </div>
              <div className="step completed">
                <div className="step-num"><CheckSquare size={14}/></div>
                <div className="step-name text-muted">04. Kế hoạch giám sát</div>
              </div>
            </div>
          </div>

          <div className="card text-center download-card">
            <div className="flex justify-center mb-2">
              <Download className="text-primary mb-2" size={24}/>
            </div>
            <h4 className="font-bold mb-2">Tải báo cáo</h4>
            <p className="text-sm text-muted mb-4">Tải xuống kết quả chứng nhận (PDF).</p>
            <button className="btn btn-secondary w-full text-primary border-primary bg-white">Tải PDF</button>
          </div>
        </aside>

        <section className="content-area">
          <div className="flex gap-4 mb-6 border-b">
            <button 
              className={`pb-3 px-4 font-bold flex items-center gap-2 ${activeView === 'weights' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
              onClick={() => setActiveView('weights')}
            >
              Màn hình 1 - Đánh trọng số 4 nguyên tắc
            </button>
            <button 
              className={`pb-3 px-4 font-bold flex items-center gap-2 ${activeView === 'results' ? 'border-b-2 border-primary text-primary' : 'text-muted'}`}
              onClick={() => setActiveView('results')}
            >
              Màn hình 2 - Kết quả tuân thủ có trọng số
            </button>
          </div>

          {activeView === 'weights' && (
            <div className="fade-in">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="mb-1 text-2xl uppercase">HỒ SƠ ĐANG ĐÁNH TRỌNG SỐ</h2>
                  <div className="flex gap-6 text-sm text-muted mt-2">
                    <div>Mã hồ sơ: <span className="font-bold text-main">#{assessmentCode || formData.id || 'Đang cập nhật'}</span></div>
                    <div>Hệ thống: <span className="font-bold text-main">{formData.systemName}</span></div>
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="text-sm font-bold mb-1">Đơn vị chọn (Loại hệ thống)</div>
                  <select className="form-control text-sm font-semibold" value={preset} onChange={handlePresetChange}>
                    <option value="chia_deu">Chia đều (25/25/25/25)</option>
                    <option value="yt_hcc">YT/HCC - Y tế & hành chính công (40/30/20/10)</option>
                    <option value="tc_ht">TC-HT - Tài chính, hạ tầng (35/30/15/20)</option>
                    <option value="dmst">ĐMST - Đổi mới sáng tạo, R&D (20/15/35/30)</option>
                    <option value="custom">Tùy chỉnh</option>
                  </select>
                </div>
              </div>

              <div className="card">
                <div className="flex justify-between items-end border-b pb-3 mb-4">
                  <h4 className="font-bold">TRỌNG SỐ 04 TRỤ CỘT</h4>
                  <div className="text-sm text-muted">Tổng trọng số 04 trụ cột = 100%</div>
                </div>
                
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs text-muted uppercase border-b">
                      <th className="pb-3 w-1/3">Nguyên tắc</th>
                      <th className="pb-3 text-center">Mã câu</th>
                      <th className="pb-3 text-center w-1/2">Trọng số (%)</th>
                      <th className="pb-3 text-right">Điểm quy đổi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4 pr-4">
                        <div className="font-bold text-sm">C1 – Bảo đảm an toàn, độ tin cậy và không gây hại</div>
                      </td>
                      <td className="py-4 text-center text-sm">C1.1 - C1.15</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <input type="number" className="form-control text-center font-bold" style={{ width: '60px' }} value={weights.C1} onChange={(e) => handleWeightChange('C1', e.target.value)} />
                          <input type="range" className="w-full" min="0" max="100" value={weights.C1} onChange={(e) => handleWeightChange('C1', e.target.value)} />
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-primary">{convC1.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 pr-4">
                        <div className="font-bold text-sm">C2 – Tôn trọng quyền con người, công bằng, minh bạch</div>
                      </td>
                      <td className="py-4 text-center text-sm">C2.1 - C2.15</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <input type="number" className="form-control text-center font-bold" style={{ width: '60px' }} value={weights.C2} onChange={(e) => handleWeightChange('C2', e.target.value)} />
                          <input type="range" className="w-full" min="0" max="100" value={weights.C2} onChange={(e) => handleWeightChange('C2', e.target.value)} />
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-primary">{convC2.toFixed(2)}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4 pr-4">
                        <div className="font-bold text-sm">C3 – Hạnh phúc, thịnh vượng, phát triển bền vững</div>
                      </td>
                      <td className="py-4 text-center text-sm">C3.1 - C3.15</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <input type="number" className="form-control text-center font-bold" style={{ width: '60px' }} value={weights.C3} onChange={(e) => handleWeightChange('C3', e.target.value)} />
                          <input type="range" className="w-full" min="0" max="100" value={weights.C3} onChange={(e) => handleWeightChange('C3', e.target.value)} />
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-primary">{convC3.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4">
                        <div className="font-bold text-sm">C4 – Khuyến khích đổi mới sáng tạo và trách nhiệm xã hội</div>
                      </td>
                      <td className="py-4 text-center text-sm">C4.1 - C4.15</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-4">
                          <input type="number" className="form-control text-center font-bold" style={{ width: '60px' }} value={weights.C4} onChange={(e) => handleWeightChange('C4', e.target.value)} />
                          <input type="range" className="w-full" min="0" max="100" value={weights.C4} onChange={(e) => handleWeightChange('C4', e.target.value)} />
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-primary">{convC4.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeView === 'results' && (
            <div className="fade-in">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="mb-1 text-2xl uppercase">KẾT QUẢ ĐÁNH GIÁ MỨC ĐỘ TUÂN THỦ (CÓ TRỌNG SỐ)</h2>
                  <div className="text-sm text-muted">Ngày đánh giá: {new Date().toLocaleDateString('vi-VN')}</div>
                </div>
                <div className="flex gap-3">
                  <button className="btn btn-secondary text-sm border-primary text-primary">
                    <Share2 size={16}/> Chia sẻ kết quả
                  </button>
                  <button className="btn btn-secondary text-sm border-primary text-primary" onClick={() => {
                    const user = getCurrentUser();
                    if (user) {
                      localStorage.removeItem(`landing_formData_${user.username}`);
                      localStorage.removeItem(`landing_step_${user.username}`);
                      localStorage.removeItem(`assessment_answers_${user.username}`);
                      localStorage.removeItem(`assessment_evidences_${user.username}`);
                      localStorage.removeItem(`assessment_activeStepIdx_${user.username}`);
                    }
                    navigate('/');
                  }}>
                    <RotateCcw size={16}/> Đánh giá lại
                  </button>
                </div>
              </div>

              <div className="card mb-6">
                <h4 className="font-bold text-lg mb-4 text-primary uppercase">CẤU TRÚC THANG ĐIỂM THEO 60 CÂU HỎI:</h4>
                <ul className="list-disc pl-6 mb-4 text-sm space-y-1">
                  <li><strong>Bộ câu hỏi cấu trúc:</strong> 4 Nguyên tắc x 3 nhóm nội dung x 5 câu = <strong>60 câu hỏi</strong>.</li>
                  <li><strong>Thang điểm chuẩn:</strong> 1 câu tương ứng với 1 điểm.</li>
                  <li><strong>Mỗi tối đa nguyên tắc:</strong> 15 điểm (15/15 = 100%).</li>
                </ul>
                <div className="bg-primary-light p-3 rounded font-bold text-main border border-primary/20 mb-6">
                  Công thức tính điểm: Điểm quy đổi = (Số câu đạt được / 15) * 100% * Trọng số
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 border-r border-gray-200 font-bold">Nguyên tắc</th>
                        <th className="p-3 border-r border-gray-200 font-bold text-center">Trọng số (W)</th>
                        <th className="p-3 border-r border-gray-200 font-bold text-center">Số câu đạt thực tế (P/15)</th>
                        <th className="p-3 border-r border-gray-200 font-bold text-center">Tỷ lệ từng nguyên tắc (p/15)</th>
                        <th className="p-3 font-bold text-center">Con số quy đổi điểm (P\W)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 border-r border-gray-200">C1 – An toàn, tin cậy</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">{weights.C1}%</td>
                        <td className="p-3 border-r border-gray-200 text-center">{scoreC1} / 15 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center">{((scoreC1/15)*100).toFixed(1)}%</td>
                        <td className="p-3 text-center">{((scoreC1/15)*100).toFixed(1)}% x {weights.C1}% = <strong>{convC1.toFixed(1)} điểm</strong></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 border-r border-gray-200">C2 – Minh bạch & Kiểm soát</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">{weights.C2}%</td>
                        <td className="p-3 border-r border-gray-200 text-center">{scoreC2} / 15 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center">{((scoreC2/15)*100).toFixed(1)}%</td>
                        <td className="p-3 text-center">{((scoreC2/15)*100).toFixed(1)}% x {weights.C2}% = <strong>{convC2.toFixed(1)} điểm</strong></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 border-r border-gray-200">C3 – Lợi ích & bao trùm</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">{weights.C3}%</td>
                        <td className="p-3 border-r border-gray-200 text-center">{scoreC3} / 15 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center">{((scoreC3/15)*100).toFixed(1)}%</td>
                        <td className="p-3 text-center">{((scoreC3/15)*100).toFixed(1)}% x {weights.C3}% = <strong>{convC3.toFixed(1)} điểm</strong></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 border-r border-gray-200">C4 – Đổi mới sáng tạo</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">{weights.C4}%</td>
                        <td className="p-3 border-r border-gray-200 text-center">{scoreC4} / 15 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center">{((scoreC4/15)*100).toFixed(1)}%</td>
                        <td className="p-3 text-center">{((scoreC4/15)*100).toFixed(1)}% x {weights.C4}% = <strong>{convC4.toFixed(1)} điểm</strong></td>
                      </tr>
                      <tr className="bg-muted-light">
                        <td className="p-3 border-r border-gray-200 font-bold uppercase">Tổng cộng</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-primary">100%</td>
                        <td className="p-3 border-r border-gray-200 text-center font-bold">{totalCScore} / 60 câu</td>
                        <td className="p-3 border-r border-gray-200 text-center"></td>
                        <td className="p-3 text-center font-bold text-lg text-primary">Tổng điểm: {finalScore.toFixed(1)}/100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid-2col mb-6 gap-6">
                <div className="card">
                  <h4 className="font-bold mb-6 text-sm uppercase">KẾT QUẢ TỔNG THỂ</h4>
                  <div className="flex gap-6 items-center">
                    <div className="score-circle">
                      <svg viewBox="0 0 36 36" className={`circular-chart ${overall.color.replace('text-', '')}`}>
                        <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="circle" strokeDasharray={`${finalScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke={overall.color === 'text-success' ? 'var(--success)' : overall.color === 'text-warning' ? 'var(--warning)' : 'var(--danger)'} />
                      </svg>
                      <div className="score-text">
                        <span className="score-number" style={{ color: overall.color === 'text-success' ? 'var(--success)' : overall.color === 'text-warning' ? 'var(--warning)' : 'var(--danger)' }}>{finalScore.toFixed(1)}</span>
                      </div>
                    </div>
                    <div>
                      <div className={`text-lg font-bold mb-1 ${overall.color}`}>{overall.text}</div>
                      <p className="text-sm text-muted">{overall.desc}</p>
                    </div>
                  </div>
                </div>
                
                <div className="card">
                  <h4 className="font-bold mb-4 text-sm uppercase">ĐÁNH GIÁ 9 ĐIỀU KIỆN QUẢN TRỊ (PHẦN B)</h4>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-black text-main">{scoreD}/9</div>
                    <div className="text-sm text-muted">điều kiện được đáp ứng hoàn toàn.</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(scoreD/9)*100}%` }}></div>
                  </div>
                  <p className="text-xs text-muted">Hệ thống AI cần tối thiểu 5/9 điều kiện để được phép triển khai giới hạn.</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard2;
