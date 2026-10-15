import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './MacroStepper.css';

/**
 * MacroStepper: 3-phase horizontal workflow progress indicator
 * @param {number} currentPhase - 1: Thông tin hệ thống, 2: Đánh giá điều kiện & 4 nguyên tắc, 3: Đề xuất biện pháp & theo dõi
 * @param {string} [className] - Optional custom class name
 * @param {boolean} [interactive=false] - Whether clicking previous steps allows navigation
 */
const MacroStepper = ({ currentPhase = 1, className = '', interactive = false }) => {
  const navigate = useNavigate();

  const phases = [
    {
      num: 1,
      titleLine1: 'Thông tin hệ thống',
      titleLine2: '& sàng lọc rủi ro',
      path: '/ho-so-dang-ky'
    },
    {
      num: 2,
      titleLine1: 'Kiểm tra điều kiện quản trị',
      titleLine2: '& đánh giá theo 4 nguyên tắc',
      path: '/assessment1'
    },
    {
      num: 3,
      titleLine1: 'Đề xuất biện pháp',
      titleLine2: '& theo dõi giám sát',
      path: '/dashboard1'
    }
  ];

  return (
    <div className={`macro-stepper-container ${className}`}>
      <div className="macro-stepper-inner">
        {phases.map((phase, idx) => {
          const isActive = currentPhase === phase.num;
          const isCompleted = currentPhase > phase.num;
          const isPending = currentPhase < phase.num;

          let statusClass = 'pending';
          if (isActive) statusClass = 'active';
          if (isCompleted) statusClass = 'completed';

          const isClickable = interactive && isCompleted;

          return (
            <React.Fragment key={phase.num}>
              {/* Step Node */}
              <Link 
                to={phase.path}
                className={`macro-step-item ${statusClass} ${isClickable ? 'clickable' : ''}`}
                onClick={(e) => {
                  if (!isClickable) {
                    e.preventDefault();
                  }
                }}
                title={isCompleted && interactive ? `Quay lại: ${phase.titleLine1} ${phase.titleLine2}` : undefined}
              >
                <div className="macro-step-circle">
                  {isCompleted ? (
                    <Check size={24} strokeWidth={3} />
                  ) : (
                    <span>{phase.num}</span>
                  )}
                </div>
                <div className="macro-step-text">
                  <span className="macro-line-1">{phase.titleLine1}</span>
                  <span className="macro-line-2">{phase.titleLine2}</span>
                </div>
              </Link>

              {/* Connecting Arrow Bar between steps */}
              {idx < phases.length - 1 && (
                <div className={`macro-step-connector ${isCompleted ? 'passed' : ''}`}>
                  <div className="macro-connector-line"></div>
                  <div className="macro-connector-arrow">
                    <ArrowRight size={18} strokeWidth={2.4} />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default MacroStepper;
