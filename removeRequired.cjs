const fs = require('fs');
let txt = fs.readFileSync('src/pages/LandingPage.jsx', 'utf8');

// Find step 3 block
const startStr = '{step === 3 && (';
const startIndex = txt.indexOf(startStr);
const endStr = '{step === 4 && (';
const endIndex = txt.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  let step3Block = txt.substring(startIndex, endIndex);
  
  // Remove the mandatory asterisks
  step3Block = step3Block.replace(/ <span className="text-danger">\*<\/span>/g, '');
  
  // Remove the 'required' attributes from inputs and textareas
  step3Block = step3Block.replace(/ required/g, '');
  
  // Put it back
  const newTxt = txt.substring(0, startIndex) + step3Block + txt.substring(endIndex);
  fs.writeFileSync('src/pages/LandingPage.jsx', newTxt);
  console.log('Successfully updated step 3 requirements in LandingPage.jsx');
} else {
  console.log('Could not find step 3 or step 4 blocks.');
}
