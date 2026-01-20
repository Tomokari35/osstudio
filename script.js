// Scroll reveal
const elements = document.querySelectorAll("section, .card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach(el => observer.observe(el));

// Rotating typing text
const texts = [
  "Créateurs",
  "Développeurs",
  "Os'Studio",
  "Discord Expert",
  "Groupe"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typing");

function typeLoop() {
  const current = texts[textIndex];

  if (!isDeleting) {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      setTimeout(() => isDeleting = true, 1200);
    }
  } else {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 50 : 90);
}

typeLoop();

// Cursor
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

const chatSection = document.getElementById("chat");

if (chatSection) {
  const chatObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  chatObserver.observe(chatSection);
}

// glow supplémentaire
const glow = document.createElement("div");
glow.classList.add("cursor-glow");
cursor.appendChild(glow);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Floating windows
function openWindow(type) {
  const container = document.getElementById("window-container");

  const content = {
    site: { title: "Site Web", desc: "Site design moderne avec animations et expérience premium." },
    discord: { title: "Bot Discord", desc: "Bot automatique et performant en Python pour Discord." },
    future: { title: "Projet Futur", desc: "Projet en développement, bientôt disponible !" }
  };

  const win = document.createElement("div");
  win.classList.add("window");

  win.innerHTML = `
    <span class="close-btn">&times;</span>
    <h3>${content[type].title}</h3>
    <p>${content[type].desc}</p>
  `;

  container.appendChild(win);

  // Animation
  setTimeout(() => win.classList.add("show"), 50);

  // Close
  win.querySelector(".close-btn").addEventListener("click", () => {
    win.classList.remove("show");
    setTimeout(() => win.remove(), 300);
  });
}

// Typing effect
const text = "Créateur • Développeur • Passionné";
let index = 0;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typing").textContent += text.charAt(index);
    index++;
    setTimeout(typeEffect, 70);
  }
}

typeEffect();

// Scroll reveal pour PayPal
const paypalSection = document.getElementById("paypal");
const paypalObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});
paypalObserver.observe(paypalSection);

// Easter egg secret
const secret = "osto";
let buffer = "";

document.addEventListener("keydown", e => {
  buffer += e.key.toLowerCase();
  buffer = buffer.slice(-secret.length);

  if (buffer === secret) {
    const egg = document.getElementById("easter-egg");
    egg.classList.add("show");

    setTimeout(() => {
      egg.classList.remove("show");
    }, 2000);
  }
});

// Theme toggle
const toggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  toggle.textContent = isLight ? "☀️" : "🌙";

  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  document.body.style.overflow = "hidden";

  // Attend que la barre de chargement CSS se termine
  setTimeout(() => {
    loader.classList.add("hide"); // déclenche fade-out
    setTimeout(() => {
      loader.remove(); // supprime du DOM
      document.body.style.overflow = "auto"; // réactive le scroll
    }, 800); // doit correspondre à la transition CSS fade-out
  }, 2300); // correspond à la durée de la barre de chargement
});
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;

  document.body.style.overflow = "hidden";

  // Attend que la barre de chargement CSS se termine
  setTimeout(() => {
    loader.classList.add("hide"); // déclenche fade-out
    setTimeout(() => {
      loader.remove(); // supprime du DOM
      document.body.style.overflow = "auto"; // réactive le scroll
    }, 800); // doit correspondre à la transition CSS fade-out
  }, 2300); // correspond à la durée de la barre de chargement
});




// 3D hover effect
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;

    card.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: ["#a855f7", "#3b82f6"] },
    size: { value: 3 },
    move: { speed: 1.2 },
    line_linked: {
      enable: true,
      color: "#a855f7",
      opacity: 0.3
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      grab: { distance: 150, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  }
});

document.querySelectorAll(".btn, .card, .window .close-btn").forEach(el => {
  el.addEventListener("click", e => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = e.clientX + "px";
    particle.style.top = e.clientY + "px";
    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 600);
  });
});

document.addEventListener("keydown", e => {
  buffer += e.key.toLowerCase();
  buffer = buffer.slice(-secret.length);

  if(buffer === secret){
    const header = document.querySelector("header h1");
    header.classList.add("glitch");
    setTimeout(() => header.classList.remove("glitch"), 1000);
  }
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-bar").style.width = scrolled + "%";
});

// Animate skill bars
document.querySelectorAll(".skill-bar span").forEach(span => {
  span.style.setProperty('--width', span.style.width);
});

// FAQ accordion
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    const open = document.querySelector(".faq-item.open");
    if(open && open !== item) open.classList.remove("open");
    item.classList.toggle("open");
  });
});

// Scroll reveal pour testimonials, blog et stats
const extraElements = document.querySelectorAll(".testimonial, .blog-card, .stat");

const extraObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

extraElements.forEach(el => extraObserver.observe(el));
extraElements.forEach(el => extraObserver.observe(el));

// Scroll reveal pour roadmap
const events = document.querySelectorAll(".event");
const eventObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});
events.forEach(ev => eventObserver.observe(ev));

// Scroll reveal pour awards
const awards = document.querySelectorAll(".award");
const awardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});
awards.forEach(a => awardObserver.observe(a));

const messages = [
  { user: "Alice", content: "Super site ! 😍" },
  { user: "Bob", content: "J'adore tes projets Discord 🚀" },
  { user: "Charlie", content: "Hâte de voir le futur projet 🎮" }
];

const dynamicContainer = document.querySelector(".testimonials-dynamic-container");

messages.forEach(msg => {
  const div = document.createElement("div");
  div.classList.add("dynamic-message");
  div.innerHTML = `<h4>${msg.user}</h4><p>${msg.content}</p>`;
  dynamicContainer.appendChild(div);
});

const dynamicMessages = document.querySelectorAll(".dynamic-message");
const messageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});