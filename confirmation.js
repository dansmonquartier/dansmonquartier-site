// À remplacer par le lien TestFlight public une fois généré dans App Store
// Connect (ou le lien App Store, une fois l'app publiée).
const LIEN_TELECHARGEMENT = "https://dansmonquartier.online";

const params = new URLSearchParams(window.location.search);
const codeParrainage = (params.get("ref") || "").trim();

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
    await supabaseClient.rpc("appliquer_parrainage", { p_code: codeParrainage });
  }

  afficher(etatSucces);
});

// Si aucune session ne s'établit après un délai raisonnable (lien déjà
// utilisé, expiré, ou ouvert sans les paramètres de confirmation), on
// bascule sur l'état d'erreur plutôt que de laisser "Un instant…" indéfiniment.
setTimeout(() => {
  if (!traite) afficher(etatErreur);
}, 6000);
