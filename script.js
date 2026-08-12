const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 4, 3) * 90}ms`;
  observer.observe(el);
});

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.style.boxShadow = window.scrollY > 8 ? "0 8px 24px -12px rgba(0,0,0,0.5)" : "none";
});

const form = document.getElementById("signup-form");
const note = document.getElementById("form-note");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    note.textContent = "Merci ! On te prévient dès que c'est prêt.";
    form.reset();
  });
}
