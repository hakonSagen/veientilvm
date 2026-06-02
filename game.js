const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const kmCount = document.getElementById("kmCount");
const scoreCount = document.getElementById("scoreCount");
const speedCount = document.getElementById("speedCount");
const routeCopy = document.getElementById("routeCopy");
const progressFill = document.getElementById("progressFill");
const factBox = document.getElementById("factBox");
const startOverlay = document.getElementById("startOverlay");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const gameOverTitle = document.getElementById("gameOverTitle");
const gameOverText = document.getElementById("gameOverText");
const victoryBanner = document.getElementById("victoryBanner");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const shareButton = document.getElementById("shareButton");
const gameOverPanel = gameOverOverlay.querySelector(".overlay-panel");

const TOTAL_DISTANCE = 6000;
const facts = [
  "Alexander Sørloth er fra Trøndelag.",
  "Det er omtrent 6 000 km fra Fosen til VM-arenaene i USA.",
  "Hvor mange kilometer klarer du å samle?",
  "Hver VM-pokal du tar med deg gir et nytt hopp mot USA.",
];

const landmarks = [
  { at: 0, label: "Rissa", color: "#4b8f4b" },
  { at: 900, label: "Ørland-basen", color: "#566573" },
  { at: 1800, label: "Trondheim", color: "#d17a22" },
  { at: 2900, label: "Norskehavet", color: "#2d7fb8" },
  { at: 4100, label: "Atlanteren", color: "#2d7fb8" },
  { at: 5200, label: "Islandsk luftrom", color: "#8c6bb1" },
  { at: 5600, label: "New York", color: "#7c4dff" },
  { at: 6000, label: "VM i USA", color: "#d62828" },
];

const state = {
  running: false,
  gameOver: false,
  distance: 0,
  score: 0,
  speed: 3.6,
  gravity: 0.72,
  jumpPower: -12.2,
  groundY: 420,
  lastTime: 0,
  obstacleTimer: 0,
  pickupTimer: 0,
  factTimer: 0,
  landmarkIndex: 0,
  backgroundShift: 0,
  player: {
    x: 96,
    y: 0,
    width: 62,
    height: 86,
    vy: 0,
    jumping: false,
  },
  obstacles: [],
  pickups: [],
  particles: [],
  fireworks: [],
  won: false,
};

function resetGame() {
  state.running = true;
  state.gameOver = false;
  state.distance = 0;
  state.score = 0;
  state.speed = 3.6;
  state.obstacleTimer = 0;
  state.pickupTimer = 0;
  state.factTimer = 0;
  state.landmarkIndex = 0;
  state.backgroundShift = 0;
  state.obstacles = [];
  state.pickups = [];
  state.particles = [];
  state.fireworks = [];
  state.won = false;
  state.player.y = state.groundY - state.player.height;
  state.player.vy = 0;
  state.player.jumping = false;
  state.lastTime = 0;
  factBox.textContent = facts[0];
  victoryBanner.classList.add("hidden");
  gameOverPanel.classList.remove("victory");
  startOverlay.classList.add("hidden");
  gameOverOverlay.classList.add("hidden");
  updateHud();
}

function jump() {
  if (!state.running || state.player.jumping) {
    return;
  }
  state.player.vy = state.jumpPower;
  state.player.jumping = true;
}

function endGame(won) {
  state.running = false;
  state.gameOver = true;
  state.won = won;
  gameOverTitle.textContent = won ? "USA nådd!" : "Oi, der kom hindringen";
  gameOverText.textContent = won
    ? `Gratulerer! Du kom deg helt til USA og sikret plass i VM med ${state.score} poeng.`
    : `Du samlet ${Math.floor(state.distance)} km og ${state.score} poeng. Prøv igjen for å nå USA.`;
  if (won) {
    factBox.textContent = "Gratulerer! Du kom deg til VM.";
    victoryBanner.classList.remove("hidden");
    gameOverPanel.classList.add("victory");
    launchFireworksBurst();
    launchFireworksBurst();
    launchFireworksBurst();
    addConfettiBurst();
  } else {
    victoryBanner.classList.add("hidden");
    gameOverPanel.classList.remove("victory");
  }
  gameOverOverlay.classList.remove("hidden");
}

