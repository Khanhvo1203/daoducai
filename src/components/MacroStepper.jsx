import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
      titleLine2: 'và sàng lọc rủi ro',
      path: '/'
    },
    {
      num: 2,
      titleLine1: 'Kiểm tra điều kiện quản trị',
      titleLine2: 'và đánh giá theo 4 nguyên tắc',
      path: null // dynamic based on assessment method
    },
    {
      num: 3,
      titleLine1: 'Đề xuất biện pháp',
      titleLine2: 'và theo dõi',
      path: null
    }
  ];

  const handleStepClick = (phase) => {
    if (!interactive) return;
    if (phase.num === 1 && currentPhase > 1) {
      navigate('/');
    }
  };

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

          return (
            <React.Fragment key={phase.num}>
              {/* Step Node */}
              <div 
                className={`macro-step-item ${statusClass} ${interactive && isCompleted ? 'clickable' : ''}`}
                onClick={() => handleStepClick(phase)}
                title={isCompleted && interactive ? `Quay lại: ${phase.titleLine1} ${phase.titleLine2}` : undefined}
              >
                <div className="macro-step-circle">
                  {isCompleted ? (
                    <Check size={15} strokeWidth={2.8} />
                  ) : (
                    <span>{phase.num}</span>
                  )}
                </div>
                <div className="macro-step-text">
                  <span className="macro-line-1">{phase.titleLine1}</span>
                  <span className="macro-line-2">{phase.titleLine2}</span>
                </div>
              </div>

              {/* Connecting Arrow between steps */}
              {idx < phases.length - 1 && (
                <div className={`macro-step-connector ${isCompleted ? 'passed' : ''}`}>
                  <ArrowRight size={18} strokeWidth={2} />
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
