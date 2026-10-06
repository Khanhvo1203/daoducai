import React, { useState } from 'react';
import { CheckSquare, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { questionsDb } from '../data/questionsData';

const PrincipleResult = ({ prefix, title, score, answers, getComplianceLevel }) => {
  const [expanded, setExpanded] = useState(false);
  const comp = getComplianceLevel(score);
  
  const partQuestions = questionsDb['part' + prefix] || [];
  const groups = [];
  let currentGroup = null;
  const allFailed = [];
  
  partQuestions.forEach((q, idx) => {
    if (q.groupTitle) {
      if (currentGroup) groups.push(currentGroup);
      currentGroup = {
        title: q.groupTitle,
        startIdx: idx + 1,
        endIdx: idx + 1,
        total: 0,
        score: 0
      };
    }
    
    if (currentGroup) {
      currentGroup.endIdx = idx + 1;
      currentGroup.total += 1;
      const ans = answers[q.id];
      if (ans === 0) {
        currentGroup.score += 1;
      } else {
        let textStr = '';
        if (typeof q.text === 'string') {
          textStr = q.text;
        } else if (q.text && q.text.props && q.text.props.children) {
          // If it's a React element, try to extract some text
          textStr = Array.isArray(q.text.props.children) ? q.text.props.children.join('') : String(q.text.props.children);
        } else {
          textStr = 'Tiêu chí';
        }
        textStr = textStr.replace(/<[^>]*>?/gm, ''); // Strip any HTML tags if present as strings
        const shortText = textStr.split(' ').slice(0, 8).join(' ') + (textStr.split(' ').length > 8 ? '...' : '');
        allFailed.push(q.id + ' (' + shortText + ')');
      }
    }
  });
  if (currentGroup) groups.push(currentGroup);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div 
        className="flex items-center gap-4 p-4 border rounded-md recommendation-item cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: 'pointer', transition: 'all 0.2s', backgroundColor: expanded ? '#f8f9fa' : 'var(--surface)' }}
      >
        <div className={`icon-box ${comp.color}`}>
          {score < 6 ? <AlertTriangle size={20}/> : <CheckSquare size={20}/>}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h5 className="font-bold text-main mb-0">{title}</h5>
            <div className="font-bold text-sm flex items-center" style={{ gap: '0.5rem' }}>
              <span className={comp.color}>{comp.label}</span>
              <span className="text-muted">({score}/15)</span>
              <span className="text-muted" style={{ marginLeft: '4px', display: 'flex', alignItems: 'center' }}>
                {expanded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div style={{ marginTop: '0.5rem', backgroundColor: '#f4f7f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem', fontSize: '0.875rem', animation: 'fadeIn 0.2s ease-in-out' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', color: '#4a5568' }}>
            CHI TIẾT TIÊU CHÍ — {title.replace(/C[1-4]\. /, '')}
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.5rem 0', color: '#4a5568', fontWeight: 600, width: '45%' }}>Nhóm tiêu chí</th>
                <th style={{ padding: '0.5rem 0', color: '#4a5568', fontWeight: 600, width: '15%' }}>Câu đạt</th>
                <th style={{ padding: '0.5rem 0', color: '#4a5568', fontWeight: 600, width: '20%' }}>Thanh tỷ lệ</th>
                <th style={{ padding: '0.5rem 0', color: '#4a5568', fontWeight: 600, width: '20%' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g, i) => {
                const ratio = g.total > 0 ? (g.score / g.total) * 100 : 0;
                let statusLabel = 'Không';
                let statusBg = '#fef2f2';
                let statusColor = '#dc2626';
                if (g.score === g.total) {
                  statusLabel = 'Đầy đủ';
                  statusBg = '#e8f5e9';
                  statusColor = '#16a34a';
                } else if (g.score > 0) {
                  statusLabel = 'Một phần';
                  statusBg = '#fff8e1';
                  statusColor = '#cc8800';
                }

                return (
                  <tr key={i} style={{ borderBottom: '1px dashed #e2e8f0' }}>
                    <td style={{ padding: '0.75rem 0' }}>{g.title} ({prefix}.{g.startIdx}–{prefix}.{g.endIdx})</td>
                    <td style={{ padding: '0.75rem 0' }}>{g.score}/{g.total}</td>
                    <td style={{ padding: '0.75rem 0', paddingRight: '1rem' }}>
                      <div style={{ backgroundColor: '#e2e8f0', height: '6px', borderRadius: '4px', width: '100%' }}>
                        <div style={{ width: `${ratio}%`, backgroundColor: '#4a5568', height: '100%', borderRadius: '4px' }}></div>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 0' }}>
                      <span style={{ backgroundColor: statusBg, color: statusColor, padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500 }}>
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {allFailed.length > 0 && (
            <div style={{ paddingTop: '0.5rem', color: '#2d3748' }}>
              <span style={{ fontWeight: 'bold' }}>Câu chưa đạt:</span> {allFailed.join(' · ')}.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PrincipleResult;