function updateHud() {
  const remaining = Math.max(0, TOTAL_DISTANCE - Math.floor(state.distance));
  kmCount.textContent = `${Math.floor(state.distance)} km`;
  scoreCount.textContent = `${state.score}`;
  speedCount.textContent = `${(state.speed / 3.6).toFixed(1)}x`;
  routeCopy.textContent = `Du har kommet ${Math.floor(state.distance)} km. Det er ${remaining} km igjen til USA.`;
  progressFill.style.width = `${Math.min(100, (state.distance / TOTAL_DISTANCE) * 100)}%`;
}

function spawnObstacle() {
  const variants = [
    { type: "cone", width: 36, height: 80, y: state.groundY - 80 },
    { type: "crate", width: 54, height: 46, y: state.groundY - 46 },
    { type: "tractor", width: 82, height: 52, y: state.groundY - 52 },
    { type: "fishrack", width: 52, height: 58, y: state.groundY - 58 },
    { type: "gull", width: 54, height: 34, y: state.groundY - 150 },
    { type: "wave", width: 70, height: 26, y: state.groundY - 20 },
  ];
  const obstacle = variants[Math.floor(Math.random() * variants.length)];
  state.obstacles.push({
    x: canvas.width + 60,
    ...obstacle,
  });
}

function spawnPickup() {
  const goal = Math.random() > 0.72;
  state.pickups.push({
    x: canvas.width + 50,
    y: goal ? state.groundY - 176 : state.groundY - 138 - Math.random() * 72,
    width: goal ? 50 : 42,
    height: goal ? 50 : 42,
    type: goal ? "goal" : "ball",
    value: goal ? 110 : 45 + Math.floor(Math.random() * 40),
    bob: Math.random() * Math.PI * 2,
  });
}

function addParticles(x, y, color) {
  for (let i = 0; i < 10; i += 1) {
    state.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: -Math.random() * 4,
      life: 30 + Math.random() * 18,
      color,
    });
  }
}

function launchFireworksBurst() {
  const originX = 120 + Math.random() * (canvas.width - 240);
  const originY = 70 + Math.random() * 180;
  const colors = ["#ffcf33", "#d62828", "#ffffff", "#2d7fb8"];
  for (let i = 0; i < 26; i += 1) {
    const angle = (Math.PI * 2 * i) / 26;
    const speed = 2 + Math.random() * 3.6;
    state.fireworks.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 40 + Math.random() * 24,
      color: colors[i % colors.length],
      size: 2.5 + Math.random() * 2.5,
    });
  }
}

function addConfettiBurst() {
  const colors = ["#d62828", "#2d7fb8", "#ffcf33", "#ffffff"];
  for (let i = 0; i < 44; i += 1) {
    state.particles.push({
      x: 120 + Math.random() * (canvas.width - 240),
      y: -20 - Math.random() * 30,
      vx: (Math.random() - 0.5) * 3.2,
      vy: 1.2 + Math.random() * 2.4,
      life: 70 + Math.random() * 20,
      color: colors[i % colors.length],
      size: 5 + Math.random() * 4,
    });
  }
}

