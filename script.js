// ===== Dark / Light theme =====
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

function getSavedTheme() {
  try { return localStorage.getItem("theme"); } catch { return null; }
}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.setAttribute("data-theme", getSavedTheme() || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch {}
});

// ===== Mobile menu =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ===== Navbar border on scroll + active link =====
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);

  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.querySelectorAll("a").forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`)
  );
});

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(
  ".section-title, .about-grid, .skill-card, .project-card, .timeline-item, .podcast-card, .sub-title, .course-card, .repo-card, .info-card, .publication, .contact-cards, .contact-form"
);
revealEls.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

// ===== Contact form (opens the visitor's email app) =====
const MY_EMAIL = "fbinashfaq@gmail.com";

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
  window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
