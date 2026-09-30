// "ref", pas "code" : Supabase ajoute son propre paramètre ?code= à l'URL
// de retour après confirmation d'email (flow PKCE) — les deux entreraient
// en collision si on utilisait le même nom.
const params = new URLSearchParams(window.location.search);
const codeParrainage = (params.get("ref") || "").trim();

const form = document.getElementById("join-form");
const note = document.getElementById("join-note");
const submitBtn = document.getElementById("join-submit");

function afficherNote(message, estErreur) {
  note.textContent = message;
  note.classList.toggle("join-note-erreur", Boolean(estErreur));
}

if (!codeParrainage) {
  afficherNote("Ce lien de parrainage semble invalide ou incomplet.", true);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const prenom = document.getElementById("prenom").value.trim();
  const nom = document.getElementById("nom").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  submitBtn.disabled = true;
  submitBtn.textContent = "Création en cours…";
  afficherNote("", false);

  // Le code de parrainage passe par localStorage plutôt que par l'URL de
  // redirection : Supabase compare emailRedirectTo à la liste blanche du
  // dashboard de façon stricte, un ?ref=... collé dessus suffit à casser
  // la correspondance et à faire retomber le lien de confirmation sur le
  // Site URL par défaut (localhost:3000) au lieu de confirmation.html.
  if (codeParrainage) localStorage.setItem("dmq_ref", codeParrainage);

  const redirectUrl = new URL("confirmation.html", window.location.href);

  const { error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: { prenom, nom },
      emailRedirectTo: redirectUrl.toString(),
    },
  });

  if (error) {
    submitBtn.disabled = false;
    submitBtn.textContent = "Créer mon compte";
    afficherNote(
      error.message.includes("already registered")
        ? "Un compte existe déjà avec cet email — connecte-toi directement dans l'app."
        : "Une erreur est survenue, réessaie.",
      true
    );
    return;
  }

  form.style.display = "none";
  afficherNote("Vérifie tes emails pour confirmer ton compte, puis télécharge l'app et connecte-toi avec le même email et mot de passe.", false);
});