function rectsCollide(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function updateFacts() {
  state.factTimer += 1;
  if (state.factTimer % 240 === 0) {
    const factIndex = Math.floor((state.factTimer / 240) % facts.length);
    factBox.textContent = facts[factIndex];
  }

  const nextLandmark = landmarks[state.landmarkIndex + 1];
  if (nextLandmark && state.distance >= nextLandmark.at) {
    state.landmarkIndex += 1;
    factBox.textContent = `Du passerer ${nextLandmark.label}!`;
  }
}

function update(delta) {
  if (!state.running) {
    draw();
    return;
  }

  state.backgroundShift += state.speed * delta * 0.7;
  state.speed = Math.min(6.2, state.speed + 0.00012 * delta * 60);
  state.distance = Math.min(TOTAL_DISTANCE, state.distance + state.speed * 1.05 * delta);

  state.player.vy += state.gravity * delta * 1.2;
  state.player.y += state.player.vy * delta * 1.2;

  if (state.player.y >= state.groundY - state.player.height) {
    state.player.y = state.groundY - state.player.height;
    state.player.vy = 0;
    state.player.jumping = false;
  }

  state.obstacleTimer += delta;
  state.pickupTimer += delta;

  if (state.obstacleTimer > Math.max(72, 144 - state.speed * 5.4)) {
    spawnObstacle();
    state.obstacleTimer = 0;
  }

  if (state.pickupTimer > Math.max(66, 132 - state.speed * 4.8)) {
    spawnPickup();
    state.pickupTimer = 0;
  }

  state.obstacles.forEach((obstacle) => {
    obstacle.x -= state.speed * 6 * delta;
  });

  state.pickups.forEach((pickup) => {
    pickup.x -= state.speed * 6 * delta;
    if (pickup.type !== "goal") {
      pickup.bob += 0.08 * delta;
    }
  });

  state.particles.forEach((particle) => {
    particle.x += particle.vx * delta * 1.4;
    particle.y += particle.vy * delta * 1.4;
    particle.vy += 0.12 * delta;
    particle.life -= delta;
  });

  state.fireworks.forEach((particle) => {
    particle.x += particle.vx * delta * 1.8;
    particle.y += particle.vy * delta * 1.8;
    particle.vy += 0.08 * delta;
    particle.life -= delta;
  });

  state.obstacles = state.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -20);
  state.pickups = state.pickups.filter((pickup) => pickup.x + pickup.width > -20);
  state.particles = state.particles.filter((particle) => particle.life > 0);
  state.fireworks = state.fireworks.filter((particle) => particle.life > 0);

  for (const obstacle of state.obstacles) {
    if (rectsCollide(state.player, obstacle)) {
      endGame(false);
      break;
    }
  }

  state.pickups = state.pickups.filter((pickup) => {
    if (!rectsCollide(state.player, pickup)) {
      return true;
    }

    if (pickup.type === "goal") {
      state.score += 250;
      state.distance = Math.min(TOTAL_DISTANCE, state.distance + pickup.value);
      addParticles(pickup.x, pickup.y, "#d62828");
      factBox.textContent = "MÅL! Bonuspoeng og ekstra kilometer.";
    } else {
      state.score += 75;
      state.distance = Math.min(TOTAL_DISTANCE, state.distance + pickup.value);
      addParticles(pickup.x, pickup.y, "#ffd166");
      factBox.textContent = "VM-pokal plukket opp. Reisen fortsetter.";
    }
    return false;
  });

  updateFacts();
  updateHud();

  if (state.distance >= TOTAL_DISTANCE) {
    endGame(true);
  }

  draw();
}

function drawBackground() {
  const shift = state.backgroundShift % canvas.width;

  ctx.fillStyle = "#89d0ff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = -1; i < 3; i += 1) {
    const x = i * canvas.width - shift;

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x + 180, 90, 32, Math.PI, Math.PI * 2);
    ctx.arc(x + 220, 90, 38, Math.PI, Math.PI * 2);
    ctx.arc(x + 258, 94, 30, Math.PI, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#8db8d8";
    ctx.beginPath();
    ctx.moveTo(x + 40, 300);
    ctx.lineTo(x + 170, 170);
    ctx.lineTo(x + 280, 300);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#6f9ebf";
    ctx.beginPath();
    ctx.moveTo(x + 220, 300);
    ctx.lineTo(x + 360, 140);
    ctx.lineTo(x + 500, 300);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#56a45a";
    ctx.fillRect(x, state.groundY, canvas.width, canvas.height - state.groundY);

    ctx.fillStyle = "#78c86f";
    ctx.fillRect(x, state.groundY - 34, canvas.width, 34);

    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(x, state.groundY + 18, canvas.width, 14);
    ctx.fillStyle = "#c73333";
    for (let j = 0; j < 8; j += 1) {
      ctx.fillRect(x + j * 120 + 35, state.groundY + 21, 48, 8);
    }
  }

  drawLandmark();
}

