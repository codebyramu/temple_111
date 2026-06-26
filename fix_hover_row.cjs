const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (file === 'Home.jsx') return;
  
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix HoverRow word prop
  content = content.replace(/word="\s*\{([^}]+)\}\s*"/g, 'word={$1}');
  
  // Fix literal text that was wrapped in quotes and newlines
  content = content.replace(/word="\s+([^"]+?)\s+"/g, 'word="$1"');

  fs.writeFileSync(filePath, content);
  console.log(`Fixed HoverRow in ${file}`);
});
