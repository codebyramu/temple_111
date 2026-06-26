const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (file === 'Home.jsx') return;
  
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Any unmatched <h2 ...> </SplitText>
  content = content.replace(/<h2([^>]+)>([\s\S]*?)<\/SplitText>/g, '<SplitText$1>$2</SplitText>');

  fs.writeFileSync(filePath, content);
  console.log(`Fixed h2 in ${file}`);
});
