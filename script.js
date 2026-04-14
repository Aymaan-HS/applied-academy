/* ===============================================
   Applied Academy — script.js
=============================================== */

/* CURSOR */
const cur  = document.getElementById('cur');
const cur2 = document.getElementById('cur2');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function loop() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  cur2.style.left = rx + 'px'; cur2.style.top = ry + 'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('button,a,input,textarea,select').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.style.transform='translate(-50%,-50%) scale(2.2)'; cur2.style.width='48px'; cur2.style.height='48px'; cur2.style.opacity='.25'; });
  el.addEventListener('mouseleave', () => { cur.style.transform='translate(-50%,-50%) scale(1)';   cur2.style.width='30px'; cur2.style.height='30px'; cur2.style.opacity='.45'; });
});

/* SCROLL */
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    const s = window.scrollY;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    document.getElementById('nav').classList.toggle('scrolled', s > 40);
    document.getElementById('prog').style.width = (s / h * 100) + '%';
    document.getElementById('btt').classList.toggle('show', s > 500);
    const hl = document.querySelector('.hero-left');
    const hr = document.querySelector('.hero-right');
    if (hl && document.getElementById('page-home').classList.contains('active')) {
      hl.style.transform = `translateY(${s * 0.1}px)`;
      if (hr) hr.style.transform = `translateY(${s * 0.06}px)`;
    }
    ticking = false;
  });
});

/* MOBILE MENU */
let mobOpen = false;
function toggleMob() {
  mobOpen = !mobOpen;
  document.getElementById('mobNav').classList.toggle('open', mobOpen);
  const s = document.getElementById('ham').querySelectorAll('span');
  if (mobOpen) { s[0].style.transform='rotate(45deg) translate(5px,5px)'; s[1].style.opacity='0'; s[2].style.transform='rotate(-45deg) translate(5px,-5px)'; }
  else          { s[0].style.transform=''; s[1].style.opacity='1'; s[2].style.transform=''; }
}
function closeMob() { if (mobOpen) toggleMob(); }

/* PAGE NAVIGATION */
function go(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active','pg-in'));
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) { page.classList.add('active'); void page.offsetWidth; page.classList.add('pg-in'); }
  const nb = document.getElementById('nb-' + id);
  if (nb) nb.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(initReveal, 90);
  if (id === 'courses') renderCourses('all');
}

/* DEMO MODAL */
function openModal()  { document.getElementById('demoModal').classList.add('open'); }
function closeModal() { document.getElementById('demoModal').classList.remove('open'); }
document.getElementById('demoModal').addEventListener('click', e => { if (e.target.id === 'demoModal') closeModal(); });
function modalSubmit(btn) {
  btn.textContent = 'Sending…'; btn.disabled = true;
  setTimeout(() => { document.getElementById('modalOk').style.display = 'block'; btn.style.display = 'none'; }, 1200);
}
function contactSubmit(btn) {
  btn.textContent = 'Sending…'; btn.disabled = true;
  setTimeout(() => { document.getElementById('contactOk').style.display = 'block'; btn.style.display = 'none'; }, 1200);
}

/* SCROLL REVEAL */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.page.active .reveal:not(.vis)').forEach(el => obs.observe(el));
}
window.addEventListener('load', initReveal);

/* COUNTER ANIMATION */
function runCounter(el) {
  if (el.dataset.done) return; el.dataset.done = '1';
  const target = +el.dataset.target; let start = null;
  (function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / 1500, 1), e = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(e * target);
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}
document.querySelectorAll('[data-target]').forEach(el => {
  new IntersectionObserver(entries => { if (entries[0].isIntersecting) runCounter(el); }, { threshold: 0.2 }).observe(el);
});

/* FAQ */
function toggleFaq(item) {
  const was = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
  if (!was) item.classList.add('open');
}

/* ===============================================
   STUDY MATERIAL FOLDER DRAWER
=============================================== */

