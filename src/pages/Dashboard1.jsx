import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Share2, RotateCcw, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { getCurrentUser, getAllAssessments } from '../utils/auth';
import MacroStepper from '../components/MacroStepper';
import { questionsDb, defaultEvidenceMap } from '../data/questionsData';
import './Dashboard.css';

const fullEvidenceMap = {
  ...defaultEvidenceMap,
  'A1': 'Tài liệu định danh & mô tả chức năng hệ thống',
  'A2': 'Quyết định phân công vai trò (Phát triển/Triển khai)',
  'A3': 'Hồ sơ kiến trúc & phân loại công nghệ AI',
  'A4': 'Tài liệu quản lý vòng đời hệ thống AI',
  'A5': 'Danh mục thành phần AI từ bên thứ ba',
  'A6': 'Đặc tả kỹ thuật dữ liệu I/O & biên giới dữ liệu',
  'A7': 'Quy trình nghiệp vụ hành chính / cấp phép',
  'A8': 'Báo cáo đánh giá tác động nhóm yếu thế',
  'A9': 'Hồ sơ phân loại dữ liệu cá nhân nhạy cảm',
  'A10': 'Quyết định phê duyệt phạm vi triển khai',
  'A11': 'Biên bản đối soát Danh mục rủi ro cao (QĐ 33/2026/QĐ-TTg)',
  'A12': 'Hồ sơ đánh giá sự phù hợp theo Điều 13 Luật 134/2025',
  'A13': 'Báo cáo phân tích an toàn, trật tự & tài sản',
  'A14': 'Kế hoạch khắc phục tác động tiêu cực đến người dân',
  'A15': 'Báo cáo đánh giá tác động bảo vệ dữ liệu cá nhân (DPIA)',

  'B1': 'Văn bản phân công Lãnh đạo cấp cao phụ trách AI',
  'B2': 'Quyết định thành lập Tổ công tác / cán bộ chuyên trách AI',
  'B3': 'Danh mục tổng thể hệ thống AI của cơ quan',
  'B4': 'Văn bản quy định giới hạn sử dụng (cấm làm)',
  'B5': 'Biên bản phân loại rủi ro có sự tham gia của Pháp chế',
  'B6': 'Quy trình giám sát của con người (Human-in-the-loop)',
  'B7': 'Kênh công khai tiếp nhận sự cố & quy trình khiếu nại',
  'B8': 'Hồ sơ dữ liệu hệ thống & đánh giá quyền riêng tư',
  'B9': 'Quy trình thẩm định nhà cung cấp & phụ lục hợp đồng AI',

  'D1': 'Văn bản Kế hoạch giảm thiểu rủi ro đã phê duyệt',
  'D2': 'Bảng ma trận ưu tiên hóa biện pháp rủi ro',
  'D3': 'Quyết định phân bổ ngân sách & nhân sự chuyên trách',
  'D4': 'Hệ thống log, KPI & ngưỡng cảnh báo vận hành',
  'D5': 'Quy trình báo cáo kết quả giám sát định kỳ',
  'D6': 'Kế hoạch công tác đánh giá lại định kỳ',
  'D7': 'Quy trình cập nhật tự đánh giá khi có biến động',
  'D8': 'Hệ thống lưu trữ hồ sơ tự đánh giá an toàn (>= 3 năm)',
  'D9': 'Cơ chế & báo cáo chia sẻ bài học kinh nghiệm',
  'D10': 'Biên bản xác nhận kết quả tự đánh giá của Lãnh đạo'
};

