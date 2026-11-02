// Portfolio – mode édition + sauvegarde dans le navigateur
const STORAGE_KEY = "portfolio-beduneau-v1";

const content = document.getElementById("content");
const nom = document.getElementById("nom");
const btnEdit = document.getElementById("btn-edit");
let editing = false;

document.getElementById("year").textContent = new Date().getFullYear();

// Restauration des modifications faites dans ce navigateur
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const data = JSON.parse(saved);
    content.innerHTML = data.content;
    nom.textContent = data.nom;
  }
} catch (e) {
  console.warn("Lecture du stockage impossible :", e);
}

function save() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ content: content.innerHTML, nom: nom.textContent })
    );
  } catch (e) {
    console.warn("Sauvegarde impossible :", e);
  }
}

content.addEventListener("input", save);
nom.addEventListener("input", save);

// Lien actif dans la navigation
const links = [...document.querySelectorAll("nav a")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));
