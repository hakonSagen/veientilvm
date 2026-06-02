(() => {
  const WIDGET_SELECTOR = '[id^="pm-widget-sorloths-vm-reise"]';
  const WIDGET_CONFIG = {
    totalDistance: 6000,
    baseSpeed: 2.8,
    maxSpeed: 4.3,
    speedGrowth: 0.00007,
    distanceFactor: 0.92,
    gravity: 0.72,
    jumpPower: -12.2,
    groundY: 420,
    facts: [
      "Alexander Sørloth er fra Trøndelag.",
      "Det er omtrent 6 000 km fra Fosen til VM-arenaene i USA.",
      "Hvor mange kilometer klarer du å samle?",
      "Hver VM-pokal du tar med deg gir et nytt hopp mot USA.",
    ],
    landmarks: [
      { at: 0, label: "Rissa", color: "#4b8f4b" },
      { at: 900, label: "Ørland-basen", color: "#566573" },
      { at: 1800, label: "Trondheim", color: "#d17a22" },
      { at: 2900, label: "Norskehavet", color: "#2d7fb8" },
      { at: 4100, label: "Atlanteren", color: "#2d7fb8" },
      { at: 5200, label: "Islandsk luftrom", color: "#8c6bb1" },
      { at: 5600, label: "New York", color: "#7c4dff" },
      { at: 6000, label: "VM i USA", color: "#d62828" },
    ],
  };

  function formatNumber(value) {
    const safeValue = Number.isFinite(value) ? value : 0;
    return safeValue.toLocaleString("no-NO");
  }

  function initializeWidget(root, widgetIndex) {
    if (!root || root.dataset.widgetReady === "true") {
      return;
    }

    root.dataset.widgetReady = "true";
    if (widgetIndex > 0 || !root.id || !root.id.startsWith("pm-widget-sorloths-vm-reise")) {
      root.id = widgetIndex === 0 ? "pm-widget-sorloths-vm-reise" : `pm-widget-sorloths-vm-reise-${widgetIndex + 1}`;
    }

    const elements = {
      kmCount: root.querySelector('[data-role="km-count"]'),
      scoreCount: root.querySelector('[data-role="score-count"]'),
      speedCount: root.querySelector('[data-role="speed-count"]'),
      routeCopy: root.querySelector('[data-role="route-copy"]'),
      progressFill: root.querySelector('[data-role="progress-fill"]'),
      factBox: root.querySelector('[data-role="fact-box"]'),
      canvas: root.querySelector('[data-role="game-canvas"]'),
      startOverlay: root.querySelector('[data-role="start-overlay"]'),
      gameOverOverlay: root.querySelector('[data-role="game-over-overlay"]'),
      gameOverPanel: root.querySelector('[data-role="game-over-panel"]'),
      gameOverTitle: root.querySelector('[data-role="game-over-title"]'),
      gameOverText: root.querySelector('[data-role="game-over-text"]'),
      victoryBanner: root.querySelector('[data-role="victory-banner"]'),
      startButton: root.querySelector('[data-role="start-button"]'),
      restartButton: root.querySelector('[data-role="restart-button"]'),
      shareButton: root.querySelector('[data-role="share-button"]'),
    };

    if (!elements.canvas) {
      return;
    }

    const ctx = elements.canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const state = {
      running: false,
      gameOver: false,
      won: false,
      distance: 0,
      score: 0,
      speed: WIDGET_CONFIG.baseSpeed,
      lastTime: 0,
      obstacleTimer: 0,
      pickupTimer: 0,
      factTimer: 0,
      landmarkIndex: 0,
      backgroundShift: 0,
      player: {
        x: 96,
        y: 0,
        width: 74,
        height: 102,
        vy: 0,
        jumping: false,
      },
      obstacles: [],
      pickups: [],
      particles: [],
      fireworks: [],
    };

    function updateCanvasSize() {
      const width = Math.max(320, Math.min(960, Math.floor(root.clientWidth - 2)));
      const height = Math.floor(width * 0.5625);
      elements.canvas.width = width;
      elements.canvas.height = height;
    }

    function updateHud() {
      const remaining = Math.max(0, WIDGET_CONFIG.totalDistance - Math.floor(state.distance));
      if (elements.kmCount) {
        elements.kmCount.textContent = `${formatNumber(Math.floor(state.distance))} km`;
      }
      if (elements.scoreCount) {
        elements.scoreCount.textContent = formatNumber(state.score);
      }
      if (elements.speedCount) {
        elements.speedCount.textContent = `${(state.speed / WIDGET_CONFIG.baseSpeed).toLocaleString("no-NO", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}x`;
      }
      if (elements.routeCopy) {
        elements.routeCopy.textContent =
          `Du har kommet ${formatNumber(Math.floor(state.distance))} km. ` +
          `Det er ${formatNumber(remaining)} km igjen til USA.`;
      }
      if (elements.progressFill) {
        elements.progressFill.style.width = `${Math.min(100, (state.distance / WIDGET_CONFIG.totalDistance) * 100)}%`;
      }
    }

    function resetGame() {
      state.running = true;
      state.gameOver = false;
      state.won = false;
      state.distance = 0;
      state.score = 0;
      state.speed = WIDGET_CONFIG.baseSpeed;
      state.lastTime = 0;
      state.obstacleTimer = 0;
      state.pickupTimer = 0;
      state.factTimer = 0;
      state.landmarkIndex = 0;
      state.backgroundShift = 0;
      state.obstacles = [];
      state.pickups = [];
      state.particles = [];
      state.fireworks = [];
      state.player.y = WIDGET_CONFIG.groundY - state.player.height;
      state.player.vy = 0;
      state.player.jumping = false;

      if (elements.factBox) {
        elements.factBox.textContent = WIDGET_CONFIG.facts[0];
      }
      if (elements.victoryBanner) {
        elements.victoryBanner.classList.add("pmwv-hidden");
      }
      if (elements.gameOverPanel) {
        elements.gameOverPanel.classList.remove("pmwv-victory");
      }
      if (elements.startOverlay) {
        elements.startOverlay.classList.add("pmwv-hidden");
      }
      if (elements.gameOverOverlay) {
        elements.gameOverOverlay.classList.add("pmwv-hidden");
      }
      updateHud();
    }

    function jump() {
      if (!state.running || state.player.jumping) {
        return;
      }
      state.player.vy = WIDGET_CONFIG.jumpPower;
      state.player.jumping = true;
    }

    function spawnObstacle() {
      const variants = [
        { type: "cone", width: 36, height: 80, y: WIDGET_CONFIG.groundY - 80 },
        { type: "crate", width: 54, height: 46, y: WIDGET_CONFIG.groundY - 46 },
        { type: "tractor", width: 82, height: 52, y: WIDGET_CONFIG.groundY - 52 },
        { type: "fishrack", width: 52, height: 58, y: WIDGET_CONFIG.groundY - 58 },
        { type: "gull", width: 54, height: 34, y: WIDGET_CONFIG.groundY - 150 },
        { type: "wave", width: 70, height: 26, y: WIDGET_CONFIG.groundY - 20 },
      ];
      const obstacle = variants[Math.floor(Math.random() * variants.length)];
      state.obstacles.push({
        x: elements.canvas.width + 60,
        ...obstacle,
      });
    }

    function spawnPickup() {
      const goal = Math.random() > 0.82;
      state.pickups.push({
        x: elements.canvas.width + 50,
        y: goal ? WIDGET_CONFIG.groundY - 176 : WIDGET_CONFIG.groundY - 132 - Math.random() * 84,
        width: goal ? 50 : 42,
        height: goal ? 50 : 42,
        type: goal ? "goal" : "ball",
        value: goal ? 90 : 38 + Math.floor(Math.random() * 28),
        bob: Math.random() * Math.PI * 2,
      });
    }

    function addParticles(x, y, color, size) {
      for (let index = 0; index < 10; index += 1) {
        state.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 4,
          life: 30 + Math.random() * 18,
          color,
          size: size || 6,
        });
      }
    }

    function addConfettiBurst() {
      const colors = ["#b51f2a", "#2d7fb8", "#ffcf33", "#ffffff"];
      for (let index = 0; index < 44; index += 1) {
        state.particles.push({
          x: 120 + Math.random() * (elements.canvas.width - 240),
          y: -20 - Math.random() * 30,
          vx: (Math.random() - 0.5) * 3.2,
          vy: 1.2 + Math.random() * 2.4,
          life: 70 + Math.random() * 20,
          color: colors[index % colors.length],
          size: 5 + Math.random() * 4,
        });
      }
    }

    function launchFireworksBurst() {
      const originX = 120 + Math.random() * (elements.canvas.width - 240);
      const originY = 70 + Math.random() * 180;
      const colors = ["#ffcf33", "#b51f2a", "#ffffff", "#2d7fb8"];
      for (let index = 0; index < 26; index += 1) {
        const angle = (Math.PI * 2 * index) / 26;
        const speed = 2 + Math.random() * 3.6;
        state.fireworks.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 40 + Math.random() * 24,
          color: colors[index % colors.length],
          size: 2.5 + Math.random() * 2.5,
        });
      }
    }

    function rectsCollide(rectA, rectB) {
      return (
        rectA.x < rectB.x + rectB.width &&
        rectA.x + rectA.width > rectB.x &&
        rectA.y < rectB.y + rectB.height &&
        rectA.y + rectA.height > rectB.y
      );
    }

    function updateFacts() {
      state.factTimer += 1;
      if (state.factTimer % 240 === 0 && elements.factBox) {
        const factIndex = Math.floor((state.factTimer / 240) % WIDGET_CONFIG.facts.length);
        elements.factBox.textContent = WIDGET_CONFIG.facts[factIndex];
      }

      const nextLandmark = WIDGET_CONFIG.landmarks[state.landmarkIndex + 1];
      if (nextLandmark && state.distance >= nextLandmark.at) {
        state.landmarkIndex += 1;
        if (elements.factBox) {
          elements.factBox.textContent = `Du passerer ${nextLandmark.label}!`;
        }
      }
    }

    function endGame(won) {
      state.running = false;
      state.gameOver = true;
      state.won = won;

      if (elements.gameOverTitle) {
        elements.gameOverTitle.textContent = won ? "USA nådd!" : "Oi, der kom hindringen";
      }
      if (elements.gameOverText) {
        elements.gameOverText.textContent = won
          ? `Gratulerer! Du kom deg helt til USA og sikret plass i VM med ${formatNumber(state.score)} poeng.`
          : `Du samlet ${formatNumber(Math.floor(state.distance))} km og ${formatNumber(state.score)} poeng. Prøv igjen for å nå USA.`;
      }

      if (won) {
        if (elements.factBox) {
          elements.factBox.textContent = "Gratulerer! Du kom deg til VM.";
        }
        if (elements.victoryBanner) {
          elements.victoryBanner.classList.remove("pmwv-hidden");
        }
        if (elements.gameOverPanel) {
          elements.gameOverPanel.classList.add("pmwv-victory");
        }
        launchFireworksBurst();
        launchFireworksBurst();
        launchFireworksBurst();
        addConfettiBurst();
      } else {
        if (elements.victoryBanner) {
          elements.victoryBanner.classList.add("pmwv-hidden");
        }
        if (elements.gameOverPanel) {
          elements.gameOverPanel.classList.remove("pmwv-victory");
        }
      }

      if (elements.gameOverOverlay) {
        elements.gameOverOverlay.classList.remove("pmwv-hidden");
      }
    }

    function update(delta) {
      if (!state.running) {
        draw();
        return;
      }

      state.backgroundShift += state.speed * delta * 0.7;
      state.speed = Math.min(
        WIDGET_CONFIG.maxSpeed,
        state.speed + WIDGET_CONFIG.speedGrowth * delta * 60
      );
      state.distance = Math.min(
        WIDGET_CONFIG.totalDistance,
        state.distance + state.speed * WIDGET_CONFIG.distanceFactor * delta
      );

      state.player.vy += WIDGET_CONFIG.gravity * delta * 1.2;
      state.player.y += state.player.vy * delta * 1.2;

      if (state.player.y >= WIDGET_CONFIG.groundY - state.player.height) {
        state.player.y = WIDGET_CONFIG.groundY - state.player.height;
        state.player.vy = 0;
        state.player.jumping = false;
      }

      state.obstacleTimer += delta;
      state.pickupTimer += delta;

      if (state.obstacleTimer > Math.max(84, 164 - state.speed * 5.2)) {
        spawnObstacle();
        state.obstacleTimer = 0;
      }

      if (state.pickupTimer > Math.max(34, 72 - state.speed * 2.8)) {
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
          state.distance = Math.min(WIDGET_CONFIG.totalDistance, state.distance + pickup.value);
          addParticles(pickup.x, pickup.y, "#b51f2a");
          if (elements.factBox) {
            elements.factBox.textContent = "MÅL! Bonuspoeng og ekstra kilometer.";
          }
        } else {
          state.score += 75;
          state.distance = Math.min(WIDGET_CONFIG.totalDistance, state.distance + pickup.value);
          addParticles(pickup.x, pickup.y, "#ffd166");
          if (elements.factBox) {
            elements.factBox.textContent = "VM-pokal plukket opp. Reisen fortsetter.";
          }
        }
        return false;
      });

      updateFacts();
      updateHud();

      if (state.distance >= WIDGET_CONFIG.totalDistance) {
        endGame(true);
      }

      draw();
    }

    function drawBackground() {
      const shift = state.backgroundShift % elements.canvas.width;
      ctx.fillStyle = "#89d0ff";
      ctx.fillRect(0, 0, elements.canvas.width, elements.canvas.height);

      for (let index = -1; index < 3; index += 1) {
        const x = index * elements.canvas.width - shift;

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
        ctx.fillRect(x, WIDGET_CONFIG.groundY, elements.canvas.width, elements.canvas.height - WIDGET_CONFIG.groundY);

        ctx.fillStyle = "#78c86f";
        ctx.fillRect(x, WIDGET_CONFIG.groundY - 34, elements.canvas.width, 34);

        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(x, WIDGET_CONFIG.groundY + 18, elements.canvas.width, 14);
        ctx.fillStyle = "#c73333";
        for (let stripeIndex = 0; stripeIndex < 8; stripeIndex += 1) {
          ctx.fillRect(x + stripeIndex * 120 + 35, WIDGET_CONFIG.groundY + 21, 48, 8);
        }
      }

      drawLandmark();
      drawBackdropLandmarks();
    }

    function drawLandmark() {
      const current = WIDGET_CONFIG.landmarks[state.landmarkIndex];
      if (!current) {
        return;
      }

      ctx.save();
      ctx.translate(elements.canvas.width * 0.75, 280);

      if (current.label === "Rissa") {
        ctx.fillStyle = "#fff2cc";
        ctx.fillRect(-40, -40, 80, 80);
        ctx.fillStyle = "#b51f2a";
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
        ctx.fillStyle = "#b51f2a";
        ctx.fillRect(-70, -38, 140, 76);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-16, -16, 32, 32);
      }

      ctx.fillStyle = current.color;
      ctx.font = 'bold 24px var(--font-system, "Trebuchet MS", sans-serif)';
      ctx.textAlign = "center";
      ctx.fillText(current.label, 0, 90);
      ctx.restore();
    }

    function drawBackdropLandmarks() {
      if (state.distance < 1200) {
        drawRissaBackdrop(elements.canvas.width * 0.66, 275);
      } else if (state.distance < 2600) {
        drawTrondheimBackdrop(elements.canvas.width * 0.7, 270);
      } else if (state.distance < 4800) {
        drawOceanBackdrop(elements.canvas.width * 0.73, 280);
      } else {
        drawUsaBackdrop(elements.canvas.width * 0.7, 265);
      }
    }

    function drawRissaBackdrop(x, y) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "#f4ead0";
      ctx.fillRect(-68, -34, 136, 68);
      ctx.fillStyle = "#b51f2a";
      ctx.fillRect(-12, -58, 24, 26);
      ctx.fillStyle = "#8b5e3c";
      ctx.fillRect(-52, 6, 104, 28);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-34, -10, 18, 18);
      ctx.fillRect(16, -10, 18, 18);
      ctx.restore();
    }

    function drawTrondheimBackdrop(x, y) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "#b76d2a";
      ctx.fillRect(-18, -96, 36, 110);
      ctx.fillStyle = "#cc8438";
      ctx.fillRect(-58, -18, 116, 22);
      ctx.fillStyle = "#d8a15d";
      ctx.fillRect(-10, -122, 20, 30);
      ctx.restore();
    }

    function drawOceanBackdrop(x, y) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "#2d7fb8";
      ctx.beginPath();
      ctx.arc(0, 0, 62, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#dff6ff";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-90, 30);
      ctx.quadraticCurveTo(-28, 4, 28, 28);
      ctx.quadraticCurveTo(68, 46, 108, 18);
      ctx.stroke();
      ctx.restore();
    }

    function drawUsaBackdrop(x, y) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "#606a73";
      ctx.fillRect(-68, -28, 26, 88);
      ctx.fillRect(-28, -66, 32, 126);
      ctx.fillRect(18, -40, 30, 100);
      ctx.fillStyle = "#9ea7af";
      ctx.fillRect(56, -98, 10, 158);
      ctx.fillStyle = "#b51f2a";
      ctx.fillRect(-86, 50, 172, 10);
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
      ctx.font = 'bold 10px var(--font-system, "Trebuchet MS", sans-serif)';
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
        ctx.fillStyle = "#b51f2a";
        ctx.fillRect(10, 16, 46, 24);
        ctx.fillRect(38, 0, 26, 24);
        ctx.fillStyle = "#9fd3ff";
        ctx.fillRect(44, 4, 14, 12);
        ctx.fillStyle = "#14213d";
        ctx.beginPath();
        ctx.arc(22, 46, 10, 0, Math.PI * 2);
        ctx.arc(58, 44, 8, 0, Math.PI * 2);
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
        ctx.fillStyle = "#b51f2a";
        ctx.fillRect(6, 0, 28, 18);
      } else {
        ctx.shadowColor = "rgba(255, 214, 64, 0.75)";
        ctx.shadowBlur = 16;
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
        ctx.shadowBlur = 0;
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
      ctx.fillRect(0, WIDGET_CONFIG.groundY, elements.canvas.width, 6);
      ctx.fillStyle = "#2f5a2f";
      for (let index = 0; index < 18; index += 1) {
        const x = (index * 68 - state.backgroundShift * 1.8) % (elements.canvas.width + 80);
        ctx.fillRect(x, WIDGET_CONFIG.groundY + 42, 14, 34);
      }
    }

    function draw() {
      ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
      drawBackground();
      drawGroundDetails();
      state.obstacles.forEach(drawObstacle);
      state.pickups.forEach(drawPickup);
      drawPlayer();
      drawParticles();
      drawFireworks();
    }

    function shareScore() {
      const shareText = state.won
        ? `Jeg kom meg til VM i Sørloths VM-reise og sikret ${formatNumber(state.score)} poeng. Klarer du det samme?`
        : `Jeg kom ${formatNumber(Math.floor(state.distance))} km på vei mot VM i USA og fikk ${formatNumber(state.score)} poeng i Sørloths VM-reise. Klarer du mer?`;

      if (navigator.share) {
        navigator
          .share({
            title: "Sørloths VM-reise",
            text: shareText,
            url: window.location.href,
          })
          .catch(() => {});
        return;
      }

      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
          if (elements.shareButton) {
            elements.shareButton.textContent = "Resultatet er kopiert";
            window.setTimeout(() => {
              if (elements.shareButton) {
                elements.shareButton.textContent = "Del resultat";
              }
            }, 1800);
          }
        });
      }
    }

    function handleKeyboardAction(event) {
      if (event.code !== "Space" && event.code !== "ArrowUp") {
        return;
      }
      event.preventDefault();
      if (state.gameOver) {
        resetGame();
      } else {
        jump();
      }
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
      window.requestAnimationFrame(frame);
    }

    if (elements.startButton) {
      elements.startButton.addEventListener("click", resetGame);
    }
    if (elements.restartButton) {
      elements.restartButton.addEventListener("click", resetGame);
    }
    if (elements.shareButton) {
      elements.shareButton.addEventListener("click", shareScore);
    }
    elements.canvas.addEventListener("pointerdown", () => {
      if (state.gameOver) {
        resetGame();
      } else if (state.running) {
        jump();
      }
    });
    root.addEventListener("keydown", handleKeyboardAction);
    window.addEventListener("resize", updateCanvasSize);

    updateCanvasSize();
    updateHud();
    draw();
    window.requestAnimationFrame(frame);
  }

  const roots = Array.from(document.querySelectorAll(WIDGET_SELECTOR));
  roots.forEach((root, index) => {
    initializeWidget(root, index);
  });
})();
