// Edit these values when the real project and contact URLs are ready.
const portfolioConfig = {
  links: {
    jobGithub: "https://github.com/yashpatle19/minor-project-job-recommendation-clean", jobDemo: "", netsageGithub: "", netsageDemo: "",
    stockGithub: "", stockDemo: "", nidsGithub: "", nidsDemo: "",
    email: "yashpatle19@gmail.com", linkedin: "https://www.linkedin.com/in/yash-kumar-patle-68b870282/", github: "https://github.com/yashpatle19"
  },
  resumePath: "assets/Resume.pdf"
};

const profilesScreen = document.querySelector("#profiles");
const site = document.querySelector("#site");
const profileCards = [...document.querySelectorAll(".profile-card")];
const introModal = document.querySelector("#intro-modal");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

function enterPortfolio(target = "home") {
  profilesScreen.hidden = true;
  site.hidden = false;
  requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" }));
}

profileCards.forEach((card) => {
  card.addEventListener("click", () => enterPortfolio(card.dataset.target));
});

document.querySelector(".back-profiles").addEventListener("click", () => {
  if (introModal.open) introModal.close();
  site.hidden = true;
  profilesScreen.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  profileCards[0].focus({ preventScroll: true });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target || target === profilesScreen) return;
    if (link.id === "resume-download" && !link.dataset.ready) {
      event.preventDefault();
      return;
    }
    if (!site.hidden) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

document.querySelectorAll("[data-project-link]").forEach((link) => {
  const url = portfolioConfig.links[link.dataset.projectLink];
  if (url) link.href = url;
  else {
    link.classList.add("unconfigured");
    link.removeAttribute("target");
    link.setAttribute("aria-disabled", "true");
    link.textContent = "Link pending verification";
    link.title = "This project link has not been verified";
    link.addEventListener("click", (event) => event.preventDefault());
  }
});

document.querySelectorAll("[data-contact]").forEach((link) => {
  const value = portfolioConfig.links[link.dataset.contact];
  if (value) link.href = link.dataset.contact === "email" ? `mailto:${value}` : value;
  else {
    link.classList.add("unconfigured");
    link.removeAttribute("target");
    link.setAttribute("aria-disabled", "true");
    link.title = "Add your contact detail in script.js to enable this link";
    link.addEventListener("click", (event) => event.preventDefault());
  }
});

const resumeLink = document.querySelector("#resume-download");
fetch(portfolioConfig.resumePath, { method: "HEAD" })
  .then((response) => {
    if (!response.ok) return;
    resumeLink.href = portfolioConfig.resumePath;
    resumeLink.download = "Yash-Patle-Resume.pdf";
    resumeLink.dataset.ready = "true";
    document.querySelector("#resume-note").textContent = "PDF resume is ready to download.";
  })
  .catch(() => {
    // Live Server provides HEAD support. If opened as a file, the visible setup note remains.
  });

document.querySelector("#play-intro").addEventListener("click", () => {
  introModal.showModal();
  document.body.classList.add("modal-open");
  introModal.querySelector(".modal-close").focus();
});
function closeIntro() {
  document.body.classList.remove("modal-open");
}
introModal.addEventListener("close", closeIntro);
introModal.querySelector(".modal-close").addEventListener("click", () => introModal.close());
introModal.addEventListener("click", (event) => {
  if (event.target === introModal) introModal.close();
});
introModal.querySelector(".modal-explore").addEventListener("click", () => introModal.close());

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".row-scroll").forEach((button) => {
  button.addEventListener("click", () => {
    const row = document.getElementById(button.dataset.row);
    row.scrollBy({ left: Number(button.dataset.dir) * Math.min(row.clientWidth * 0.82, 620), behavior: "smooth" });
  });
});

// Advance the featured projects a card at a time; stop while someone is interacting.
const projectTrack = document.querySelector("#project-track");
const projectCards = [...projectTrack.children];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let pauseCarousel = false;
let touchPauseUntil = 0;

function advanceProjects() {
  if (reducedMotion.matches || document.hidden || pauseCarousel || Date.now() < touchPauseUntil) return;
  const maxScroll = projectTrack.scrollWidth - projectTrack.clientWidth;
  if (projectTrack.scrollLeft >= maxScroll - 12) {
    projectTrack.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }

  const cardWidth = projectCards[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(projectTrack).gap) || 0;
  projectTrack.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
}

if (projectCards.length > 1) {
  window.setInterval(advanceProjects, 5000);
  projectTrack.addEventListener("pointerenter", () => { pauseCarousel = true; });
  projectTrack.addEventListener("pointerleave", () => { pauseCarousel = false; });
  projectTrack.addEventListener("focusin", () => { pauseCarousel = true; });
  projectTrack.addEventListener("focusout", (event) => {
    if (!projectTrack.contains(event.relatedTarget)) pauseCarousel = false;
  });
  projectTrack.addEventListener("touchstart", () => { touchPauseUntil = Date.now() + 8000; }, { passive: true });
}

const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.hash === `#${visible.target.id}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-24% 0px -62% 0px", threshold: [0, 0.15, 0.4] });
  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  // When the first profile is focused, arrow keys let keyboard users move across cards.
  const index = profileCards.indexOf(document.activeElement);
  if (index < 0 || !["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? index + 1 : index - 1;
  profileCards[(next + profileCards.length) % profileCards.length].focus();
});
