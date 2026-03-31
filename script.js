// Cursor
const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// Magnetic buttons
document.querySelectorAll(".btn").forEach(btn=>{
  btn.addEventListener("mousemove",(e)=>{
    const rect=btn.getBoundingClientRect();
    const x=e.clientX-rect.left-rect.width/2;
    const y=e.clientY-rect.top-rect.height/2;
    btn.style.transform=`translate(${x*0.2}px,${y*0.2}px)`;
  });
  btn.addEventListener("mouseleave",()=>{
    btn.style.transform="translate(0,0)";
  });
});
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// MORE particles but controlled
for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    size: Math.random() * 3 + 2
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    // bounce edges
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    // pulse size
    let pulse = Math.sin(Date.now() * 0.003) * 1;
    let size = p.size + pulse;

    // GRADIENT GLOW
    let gradient = ctx.createRadialGradient(
      p.x, p.y, 0,
      p.x, p.y, size * 4
    );
    gradient.addColorStop(0, "#a855f7");
    gradient.addColorStop(0.5, "#6366f1");
    gradient.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  });

  // CONNECTING LINES
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 140) {
        let opacity = 1 - dist / 140;

        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);

        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
        ctx.lineWidth = 1.2;

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#a855f7";

        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();

// responsive
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
gradient.addColorStop(0, "#a855f7");  // purple
gradient.addColorStop(0.5, "#6366f1"); // blue

// Particles
particlesJS("particles-js", {
  particles: {
    number: { value: 25 },   // 🔽 less particles = clean look
    color: { value: "#ffffff" },
    shape: { type: "circle" },

    opacity: {
      value: 0.2,            // 🔥 very soft
      random: true
    },

    size: {
      value: 4,
      random: true
    },

    move: {
      enable: true,
      speed: 0.6,            // 🧘 slow movement
      direction: "none",
      out_mode: "out"
    },

    line_linked: {
      enable: false          // ❌ no lines → clean UI
    }
  },

  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"      // gentle push effect
      }
    },
    modes: {
      repulse: {
        distance: 80
      }
    }
  }
});