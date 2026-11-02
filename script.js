// Carnet de compétences – mode édition + sauvegarde dans le navigateur
const STORAGE_KEY = "carnet-ing4-v1";

const content = document.getElementById("content");
const nom = document.getElementById("nom");
const btnEdit = document.getElementById("btn-edit");
let editing = false;

// Restauration des données sauvegardées
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

// Sauvegarde
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

// Bouton Modifier / Terminer
btnEdit.addEventListener("click", () => {
  editing = !editing;
  content.contentEditable = editing;
  nom.contentEditable = editing;
  document.body.classList.toggle("edit", editing);
  btnEdit.textContent = editing ? "💾 Terminer" : "✏️ Modifier";
  if (!editing) save();
});

content.addEventListener("input", save);
nom.addEventListener("input", save);
