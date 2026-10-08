const fs = require('fs');
let txt = fs.readFileSync('src/pages/Assessment2.jsx', 'utf8');

// Replace handleWeightChange
const oldHandle = `  const handleWeightChange = (key, newValue) => {
    setPreset('custom');
    let val = parseInt(newValue, 10);
    if (isNaN(val)) val = 0;
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    
    let newWeights = { ...weights, [key]: val };
    let remaining = 100 - val;
    const otherKeys = ['C1', 'C2', 'C3', 'C4'].filter(k => k !== key);
    let otherSum = otherKeys.reduce((sum, k) => sum + weights[k], 0);
    
    if (otherSum === 0) {
       otherKeys.forEach(k => newWeights[k] = Math.floor(remaining / 3));
       newWeights[otherKeys[0]] += remaining - Math.floor(remaining / 3) * 3;
    } else {
       otherKeys.forEach(k => {
         newWeights[k] = Math.round((weights[k] / otherSum) * remaining);
       });
       let currentSum = newWeights.C1 + newWeights.C2 + newWeights.C3 + newWeights.C4;
       let err = 100 - currentSum;
       if (err !== 0) {
           newWeights[otherKeys[0]] += err; 
       }
    }
    setWeights(newWeights);
  };`;

const newHandle = `  const handleWeightChange = (key, newValue) => {
    setPreset('custom');
    let val = parseInt(newValue, 10);
    if (isNaN(val)) val = 0;
    
    let oldVal = weights[key];
    let diff = val - oldVal;
    if (diff === 0) return;

    let newWeights = { ...weights, [key]: val };
    const order = ['C1', 'C2', 'C3', 'C4'];
    let otherKeys = order.filter(k => k !== key);
    
    let amountToAbsorb = -diff;
    for (let k of otherKeys) {
        if (amountToAbsorb === 0) break;
        let currentK = newWeights[k];
        let newK = currentK + amountToAbsorb;
        
        if (newK < 0) {
            newWeights[k] = 0;
            amountToAbsorb = newK;
        } else if (newK > 100) {
            newWeights[k] = 100;
            amountToAbsorb = newK - 100;
        } else {
            newWeights[k] = newK;
            amountToAbsorb = 0;
        }
    }
    
    if (amountToAbsorb !== 0) {
        newWeights[key] += amountToAbsorb;
    }
    setWeights(newWeights);
  };`;

txt = txt.replace(oldHandle, newHandle);

// Replace width: '60px' with width: '70px', padding: '0.25rem'
txt = txt.replace(/style=\{\{ width: '60px' \}\}/g, "style={{ width: '70px', padding: '0.25rem 0.5rem' }}");

fs.writeFileSync('src/pages/Assessment2.jsx', txt);
console.log('Fixed Assessment2 logic and width');
