// CONFIG — edit these values
const CONFIG = {
  cashapp: "$Jfern3000",
  btc: "1DG4pvfEgjoNoLKNxzX29v1FSF8fa2xUbk",
  whatsapp: "14155984726",
  formspree: "https://formspree.io/f/YOUR_FORM_ID"
};

// ─── HAMBURGER ───────────────────────────────
document.querySelector(".hamburger")?.addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach(a =>
  a.addEventListener("click", () => document.querySelector(".nav-links").classList.remove("open"))
);

// ─── PARTICLES CANVAS ────────────────────────
(function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x % W, p.y % H, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,197,24,${p.o})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── SCROLL REVEAL ───────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ─── COPY BUTTONS ────────────────────────────
document.querySelectorAll("[data-copy]").forEach(btn => {
  btn.addEventListener("click", () => {
    const val = CONFIG[btn.dataset.copy] || btn.dataset.copy;
    navigator.clipboard.writeText(val).then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
      btn.classList.add("copied");
      setTimeout(() => { btn.innerHTML = orig; btn.classList.remove("copied"); }, 2000);
    });
  });
});

// Populate addresses
document.querySelectorAll("[data-val]").forEach(el => {
  el.textContent = CONFIG[el.dataset.val] || el.textContent;
});

// ─── PRICING → SCROLL TO VERIFY & PRE-SELECT ─
document.querySelectorAll("[data-plan]").forEach(btn => {
  btn.addEventListener("click", () => {
    const plan = btn.dataset.plan;
    const select = document.getElementById("plan-select");
    if (select) select.value = plan;
    document.getElementById("verify")?.scrollIntoView({ behavior: "smooth" });
  });
});

// ─── PAYMENT METHOD CONDITIONAL FIELDS ───────
const pmRadios = document.querySelectorAll('input[name="paymentMethod"]');
function updateConditional() {
  const val = document.querySelector('input[name="paymentMethod"]:checked')?.value;
  document.getElementById("field-cashapp").style.display = val === "cashapp" ? "block" : "none";
  document.getElementById("field-btc").style.display = val === "bitcoin" ? "block" : "none";
}
pmRadios.forEach(r => r.addEventListener("change", updateConditional));
updateConditional();

// ─── VERIFY FORM SUBMIT ───────────────────────
const verifyForm = document.getElementById("verify-form");
if (verifyForm) {
  verifyForm.addEventListener("submit", async e => {
    e.preventDefault();
    const btn = document.getElementById("submit-btn");
    const success = document.getElementById("form-success");
    const error = document.getElementById("form-error");

    btn.disabled = true; btn.textContent = "Verifying...";
    error.classList.remove("show");

    const file = document.getElementById("screenshot-file")?.files[0];
    let body, headers = {};

    if (file) {
      const fd = new FormData(verifyForm);
      body = fd;
    } else {
      const fd = new FormData(verifyForm);
      const data = {};
      fd.forEach((v, k) => { data[k] = v; });
      body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    }

    try {
      const res = await fetch(CONFIG.formspree, { method: "POST", headers, body });
      if (!res.ok) throw new Error();
      verifyForm.style.display = "none";
      success.classList.add("show");
    } catch {
      error.classList.add("show");
      btn.disabled = false; btn.textContent = "Verify Payment";
    }
  });
}

// ─── CONTACT FORM SUBMIT ──────────────────────
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async e => {
    e.preventDefault();
    const btn = contactForm.querySelector("button[type=submit]");
    const success = document.getElementById("contact-success");
    const error = document.getElementById("contact-error");

    btn.disabled = true; btn.textContent = "Sending...";
    error?.classList.remove("show");

    const data = {};
    new FormData(contactForm).forEach((v, k) => { data[k] = v; });

    try {
      const res = await fetch(CONFIG.formspree, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error();
      contactForm.reset();
      success.classList.add("show");
    } catch {
      error?.classList.add("show");
    } finally {
      btn.disabled = false; btn.textContent = "Send Message";
    }
  });
}

// ─── FAQ ACCORDION ────────────────────────────
document.querySelectorAll(".faq-item").forEach(item => {
  item.querySelector(".faq-q").addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// ─── WHATSAPP BUTTON ─────────────────────────
document.querySelectorAll(".wa-btn").forEach(btn => {
  btn.href = `https://wa.me/${CONFIG.whatsapp}`;
});