const FOLDERS = {
  'math-formulas': {
    title: 'Math Formulas Handbook',
    desc: 'Complete formula collection — Class 6 to 12',
    driveFolder: 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID',
    files: [
      { name: 'Algebra Formulas — Class 6–8',        size: 'PDF · 1.2 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Geometry & Mensuration Formulas',      size: 'PDF · 0.9 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Trigonometry Quick Reference',         size: 'PDF · 0.7 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Calculus Formulas — Class 11–12',      size: 'PDF · 1.1 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Statistics & Probability Reference',   size: 'PDF · 0.6 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Vectors & 3D Geometry Formulas',       size: 'PDF · 0.8 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  },
  'physics-notes': {
    title: 'Physics Concept Notes',
    desc: 'Chapter-wise notes with diagrams & solved examples',
    driveFolder: 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID',
    files: [
      { name: 'Motion, Force & Gravitation — Class 9',     size: 'PDF · 2.1 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Electricity & Magnetism — Class 10',        size: 'PDF · 1.8 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Mechanics & Rotational Motion — Class 11',  size: 'PDF · 2.4 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Electrostatics & Current — Class 12',       size: 'PDF · 2.2 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Optics & Wave Theory — Class 12',           size: 'PDF · 1.9 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Modern Physics — Class 12',                 size: 'PDF · 1.5 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  },
  'chemistry-revision': {
    title: 'Chemistry Quick Revision',
    desc: 'Reactions, periodic table tricks & organic frameworks',
    driveFolder: 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID',
    files: [
      { name: 'Acids, Bases & Salts — Class 10',           size: 'PDF · 1.3 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Chemical Reactions & Equations',            size: 'PDF · 1.1 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Periodic Table & Atomic Structure',         size: 'PDF · 0.9 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Organic Chemistry Basics — Class 11',       size: 'PDF · 2.0 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Thermodynamics & Equilibrium — Class 11',   size: 'PDF · 1.6 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Coordination Compounds — Class 12',         size: 'PDF · 1.4 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  },
  'biology-diagrams': {
    title: 'Biology Diagrams Pack',
    desc: 'Labelled diagrams & NCERT-aligned notes',
    driveFolder: 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID',
    files: [
      { name: 'Cell Structure & Division Diagrams',         size: 'PDF · 1.7 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Life Processes — Class 10',                 size: 'PDF · 2.0 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Human Body Systems Diagrams',               size: 'PDF · 2.3 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Genetics & Heredity — Class 10 & 12',       size: 'PDF · 1.5 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Plant Physiology Diagrams',                 size: 'PDF · 1.8 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Evolution & Biotechnology Notes',           size: 'PDF · 1.2 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  },
  'question-banks': {
    title: 'Practice Question Banks',
    desc: 'Graded questions with step-by-step solutions',
    driveFolder: 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID',
    files: [
      { name: 'Mathematics — Class 6–8 Question Bank',     size: 'PDF · 3.1 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Mathematics — Class 9–10 Question Bank',    size: 'PDF · 3.8 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Mathematics — Class 11–12 Question Bank',   size: 'PDF · 4.2 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Science — Class 6–8 Question Bank',         size: 'PDF · 2.9 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Physics — Class 9–12 Question Bank',        size: 'PDF · 3.5 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Chemistry — Class 9–12 Question Bank',      size: 'PDF · 3.3 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Biology — Class 9–12 Question Bank',        size: 'PDF · 2.7 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  },
  'previous-papers': {
    title: 'Previous Year Papers',
    desc: 'CBSE & ICSE board papers with complete answer keys',
    driveFolder: 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID',
    files: [
      { name: 'CBSE Class 10 Maths — Last 5 Years',        size: 'PDF · 4.5 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'CBSE Class 10 Science — Last 5 Years',      size: 'PDF · 4.8 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'CBSE Class 12 Maths — Last 5 Years',        size: 'PDF · 5.1 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'CBSE Class 12 Physics — Last 5 Years',      size: 'PDF · 4.9 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'CBSE Class 12 Chemistry — Last 5 Years',    size: 'PDF · 4.7 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'CBSE Class 12 Biology — Last 5 Years',      size: 'PDF · 4.3 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'ICSE Class 10 Maths & Science — 5 Years',   size: 'PDF · 5.0 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  },
  'jee-neet': {
    title: 'JEE / NEET Foundation',
    desc: 'Competitive exam preparation — Class 9 onwards',
    driveFolder: 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID',
    files: [
      { name: 'JEE Maths Foundation — Algebra',            size: 'PDF · 2.8 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'JEE Maths Foundation — Calculus',           size: 'PDF · 2.5 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'JEE Physics Foundation Notes',              size: 'PDF · 3.0 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'NEET Biology Foundation Notes',             size: 'PDF · 2.7 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'NEET Chemistry Foundation Notes',           size: 'PDF · 2.4 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Mock Test Paper — JEE Pattern',             size: 'PDF · 1.6 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Mock Test Paper — NEET Pattern',            size: 'PDF · 1.5 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  },
  'mental-math': {
    title: 'Mental Math Drills',
    desc: 'Speed calculation & Vedic math shortcuts',
    driveFolder: 'https://drive.google.com/drive/folders/YOUR_FOLDER_ID',
    files: [
      { name: 'Multiplication Tables & Tricks',            size: 'PDF · 0.8 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Vedic Maths — Speed Addition & Subtraction',size: 'PDF · 1.0 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Vedic Maths — Fast Multiplication',         size: 'PDF · 0.9 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Square Root & Cube Root Tricks',            size: 'PDF · 0.7 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: 'Estimation & Approximation Drills',         size: 'PDF · 0.6 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
      { name: '30-Day Speed Math Practice Sheet',          size: 'PDF · 1.1 MB', url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view' },
    ]
  }
};

function openFolder(key) {
  const folder = FOLDERS[key];
  if (!folder) return;

  // Build file rows HTML
  const filesHTML = folder.files.map(f => `
    <a class="file-row" href="${f.url}" target="_blank" rel="noopener">
      <div class="file-pdf-icon">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill="#E74C3C" d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6z"/>
          <path fill="#C0392B" d="M14 2v6h6"/>
          <text x="12" y="16" text-anchor="middle" fill="white" font-size="5" font-family="sans-serif" font-weight="bold">PDF</text>
        </svg>
      </div>
      <div class="file-text">
        <div class="file-title">${f.name}</div>
        <div class="file-meta">${f.size}</div>
      </div>
      <div class="file-open-btn">
        Open
        <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </div>
    </a>
  `).join('');

  document.getElementById('folderName').textContent  = folder.title;
  document.getElementById('folderDesc').textContent  = folder.desc;
  document.getElementById('folderCount').textContent = folder.files.length + ' files';
  document.getElementById('folderDriveLink').href    = folder.driveFolder;
  document.getElementById('folderFileList').innerHTML = filesHTML;

  document.getElementById('folderOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFolder() {
  document.getElementById('folderOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* Close folder on backdrop click */
document.getElementById('folderOverlay').addEventListener('click', e => {
  if (e.target.id === 'folderOverlay') closeFolder();
});

/* Close folder on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeFolder(); closeModal(); }
});

/* COURSES DATA */
const COURSES = [
  { t:'Mathematics — Foundation', g:'Class 6–8', tag:'6-8', s:'math', img:'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=70&fit=crop', d:'Build a rock-solid base with number systems, fractions, basic algebra, geometry, and data handling.', f:['Number Systems & Fractions','Basic Algebra & Equations','Geometry & Mensuration','Data Handling & Statistics'] },
  { t:'Integrated Science',        g:'Class 6–8', tag:'6-8', s:'science', img:'https://images.unsplash.com/photo-1532094349884-543559de1547?w=400&q=70&fit=crop', d:'Explore Physics, Chemistry, and Biology through experiments, visuals, and real-world examples.', f:['Motion, Force & Energy','Matter & Materials','Living World','Light, Sound & Electricity'] },
  { t:'Mathematics — Secondary',  g:'Class 9–10', tag:'9-10', s:'math', img:'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=70&fit=crop', d:'Master quadratics, coordinate geometry, trigonometry, and statistics for board exam excellence.', f:['Polynomials & Quadratics','Coordinate Geometry','Trigonometry & Heights','Statistics & Probability'] },
  { t:'Physics & Chemistry',       g:'Class 9–10', tag:'9-10', s:'science', img:'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&q=70&fit=crop', d:'Laws of motion, chemical reactions, acids and bases, carbon compounds — deep conceptual coverage.', f:['Laws of Motion & Gravitation','Chemical Reactions & Equations','Acids, Bases & Salts','Carbon & its Compounds'] },
  { t:'Biology',                   g:'Class 9–10', tag:'9-10', s:'science', img:'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=70&fit=crop', d:'Life processes, genetics, evolution, and environmental science — NCERT-aligned and beyond.', f:['Life Processes','Control & Coordination','Heredity & Evolution','Our Environment'] },
  { t:'Mathematics — Senior',     g:'Class 11–12', tag:'11-12', s:'math', img:'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&q=70&fit=crop', d:'Advanced calculus, vectors, matrices, and complex numbers — complete senior Mathematics mastery.', f:['Limits, Derivatives & Integrals','Vectors & 3D Geometry','Matrices & Determinants','Statistics & Probability'] },
  { t:'Physics',                   g:'Class 11–12', tag:'11-12', s:'science', img:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=70&fit=crop', d:'From mechanics to modern physics — rigorous conceptual and numerical problem-solving.', f:['Mechanics & Rotational Motion','Electrostatics & Circuits','Optics & Wave Theory','Modern Physics'] },
  { t:'Chemistry',                 g:'Class 11–12', tag:'11-12', s:'science', img:'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=400&q=70&fit=crop', d:'Physical, organic, and inorganic chemistry with exam-focused strategies and conceptual depth.', f:['Atomic Structure & Bonding','Thermodynamics & Equilibrium','Organic Mechanisms','Coordination Compounds'] },
  { t:'JEE / NEET Foundation',    g:'Class 9–12', tag:'9-10', s:'math', img:'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&q=70&fit=crop', d:'Early competitive exam preparation — building the conceptual depth and speed top ranks demand.', f:['Olympiad Problem Solving','Speed & Accuracy Drills','Concept Mapping','Mock Test Strategy'] },
];

function renderCourses(filter) {
  const grid = document.getElementById('courseGrid');
  if (!grid) return;
  const list = filter === 'all' ? COURSES : COURSES.filter(c => c.tag === filter || c.s === filter);
  grid.innerHTML = list.map(c => `
    <div class="cc reveal">
      <img class="cc-photo" src="${c.img}" alt="${c.t}" loading="lazy"/>
      <div class="cc-body">
        <div class="cc-grade">${c.g}</div>
        <h3>${c.t}</h3>
        <p>${c.d}</p>
        <ul class="cc-feats">${c.f.map(x => `<li>${x}</li>`).join('')}</ul>
        <button class="enroll-btn" onclick="openModal()">Enrol in This Course</button>
      </div>
    </div>
  `).join('');
  setTimeout(initReveal, 60);
}

function filterC(filter, btn) {
  document.querySelectorAll('.fb').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCourses(filter);
}

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
  go('home');
  renderCourses('all');
});
