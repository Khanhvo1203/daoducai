import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Share2, RotateCcw, Download, CheckSquare, Target, Shield, BookOpen, AlertCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { saveAssessment, getCurrentUser } from '../utils/auth';
import './Dashboard.css';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const location = useLocation();
  const selection = location.state?.selection || { partB: true, partC: true };
  const answers = location.state?.answers || {};
  const existingCode = location.state?.assessmentCode || null;

  const formData = location.state?.formData || {
    systemName: 'Hệ thống AI Demo',
    domain: 'Hành chính công',
    email: 'admin@demo.vn'
  };

  const assessmentCode = existingCode;
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  // Dynamic Chart Data based on selection
  let labels = [];
  let dataPoints = [];
  if (selection.partB) {
    labels.push('Quản trị & Pháp lý');
    dataPoints.push(85);
  }
  if (selection.partC) {
    labels.push('An toàn & Tin cậy'); dataPoints.push(70);
    labels.push('Quyền con người'); dataPoints.push(65);
    labels.push('Bền vững'); dataPoints.push(80);
    labels.push('Đổi mới'); dataPoints.push(75);
  }

  // Ensure radar chart looks good even with few points
  if (labels.length < 3) {
    labels.push('Tổng quan chung');
    dataPoints.push(75);
  }

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
              <div className="font-semibold">{formData.domain}</div>
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
                <button className="btn btn-secondary text-sm border-primary text-primary" onClick={() => navigate('/')}>
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
                  <svg viewBox="0 0 100 100" className="circular-chart text-primary">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="score-text">
                    <span className="score-number">75</span>
                    <span className="score-total">/100</span>
                  </div>
                </div>
                
                <div className="score-details flex-1">
                  <div className="text-muted text-sm mb-1">Hệ thống của bạn đạt mức</div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Tuân thủ Khá</h3>
                  <p className="text-sm text-muted mb-4">Hệ thống đáp ứng phần lớn các tiêu chí về quản trị và đạo đức AI. Cần cải thiện một số khuyến nghị dưới đây.</p>
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

          <div className="card">
            <h4 className="font-bold mb-4 text-sm">KHUYẾN NGHỊ CẢI THIỆN (BIỆN PHÁP)</h4>
            <div className="flex-col gap-4">
              
              {selection.partB && (
                <div className="flex gap-4 p-4 border rounded-md recommendation-item">
                  <div className="icon-box bg-primary-light text-primary"><Shield size={20}/></div>
                  <div>
                    <h5 className="font-bold text-primary mb-1">Bổ sung quy trình Human-in-the-loop</h5>
                    <p className="text-sm text-muted">Cần thiết lập cơ chế để con người có thể can thiệp vào các quyết định tự động quan trọng của AI.</p>
                  </div>
                </div>
              )}

              {selection.partC && (
                <>
                  <div className="flex gap-4 p-4 border rounded-md recommendation-item">
                    <div className="icon-box bg-primary-light text-primary"><Target size={20}/></div>
                    <div>
                      <h5 className="font-bold text-primary mb-1">Đánh giá rủi ro thiên kiến (Bias)</h5>
                      <p className="text-sm text-muted">Thực hiện kiểm tra định kỳ dữ liệu huấn luyện để đảm bảo không có sự phân biệt đối xử với nhóm yếu thế.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 border rounded-md recommendation-item">
                    <div className="icon-box bg-primary-light text-primary"><BookOpen size={20}/></div>
                    <div>
                      <h5 className="font-bold text-primary mb-1">Công khai cơ chế phản hồi</h5>
                      <p className="text-sm text-muted">Cung cấp kênh liên lạc rõ ràng để người dùng cuối có thể gửi phản hồi về các quyết định của AI.</p>
                    </div>
                  </div>
                </>
              )}

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

                {/* 2. Mô tả hệ thống AI */}
                <div>
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">2. Mô tả hệ thống AI</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Tên hệ thống:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.systemName || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại công nghệ AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.aiTechType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nguồn gốc phát triển:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.developType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nhà cung cấp (nếu có):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.provider || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mô hình nền (nếu có):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.foundationModel || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các thành phần AI bên thứ ba khác:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.otherThirdParty || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Vai trò tổ chức:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.orgRole === 'Khác: điền thông tin' ? formData.otherOrgRole : formData.orgRole || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Lĩnh vực ứng dụng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.domain || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mục đích chính:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.purpose || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Giới hạn ứng dụng (Out of scope):</span><span className="font-medium bg-muted-light p-2 rounded">{formData.outOfScope || '-'}</span></div>
                    
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Nguồn dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputSource || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Loại dữ liệu đầu ra:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.outputType || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Mức độ tự động hóa:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.automationLevel || '-'}</span></div>
                    
                    <div className="flex flex-col"><span className="text-muted mb-1">Người sử dụng trực tiếp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.directUser || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đối tượng quyết định của AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.decisionTarget === 'Khác: điền thông tin' ? formData.otherDecisionTarget : formData.decisionTarget || '-'}</span></div>
                    
                    <div className="flex flex-col"><span className="text-muted mb-1">Số lượng người dùng dự kiến:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.userCount || '-'} / {formData.userTargetCount || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Phạm vi triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.deployScope || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Kênh triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.deployChannel || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2 mt-2 font-bold text-main">Các trường hợp sử dụng sai có thể dự đoán</div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Sử dụng ngoài mục đích chính:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.misuseMain || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Sử dụng cho nhóm đối tượng không dự kiến:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.misuseTarget || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Cố ý lạm dụng mục đích trái pháp luật:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.misuseIllegal || '-'}</span></div>
                    
                    <div className="flex flex-col md:col-span-2 mt-2 font-bold text-main">Cảnh báo cho người vận hành</div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các tình huống cần thận trọng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.cautionSituations || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Các hạn chế kỹ thuật biết trước:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.technicalLimits || '-'}</span></div>
                  </div>
                </div>

                {/* 3. Khai báo đánh giá rủi ro */}
                <div>
                  <h5 className="font-bold text-primary mb-3 border-b pb-2">3. Khai báo đánh giá rủi ro</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                    <div className="flex flex-col"><span className="text-muted mb-1">Thuộc DM rủi ro cao theo QĐ 33/2026/QĐ-TTg:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.isHighRisk || '-'}</span></div>
                    <div className="flex flex-col"><span className="text-muted mb-1">Đánh giá theo Điều 7 NĐ 142/NĐ-CP:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.decree142 || '-'}</span></div>
                    <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Phân loại rủi ro (Tự đánh giá):</span>
                      <span className={`px-3 py-2 rounded font-bold w-fit ${formData.riskLevel === 'Cao' ? 'bg-danger-light text-danger' : formData.riskLevel === 'Trung bình' ? 'bg-warning-light text-warning' : formData.riskLevel === 'Thấp' ? 'bg-success-light text-success' : 'bg-muted-light text-muted'}`}>
                        {formData.riskLevel || 'Chưa đánh giá'}
                      </span>
                    </div>

                    <div className="flex flex-col md:col-span-2 mt-2 font-bold text-main">Nhận diện nhóm chịu tác động</div>
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

export default Dashboard2;
