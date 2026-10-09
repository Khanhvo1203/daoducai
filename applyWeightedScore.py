import re

def update_dashboard(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()

    # 1. Inject weights loading
    # Find:
    # const activeStep = allSteps[activeStepIdx];
    # OR near:
    # const scoreC1 = getScore('C1');
    
    score_idx = text.find("const scoreC1 = getScore('C1');")
    if score_idx != -1:
        # insert weights
        weights_code = """
  const [weights, setWeights] = useState(() => {
    const saved = localStorage.getItem(`assessment_weights_${userId}`);
    return saved ? JSON.parse(saved) : { C1: 25, C2: 25, C3: 25, C4: 25 };
  });

  const weightedC1 = (scoreC1 / 15) * weights.C1;
  const weightedC2 = (scoreC2 / 15) * weights.C2;
  const weightedC3 = (scoreC3 / 15) * weights.C3;
  const weightedC4 = (scoreC4 / 15) * weights.C4;
  const weightedTotalScore = weightedC1 + weightedC2 + weightedC3 + weightedC4;

"""
        text = text[:score_idx] + weights_code + text[score_idx:]
    
    # 2. Update Pie Chart
    # <span className="score-number" style={{ color: overall.color === 'text-success' ? 'var(--success)' : overall.color === 'text-warning' ? 'var(--warning)' : 'var(--danger)' }}>{totalCScore}</span>
    # <span className="score-total">/60</span>
    
    text = re.sub(r'\{totalCScore\}</span>\n\s*<span className="score-total">/60</span>', r'{weightedTotalScore.toFixed(1)}</span>\n                    <span className="score-total">/100</span>', text)
    
    # Update circle strokeDasharray
    text = re.sub(r'strokeDasharray=\{`\$\{\(totalCScore / 60\) \* 100\}, 100`\}', r'strokeDasharray={`${weightedTotalScore}, 100`}', text)

    # 3. Update PrincipleResult
    text = re.sub(r'<PrincipleResult prefix="C1" title="(.*?)" score=\{scoreC1\} answers=\{answers\} getComplianceLevel=\{getComplianceLevel\} />', r'<PrincipleResult prefix="C1" title="\1" score={scoreC1} answers={answers} getComplianceLevel={getComplianceLevel} weight={weights.C1} weightedScore={weightedC1} />', text)
    text = re.sub(r'<PrincipleResult prefix="C2" title="(.*?)" score=\{scoreC2\} answers=\{answers\} getComplianceLevel=\{getComplianceLevel\} />', r'<PrincipleResult prefix="C2" title="\1" score={scoreC2} answers={answers} getComplianceLevel={getComplianceLevel} weight={weights.C2} weightedScore={weightedC2} />', text)
    text = re.sub(r'<PrincipleResult prefix="C3" title="(.*?)" score=\{scoreC3\} answers=\{answers\} getComplianceLevel=\{getComplianceLevel\} />', r'<PrincipleResult prefix="C3" title="\1" score={scoreC3} answers={answers} getComplianceLevel={getComplianceLevel} weight={weights.C3} weightedScore={weightedC3} />', text)
    text = re.sub(r'<PrincipleResult prefix="C4" title="(.*?)" score=\{scoreC4\} answers=\{answers\} getComplianceLevel=\{getComplianceLevel\} />', r'<PrincipleResult prefix="C4" title="\1" score={scoreC4} answers={answers} getComplianceLevel={getComplianceLevel} weight={weights.C4} weightedScore={weightedC4} />', text)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(text)

update_dashboard('src/pages/Dashboard1.jsx')
update_dashboard('src/pages/Dashboard2.jsx')

# Now update PrincipleResult.jsx
with open('src/components/PrincipleResult.jsx', 'r', encoding='utf-8') as f:
    pr_text = f.read()

pr_text = pr_text.replace("const PrincipleResult = ({ prefix, title, score, answers, getComplianceLevel }) => {", "const PrincipleResult = ({ prefix, title, score, answers, getComplianceLevel, weight, weightedScore }) => {")

old_score_span = """              <span className="text-muted">({score}/15)</span>
              <span className="text-muted" style={{ marginLeft: '4px', display: 'flex', alignItems: 'center' }}>"""

new_score_span = """              <span className="text-muted">({score}/15)</span>
              {weight !== undefined && weightedScore !== undefined && (
                <span className="text-muted">• {weight}% = {weightedScore.toFixed(1)} đ</span>
              )}
              <span className="text-muted" style={{ marginLeft: '4px', display: 'flex', alignItems: 'center' }}>"""

pr_text = pr_text.replace(old_score_span, new_score_span)

with open('src/components/PrincipleResult.jsx', 'w', encoding='utf-8') as f:
    f.write(pr_text)

print("Updates applied")