function drawLandmark() {
  const current = landmarks[state.landmarkIndex];
  ctx.save();
  ctx.translate(720, 280);

  if (current.label === "Rissa") {
    ctx.fillStyle = "#fff2cc";
    ctx.fillRect(-40, -40, 80, 80);
    ctx.fillStyle = "#d62828";
    ctx.fillRect(-10, -68, 20, 28);
  } else if (current.label === "Ørland-basen") {
    ctx.fillStyle = "#8a8f98";
    ctx.fillRect(-65, -16, 130, 32);
    ctx.beginPath();
    ctx.moveTo(-18, -30);
    ctx.lineTo(70, 0);
    ctx.lineTo(-18, 30);
    ctx.closePath();
    ctx.fill();
  } else if (current.label === "Trondheim") {
    ctx.fillStyle = "#c77d36";
    ctx.fillRect(-20, -90, 40, 100);
    ctx.fillStyle = "#aa662b";
    ctx.fillRect(-55, -20, 110, 24);
  } else if (current.label === "Atlanteren") {
    ctx.fillStyle = "#2d7fb8";
    ctx.beginPath();
    ctx.arc(0, 0, 66, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#dff2ff";
    ctx.fillRect(-90, 30, 180, 10);
  } else if (current.label === "New York") {
    ctx.fillStyle = "#5c6670";
    ctx.fillRect(-60, -20, 24, 78);
    ctx.fillRect(-22, -58, 30, 116);
    ctx.fillRect(22, -34, 28, 92);
  } else {
    ctx.fillStyle = "#d62828";
    ctx.fillRect(-70, -38, 140, 76);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-16, -16, 32, 32);
  }

  ctx.fillStyle = current.color;
  ctx.font = 'bold 24px "Trebuchet MS", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(current.label, 0, 90);
  ctx.restore();
}

function drawPlayer() {
  const { x, y, width, height } = state.player;

  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "#efc29b";
  ctx.beginPath();
  ctx.arc(width * 0.5, 18, 17, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f4c542";
  ctx.fillRect(width * 0.25, 32, width * 0.5, 10);

  ctx.fillStyle = "#ba1e2d";
  ctx.beginPath();
  ctx.moveTo(width * 0.18, 42);
  ctx.lineTo(width * 0.32, 38);
  ctx.lineTo(width * 0.68, 38);
  ctx.lineTo(width * 0.82, 42);
  ctx.lineTo(width * 0.78, 68);
  ctx.lineTo(width * 0.22, 68);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ba1e2d";
  ctx.beginPath();
  ctx.moveTo(width * 0.18, 43);
  ctx.lineTo(width * 0.08, 56);
  ctx.lineTo(width * 0.16, 63);
  ctx.lineTo(width * 0.28, 52);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(width * 0.82, 43);
  ctx.lineTo(width * 0.92, 56);
  ctx.lineTo(width * 0.84, 63);
  ctx.lineTo(width * 0.72, 52);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(width * 0.43, 40, 7, 28);
  ctx.fillRect(width * 0.18, 48.5, width * 0.64, 7);

  ctx.fillStyle = "#1f4f99";
  ctx.fillRect(width * 0.448, 40, 3, 28);
  ctx.fillRect(width * 0.18, 50.5, width * 0.64, 3);

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(width * 0.4, 38);
  ctx.lineTo(width * 0.5, 48);
  ctx.lineTo(width * 0.6, 38);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#1d4e89";
  ctx.fillRect(width * 0.24, 68, width * 0.22, 13);
  ctx.fillRect(width * 0.54, 68, width * 0.22, 13);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(width * 0.24, 81, 9, 8);
  ctx.fillRect(width * 0.61, 81, 9, 8);

  ctx.strokeStyle = "#14213d";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(width * 0.34, 80);
  ctx.lineTo(width * 0.22, height - 6);
  ctx.moveTo(width * 0.66, 80);
  ctx.lineTo(width * 0.76, height - 6);
  ctx.moveTo(width * 0.13, 54);
  ctx.lineTo(-4, 74);
  ctx.moveTo(width * 0.87, 54);
  ctx.lineTo(width + 4, 70);
  ctx.stroke();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.08, 56);
  ctx.lineTo(width * 0.16, 63);
  ctx.moveTo(width * 0.92, 56);
  ctx.lineTo(width * 0.84, 63);
  ctx.stroke();

  ctx.fillStyle = "#14213d";
  ctx.fillRect(width * 0.26, height - 8, 16, 8);
  ctx.fillRect(width * 0.66, height - 8, 16, 8);

  ctx.fillStyle = "#ffffff";
  ctx.font = 'bold 10px "Trebuchet MS", sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("9", width * 0.5, 64);

  ctx.restore();
}

