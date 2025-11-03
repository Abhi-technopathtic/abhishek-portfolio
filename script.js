// CV download
function downloadCV(path = 'Abhishek_CV.pdf') {
  const link = document.createElement('a');
  link.href = path;
  link.download = path.split('/').pop();
  document.body.appendChild(link);
  link.click();
  link.remove();
}
document.getElementById('downloadCV')?.addEventListener('click', () => downloadCV());
document.getElementById('downloadCVHero')?.addEventListener('click', () => downloadCV());

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => { nav?.classList.toggle('active'); menuToggle.classList.toggle('open'); });

// Fade-in observer
const faders = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
},{ threshold: 0.15 });
faders.forEach(el=>io.observe(el));

// Skills animation
const skillFills = document.querySelectorAll('.skill-fill');
const skillPercents = document.querySelectorAll('.skill-percent');
const skillsObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    skillFills.forEach(fill => { const target = fill.dataset.target || fill.getAttribute('data-target') || 80; fill.style.width = target + '%'; });
    skillPercents.forEach(span => {
      const p = span.dataset.percent || span.getAttribute('data-percent') || 80; let start = 0; const dur=900; const step = Math.max(10, Math.floor(dur / p)); const iv = setInterval(()=>{ start++; span.textContent = start + '%'; if(start >= Number(p)) clearInterval(iv); }, step);
    });
    obs.unobserve(entry.target);
  });
},{ threshold: 0.25 });
const skillsSection = document.querySelector('#skills'); if(skillsSection) skillsObserver.observe(skillsSection);

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox?.querySelector('img');
const lbCaptionH = lightbox?.querySelector('.lb-caption h4');
const lbCaptionP = lightbox?.querySelector('.lb-caption p');
document.querySelectorAll('.gallery-link').forEach(link => {
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    const src = link.getAttribute('href');
    const caption = link.dataset.caption || '';
    const group = link.querySelector('.work-overlay p')?.textContent || '';
    if(lbImg) lbImg.src = src;
    if(lbCaptionH) lbCaptionH.textContent = caption;
    if(lbCaptionP) lbCaptionP.textContent = group;
    lightbox.classList.add('active'); lightbox.setAttribute('aria-hidden','false');
  });
});
document.querySelector('.lb-close')?.addEventListener('click', ()=>{ lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden','true'); });
lightbox?.addEventListener('click', (e)=>{ if(e.target === lightbox) { lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden','true'); } });

// Parallax effect (subtle)
window.addEventListener('scroll', ()=>{
  const parallax = document.querySelector('.works-parallax');
  if(!parallax) return;
  const scrolled = window.pageYOffset;
  parallax.style.backgroundPositionY = `${-scrolled * 0.08}px`;
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if(target){ e.preventDefault(); const offset = 70; const top = target.getBoundingClientRect().top + window.pageYOffset - offset; window.scrollTo({ top, behavior: 'smooth' }); if(nav?.classList.contains('active')) nav.classList.remove('active'); }
  });
});

// Year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
