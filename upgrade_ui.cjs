const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (file === 'Home.jsx') return; // Handled separately
  
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Change backgrounds to dark premium
  content = content.replace(/bg-stone-50/g, 'bg-[#1c1917]');
  content = content.replace(/bg-stone-100/g, 'bg-[#181512]');
  content = content.replace(/bg-white/g, 'bg-[#292524]');
  
  // Update text colors for dark mode
  content = content.replace(/text-stone-900/g, 'text-stone-100');
  content = content.replace(/text-stone-800/g, 'text-stone-200');
  content = content.replace(/text-stone-700/g, 'text-stone-300');
  content = content.replace(/text-stone-600/g, 'text-stone-400');
  content = content.replace(/text-stone-500/g, 'text-stone-500');
  
  // Cards and borders
  content = content.replace(/border-stone-200/g, 'border-stone-700/50');
  content = content.replace(/border-stone-100/g, 'border-stone-800');
  
  // Add huge gap before the LAST section (CTA usually)
  // CTA sections usually have bg-stone-900 or bg-[#181512]
  // We will instead just add a large empty div before the final PageTransition closing tag, OR before the Footer.
  // Actually, wait, the user said "spacing between Discover More and Quote". Let's handle that in Home.jsx manually.
  
  // For subpages, adding a spacer at the bottom of the page before PageTransition closes
  if (!content.includes('className="h-32 md:h-48"')) {
     content = content.replace(/<\/PageTransition>/g, '  {/* Massive Spacing */}\n      <div className="h-32 md:h-56 bg-[#181512]" />\n    </PageTransition>');
  }

  fs.writeFileSync(filePath, content);
  console.log(`Upgraded UI in ${file}`);
});