function drawObstacle(obstacle) {
  ctx.save();
  ctx.translate(obstacle.x, obstacle.y);

  if (obstacle.type === "cone") {
    ctx.fillStyle = "#f28c28";
    ctx.beginPath();
    ctx.moveTo(obstacle.width / 2, 0);
    ctx.lineTo(obstacle.width, obstacle.height);
    ctx.lineTo(0, obstacle.height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(7, obstacle.height - 28, obstacle.width - 14, 8);
  } else if (obstacle.type === "crate") {
    ctx.fillStyle = "#8d5524";
    ctx.fillRect(0, 0, obstacle.width, obstacle.height);
    ctx.strokeStyle = "#603813";
    ctx.strokeRect(4, 4, obstacle.width - 8, obstacle.height - 8);
  } else if (obstacle.type === "tractor") {
    ctx.fillStyle = "#d62828";
    ctx.fillRect(10, 16, 46, 24);
    ctx.fillRect(38, 0, 26, 24);
    ctx.fillStyle = "#9fd3ff";
    ctx.fillRect(44, 4, 14, 12);
    ctx.fillStyle = "#14213d";
    ctx.beginPath();
    ctx.arc(22, 46, 10, 0, Math.PI * 2);
    ctx.arc(58, 44, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f1f1f1";
    ctx.beginPath();
    ctx.arc(22, 46, 4, 0, Math.PI * 2);
    ctx.arc(58, 44, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (obstacle.type === "fishrack") {
    ctx.strokeStyle = "#7b5c3d";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(10, obstacle.height);
    ctx.lineTo(18, 4);
    ctx.lineTo(34, obstacle.height);
    ctx.moveTo(42, obstacle.height);
    ctx.lineTo(34, 4);
    ctx.lineTo(18, obstacle.height);
    ctx.stroke();
    ctx.fillStyle = "#d9d2bf";
    ctx.beginPath();
    ctx.ellipse(20, 24, 7, 12, 0.3, 0, Math.PI * 2);
    ctx.ellipse(33, 28, 7, 12, -0.2, 0, Math.PI * 2);
    ctx.fill();
  } else if (obstacle.type === "gull") {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(2, 18);
    ctx.quadraticCurveTo(14, 4, 26, 18);
    ctx.quadraticCurveTo(40, 2, 52, 18);
    ctx.stroke();
    ctx.fillStyle = "#f7c948";
    ctx.fillRect(24, 18, 8, 4);
  } else if (obstacle.type === "wave") {
    ctx.fillStyle = "#46a6de";
    ctx.beginPath();
    ctx.moveTo(0, obstacle.height);
    ctx.quadraticCurveTo(16, 4, 30, 16);
    ctx.quadraticCurveTo(44, 0, 58, 12);
    ctx.quadraticCurveTo(66, 16, obstacle.width, 6);
    ctx.lineTo(obstacle.width, obstacle.height);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#dff6ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(10, 18);
    ctx.quadraticCurveTo(22, 10, 34, 18);
    ctx.quadraticCurveTo(48, 10, 60, 16);
    ctx.stroke();
  }

  ctx.restore();
}

function drawPickup(pickup) {
  ctx.save();
  const bobOffset = pickup.type === "goal" ? 0 : Math.sin(pickup.bob) * 6;
  ctx.translate(pickup.x, pickup.y + bobOffset);

  if (pickup.type === "goal") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(34, 10, 6, 48);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 22, 36, 28);
    ctx.fillStyle = "#d62828";
    ctx.fillRect(6, 0, 28, 18);
  } else {
    ctx.shadowColor = "rgba(255, 214, 64, 0.75)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = "#f7d44c";
    ctx.beginPath();
    ctx.ellipse(pickup.width * 0.52, pickup.height * 0.22, 10, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(pickup.width * 0.34, pickup.height * 0.34);
    ctx.quadraticCurveTo(pickup.width * 0.5, pickup.height * 0.18, pickup.width * 0.66, pickup.height * 0.34);
    ctx.lineTo(pickup.width * 0.58, pickup.height * 0.66);
    ctx.quadraticCurveTo(pickup.width * 0.5, pickup.height * 0.76, pickup.width * 0.42, pickup.height * 0.66);
    ctx.closePath();
    ctx.fill();

    ctx.fillRect(pickup.width * 0.44, pickup.height * 0.64, pickup.width * 0.12, pickup.height * 0.14);
    ctx.fillRect(pickup.width * 0.34, pickup.height * 0.78, pickup.width * 0.32, pickup.height * 0.1);

    ctx.strokeStyle = "#c59a16";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pickup.width * 0.38, pickup.height * 0.39);
    ctx.quadraticCurveTo(pickup.width * 0.5, pickup.height * 0.3, pickup.width * 0.62, pickup.height * 0.39);
    ctx.moveTo(pickup.width * 0.44, pickup.height * 0.5);
    ctx.lineTo(pickup.width * 0.56, pickup.height * 0.5);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255, 248, 208, 0.9)";
    ctx.beginPath();
    ctx.arc(pickup.width * 0.38, pickup.height * 0.18, 2.5, 0, Math.PI * 2);
    ctx.arc(pickup.width * 0.64, pickup.height * 0.28, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawParticles() {
  state.particles.forEach((particle) => {
    ctx.globalAlpha = Math.max(0, particle.life / 45);
    ctx.fillStyle = particle.color;
    ctx.fillRect(particle.x, particle.y, particle.size || 6, particle.size || 6);
  });
  ctx.globalAlpha = 1;
}

function drawFireworks() {
  state.fireworks.forEach((particle) => {
    ctx.globalAlpha = Math.max(0, particle.life / 54);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function drawGroundDetails() {
  ctx.fillStyle = "#3a7b39";
  ctx.fillRect(0, state.groundY, canvas.width, 6);

  ctx.fillStyle = "#2f5a2f";
  for (let i = 0; i < 18; i += 1) {
    const x = (i * 68 - state.backgroundShift * 1.8) % (canvas.width + 80);
    ctx.fillRect(x, state.groundY + 42, 14, 34);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawGroundDetails();
  state.obstacles.forEach(drawObstacle);
  state.pickups.forEach(drawPickup);
  drawPlayer();
  drawParticles();
  drawFireworks();
}

function frame(time) {
  if (!state.lastTime) {
    state.lastTime = time;
  }
  const delta = Math.min(1.6, (time - state.lastTime) / 16.6667);
  state.lastTime = time;
  if (state.gameOver && state.won && state.fireworks.length < 18 && Math.random() > 0.94) {
    launchFireworksBurst();
  }
  update(delta);
  requestAnimationFrame(frame);
}

function shareScore() {
  const text = state.won
    ? `Jeg kom meg til VM i Sørloths VM-reise og sikret ${state.score} poeng. Klarer du det samme?`
    : `Jeg kom ${Math.floor(state.distance)} km på vei mot VM i USA og fikk ${state.score} poeng i Sørloths VM-reise. Klarer du mer?`;
  if (navigator.share) {
    navigator
      .share({
        title: "Sørloths VM-reise",
        text,
        url: window.location.href,
      })
      .catch(() => {});
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      shareButton.textContent = "Resultatet er kopiert";
      setTimeout(() => {
        shareButton.textContent = "Del resultat";
      }, 1800);
    });
  }
}

startButton.addEventListener("click", resetGame);
restartButton.addEventListener("click", resetGame);
shareButton.addEventListener("click", shareScore);

window.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    event.preventDefault();
    if (state.gameOver) {
      resetGame();
    } else {
      jump();
    }
  }
});

canvas.addEventListener("pointerdown", () => {
  if (state.gameOver) {
    resetGame();
  } else if (state.running) {
    jump();
  }
});

draw();
requestAnimationFrame(frame);
