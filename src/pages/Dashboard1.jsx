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

const Dashboard1 = () => {
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="mb-1 text-2xl">KẾT QUẢ ĐÁNH GIÁ MỨC ĐỘ TUÂN THỦ</h2>
              <div className="text-sm text-muted">Ngày đánh giá: {new Date().toLocaleDateString('vi-VN')}</div>
            </div>
            
            <div className="flex gap-4 items-center">
              {assessmentCode && (
                <div className="bg-primary-light text-primary px-4 py-2 rounded-md font-bold text-lg border border-primary">
                  MÃ HỒ SƠ: #{assessmentCode}
                </div>
              )}
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
          </div>

          <div className="grid-2col mb-6 gap-6">
            <div className="card">
              <h4 className="font-bold mb-6 text-sm">KẾT QUẢ TỔNG THỂ</h4>
              <div className="flex gap-6 items-center">
                <div className="score-circle">
                  <svg viewBox="0 0 36 36" className={`circular-chart ${overall.color.replace('text-', '')}`}>
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle" strokeDasharray={`${(totalCScore / 60) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" stroke={overall.color === 'text-success' ? 'var(--success)' : overall.color === 'text-warning' ? 'var(--warning)' : 'var(--danger)'} />
                  </svg>
                  <div className="score-text">
                    <span className="score-number" style={{ color: overall.color === 'text-success' ? 'var(--success)' : overall.color === 'text-warning' ? 'var(--warning)' : 'var(--danger)' }}>{totalCScore}</span>
                    <span className="score-total">/60</span>
                  </div>
                </div>
                
                <div className="score-details flex-1">
                  <div className="text-muted text-sm mb-1">Tuân thủ nguyên tắc đạo đức</div>
                  <h3 className={`text-2xl font-bold mb-2 ${overall.color}`}>{overall.label}</h3>
                  <p className="text-sm text-muted mb-4">{overall.desc}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h4 className="font-bold mb-2 text-sm text-center">ĐIỂM THEO LĨNH VỰC</h4>
              <div className="radar-container" style={{height: '250px'}}>
                <Radar data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="card mb-6">
            <h4 className="font-bold mb-4 text-sm uppercase">SỐ CÂU "CÓ" / "KHÔNG" THEO NGUYÊN TẮC — ngưỡng 11 (đầy đủ) và 6 (một phần)</h4>
            <div style={{height: '250px'}}>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          <div className="card mb-6">
            <h4 className="font-bold mb-4 text-sm uppercase">Kết quả từng nguyên tắc (Phần C)</h4>
            <div className="flex-col gap-4">
              
              <PrincipleResult prefix="C1" title="C1. Nguyên tắc 1: Bảo đảm an toàn, độ tin cậy và không gây hại" score={scoreC1} answers={answers} getComplianceLevel={getComplianceLevel} />
              <PrincipleResult prefix="C2" title="C2. Nguyên tắc 2: Tôn trọng quyền con người, công bằng, minh bạch" score={scoreC2} answers={answers} getComplianceLevel={getComplianceLevel} />
              <PrincipleResult prefix="C3" title="C3. Nguyên tắc 3: Hạnh phúc, thịnh vượng, phát triển bền vững" score={scoreC3} answers={answers} getComplianceLevel={getComplianceLevel} />
              <PrincipleResult prefix="C4" title="C4. Nguyên tắc 4: Khuyến khích đổi mới sáng tạo và trách nhiệm xã hội" score={scoreC4} answers={answers} getComplianceLevel={getComplianceLevel} />
            </div>
          </div>

          <div className="card mt-6">
            <h4 className="font-bold mb-4 text-sm uppercase">Kết quả kế hoạch giám sát (Phần D)</h4>
            <div className="flex items-center gap-4 p-4 border rounded-md recommendation-item">
              <div className={`icon-box ${dLevel.bgColor} ${dLevel.color}`}>
                {scoreD < 4 ? <AlertTriangle size={20}/> : <CheckSquare size={20}/>}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-main mb-0">Mức độ tuân thủ</h5>
                  <div className="font-bold text-sm">
                    <span className={dLevel.color}>{dLevel.label}</span>
                    <span className="text-muted ml-2">({scoreD}/10)</span>
                  </div>
                </div>
                <p className="text-sm text-muted">{dLevel.desc}</p>
              </div>
            </div>
          </div>

          <div className="card mt-6">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => setIsProfileExpanded(!isProfileExpanded)}
            >
              <h4 className="font-bold text-sm uppercase mb-0">CHI TIẾT HỒ SƠ KHAI BÁO</h4>
              {isProfileExpanded ? <ChevronUp size={20} className="text-muted" /> : <ChevronDown size={20} className="text-muted" />}
            </div>
            
            {isProfileExpanded && (
              <div className="flex-col gap-6 mt-6 pt-4 border-t fade-in">
                
                {/* 1. Hồ sơ đăng ký */}
                <div>
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">1. Thông tin liên hệ (Hồ sơ đăng ký)</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col"><span className="text-muted mb-1">Họ và tên:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.fullName || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Chức vụ:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.role || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Email:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.email || '-'}</span></div>
                  </div>
                </div>

                {/* 2. Thông tin hệ thống */}
                <div className="mb-6">
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">2. Thông tin hệ thống</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col md:col-span-2 mt-1 font-bold text-main">Thông tin quản trị đầu mối</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Tên hệ thống AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.systemName || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mã hệ thống:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.internalCode || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Phiên bản / Cập nhật:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.version || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Cơ quan/Đơn vị triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.agencyName || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Vai trò tổ chức:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.orgRole === 'Khác: điền thông tin' ? formData.otherOrgRole : formData.orgRole || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Căn cứ pháp lý:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.legalBasis || '-'}</span></div>

                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Mức độ rủi ro</div>
                    <div className="flex flex-col md:col-span-2">
                        <span className="text-muted mb-1">Mức độ rủi ro:</span>
                        <div className="bg-muted-light p-2 rounded">
                            <span className={`px-2 py-1 rounded font-bold mr-2 ${formData.riskLevel === 'Rủi ro cao' ? 'bg-danger-light text-danger' : formData.riskLevel === 'Trung bình' ? 'bg-warning-light text-warning' : formData.riskLevel === 'Thấp' ? 'bg-success-light text-success' : 'bg-muted-light text-muted'}`}>{formData.riskLevel || '-'}</span>
                            <span>{formData.riskLevelBasis ? `Căn cứ: ${formData.riskLevelBasis}` : ''}</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Thuộc danh mục rủi ro cao:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.isInHighRiskList || '-'} {formData.isInHighRiskList === 'Có' && formData.highRiskCategoryDesc ? `- ${formData.highRiskCategoryDesc}` : ''}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mô tả cụ thể (nếu thuộc DM rủi ro cao):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.highRiskDetail || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Đánh giá sự phù hợp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.complianceAssessment || '-'} {formData.complianceAssessment === 'Đã thực hiện' && formData.complianceAssessmentDetail ? `- ${formData.complianceAssessmentDetail}` : ''}</span></div>
                  </div>
                </div>

                {/* 3. Mô tả hệ thống */}
                <div>
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">3. Mô tả hệ thống</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col md:col-span-2 mt-1 font-bold text-main">Loại công nghệ & Nhà cung cấp</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại công nghệ AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.aiTechType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nguồn gốc phát triển:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.developType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nhà cung cấp (nếu có):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.provider || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mô hình nền (nếu có):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.foundationModel || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các thành phần AI bên thứ ba khác:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.otherThirdParty || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Vai trò tổ chức:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.orgRole === 'Khác: điền thông tin' ? formData.otherOrgRole : formData.orgRole || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Các vai trò phụ:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.subRole || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Lĩnh vực ứng dụng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.domain === 'Khác' ? formData.otherDomain : formData.domain || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mục đích chính:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.purpose || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Giới hạn ứng dụng (Out of scope):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.outOfScope || '-'}</span></div>
                    
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nguồn dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputSource || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại dữ liệu đầu ra:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.outputType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mức độ tự động hóa:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.automationLevel || '-'}</span></div>
                    
                    <div className="flex flex-col"><span className="text-muted mb-1">Người sử dụng trực tiếp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.directUser || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đối tượng quyết định của AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.decisionTarget === 'Khác: điền thông tin' ? formData.otherDecisionTarget : formData.decisionTarget || '-'}</span></div>
                    
                    <div className="flex flex-col"><span className="text-muted mb-1">Số lượng người dùng dự kiến:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.userCount || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Phạm vi triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.deployScope || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Kênh triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.deployChannel || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2 mt-2 font-bold text-main">Các trường hợp sử dụng sai có thể dự đoán</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Sử dụng ngoài mục đích chính:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.misuseMain || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Sử dụng cho nhóm đối tượng không dự kiến:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.misuseTarget || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Cố ý lạm dụng mục đích trái pháp luật:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.misuseIllegal || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2 mt-2 font-bold text-main">Cảnh báo cho người vận hành</div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các tình huống cần thận trọng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.cautionSituations || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các hạn chế kỹ thuật biết trước:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.technicalLimits || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Nhận diện nhóm chịu tác động</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Người dùng trực tiếp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactDirectUser || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đối tượng quyết định của AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactDecisionTarget || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Bên thứ ba bị ảnh hưởng gián tiếp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactThirdParty || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nhóm dễ tổn thương:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactVulnerable || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nhân viên tổ chức:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactEmployee || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Cộng đồng/môi trường:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.impactCommunity || '-'}</span></div>
                  </div>
                </div>

              </div>
            )}
            
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard1;
