"use strict";

const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector("#contact-form");

document.querySelector("#year").textContent = String(new Date().getFullYear());

function setTheme(theme) {
  body.classList.toggle("dark", theme === "dark");
  themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "dark" ? "#070a13" : "#090b1a");
}

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(savedTheme || preferredTheme);

const galaxyCanvas = document.querySelector("#galaxy-canvas");
const galaxyContext = galaxyCanvas.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let galaxyWidth = 0;
let galaxyHeight = 0;
let galaxyFrame = 0;
let galaxyStars = [];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function resizeGalaxy() {
  const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
  galaxyWidth = window.innerWidth;
  galaxyHeight = window.innerHeight;
  galaxyCanvas.width = Math.round(galaxyWidth * ratio);
  galaxyCanvas.height = Math.round(galaxyHeight * ratio);
  galaxyCanvas.style.width = `${galaxyWidth}px`;
  galaxyCanvas.style.height = `${galaxyHeight}px`;
  galaxyContext.setTransform(ratio, 0, 0, ratio, 0, 0);

  const starCount = Math.min(115, Math.round((galaxyWidth * galaxyHeight) / 9500));
  galaxyStars = Array.from({ length: starCount }, () => ({
    x: Math.random() * galaxyWidth,
    y: Math.random() * galaxyHeight,
    radius: randomBetween(.35, 1.5),
    phase: randomBetween(0, Math.PI * 2),
    speed: randomBetween(.4, 1.4),
  }));
}

function drawMoon(ctx, x, y, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = "#d1c9ff88";
  ctx.shadowBlur = size * .85;
  const moon = ctx.createRadialGradient(-size * .34, -size * .38, size * .08, 0, 0, size);
  moon.addColorStop(0, "#fffdf1");
  moon.addColorStop(.58, "#e9e7f2");
  moon.addColorStop(1, "#aaaec9");
  ctx.fillStyle = moon;
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, size * .94, 0, Math.PI * 2);
  ctx.clip();
  const craters = [
    [-.4, -.31, .15], [.25, -.45, .11], [.47, -.08, .17],
    [-.12, .02, .22], [-.46, .39, .1], [.28, .46, .14],
    [.04, -.69, .06], [.66, .39, .07],
  ];
  craters.forEach(([cx, cy, radius]) => {
    ctx.fillStyle = "#a7abc164";
    ctx.beginPath();
    ctx.arc(cx * size, cy * size, radius * size, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff85";
    ctx.lineWidth = Math.max(1, size * .025);
    ctx.beginPath();
    ctx.arc(cx * size - radius * size * .08, cy * size - radius * size * .08, radius * size * .77, Math.PI * 1.05, Math.PI * 1.85);
    ctx.stroke();
  });
  ctx.restore();

  ctx.strokeStyle = "#ffffff55";
  ctx.lineWidth = Math.max(1, size * .035);
  ctx.beginPath();
  ctx.arc(0, 0, size * .98, -.8, 2.3);
  ctx.stroke();
  ctx.restore();
}

function drawGalaxy(time) {
  galaxyContext.clearRect(0, 0, galaxyWidth, galaxyHeight);
  galaxyStars.forEach((star) => {
    const twinkle = reducedMotion.matches ? .7 : .36 + (Math.sin(time * .001 * star.speed + star.phase) + 1) * .28;
    galaxyContext.globalAlpha = twinkle;
    galaxyContext.fillStyle = "#dce3ff";
    galaxyContext.beginPath();
    galaxyContext.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    galaxyContext.fill();
  });
  galaxyContext.globalAlpha = 1;
  drawMoon(galaxyContext, galaxyWidth - 53, 116, galaxyWidth < 600 ? 25 : 31);

  if (!reducedMotion.matches && !document.hidden) {
    galaxyFrame = window.requestAnimationFrame(drawGalaxy);
  }
}

function startGalaxy() {
  window.cancelAnimationFrame(galaxyFrame);
  drawGalaxy(performance.now());
}

window.addEventListener("resize", () => {
  resizeGalaxy();
  startGalaxy();
}, { passive: true });
document.addEventListener("visibilitychange", () => {
  if (document.hidden) window.cancelAnimationFrame(galaxyFrame);
  else startGalaxy();
});
if (typeof reducedMotion.addEventListener === "function") {
  reducedMotion.addEventListener("change", startGalaxy);
}
resizeGalaxy();
startGalaxy();

themeToggle.addEventListener("click", () => {
  const nextTheme = body.classList.contains("dark") ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const fields = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio message from ${fields.get("name")}`);
  const message = encodeURIComponent(`Name: ${fields.get("name")}\nEmail: ${fields.get("email")}\n\n${fields.get("message")}`);
  window.location.href = `mailto:somasekhar0806@gmail.com?subject=${subject}&body=${message}`;
});
