document.documentElement.classList.add('js');

// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobile
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Bordure de la barre de navigation au défilement
const nav = document.querySelector('.nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });

// Lien actif selon la section visible
const links = [...menu.querySelectorAll('a:not(.nav-cta)')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// Texte animé du titre
const roles = ['Ingénieur Informatique et Réseaux', 'Étudiant en cybersécurité', 'Passionné d’automatisation et d’IoT'];
const typed = document.getElementById('typed');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) {
  typed.textContent = roles[0];
} else {
  let r = 0, i = 0, deleting = false;
  (function tick() {
    const word = roles[r];
    typed.textContent = word.slice(0, i);
    if (!deleting && i === word.length) { deleting = true; return setTimeout(tick, 1800); }
    if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; }
    i += deleting ? -1 : 1;
    setTimeout(tick, deleting ? 30 : 60);
  })();
}

// Apparition au défilement
const targets = document.querySelectorAll('.item, .card, .skill-block, .contact > *');
targets.forEach(t => t.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      const langs = e.target.querySelector('.langs');
      if (langs) langs.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .15 });
targets.forEach(t => io.observe(t));
