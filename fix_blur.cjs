const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Change bg-stone-900/60 to bg-stone-900/95 so it's not too transparent
  // and remove backdrop-blur-xl for mobile to prevent weird rendering
  content = content.replace(/bg-stone-900\/60 backdrop-blur-xl/g, 'bg-stone-900/95 md:bg-stone-900/60 md:backdrop-blur-xl');
  
  // Fix the blur-3xl glow in SahasranamamPage that might obscure text on tap
  content = content.replace(/blur-3xl/g, 'blur-[100px] md:blur-3xl'); // extremely dispersed so it doesn't block text, or just remove it on mobile
  content = content.replace(/w-32 h-32 bg-amber-50 rounded-full blur-\[100px\] md:blur-3xl opacity-0/g, 'hidden md:block absolute -right-10 -top-10 w-32 h-32 bg-amber-50 rounded-full blur-3xl opacity-0');

  fs.writeFileSync(filePath, content);
  console.log(`Fixed blur in ${file}`);
});
