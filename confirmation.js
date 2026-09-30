const LIEN_TELECHARGEMENT = "https://apps.apple.com/fr/app/dans-mon-quartier/id6801119263";

// Lu depuis localStorage (posé par rejoindre.js), pas depuis l'URL — voir
// le commentaire dans rejoindre.js sur la correspondance stricte de
// Supabase pour emailRedirectTo.
const codeParrainage = localStorage.getItem("dmq_ref") || "";

const etatChargement = document.getElementById("etat-chargement");
const etatSucces = document.getElementById("etat-succes");
const etatErreur = document.getElementById("etat-erreur");

document.getElementById("lien-app").href = LIEN_TELECHARGEMENT;

function afficher(etat) {
  etatChargement.style.display = "none";
  etatSucces.style.display = "none";
  etatErreur.style.display = "none";
  etat.style.display = "block";
  etat.classList.add("in");
}

let traite = false;

supabaseClient.auth.onAuthStateChange(async (event, session) => {
  if (traite || !session) return;
  if (event !== "SIGNED_IN" && event !== "INITIAL_SESSION") return;
  traite = true;

  if (codeParrainage) {
    const { error } = await supabaseClient.rpc("appliquer_parrainage", { p_code: codeParrainage });
    if (error) console.error("appliquer_parrainage a échoué :", error.message);
    localStorage.removeItem("dmq_ref");
  }

  afficher(etatSucces);
});

// Si aucune session ne s'établit après un délai raisonnable (lien déjà
// utilisé, expiré, ou ouvert sans les paramètres de confirmation), on
// bascule sur l'état d'erreur plutôt que de laisser "Un instant…" indéfiniment.
setTimeout(() => {
  if (!traite) afficher(etatErreur);
}, 6000);
