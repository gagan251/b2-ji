// Mobile menu
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(open));

  const bars = burger.querySelectorAll("span");
  if (open) {
    bars[0].style.transform = "translateY(7px) rotate(45deg)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "translateY(-7px) rotate(-45deg)";
  } else {
    bars[0].style.transform = "";
    bars[1].style.opacity = "";
    bars[2].style.transform = "";
  }
});

document.querySelectorAll(".mobile a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    const bars = burger.querySelectorAll("span");
    bars[0].style.transform = "";
    bars[1].style.opacity = "";
    bars[2].style.transform = "";
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
}, { threshold: 0.15 });
reveals.forEach(el => io.observe(el));

// Count up
function countUp(el, to) {
  const t0 = performance.now();
  const dur = 900;
  function tick(t) {
    const p = Math.min((t - t0) / dur, 1);
    const val = Math.floor(to * (p * (2 - p)));
    el.textContent = val;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

let done = false;
const hero = document.getElementById("home");
const nums = document.querySelectorAll(".num[data-count]");

const heroObs = new IntersectionObserver((entries) => {
  if (done) return;
  entries.forEach(e => {
    if (e.isIntersecting) {
      done = true;
      nums.forEach(n => countUp(n, Number(n.dataset.count || 0)));
    }
  });
}, { threshold: 0.3 });
hero && heroObs.observe(hero);

// Tilt effect
const tilt = document.getElementById("tiltCard");
if (tilt) {
  const max = 10;
  tilt.addEventListener("mousemove", (e) => {
    const r = tilt.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tilt.style.transform = `perspective(900px) rotateX(${-py * max * 2}deg) rotateY(${px * max * 2}deg) translateY(-2px)`;
  });
  tilt.addEventListener("mouseleave", () => {
    tilt.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  });
}

// Coming soon button
document.getElementById("notifyBtn")?.addEventListener("click", () => {
  alert("✅ Thanks! Courses will be available soon.");
});

// Contact form demo
const form = document.getElementById("contactForm");
const hint = document.getElementById("hint");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  hint.textContent = "✅ Message saved (frontend demo). Backend later.";
  form.reset();
  setTimeout(() => hint.textContent = "", 3500);
});
