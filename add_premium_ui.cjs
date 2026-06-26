const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (file === 'Home.jsx') return;
  
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure HoverRow is imported
  if (!content.includes('HoverRow')) {
    content = content.replace(/Reveal, WipeReveal,/, 'Reveal, WipeReveal, HoverRow,');
  }

  // 1. Upgrade flat bg-[#292524] cards to premium glassmorphism
  content = content.replace(/bg-\[\#292524\] rounded-xl p-6 border border-stone-700\/50/g, 'relative bg-stone-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/5 hover:border-amber-500/30 hover:bg-stone-900/80 shadow-2xl overflow-hidden group transition-all duration-500');

  // Add the glass shine effect inside the card if we replaced the wrapper
  // We can't easily inject child elements via regex, but we can rely on group-hover text colors.
  
  // 2. Upgrade typography
  content = content.replace(/text-stone-300 leading-snug/g, 'text-amber-100/90 leading-snug drop-shadow-sm');
  content = content.replace(/text-stone-400 leading-relaxed font-light/g, 'text-stone-300 leading-relaxed font-light tracking-wide');
  content = content.replace(/text-amber-700/g, 'text-amber-500');

  // 3. Make CTA buttons more premium
  content = content.replace(/bg-amber-700 text-white/g, 'bg-gradient-to-r from-amber-600 to-amber-800 text-stone-50 border border-amber-500/30 shadow-[0_0_20px_rgba(180,83,9,0.3)] hover:shadow-[0_0_30px_rgba(180,83,9,0.6)]');

  // 4. Upgrade section backgrounds
  content = content.replace(/bg-\[\#1c1917\]/g, 'bg-gradient-to-b from-[#1c1917] to-[#161412]');
  content = content.replace(/bg-\[\#181512\]/g, 'bg-[#12100e]');
  
  // 5. Use SplitText for section headings that are just plain text
  content = content.replace(/<h2 className="font-\['Philosopher'\] font-bold text-stone-100/g, '<SplitText className="font-[\'Philosopher\'] font-bold text-stone-100');
  content = content.replace(/<\/h2>/g, '</SplitText>');
  
  // 6. Add HoverRow to important quotes (specifically the blockquotes with border-l-4)
  content = content.replace(/<div className="mt-14 border-l-4 border-amber-600 pl-8 py-2">([\s\S]*?)<p className="font-\['Cormorant_Garamond'\] italic text-amber-100\/90 leading-snug drop-shadow-sm"([\s\S]*?)>([\s\S]*?)<\/p>([\s\S]*?)<\/div>/g, 
    '<div className="mt-14 border-l-4 border-amber-500/50 pl-8 py-4 relative"><div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 to-transparent pointer-events-none" /><p className="font-[\'Cormorant_Garamond\'] italic leading-snug drop-shadow-md text-stone-500" $2><HoverRow word="$3" /></p>$4</div>'
  );

  fs.writeFileSync(filePath, content);
  console.log(`Applied Premium UI to ${file}`);
});