const Dashboard1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const idFromUrl = searchParams.get('id');

  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.username : 'guest';

  // Đọc câu trả lời, minh chứng và form đang thực hiện từ localStorage
  let draftAnswers = {};
  let draftEvidences = {};
  let draftFormData = null;
  try {
    const sAnswers = localStorage.getItem(`assessment_answers_${userId}`);
    if (sAnswers) draftAnswers = JSON.parse(sAnswers);
    const sEvidences = localStorage.getItem(`assessment_evidences_${userId}`);
    if (sEvidences) draftEvidences = JSON.parse(sEvidences);
    const sForm = localStorage.getItem(`landing_formData_${userId}`);
    if (sForm) draftFormData = JSON.parse(sForm);
  } catch (e) {}

  let initialData = location.state;
  if (!initialData && idFromUrl) {
    const all = getAllAssessments();
    const found = all.find(a => String(a.id) === String(idFromUrl));
    if (found) {
      initialData = { 
        selection: found.selection, 
        formData: found.formData, 
        answers: found.answers, 
        evidences: found.evidences,
        assessmentCode: found.id 
      };
    }
  }

  // Xác định câu trả lời thực tế của người dùng:
  // Ưu tiên 1: location.state (truyền trực tiếp từ Assessment1)
  // Ưu tiên 2: draftAnswers từ phiên đánh giá hiện tại trong localStorage
  // Ưu tiên 3: bài đánh giá đã lưu nếu xem lại
  let rawAnswers = {};
  if (initialData?.answers && Object.keys(initialData.answers).length > 0) {
    rawAnswers = initialData.answers;
  } else if (Object.keys(draftAnswers).length > 0) {
    rawAnswers = draftAnswers;
  } else if (initialData?.answers) {
    rawAnswers = initialData.answers;
  }

  const evidences = { 
    ...draftEvidences, 
    ...(initialData?.evidences || {}) 
  };

  const existingCode = initialData?.assessmentCode || null;

  // Form data fallback khi chưa khai báo
  const fallbackFormData = {
    systemName: '',
    domain: '',
    email: currentUser?.username || '',
    fullName: currentUser?.name || '',
    role: '',
    agencyName: currentUser?.agency || '',
    internalCode: '',
    version: '1.0.0',
    orgRole: 'Triển khai (Deployer)',
    legalBasis: '',
    riskLevel: 'Chưa xác định',
    riskLevelBasis: '',
    isInHighRiskList: 'Chưa xác định',
    purpose: '',
    businessProblem: ''
  };

  const formData = initialData?.formData || draftFormData || fallbackFormData;

  // Luôn dùng câu trả lời thực tế của người dùng, KHÔNG BAO GIỜ dùng file mẫu nếu người dùng chưa trả lời!
  const answers = rawAnswers;
  const totalAnsweredCount = Object.keys(answers).length;

  const displayCode = existingCode || (totalAnsweredCount > 0 ? 'HỒ SƠ MỚI' : 'CHƯA LƯU');
  const displayDate = new Date().toLocaleDateString('vi-VN');

  const principleFromUrl = searchParams.get('principle');
  const [activePrinciple, setActivePrinciple] = useState(principleFromUrl || 'C1');
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  // Calculate scores
  const getScore = (prefix) => {
    let score = 0;
    for (let i = 1; i <= 15; i++) {
      if (answers[`${prefix}.${i}`] === 0) { // 'Có' is index 0
        score++;
      }
    }
    return score;
  };

  const getAnsweredCount = (prefix) => {
    let count = 0;
    for (let i = 1; i <= 15; i++) {
      if (answers[`${prefix}.${i}`] !== undefined) {
        count++;
      }
    }
    return count;
  };

  const scoreC1 = getScore('C1');
  const scoreC2 = getScore('C2');
  const scoreC3 = getScore('C3');
  const scoreC4 = getScore('C4');

  const answeredC1 = getAnsweredCount('C1');
  const answeredC2 = getAnsweredCount('C2');
  const answeredC3 = getAnsweredCount('C3');
  const answeredC4 = getAnsweredCount('C4');

  // Part A score & answered (15 questions: A1..A15)
  let scoreA = 0;
  let answeredA = 0;
  for (let i = 1; i <= 15; i++) {
    const qId = `A${i}`;
    if (answers[qId] !== undefined) {
      answeredA++;
      if (answers[qId] === 0 || (qId === 'A10' && answers[qId] !== undefined)) {
        scoreA++;
      }
    }
  }

  // Part B score & answered (9 questions: B1..B9)
  let scoreB = 0;
  let answeredB = 0;
  for (let i = 1; i <= 9; i++) {
    const qId = `B${i}`;
    if (answers[qId] !== undefined) {
      answeredB++;
      if (answers[qId] === 0) {
        scoreB++;
      }
    }
  }

  // Part D score & answered (10 questions: D1..D10)
  let scoreD = 0;
  let answeredD = 0;
  for (let i = 1; i <= 10; i++) {
    const qId = `D${i}`;
    if (answers[qId] !== undefined) {
      answeredD++;
      if (answers[qId] === 0) {
        scoreD++;
      }
    }
  }

  const totalCScore = scoreC1 + scoreC2 + scoreC3 + scoreC4;
  const convertedScore = totalAnsweredCount > 0 ? Math.round((totalCScore / 60) * 100) : 0;

  // Overall compliance evaluation
  const getOverallComplianceLevel = (totalScore, s1, s2, s3, s4, totalAns) => {
    if (totalAns === 0) {
      return { 
        label: 'Chưa đánh giá', 
        colorHex: '#64748b',
        desc: 'Hệ thống chưa ghi nhận câu trả lời nào từ bạn. Vui lòng thực hiện đánh giá các tiêu chí theo 4 nguyên tắc để xem kết quả tuân thủ.' 
      };
    }

    if (s1 <= 5 || s2 <= 5 || s3 <= 5 || s4 <= 5) {
      return { 
        label: 'Không tuân thủ', 
        colorHex: '#dc2626',
        desc: 'Thiếu biện pháp bảo vệ cốt lõi, chưa có đầu mối trách nhiệm rõ ràng hoặc chưa có minh chứng; cần nỗ lực đáng kể để bảo đảm tuân thủ.' 
      };
    }
    
    if (totalScore >= 44 && s1 >= 11 && s2 >= 11 && s3 >= 11 && s4 >= 11) {
      return { 
        label: 'Tuân thủ đầy đủ', 
        colorHex: '#15803d',
        desc: 'Biện pháp bảo vệ cơ bản đã có đầy đủ, có minh chứng; có cơ chế giám sát của con người, kênh khiếu nại và quy trình khắc phục sự cố; sẵn sàng duy trì và cải tiến liên tục.' 
      };
    }

    return { 
      label: 'Tuân thủ một phần', 
      colorHex: '#d97706',
      desc: 'Đã có khung quản trị nhưng còn thiếu bằng chứng hoặc chưa bảo đảm đầy đủ ở một hoặc nhiều nguyên tắc; cần kế hoạch cải thiện có thời hạn.' 
    };
  };

  const overall = getOverallComplianceLevel(totalCScore, scoreC1, scoreC2, scoreC3, scoreC4, totalAnsweredCount);

  // Dynamic summary description
  const getSummaryDescription = () => {
    if (totalAnsweredCount === 0) {
      return 'Chưa có câu trả lời nào được ghi nhận (0/60 câu). Vui lòng hoàn thành đánh giá tại Bước 2 để nhận báo cáo tuân thủ chi tiết.';
    }

    if (totalCScore >= 44 && scoreC1 >= 11 && scoreC2 >= 11 && scoreC3 >= 11 && scoreC4 >= 11) {
      return `${totalCScore}/60 câu trả lời "Có". Cả 04 nguyên tắc đều đạt mức Tuân thủ đầy đủ (≥ 11 câu). Hệ thống đáp ứng xuất sắc các tiêu chuẩn đạo đức AI.`;
    }
    if (scoreC1 <= 5 || scoreC2 <= 5 || scoreC3 <= 5 || scoreC4 <= 5) {
      const failed = [];
      if (scoreC1 <= 5) failed.push('Nguyên tắc 1');
      if (scoreC2 <= 5) failed.push('Nguyên tắc 2');
      if (scoreC3 <= 5) failed.push('Nguyên tắc 3');
      if (scoreC4 <= 5) failed.push('Nguyên tắc 4');
      return `${totalCScore}/60 câu trả lời "Có". Hệ thống ở mức Không tuân thủ do có ${failed.join(', ')} đạt từ 0–5 câu "Có". Cần tạm dừng hoặc khắc phục khẩn cấp.`;
    }
    
    // Tuân thủ một phần
    const nearThreshold = [];
    if (scoreC1 === 6 || scoreC1 === 7) nearThreshold.push('Nguyên tắc 1');
    if (scoreC2 === 6 || scoreC2 === 7) nearThreshold.push('Nguyên tắc 2');
    if (scoreC3 === 6 || scoreC3 === 7) nearThreshold.push('Nguyên tắc 3');
    if (scoreC4 === 6 || scoreC4 === 7) nearThreshold.push('Nguyên tắc 4');
    
    const nearText = nearThreshold.length > 0 ? `, nhưng ${nearThreshold.join(', ')} nằm sát ngưỡng.` : '.';
    return `${totalCScore}/60 câu trả lời "Có". Không có nguyên tắc nào dưới 6 câu "Có"${nearText}`;
  };

  // Helper for status tag
  const getPrincipleStatusInfo = (score, ansCount, maxScore = 15) => {
    if (ansCount === 0) {
      return {
        label: 'Chưa đánh giá',
        short: 'chưa đánh giá',
        badgeClass: 'exec-chip',
        colorHex: '#64748b',
        priority: 'Chưa xác định',
        priorityClass: 'exec-chip'
      };
    }
    const percent = Math.round((score / maxScore) * 100);
    if (percent >= 70) {
      return {
        label: 'Tuân thủ đầy đủ',
        short: 'đầy đủ',
        badgeClass: 'exec-chip-success',
        colorHex: '#15803d',
        priority: 'Ưu tiên thấp',
        priorityClass: 'exec-chip'
      };
    }
    if (percent >= 40) {
      return {
        label: 'Tuân thủ một phần',
        short: 'một phần',
        badgeClass: 'exec-chip-warning',
        colorHex: '#d97706',
        priority: 'Ưu tiên trung bình',
        priorityClass: 'exec-chip-warning'
      };
    }
    return {
      label: 'Không tuân thủ',
      short: 'không đạt',
      badgeClass: 'exec-chip-danger',
      colorHex: '#dc2626',
      priority: 'Ưu tiên cao',
      priorityClass: 'exec-chip-danger'
    };
  };

  // Principles & Parts definition and metadata
  const principlesData = {
    'A': {
      code: 'A',
      numText: 'PHẦN A',
      title: 'PHẦN A · XÁC ĐỊNH PHẠM VI VÀ SÀNG LỌC RỦI RO BAN ĐẦU',
      shortName: 'Phần A · Xác định phạm vi',
      tabLabel: 'Phần A',
      shortBadge: 'Phần A',
      maxScore: 15,
      score: scoreA,
      answeredCount: answeredA,
      ...getPrincipleStatusInfo(scoreA, answeredA, 15),
      subgroups: [
        {
          title: 'Thông tin hệ thống',
          range: 'A1–A5',
          qIds: ['A1', 'A2', 'A3', 'A4', 'A5']
        },
        {
          title: 'Phạm vi & Nhóm đối tượng',
          range: 'A6–A10',
          qIds: ['A6', 'A7', 'A8', 'A9', 'A10']
        },
        {
          title: 'Sàng lọc rủi ro ban đầu',
          range: 'A11–A15',
          qIds: ['A11', 'A12', 'A13', 'A14', 'A15']
        }
      ],
      recommendations: {
        full: {
          title: 'Phạm vi & Rủi ro đã xác định đầy đủ',
          rangeText: '11–15 câu "Có"',
          statusDesc: 'Hệ thống AI đã được định danh rõ ràng về chức năng, phạm vi đối tượng, công nghệ cốt lõi và sàng lọc rủi ro theo Luật 134/2025/QH15 và QĐ 33/2026/QĐ-TTg.',
          bullets: [
            'Duy trì hồ sơ cập nhật khi nâng cấp phiên bản mô hình AI.',
            'Định kỳ rà soát Danh mục rủi ro cao nếu hệ thống mở rộng phạm vi ra toàn quốc.',
            'Lưu trữ tài liệu định danh phục vụ thanh tra, kiểm toán công nghệ.'
          ]
        },
        partial: {
          title: 'Cần bổ sung làm rõ phạm vi & rủi ro',
          rangeText: '6–10 câu "Có"',
          statusDesc: 'Cơ quan đã có thông tin cơ bản nhưng còn thiếu sót về sàng lọc rủi ro, phân loại dữ liệu nhạy cảm hoặc đánh giá tác động nhóm yếu thế.',
          bullets: [
            'Hoàn thiện hồ sơ đầu vào/đầu ra và biên giới dữ liệu nhạy cảm (A6, A9).',
            'Làm rõ phương án đối với các quyết định hành chính có AI tham gia (A7, A8).',
            'Thực hiện đánh giá sự phù hợp theo Điều 13 nếu thuộc danh mục rủi ro cao (A11, A12).'
          ]
        },
        non: {
          title: 'Chưa xác định đầy đủ phạm vi hệ thống',
          rangeText: '0–5 câu "Có"',
          statusDesc: 'Hệ thống chưa được định danh đầy đủ, chưa xác định rõ rủi ro gây hại hoặc chưa có căn cứ pháp lý để vận hành.',
          bullets: [
            'Khẩn trương lập tài liệu mô tả kiến trúc và vòng đời hệ thống AI (A1-A5).',
            'Rà soát ngay các nguy cơ gây thiệt hại về vật chất, dữ liệu và quyền riêng tư (A13-A15).',
            'Tạm hoãn triển khai rộng rãi cho đến khi hoàn thành hồ sơ sàng lọc rủi ro ban đầu.'
          ]
        }
      }
    },
    'B': {
      code: 'B',
      numText: 'PHẦN B',
      title: 'PHẦN B · CƠ CHẾ QUẢN TRỊ RỦI RO (9 ĐIỀU KIỆN CỐT LÕI)',
      shortName: 'Phần B · Cơ chế quản trị',
      tabLabel: 'Phần B',
      shortBadge: 'Phần B',
      maxScore: 9,
      score: scoreB,
      answeredCount: answeredB,
      ...getPrincipleStatusInfo(scoreB, answeredB, 9),
      subgroups: [
        {
          title: 'Trách nhiệm lãnh đạo & Danh mục AI',
          range: 'B1–B3',
          qIds: ['B1', 'B2', 'B3']
        },
        {
          title: 'Giới hạn sử dụng & Giám sát con người',
          range: 'B4–B6',
          qIds: ['B4', 'B5', 'B6']
        },
        {
          title: 'Đầu mối khiếu nại, Dữ liệu & Nhà cung cấp',
          range: 'B7–B9',
          qIds: ['B7', 'B8', 'B9']
        }
      ],
      recommendations: {
        full: {
          title: 'Cơ chế quản trị vững chắc',
          rangeText: '7–9 câu "Có"',
          statusDesc: 'Tổ chức đã thiết lập đầy đủ khung quản trị rủi ro AI từ cấp lãnh đạo, quy chế vận hành đến hợp đồng nhà cung cấp.',
          bullets: [
            'Duy trì cơ chế họp giao ban định kỳ của Tổ chuyên trách AI.',
            'Rà soát cập nhật danh mục hệ thống và đánh giá nhà cung cấp hàng năm.',
            'Đảm bảo quy trình tiếp nhận khiếu nại của người dân hoạt động thông suốt.'
          ]
        },
        partial: {
          title: 'Cơ chế quản trị cần kiện toàn',
          rangeText: '4–6 câu "Có"',
          statusDesc: 'Tổ chức đã bước đầu có đầu mối nhưng còn thiếu văn bản quy định giới hạn, cơ chế giám sát người duyệt hoặc hồ sơ dữ liệu.',
          bullets: [
            'Ban hành văn bản chính thức quy định rõ các giới hạn mà AI không được làm (B4).',
            'Kiện toàn quy trình giám sát của con người và lưu vết quyết định (B6).',
            'Bổ sung các điều khoản ràng buộc trách nhiệm trong hợp đồng với nhà cung cấp AI (B9).'
          ]
        },
        non: {
          title: 'Thiếu cơ chế quản trị bắt buộc',
          rangeText: '0–3 câu "Có"',
          statusDesc: 'Hệ thống vận hành nhưng chưa có phân công trách nhiệm pháp lý rõ ràng, tiềm ẩn rủi ro nghiêm trọng khi xảy ra sự cố.',
          bullets: [
            'Phân công ngay Lãnh đạo cấp cao và Tổ công tác chuyên trách chịu trách nhiệm về AI (B1, B2).',
            'Lập danh mục toàn bộ hệ thống AI đang sử dụng tại cơ quan (B3).',
            'Thiết lập đường dây nóng/kênh công khai tiếp nhận phản ánh sự cố từ người dân (B7).'
          ]
        }
      }
    },
    'C1': {
      code: 'C1',
      numText: 'NGUYÊN TẮC 01',
      title: 'C1 · BẢO ĐẢM AN TOÀN, ĐỘ TIN CẬY VÀ KHÔNG GÂY HẠI',
      shortName: 'NT1 · An toàn, độ tin cậy & không...',
      tabLabel: 'NT1',
      shortBadge: 'NT1',
      maxScore: 15,
      score: scoreC1,
      answeredCount: answeredC1,
      ...getPrincipleStatusInfo(scoreC1, answeredC1, 15),
      subgroups: [
        {
          title: 'Thiết kế an toàn',
          range: 'C1.1–C1.5',
          qIds: ['C1.1', 'C1.2', 'C1.3', 'C1.4', 'C1.5']
        },
        {
          title: 'Chất lượng dữ liệu và mô hình',
          range: 'C1.6–C1.10',
          qIds: ['C1.6', 'C1.7', 'C1.8', 'C1.9', 'C1.10']
        },
        {
          title: 'Giám sát và quản lý sự cố',
          range: 'C1.11–C1.15',
          qIds: ['C1.11', 'C1.12', 'C1.13', 'C1.14', 'C1.15']
        }
      ],
      recommendations: {
        full: {
          title: 'Tuân thủ đầy đủ',
          rangeText: '11–15 câu "Có"',
          statusDesc: 'Cơ quan/tổ chức đã có đủ các cơ chế thiết kế an toàn, kiểm thử – xác nhận chất lượng và giám sát – quản lý sự cố.',
          decision: 'Quyết định: Cho phép triển khai — khi cả 04 nguyên tắc đạt "Tuân thủ đầy đủ" và thỏa mãn mọi điều kiện tại Bảng 7.',
          bullets: [
            'Duy trì và chuẩn hoá nhật ký giám sát sự cố.',
            'Rà soát định kỳ theo chu kỳ 6–9 tháng.',
            'Cập nhật hồ sơ rủi ro gây hại khi thay đổi phạm vi hoặc mô hình.'
          ],
          footer: 'Chủ trì: TP2 – Đầu mối chuyên môn AI · Hạn: 6 tháng'
        },
        partial: {
          title: 'Tuân thủ một phần',
          rangeText: '6–10 câu "Có"',
          statusDesc: 'Cơ quan/tổ chức cần cải thiện các cơ chế an toàn, kiểm thử và quản lý sự cố.',
          decision: 'Quyết định: Cho phép có điều kiện — cho phép chạy thí điểm hoặc dưới sự giám sát nghiêm ngặt của con người 100%.',
          bullets: [
            'Khắc phục câu "Không": C1.8 — kiểm tra khả năng kháng cự tấn công đối kháng; C1.13 — quy trình phân loại và xử lý sự cố AI.',
            'Chuẩn hoá nhật ký sự cố và ngưỡng cảnh báo bất thường (C1.12).',
            'Kiểm thử lại trên dữ liệu Việt Nam đại diện trước khi mở rộng phạm vi (C1.6).'
          ],
          footer: 'Chủ trì: TP2 – Đầu mối chuyên môn AI · Hạn: 3–6 tháng'
        },
        non: {
          title: 'Không tuân thủ',
          rangeText: '0–5 câu "Có"',
          statusDesc: 'Các hoạt động còn thiếu sót căn bản; cần nỗ lực đáng kể để tuân thủ các nguyên tắc này.',
          decision: 'Quyết định: Tạm dừng để khắc phục — khi vi phạm 01 điều kiện cốt lõi tại Bảng 7 hoặc có 01 nguyên tắc ở mức "Không tuân thủ".',
          bullets: [
            'Dừng triển khai; lập lại danh mục và hồ sơ rủi ro gây hại tiềm tàng (C1.1).',
            'Thiết lập kế hoạch dự phòng – phục hồi và cơ chế dừng khẩn cấp (C1.3, C1.4).',
            'Thực hiện phân tích rủi ro bảo mật ATTT, kiểm thử xâm nhập và kiểm thử độc lập (C1.5, C1.7).'
          ],
          footer: 'Chủ trì: Lãnh đạo đơn vị – TP2 · Hạn: Khẩn – trước khi xem xét lại'
        }
      }
    },
    'C2': {
      code: 'C2',
      numText: 'NGUYÊN TẮC 02',
      title: 'C2 · TÔN TRỌNG CON NGƯỜI, CÔNG BẰNG VÀ MINH BẠCH',
      shortName: 'NT2 · Kiểm soát của con người',
      tabLabel: 'NT2',
      shortBadge: 'NT2',
      maxScore: 15,
      score: scoreC2,
      answeredCount: answeredC2,
      ...getPrincipleStatusInfo(scoreC2, answeredC2, 15),
      subgroups: [
        {
          title: 'Kiểm soát của con người',
          range: 'C2.1–C2.5',
          qIds: ['C2.1', 'C2.2', 'C2.3', 'C2.4', 'C2.5']
        },
        {
          title: 'Minh bạch và khả năng giải thích',
          range: 'C2.6–C2.10',
          qIds: ['C2.6', 'C2.7', 'C2.8', 'C2.9', 'C2.10']
        },
        {
          title: 'Phòng chống phân biệt đối xử và thiên lệch',
          range: 'C2.11–C2.15',
          qIds: ['C2.11', 'C2.12', 'C2.13', 'C2.14', 'C2.15']
        }
      ],
      recommendations: {
        full: {
          title: 'Tuân thủ đầy đủ',
          rangeText: '11–15 câu "Có"',
          statusDesc: 'Cơ quan/tổ chức đã thiết lập cơ chế kiểm soát con người thực chất, bảo đảm minh bạch và phòng chống thiên lệch hiệu quả.',
          decision: 'Quyết định: Cho phép triển khai — duy trì quyền can thiệp của con người và cơ chế khiếu nại công khai.',
          bullets: [
            'Duy trì quy trình lưu vết quyết định AI tối thiểu 3 năm (C2.8).',
            'Rà soát định kỳ tính đại diện dữ liệu và phòng ngừa thiên lệch (C2.11, C2.12).',
            'Cập nhật tài liệu kỹ thuật và thẻ mô hình (Model Card) khi nâng cấp phiên bản.'
          ],
          footer: 'Chủ trì: Bộ phận Pháp chế & Vận hành AI · Hạn: 6 tháng'
        },
        partial: {
          title: 'Tuân thủ một phần',
          rangeText: '6–10 câu "Có"',
          statusDesc: 'Đã có bước đầu tôn trọng quyền con người nhưng thiếu cơ chế giải thích minh bạch hoặc kiểm soát thiên lệch thực chất.',
          decision: 'Quyết định: Cho phép có điều kiện — bắt buộc duy trì con người duyệt 100% các quyết định quan trọng ảnh hưởng đến người dân.',
          bullets: [
            'Bổ sung cơ chế thông báo công khai khi người dân tương tác với AI (C2.6).',
            'Xây dựng quy trình xử lý khiếu nại và phúc tra quyết định của AI (C2.4, C2.15).',
            'Kiểm tra định kỳ độ thiên lệch dữ liệu trên các nhóm dân cư nhạy cảm (C2.12).'
          ],
          footer: 'Chủ trì: Tổ công tác AI & Pháp chế · Hạn: 30–60 ngày'
        },
        non: {
          title: 'Không tuân thủ',
          rangeText: '0–5 câu "Có"',
          statusDesc: 'Hệ thống thay thế hoàn toàn phán đoán con người trong quyết định hành chính hoặc không có cơ chế giải trình/khiếu nại.',
          decision: 'Quyết định: Tạm dừng vận hành — cấm sử dụng AI tự động hoàn toàn đối với các quyết định hành chính quan trọng.',
          bullets: [
            'Thiết lập ngay cơ chế can thiệp và phê duyệt của con người trước khi ban hành quyết định (C2.1, C2.3).',
            'Công khai minh bạch mục đích, giới hạn hệ thống cho người dân (C2.9).',
            'Đánh giá lại toàn diện rủi ro phân biệt đối xử và bảo vệ dữ liệu cá nhân (C2.11, C2.14).'
          ],
          footer: 'Chủ trì: Lãnh đạo cấp cao · Hạn: Khẩn cấp'
        }
      }
    },
    'C3': {
      code: 'C3',
      numText: 'NGUYÊN TẮC 03',
      title: 'C3 · HẠNH PHÚC, THỊNH VƯỢNG VÀ PHÁT TRIỂN BỀN VỮNG',
      shortName: 'NT3 · Lợi ích xã hội & bao trùm kỹ...',
      tabLabel: 'NT3',
      shortBadge: 'NT3',
      maxScore: 15,
      score: scoreC3,
      answeredCount: answeredC3,
      ...getPrincipleStatusInfo(scoreC3, answeredC3, 15),
      subgroups: [
        {
          title: 'Lợi ích xã hội và bao trùm kỹ thuật số',
          range: 'C3.1–C3.5',
          qIds: ['C3.1', 'C3.2', 'C3.3', 'C3.4', 'C3.5']
        },
        {
          title: 'Thiết kế bao trùm và giảm khoảng cách số',
          range: 'C3.6–C3.10',
          qIds: ['C3.6', 'C3.7', 'C3.8', 'C3.9', 'C3.10']
        },
        {
          title: 'Tác động đến môi trường và tính bền vững',
          range: 'C3.11–C3.15',
          qIds: ['C3.11', 'C3.12', 'C3.13', 'C3.14', 'C3.15']
        }
      ],
      recommendations: {
        full: {
          title: 'Tuân thủ đầy đủ',
          rangeText: '11–15 câu "Có"',
          statusDesc: 'Hệ thống AI mang lại lợi ích xã hội rõ rệt, thân thiện với mọi nhóm đối tượng và tuân thủ các chỉ số phát triển bền vững.',
          decision: 'Quyết định: Khuyến khích nhân rộng mô hình phục vụ cộng đồng và tối ưu hóa năng lượng.',
          bullets: [
            'Duy trì đánh giá định kỳ mức độ tiếp cận của người dùng yếu thế (C3.2).',
            'Tiếp tục đo lường và tối ưu hóa tài nguyên tính toán tiêu thụ năng lượng (C3.12).',
            'Mở rộng hỗ trợ ngôn ngữ đa dạng và phương ngữ địa phương (C3.3).'
          ],
          footer: 'Chủ trì: Bộ phận Dịch vụ công & Hạ tầng · Hạn: 6 tháng'
        },
        partial: {
          title: 'Tuân thủ một phần',
          rangeText: '6–10 câu "Có"',
          statusDesc: 'Hệ thống có mục tiêu xã hội tốt nhưng chưa chú trọng người dùng yếu thế hoặc chưa đo lường tác động môi trường/lao động.',
          decision: 'Quyết định: Cho phép triển khai kèm điều kiện cải thiện khả năng tiếp cận và chính sách hỗ trợ lao động.',
          bullets: [
            'Bổ sung giao diện và tính năng trợ năng cho người cao tuổi, người khuyết tật (C3.2).',
            'Tổ chức đào tạo nâng cao nhận thức AI cho cán bộ nhân viên liên quan (C3.10).',
            'Khảo sát và xây dựng phương án giảm tiêu thụ điện năng máy chủ AI (C3.11, C3.13).'
          ],
          footer: 'Chủ trì: Tổ công tác AI & Ban Nhân sự · Hạn: 60 ngày'
        },
        non: {
          title: 'Không tuân thủ',
          rangeText: '0–5 câu "Có"',
          statusDesc: 'Hệ thống có nguy cơ làm gia tăng khoảng cách số, ảnh hưởng xấu đến lao động hoặc vi phạm chuẩn mực văn hóa.',
          decision: 'Quyết định: Tạm dừng nhân rộng — đánh giá lại tác động xã hội và môi trường trước khi tiếp tục.',
          bullets: [
            'Rà soát ngay nội dung đầu ra theo thuần phong mỹ tục và pháp luật Việt Nam (C3.4, C3.5).',
            'Xây dựng kế hoạch hỗ trợ và chuyển đổi việc làm cho người lao động bị ảnh hưởng (C3.7).',
            'Đánh giá tác động tiêu thụ tài nguyên và môi trường của hệ thống (C3.11).'
          ],
          footer: 'Chủ trì: Hội đồng đạo đức & Lãnh đạo đơn vị · Hạn: Khẩn cấp'
        }
      }
    },
    'C4': {
      code: 'C4',
      numText: 'NGUYÊN TẮC 04',
      title: 'C4 · KHUYẾN KHÍCH ĐỔI MỚI SÁNG TẠO CÓ TRÁCH NHIỆM',
      shortName: 'NT4 · Đổi mới có trách nhiệm',
      tabLabel: 'NT4',
      shortBadge: 'NT4',
      maxScore: 15,
      score: scoreC4,
      answeredCount: answeredC4,
      ...getPrincipleStatusInfo(scoreC4, answeredC4, 15),
      subgroups: [
        {
          title: 'Đổi mới có trách nhiệm',
          range: 'C4.1–C4.5',
          qIds: ['C4.1', 'C4.2', 'C4.3', 'C4.4', 'C4.5']
        },
        {
          title: 'Trách nhiệm giải trình và năng lực quản trị',
          range: 'C4.6–C4.10',
          qIds: ['C4.6', 'C4.7', 'C4.8', 'C4.9', 'C4.10']
        },
        {
          title: 'Hợp tác và phát triển hệ sinh thái AI',
          range: 'C4.11–C4.15',
          qIds: ['C4.11', 'C4.12', 'C4.13', 'C4.14', 'C4.15']
        }
      ],
      recommendations: {
        full: {
          title: 'Tuân thủ đầy đủ',
          rangeText: '11–15 câu "Có"',
          statusDesc: 'Tổ chức có năng lực quản trị xuất sắc, quy chế phân định rõ ràng và tích cực đóng góp vào hệ sinh thái AI có trách nhiệm.',
          decision: 'Quyết định: Khuyến khích tiên phong thí điểm các sáng kiến AI mới và chia sẻ bài học kinh nghiệm.',
          bullets: [
            'Công khai báo cáo minh bạch hàng năm về hoạt động và sự cố AI (C4.15).',
            'Tăng cường hợp tác với các viện nghiên cứu và trường đại học để đánh giá độc lập (C4.12).',
            'Đóng góp tập dữ liệu mở phục vụ cộng đồng nghiên cứu AI Việt Nam (C4.13).'
          ],
          footer: 'Chủ trì: Lãnh đạo đơn vị & Ban Đổi mới sáng tạo · Hạn: Hàng năm'
        },
        partial: {
          title: 'Tuân thủ một phần',
          rangeText: '6–10 câu "Có"',
          statusDesc: 'Đã có quy trình ban đầu nhưng chưa hoàn thiện quy chế trách nhiệm bồi thường hoặc chưa kết nối hệ sinh thái bên ngoài.',
          decision: 'Quyết định: Cho phép vận hành hiện tại; yêu cầu bổ sung văn bản quy chế trách nhiệm trước khi mở rộng.',
          bullets: [
            'Ban hành văn bản phân định rõ trách nhiệm bồi thường khi xảy ra sự cố (C4.10).',
            'Tổ chức khóa đào tạo quản trị AI bắt buộc cho cán bộ quản lý cấp trung (C4.7).',
            'Thiết lập kênh tiếp nhận phản hồi của cộng đồng về hệ thống AI (C4.14).'
          ],
          footer: 'Chủ trì: Ban Pháp chế & Phòng Quản lý AI · Hạn: 60 ngày'
        },
        non: {
          title: 'Không tuân thủ',
          rangeText: '0–5 câu "Có"',
          statusDesc: 'Chưa có cơ chế phân định trách nhiệm pháp lý hoặc thiếu hoàn toàn năng lực quản trị rủi ro AI.',
          decision: 'Quyết định: Đình chỉ triển khai mới cho đến khi kiện toàn bộ máy quản trị và quy chế nội bộ.',
          bullets: [
            'Xác định rõ người chịu trách nhiệm pháp lý cao nhất cho hệ thống AI (C4.6).',
            'Đào tạo khẩn cấp về rủi ro đạo đức AI cho ban lãnh đạo ra quyết định (C4.8).',
            'Tích hợp quy trình thẩm định đạo đức vào quy trình nghiệm thu công nghệ (C4.1).'
          ],
          footer: 'Chủ trì: Ban Giám đốc & Cơ quan chủ quản · Hạn: Khẩn cấp'
        }
      }
    },
    'D': {
      code: 'D',
      numText: 'PHẦN D',
      title: 'PHẦN D · KẾ HOẠCH HÀNH ĐỘNG VÀ GIÁM SÁT SAU TRIỂN KHAI',
      shortName: 'Phần D · Giám sát sau triển khai',
      tabLabel: 'Phần D',
      shortBadge: 'Phần D',
      maxScore: 10,
      score: scoreD,
      answeredCount: answeredD,
      ...getPrincipleStatusInfo(scoreD, answeredD, 10),
      subgroups: [
        {
          title: 'Kế hoạch triển khai & Giám sát liên tục',
          range: 'D1–D5',
          qIds: ['D1', 'D2', 'D3', 'D4', 'D5']
        },
        {
          title: 'Quản lý sự cố, Cập nhật mô hình & Dừng khẩn cấp',
          range: 'D6–D10',
          qIds: ['D6', 'D7', 'D8', 'D9', 'D10']
        }
      ],
      recommendations: {
        full: {
          title: 'Kế hoạch giám sát hoàn thiện',
          rangeText: '7–10 câu "Có"',
          statusDesc: 'Đơn vị đã xây dựng đầy đủ kế hoạch hành động khắc phục điểm yếu, phân công đầu mối và thiết lập cơ chế giám sát vận hành liên tục sau triển khai.',
          bullets: [
            'Duy trì theo dõi chỉ số độ chính xác và độ suy giảm hiệu năng mô hình (Model Drift) định kỳ hàng quý.',
            'Cập nhật định kỳ kế hoạch ứng phó sự cố và quy trình chuyển giao quyền can thiệp cho con người.',
            'Lưu trữ hồ sơ nhật ký vận hành phục vụ công tác thanh tra, hậu kiểm công nghệ.'
          ]
        },
        partial: {
          title: 'Kế hoạch giám sát cần hoàn thiện',
          rangeText: '4–6 câu "Có"',
          statusDesc: 'Đã có định hướng giám sát nhưng còn thiếu cơ chế cảnh báo sớm, quy trình dừng khẩn cấp hoặc phân định thời hạn khắc phục sự cố.',
          bullets: [
            'Bổ sung quy trình kích hoạt cơ chế dừng hệ thống AI trong tình huống khẩn cấp (D7).',
            'Xác định rõ lộ trình, kinh phí và thời hạn khắc phục các tiêu chí chưa đạt (D1, D3).',
            'Thiết lập chỉ số KPI cụ thể để đánh giá sự hài lòng và phản hồi của người dân (D5).'
          ]
        },
        non: {
          title: 'Thiếu kế hoạch hành động & giám sát',
          rangeText: '0–3 câu "Có"',
          statusDesc: 'Hệ thống vận hành trong môi trường thực tế nhưng thiếu hoàn toàn cơ chế theo dõi rủi ro phát sinh và không có phương án ứng phó sự cố.',
          bullets: [
            'Khẩn trương ban hành Kế hoạch hành động chi tiết khắc phục các điểm "Không tuân thủ" (D1, D2).',
            'Thiết lập ngay kênh liên lạc nóng với nhà cung cấp công nghệ để hỗ trợ kỹ thuật 24/7 (D6).',
            'Tạm dừng nhân rộng quy mô hệ thống cho đến khi hoàn thành quy chế giám sát sau triển khai.'
          ]
        }
      }
    }
  };

  const currP = principlesData[activePrinciple] || principlesData['A'] || principlesData['C1'];

  // Calculate subgroup scores and question items
  const questionsListForPrinciple = currP.code === 'A'
    ? [...(questionsDb.partA1 || []), ...(questionsDb.partA2 || []), ...(questionsDb.partA3 || [])]
    : (questionsDb[`part${currP.code}`] || []);

  const processedSubgroups = currP.subgroups.map(sub => {
    const subQuestions = questionsListForPrinciple.filter(q => sub.qIds.includes(q.id));
    const maxCount = sub.qIds.length || 5;
    let subScore = 0;
    subQuestions.forEach(q => {
      if (q.id === 'A10') {
        if (answers['A10'] !== undefined) subScore++;
      } else if (answers[q.id] === 0) {
        subScore++;
      }
    });

    const percent = Math.round((subScore / maxCount) * 100);
    let statusText = 'Đầy đủ';
    let statusColor = '#059669';
    if (percent < 70 && percent >= 40) {
      statusText = 'Cần cải thiện';
      statusColor = '#d97706';
    } else if (percent < 40) {
      statusText = 'Chưa đạt';
      statusColor = '#dc2626';
    }

    return {
      ...sub,
      score: subScore,
      maxCount,
      statusText,
      statusColor,
      questions: subQuestions
    };
  });

  // Action Handlers
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Đã sao chép liên kết báo cáo kết quả đánh giá vào bộ nhớ tạm!');
    }).catch(() => {
      alert(`Liên kết kết quả đánh giá:\n${window.location.href}`);
    });
  };

  const handleReset = () => {
    const user = getCurrentUser();
    const uKey = user ? user.username : 'guest';
    localStorage.removeItem(`landing_formData_${uKey}`);
    localStorage.removeItem(`landing_step_${uKey}`);
    localStorage.removeItem(`assessment_answers_${uKey}`);
    localStorage.removeItem(`assessment_evidences_${uKey}`);
    localStorage.removeItem(`assessment_activeStepIdx_${uKey}`);
  };

  const handleExportDocx = () => {
    const getCleanQuestionText = (q) => {
      if (typeof q.text === 'string') return q.text;
      if (q.id === 'A11') return 'Hệ thống có thuộc Danh mục AI rủi ro cao theo Điều 13 Luật 134/2025/QH15 và Quyết định 33/2026/QĐ-TTg ban hành vào ngày 30/06/2026 hay không?';
      if (q.id === 'A12') return 'Nếu thuộc Danh mục AI rủi ro cao theo Điều 13 Luật 134/2025/QH15 và Quyết định 33/2026/QĐ-TTg ban hành, đã thực hiện đánh giá sự phù hợp theo Điều 13 chưa?';
      if (q.id === 'C2.10') return 'Tổ chức có tài liệu kỹ thuật/ thẻ mô hình/ thẻ hệ thống đủ chi tiết để cơ quan kiểm toán/thanh tra có thể hiểu và xem xét hoạt động của hệ thống không?';
      return q.id;
    };

    const allSectionsForExport = [
      { code: 'A', title: 'PHẦN A · XÁC ĐỊNH PHẠM VI VÀ SÀNG LỌC RỦI RO BAN ĐẦU', score: scoreA, maxScore: 15, list: [...(questionsDb.partA1 || []), ...(questionsDb.partA2 || []), ...(questionsDb.partA3 || [])] },
      { code: 'B', title: 'PHẦN B · CƠ CHẾ QUẢN TRỊ RỦI RO (9 ĐIỀU KIỆN CỐT LÕI)', score: scoreB, maxScore: 9, list: questionsDb.partB || [] },
      { code: 'C1', title: 'NGUYÊN TẮC 01 · BẢO ĐẢM AN TOÀN, ĐỘ TIN CẬY VÀ KHÔNG GÂY HẠI', score: scoreC1, maxScore: 15, list: questionsDb.partC1 || [] },
      { code: 'C2', title: 'NGUYÊN TẮC 02 · TÔN TRỌNG CON NGƯỜI, CÔNG BẰNG VÀ MINH BẠCH', score: scoreC2, maxScore: 15, list: questionsDb.partC2 || [] },
      { code: 'C3', title: 'NGUYÊN TẮC 03 · HẠNH PHÚC, THỊNH VƯỢNG VÀ PHÁT TRIỂN BỀN VỮNG', score: scoreC3, maxScore: 15, list: questionsDb.partC3 || [] },
      { code: 'C4', title: 'NGUYÊN TẮC 04 · KHUYẾN KHÍCH ĐỔI MỚI SÁNG TẠO CÓ TRÁCH NHIỆM', score: scoreC4, maxScore: 15, list: questionsDb.partC4 || [] },
      { code: 'D', title: 'PHẦN D · KẾ HOẠCH HÀNH ĐỘNG VÀ GIÁM SÁT SAU TRIỂN KHAI', score: scoreD, maxScore: 10, list: questionsDb.partD || [] }
    ];

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Báo cáo kết quả đánh giá đạo đức AI</title>
      <style>
        body { font-family: 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #1e293b; }
        h1 { font-size: 16pt; color: #0c3a78; text-align: center; text-transform: uppercase; margin-bottom: 4pt; }
        .meta { text-align: center; color: #64748b; font-size: 10pt; margin-bottom: 20pt; }
        h2 { font-size: 13pt; color: #0f172a; margin-top: 18pt; border-bottom: 1px solid #cbd5e1; padding-bottom: 4pt; }
        table { border-collapse: collapse; width: 100%; margin-top: 10pt; margin-bottom: 15pt; }
        th, td { border: 1px solid #cbd5e1; padding: 6pt 8pt; text-align: left; font-size: 9.5pt; }
        th { background-color: #f1f5f9; font-weight: bold; color: #334155; }
        .divider { background-color: #e2e8f0; font-weight: bold; color: #0f172a; }
        .yes { color: #15803d; font-weight: bold; }
        .no { color: #dc2626; font-weight: bold; }
        .muted { color: #94a3b8; font-style: italic; }
      </style>
      </head>
      <body>
        <h1>KẾT QUẢ ĐÁNH GIÁ MỨC ĐỘ TUÂN THỦ ĐẠO ĐỨC AI</h1>
        <div class="meta">
          Báo cáo chi tiết theo từng phần & nguyên tắc · Ngày đánh giá: ${displayDate} · Hệ thống: ${formData.systemName || '-'} · MÃ HỒ SƠ #${displayCode}
        </div>
        
        <h2>I. TỔNG QUAN KẾT QUẢ</h2>
        <p><b>Điểm tổng thể quy đổi (Phần C):</b> ${convertedScore} / 100 quy đổi (${totalCScore}/60 câu đạt)</p>
        <p><b>Mức độ tuân thủ chung:</b> ${overall.label}</p>
        <p><b>Điểm từng phần đánh giá:</b></p>
        <ul>
          <li>Phần A (Xác định phạm vi & Rủi ro ban đầu): ${scoreA}/15 câu đạt</li>
          <li>Phần B (Cơ chế quản trị rủi ro): ${scoreB}/9 điều kiện đạt</li>
          <li>NT1 (Bảo đảm an toàn, độ tin cậy và không gây hại): ${scoreC1}/15</li>
          <li>NT2 (Tôn trọng con người, công bằng và minh bạch): ${scoreC2}/15</li>
          <li>NT3 (Hạnh phúc, thịnh vượng và phát triển bền vững): ${scoreC3}/15</li>
          <li>NT4 (Khuyến khích đổi mới sáng tạo có trách nhiệm): ${scoreC4}/15</li>
          <li>Phần D (Kế hoạch hành động & Giám sát sau triển khai): ${scoreD}/10 câu đạt</li>
        </ul>

        <h2>II. BẢNG CHI TIẾT TỪNG TIÊU CHÍ (94 CÂU HỎI TỰ ĐÁNH GIÁ TỪ PHẦN A ĐẾN PHẦN D)</h2>
        <table>
          <thead>
            <tr>
              <th style="width: 50pt;">MÃ</th>
              <th>CÂU HỎI TỰ ĐÁNH GIÁ</th>
              <th style="width: 70pt; text-align: center;">TRẢ LỜI</th>
              <th style="width: 180pt;">MINH CHỨNG</th>
            </tr>
          </thead>
          <tbody>
            ${allSectionsForExport.map(sec => {
              const rows = sec.list.map(q => {
                const ansVal = answers[q.id];
                let isYes = false;
                let isNo = false;
                let ansText = 'Chưa đánh giá';
                let ansClass = 'muted';

                if (q.id === 'A10') {
                  if (ansVal !== undefined) {
                    isYes = true;
                    const a10Opts = ['Cục bộ', 'Toàn quốc', 'Cả hai'];
                    ansText = a10Opts[ansVal] || (typeof ansVal === 'string' ? ansVal : 'Đã chọn');
                    ansClass = 'yes';
                  }
                } else {
                  if (ansVal === 0) {
                    isYes = true;
                    ansText = 'Có';
                    ansClass = 'yes';
                  } else if (ansVal === 1) {
                    isNo = true;
                    ansText = 'Không';
                    ansClass = 'no';
                  }
                }

                const ev = isYes 
                  ? (evidences[q.id] || fullEvidenceMap[q.id] || 'Đã kiểm tra') 
                  : isNo 
                    ? (fullEvidenceMap[q.id] ? fullEvidenceMap[q.id] + ' - chưa nộp' : 'Chưa nộp')
                    : 'Chưa có thông tin';

                const qText = getCleanQuestionText(q);
                return `<tr><td><b>${q.id}</b></td><td>${qText}</td><td style="text-align: center;" class="${ansClass}">${ansText}</td><td>${ev}</td></tr>`;
              }).join('');

              return `
                <tr class="divider"><td colspan="4">${sec.title} — ${sec.score}/${sec.maxScore} câu đạt</td></tr>
                ${rows}
              `;
            }).join('')}
          </tbody>
        </table>

        <h2>III. THÔNG TIN HỒ SƠ HỆ THỐNG</h2>
        <p><b>Tên hệ thống:</b> ${formData.systemName || '-'}</p>
        <p><b>Lĩnh vực ứng dụng:</b> ${formData.domain || '-'}</p>
        <p><b>Đơn vị triển khai:</b> ${formData.agencyName || '-'}</p>
        <p><b>Mức độ rủi ro:</b> ${formData.riskLevel || '-'}</p>
        <p><b>Mục đích chính:</b> ${formData.purpose || '-'}</p>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bao_cao_danh_gia_dao_duc_AI_${displayCode}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const principlesList = [
    principlesData['A'],
    principlesData['B'],
    principlesData['C1'],
    principlesData['C2'],
    principlesData['C3'],
    principlesData['C4'],
    principlesData['D']
  ];

  return (
    <div className="container page-container fade-in">
      <div className="breadcrumbs text-sm text-muted mb-2">
        <Link to="/">Trang chủ</Link> {'>'} Kết quả đánh giá
      </div>

      {/* 3-Phase Process Stepper */}
      <MacroStepper currentPhase={3} interactive={true} />

      <div className="exec-dash-container">
        {/* Header Section */}
        <div className="exec-header">
          <h1 className="exec-title">KẾT QUẢ ĐÁNH GIÁ MỨC ĐỘ TUÂN THỦ ĐẠO ĐỨC AI</h1>
          <div className="exec-subtitle">
            Báo cáo chi tiết theo từng nguyên tắc · Ngày đánh giá: {displayDate} · Hệ thống: {formData.systemName || '(Chưa đặt tên hệ thống)'} · MÃ HỒ SƠ #{displayCode}
          </div>
          <div className="exec-actions-bar">
            <button type="button" className="exec-action-btn" onClick={handleShare}>
              <Share2 size={15} /> Chia sẻ kết quả
            </button>
            <Link to="/ho-so-dang-ky" className="exec-action-btn" onClick={handleReset}>
              <RotateCcw size={15} /> Đánh giá lại
            </Link>
            <button type="button" className="exec-action-btn" onClick={handleExportDocx}>
              <Download size={15} /> Xuất báo cáo (.docx)
            </button>
          </div>
        </div>

        {/* Card 1: Tổng quan kết quả (2 columns) */}
        <div className="exec-overview-card">
          <div className="exec-overview-grid">
            {/* Left Column: Kết quả tổng thể */}
            <div>
              <div className="exec-col-title">KẾT QUẢ TỔNG THỂ</div>
              <div className="exec-score-hero">
                <span className="exec-score-num">{convertedScore}</span>
                <span className="exec-score-label">/100 quy đổi</span>
              </div>
              <div className="exec-status-title" style={{ color: overall.colorHex }}>
                {overall.label}
              </div>
              <p className="exec-desc-text">
                {getSummaryDescription()}
              </p>
              <div className="exec-threshold-chips">
                <span className="exec-chip exec-chip-success">Đầy đủ: 44–60</span>
                <span className="exec-chip exec-chip-warning">Một phần: 24–43</span>
                <span className="exec-chip exec-chip-danger">Không: có NT 0–5</span>
              </div>
            </div>

            {/* Right Column: Điểm theo các phần đánh giá */}
            <div>
              <div className="exec-col-title">ĐIỂM THEO CÁC PHẦN ĐÁNH GIÁ</div>
              {principlesList.map((p) => {
                const maxS = p.maxScore || 15;
                const pct = Math.round((p.score / maxS) * 100);
                return (
                  <div className="exec-bar-row" key={p.code}>
                    <div className="exec-bar-label" title={p.shortName}>
                      {p.shortName}
                    </div>
                    <div className="exec-bar-track-wrap">
                      <div 
                        className="exec-bar-fill" 
                        style={{ width: `${pct}%` }}
                      />
                      {/* Ngưỡng một phần: 40% */}
                      <div className="exec-bar-threshold-line" style={{ left: '40%' }} title="Ngưỡng một phần (40%)" />
                      {/* Ngưỡng đầy đủ: 70% */}
                      <div className="exec-bar-threshold-line" style={{ left: '70%' }} title="Ngưỡng đầy đủ (70%)" />
                    </div>
                    <div className="exec-bar-score">{p.score}/{maxS}</div>
                  </div>
                );
              })}

              <div className="exec-bar-legend">
                <span className="exec-legend-item">
                  <span className="exec-legend-box" style={{ backgroundColor: '#3b82f6' }} /> Đạt yêu cầu ("Có")
                </span>
                <span className="exec-legend-item">
                  <span className="exec-legend-box" style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }} /> Chưa đạt ("Không")
                </span>
                <span className="exec-legend-item">
                  <span style={{ fontWeight: 'bold', color: '#94a3b8' }}>|</span> Ngưỡng đầy đủ (70%) · một phần (40%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Principle Selector Tabs */}
        <div className="exec-tabs-row">
          {principlesList.map((p) => {
            const isActive = activePrinciple === p.code;
            const tabUrl = `${location.pathname}?${(() => {
              const sp = new URLSearchParams(location.search);
              sp.set('principle', p.code);
              return sp.toString();
            })()}`;
            return (
              <Link
                key={p.code}
                to={tabUrl}
                className={`exec-tab-btn ${p.code === 'D' ? 'exec-tab-btn-d' : ''} ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePrinciple(p.code);
                }}
              >
                <span>{p.code === 'D' ? 'Phần D · Giám sát sau triển khai' : p.tabLabel} · {p.score}/{p.maxScore || 15}</span>
                {isActive ? (
                  <span className="exec-tab-badge-active">{p.short}</span>
                ) : (
                  <span className={`exec-tab-badge ${p.badgeClass}`}>{p.short}</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Card 2: Principle Detail */}
        <div className="exec-principle-card">
          {/* Header of selected principle */}
          <div className="exec-phead-top">
            <div>
              <div className="exec-phead-tag">{currP.numText}</div>
              <h2 className="exec-phead-title">{currP.title}</h2>
            </div>
            <div className="exec-phead-score-wrap">
              <div className="exec-phead-score-num" style={{ color: currP.colorHex }}>
                {currP.score}/{currP.maxScore || 15} câu đạt yêu cầu
              </div>
              <div className="exec-phead-badges">
                <span className={`exec-chip ${currP.badgeClass}`}>{currP.label}</span>
                <span className={currP.priorityClass}>{currP.priority}</span>
              </div>
            </div>
          </div>

          {/* Subgroup Metric Boxes */}
          <div className="exec-subgroups-grid">
            {processedSubgroups.map((sub, idx) => (
              <div key={idx} className="exec-subgroup-box">
                <div className="exec-subgroup-title">{sub.title} ({sub.range})</div>
                <div className="exec-subgroup-score">{sub.score}/{sub.maxCount}</div>
                <div className="exec-subgroup-status" style={{ color: sub.statusColor }}>
                  {sub.statusText}
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Question Table */}
          <div className="exec-table-wrap">
            <table className="exec-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>MÃ</th>
                  <th>CÂU HỎI TỰ ĐÁNH GIÁ</th>
                  <th style={{ width: '90px', textAlign: 'center' }}>TRẢ LỜI</th>
                  <th style={{ width: '280px' }}>MINH CHỨNG</th>
                </tr>
              </thead>
              <tbody>
                {processedSubgroups.map((sub, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <tr className="divider-row">
                      <td colSpan={4}>
                        {sub.title} · {sub.range} — {sub.score}/{sub.maxCount} câu đạt
                      </td>
                    </tr>
                    {sub.questions.map((q) => {
                      const ansVal = answers[q.id];
                      const isA10 = q.id === 'A10';
                      let isYes = false;
                      let isNo = false;
                      let ansText = 'Chưa đánh giá';
                      let ansColor = '#94a3b8';
                      let ansFontWeight = 400;

                      if (isA10) {
                        if (ansVal !== undefined) {
                          isYes = true;
                          const a10Options = ['Cục bộ', 'Toàn quốc', 'Cả hai'];
                          ansText = a10Options[ansVal] || (typeof ansVal === 'string' ? ansVal : 'Đã chọn');
                          ansColor = '#334155';
                          ansFontWeight = 600;
                        }
                      } else {
                        if (ansVal === 0) {
                          isYes = true;
                          ansText = 'Có';
                          ansColor = '#334155';
                          ansFontWeight = 600;
                        } else if (ansVal === 1) {
                          isNo = true;
                          ansText = 'Không';
                          ansColor = '#dc2626';
                          ansFontWeight = 700;
                        }
                      }

                      const userEv = evidences[q.id]?.trim();
                      const defaultEv = fullEvidenceMap[q.id] || defaultEvidenceMap[q.id] || 'Tài liệu đầy đủ';

                      return (
                        <tr key={q.id}>
                          <td style={{ fontWeight: 600, color: '#1e293b' }}>{q.id}</td>
                          <td style={{ color: '#334155' }}>{q.text}</td>
                          <td style={{ textAlign: 'center' }}>
                            <span style={{ color: ansColor, fontWeight: ansFontWeight }}>
                              {ansText}
                            </span>
                          </td>
                          <td>
                            {isYes ? (
                              <span style={{ color: userEv ? '#0f172a' : '#64748b', fontWeight: userEv ? 600 : 400 }}>
                                {userEv || defaultEv}
                              </span>
                            ) : isNo ? (
                              <span style={{ color: '#dc2626', fontWeight: 500 }}>
                                {userEv || `${defaultEv} - chưa nộp`}
                              </span>
                            ) : (
                              <span style={{ color: '#94a3b8', fontSize: '12px', fontStyle: 'italic' }}>
                                Chưa có thông tin
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card 3: CÂU TRẢ LỜI "KHÔNG" THEO NHÓM TIÊU CHÍ */}
        <div className="exec-khong-card">
          <div className="exec-col-title" style={{ fontSize: '13px', marginBottom: '4px' }}>
            CÂU TRẢ LỜI "KHÔNG" THEO NHÓM TIÊU CHÍ — CẦN KHẮC PHỤC
          </div>
          <div className="text-sm text-muted mb-4">
            Tổng hợp các điểm chưa đạt trong {currP.numText} để phân công đầu mối và bổ sung minh chứng.
          </div>
          <div className="exec-khong-grid">
            {processedSubgroups.map((sub, sIdx) => {
              const noQuestions = sub.questions.filter(q => q.id !== 'A10' && answers[q.id] === 1);
              const unAnsweredCount = sub.questions.filter(q => answers[q.id] === undefined).length;
              const hasNo = noQuestions.length > 0;
              return (
                <div key={sIdx} className={`exec-khong-col ${hasNo ? 'warn' : 'clean'}`}>
                  <div className="exec-khong-col-title">
                    {sub.title} — {sub.score}/{sub.maxCount} {hasNo && `(${noQuestions.length} câu)`}
                  </div>
                  {hasNo ? (
                    <ul className="exec-khong-list">
                      {noQuestions.map((q) => (
                        <li key={q.id}>
                          <b>[{q.id}]</b> {q.text}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="exec-khong-clean-msg">
                      {unAnsweredCount > 0 
                        ? `Không có câu "Không" (còn ${unAnsweredCount} câu chưa đánh giá).` 
                        : 'Không có câu "Không" — duy trì và rà soát định kỳ.'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 4: KHUYẾN NGHỊ THEO 03 MỨC TUÂN THỦ */}
        <div className="exec-recom-card">
          <div className="exec-col-title" style={{ fontSize: '13px', marginBottom: '4px' }}>
            KHUYẾN NGHỊ THEO 03 MỨC TUÂN THỦ — {currP.numText} {currP.answeredCount > 0 ? '(mức đang áp dụng được tô đậm)' : '(khung tham khảo)'}
          </div>
          <div className="text-sm text-muted mb-4">
            Căn cứ Hướng dẫn của Bộ TT&TT ban hành kèm Quyết định số 1290/QĐ-BTTTT ngày 11/6/2024. Cột tương ứng với điểm số hiện tại được đánh dấu.
          </div>

          {currP.answeredCount === 0 && (
            <div style={{ backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '10px 14px', marginBottom: '14px', fontSize: '13px', color: '#64748b' }}>
              ℹ️ <i>Bạn chưa trả lời câu hỏi nào thuộc {currP.numText}. Các mức khuyến nghị dưới đây được hiển thị để bạn tham khảo khung tiêu chuẩn của Bộ TT&TT khi hoàn thành đánh giá.</i>
            </div>
          )}
          
          {(() => {
            const maxS = currP.maxScore || 15;
            const pct = (currP.score / maxS) * 100;
            const isFull = currP.answeredCount > 0 && pct >= 70;
            const isPartial = currP.answeredCount > 0 && pct >= 40 && pct < 70;
            const isNon = currP.answeredCount > 0 && pct < 40;

            return (
              <div className="exec-recom-grid">
                {/* Level 1: Tuân thủ đầy đủ */}
                <div className={`exec-recom-col ${isFull ? 'highlight-cyan' : ''}`}>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-main mb-0" style={{ fontSize: '15px' }}>
                        {currP.recommendations.full.title}
                      </h4>
                      <span className="text-xs text-muted">
                        {currP.recommendations.full.rangeText}
                      </span>
                    </div>
                    {isFull && (
                      <span className="exec-recom-badge-current" style={{ backgroundColor: '#0284c7' }}>
                        ● Mức hiện tại: {currP.score}/{maxS}
                      </span>
                    )}
                    <p className="text-xs text-muted mb-3" style={{ lineHeight: 1.5 }}>
                      {currP.recommendations.full.statusDesc}
                    </p>
                    <ul className="exec-recom-bullets">
                      {currP.recommendations.full.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Level 2: Tuân thủ một phần */}
                <div className={`exec-recom-col ${isPartial ? 'highlight-amber' : ''}`}>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-main mb-0" style={{ fontSize: '15px' }}>
                        {currP.recommendations.partial.title}
                      </h4>
                      <span className="text-xs text-muted">
                        {currP.recommendations.partial.rangeText}
                      </span>
                    </div>
                    {isPartial && (
                      <span className="exec-recom-badge-current" style={{ backgroundColor: '#d97706' }}>
                        ● Mức hiện tại: {currP.score}/{maxS}
                      </span>
                    )}
                    <p className="text-xs text-muted mb-3" style={{ lineHeight: 1.5 }}>
                      {currP.recommendations.partial.statusDesc}
                    </p>
                    <ul className="exec-recom-bullets">
                      {currP.recommendations.partial.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Level 3: Không tuân thủ */}
                <div className={`exec-recom-col ${isNon ? 'highlight-red' : ''}`}>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-main mb-0" style={{ fontSize: '15px' }}>
                        {currP.recommendations.non.title}
                      </h4>
                      <span className="text-xs text-muted">
                        {currP.recommendations.non.rangeText}
                      </span>
                    </div>
                    {isNon && (
                      <span className="exec-recom-badge-current" style={{ backgroundColor: '#dc2626' }}>
                        ● Mức hiện tại: {currP.score}/{maxS}
                      </span>
                    )}
                    <p className="text-xs text-muted mb-3" style={{ lineHeight: 1.5 }}>
                      {currP.recommendations.non.statusDesc}
                    </p>
                    <ul className="exec-recom-bullets">
                      {currP.recommendations.non.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* PRESERVED SECTION: CHI TIẾT HỒ SƠ KHAI BÁO */}
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
              <div className="mb-6">
                <h5 className="font-bold text-primary mb-3 border-b pb-2">3. Mô tả hệ thống</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  
                  <div className="flex flex-col md:col-span-2 mt-1 font-bold text-main">Mục đích sử dụng, phạm vi và giới hạn sử dụng</div>
                  <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Mục đích chính:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.purpose || '-'}</span></div>
                  <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Bài toán nghiệp vụ hỗ trợ/giải quyết:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.businessProblem || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Lĩnh vực ứng dụng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.domain === 'Khác' ? formData.otherDomain : formData.domain || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Người sử dụng trực tiếp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.directUser === 'Khác' ? formData.otherDirectUser : formData.directUser || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Đối tượng chịu tác động:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.decisionTarget === 'Khác' ? formData.otherDecisionTarget : formData.decisionTarget || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Nhóm dễ tổn thương:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.vulnerableGroup || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Ước tính số lượng người dùng:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.userCount || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Phạm vi triển khai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.deployScope === 'Khác' ? formData.otherDeployScope : formData.deployScope || '-'}</span></div>
                  <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Tác động tiềm tàng nếu hoạt động sai:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.potentialImpact || '-'}</span></div>
                  
                  <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Công nghệ, dữ liệu, đầu vào và đầu ra</div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Loại công nghệ AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.aiTechType === 'Khác' ? formData.otherAiTechType : formData.aiTechType || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Phát triển/Bên thứ ba:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.developType || '-'}</span></div>
                  <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Nhà cung cấp:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.provider || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Loại dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputType === 'Khác' ? formData.otherInputType : formData.inputType || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Nguồn dữ liệu đầu vào:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.inputSource === 'Khác' ? formData.otherInputSource : formData.inputSource || '-'}</span></div>
                  <div className="flex flex-col md:col-span-2"><span className="text-muted mb-1">Dữ liệu cá nhân/nhạy cảm:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.hasPersonalData || '-'} {formData.hasPersonalData === 'Có' && formData.personalDataDesc ? `- ${formData.personalDataDesc}` : ''}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Loại đầu ra AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.outputType === 'Khác' ? formData.otherOutputType : formData.outputType || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Mức độ tự động hóa:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.automationLevel === 'Khác' ? formData.otherAutomationLevel : formData.automationLevel || '-'}</span></div>

                  <div className="flex flex-col md:col-span-2 mt-4 font-bold text-main">Thông tin quản trị đầu mối quản trị, vận hành</div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Đơn vị quản lý nghiệp vụ:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.managementUnit || '-'}</span></div>
                  <div className="flex flex-col md:col-span-2">
                    <span className="text-muted mb-1">Người chịu trách nhiệm cấp lãnh đạo:</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-muted-light p-3 rounded">
                      <div><span className="text-muted text-xs">Họ và tên:</span> <span className="font-medium">{formData.leaderName || '-'}</span></div>
                      <div><span className="text-muted text-xs">Chức vụ:</span> <span className="font-medium">{formData.leaderRole || '-'}</span></div>
                      <div><span className="text-muted text-xs">Email:</span> <span className="font-medium">{formData.leaderEmail || '-'}</span></div>
                      <div><span className="text-muted text-xs">Điện thoại:</span> <span className="font-medium">{formData.leaderPhone || '-'}</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Đầu mối chuyên môn/vận hành AI:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.technicalContact || '-'}</span></div>
                  <div className="flex flex-col"><span className="text-muted mb-1">Kênh tiếp nhận phản ánh/khiếu nại/sự cố:</span><span className="font-medium bg-muted-light p-2 rounded">{formData.supportChannel || '-'}</span></div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
