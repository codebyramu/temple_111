const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'src', 'pages', 'Home.jsx');
const sharedPath = path.join(__dirname, 'src', 'components', 'shared.jsx');

let homeContent = fs.readFileSync(homePath, 'utf8');
let sharedContent = fs.readFileSync(sharedPath, 'utf8');

const hoverRowMatch = homeContent.match(/function HoverRow\(\{ word, i \}\) \{[\s\S]*?\}\n\n/);

if (hoverRowMatch) {
  const hoverRowCode = hoverRowMatch[0].replace('function HoverRow', 'export function HoverRow');
  homeContent = homeContent.replace(hoverRowMatch[0], '');
  
  if (!homeContent.includes('import {')) {
     // shouldn't happen, Home has imports
  } else {
     homeContent = homeContent.replace('import {', 'import {\n  HoverRow,');
  }

  sharedContent += '\n\n' + hoverRowCode;
  
  fs.writeFileSync(homePath, homeContent);
  fs.writeFileSync(sharedPath, sharedContent);
  console.log('Moved HoverRow to shared.jsx');
} else {
  console.log('HoverRow not found in Home.jsx!');
}
