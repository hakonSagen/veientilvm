(() => {
  const WIDGET_SELECTOR = '[id^="pm-widget-sorloths-vm-reise"]';
  const WIDGET_CONFIG = {
    totalDistance: 6500,
    baseSpeed: 2.2,
    maxSpeed: 3.25,
    speedGrowth: 0.000035,
    distanceFactor: 0.78,
    gravity: 0.72,
    jumpPower: -13.2,
    groundY: 420,
    facts: [
      "Alexander Sørloth er fra Trondelag og jages mot VM 2026.",
      "VM 2026 spilles i USA, Canada og Mexico.",
      "Fosen sender Sorloth videre mot Nord-Amerika.",
      "Bonusobjekter gir store hopp pa veien mot VM.",
    ],
    milestones: [
      { at: 0, label: "Rissa", stage: "fosen", color: "#4b8f4b" },
      { at: 500, label: "Brekstad", stage: "fosen", color: "#4b8f4b" },
      { at: 1200, label: "Trondheim", stage: "city", color: "#d17a22" },
      { at: 2400, label: "Norskehavet", stage: "ocean", color: "#2d7fb8" },
      { at: 3400, label: "Island", stage: "island", color: "#6f83c0" },
      { at: 4300, label: "Gronland", stage: "ice", color: "#7db8c6" },
      { at: 5100, label: "Newfoundland", stage: "canada", color: "#5e87b7" },
      { at: 5850, label: "New York", stage: "usa", color: "#7c4dff" },
      { at: 6500, label: "VM 2026", stage: "finale", color: "#d62828" },
    ],
    pickupTypes: [
      {
        type: "ball",
        label: "VM-ball",
        value: 52,
        score: 42,
        rarity: 8,
        minY: 0,
        maxY: 58,
        stages: ["all"],
        message: "VM-ballen triller videre mot Nord-Amerika!",
      },
      {
        type: "flag",
        label: "Norsk flagg",
        value: 58,
        score: 48,
        rarity: 6,
        minY: 12,
        maxY: 82,
        stages: ["all"],
        message: "Fosen sender Sorloth videre!",
      },
      {
        type: "ticket",
        label: "VM-billett",
        value: 72,
        score: 60,
        rarity: 5,
        minY: 12,
        maxY: 84,
        stages: ["all"],
        message: "Sorloth finner flybilletten!",
      },
      {
        type: "passport",
        label: "Pass",
        value: 68,
        score: 64,
        rarity: 5,
        minY: 18,
        maxY: 88,
        stages: ["all"],
        message: "Passkontrollen er i boks.",
      },
      {
        type: "map",
        label: "Rutekart",
        value: 84,
        score: 62,
        rarity: 4,
        minY: 20,
        maxY: 80,
        stages: ["all"],
        message: "Ruta Fosen-VM er spikret.",
      },
      {
        type: "statue",
        label: "Mini-Frihetsgudinne",
        value: 88,
        score: 72,
        rarity: 4,
        minY: 18,
        maxY: 82,
        stages: ["america", "finale", "usa", "canada"],
        message: "New York vinker fra horisonten!",
      },
      {
        type: "hotdog",
        label: "Hotdog",
        value: 64,
        score: 56,
        rarity: 4,
        minY: 24,
        maxY: 90,
        stages: ["america", "usa", "finale"],
        message: "USA-tempo med hotdog i handa.",
      },
      {
        type: "pretzel",
        label: "Pretzel",
        value: 60,
        score: 55,
        rarity: 4,
        minY: 20,
        maxY: 90,
        stages: ["america", "usa", "finale"],
        message: "Pretzel plukket opp. Reisen fortsetter.",
      },
      {
        type: "trophy",
        label: "VM-pokal",
        value: 135,
        score: 120,
        rarity: 3,
        minY: 6,
        maxY: 72,
        stages: ["all"],
        message: "VM-pokal plukket opp. Malkongen er pa vei!",
      },
      {
        type: "rocket",
        label: "Rakettbonus",
        value: 500,
        score: 150,
        rarity: 2,
        minY: 12,
        maxY: 68,
        stages: ["all"],
        message: "Rakett aktivert! 500 km ekstra.",
      },
      {
        type: "stadium",
        label: "VM-stadion",
        value: 180,
        score: 140,
        rarity: 2,
        minY: 12,
        maxY: 78,
        stages: ["canada", "usa", "finale"],
        message: "VM-stadion i sikte!",
        finalToken: true,
      },
      {
        type: "directFlight",
        label: "Direktefly",
        value: 260,
        score: 135,
        rarity: 2,
        minY: 16,
        maxY: 64,
        stages: ["ocean", "island", "ice", "america", "finale"],
        message: "Direktefly aktivert!",
      },
      {
        type: "hattrick",
        label: "Hat-trick-bonus",
        value: 210,
        score: 180,
        rarity: 1,
        minY: 8,
        maxY: 56,
        stages: ["city", "america", "finale"],
        message: "Hat-trick-bonus! Ny kontrakt med USA!",
        finalToken: true,
      },
      {
        type: "jersey",
        label: "Landslagstroye",
        value: 155,
        score: 132,
        rarity: 2,
        minY: 12,
        maxY: 70,
        stages: ["all"],
        message: "Landslagstroya blafrer videre.",
        finalToken: true,
      },
    ],
    obstacleTypes: [
      {
        type: "raincloud",
        label: "trondersk regnsky",
        width: 86,
        height: 52,
        y: 244,
        rarity: 4,
        stages: ["fosen", "city"],
        message: "Oi! Sorloth traff en trondersk regnsky.",
        hitbox: { x: 10, y: 10, width: 64, height: 24 },
      },
      {
        type: "wave",
        label: "atlanterhavsbolge",
        width: 92,
        height: 34,
        y: 386,
        rarity: 6,
        stages: ["ocean", "island", "ice"],
        message: "Store bolger stoppet framdriften.",
        hitbox: { x: 8, y: 10, width: 74, height: 18 },
      },
      {
        type: "roadwork",
        label: "veiarbeid",
        width: 74,
        height: 58,
        y: 362,
        rarity: 5,
        stages: ["fosen", "city"],
        message: "Veiarbeid pa Fosen satte en stopper.",
        hitbox: { x: 8, y: 18, width: 58, height: 30 },
      },
      {
        type: "gull",
        label: "sint make",
        width: 64,
        height: 38,
        y: 252,
        rarity: 5,
        stages: ["fosen", "ocean"],
        message: "Oi! Sorloth traff en sint make.",
        hitbox: { x: 8, y: 8, width: 48, height: 18 },
      },
      {
        type: "suitcase",
        label: "mistet koffert",
        width: 54,
        height: 44,
        y: 376,
        rarity: 4,
        stages: ["city", "ocean", "canada", "usa"],
        message: "Den mista kofferten la seg rett i lopa.",
        hitbox: { x: 6, y: 10, width: 42, height: 28 },
      },
      {
        type: "ferry",
        label: "ferje",
        width: 90,
        height: 42,
        y: 378,
        rarity: 3,
        stages: ["fosen", "ocean"],
        message: "Ferja gikk akkurat.",
        hitbox: { x: 8, y: 12, width: 72, height: 20 },
      },
      {
        type: "defender",
        label: "forsvarsspiller",
        width: 58,
        height: 72,
        y: 348,
        rarity: 3,
        stages: ["city", "usa", "finale"],
        message: "Forsvareren satte inn en sklitakling.",
        hitbox: { x: 12, y: 28, width: 34, height: 36 },
      },
      {
        type: "redcard",
        label: "rodt kort",
        width: 34,
        height: 58,
        y: 350,
        rarity: 3,
        stages: ["city", "usa", "finale"],
        message: "Dommeren dro rett opp det rode kortet.",
        hitbox: { x: 6, y: 10, width: 22, height: 34 },
      },
      {
        type: "yellowcard",
        label: "gult kort",
        width: 34,
        height: 58,
        y: 350,
        rarity: 3,
        stages: ["city", "usa", "finale"],
        message: "Gult kort og full stopp.",
        hitbox: { x: 6, y: 10, width: 22, height: 34 },
      },
      {
        type: "thunder",
        label: "tordenvaer",
        width: 72,
        height: 72,
        y: 238,
        rarity: 3,
        stages: ["ocean", "island", "ice"],
        message: "Tordenvaeret over Atlanteren ble for voldsomt.",
        hitbox: { x: 16, y: 18, width: 36, height: 36 },
      },
      {
        type: "tractor",
        label: "traktor",
        width: 78,
        height: 52,
        y: 368,
        rarity: 3,
        stages: ["fosen"],
        message: "Traktoren tok hele fylkesveien.",
        hitbox: { x: 8, y: 12, width: 62, height: 30 },
      },
      {
        type: "goalkeeper",
        label: "VM-malvakt",
        width: 62,
        height: 76,
        y: 344,
        rarity: 3,
        stages: ["finale"],
        message: "VM-malvakta stengte buret.",
        hitbox: { x: 12, y: 28, width: 38, height: 38 },
      },
    ],
  };

  const ASSET_PATHS = {
    playerIdle: "Grafikk/sorloth_sprite_pack_safe_v2/sorloth_idle.png",
    playerRunA: "Grafikk/sorloth_sprite_pack_safe_v2/sorloth_run1.png",
    playerRunB: "Grafikk/sorloth_sprite_pack_safe_v2/sorloth_run2.png",
    playerRunC: "Grafikk/sorloth_sprite_pack_safe_v2/sorloth_run3.png",
    playerJump: "Grafikk/sorloth_sprite_pack_safe_v2/sorloth_jump.png",
    playerWin: "Grafikk/sorloth_sprite_pack_safe_v2/sorloth_trophy.png",
    iconSheet: "Grafikk/ee2c2fd0-25c3-4daf-880e-0bb02b7f57c7.png",
  };

  const ICON_ATLAS = {
    ball: { x: 18, y: 12, width: 142, height: 116 },
    trophy: { x: 170, y: 12, width: 112, height: 126 },
    flag: { x: 288, y: 16, width: 128, height: 112 },
    ticket: { x: 426, y: 22, width: 168, height: 108 },
    passport: { x: 760, y: 18, width: 132, height: 122 },
    wave: { x: 910, y: 20, width: 160, height: 140 },
    roadwork: { x: 1168, y: 18, width: 142, height: 110 },
    statue: { x: 1340, y: 20, width: 118, height: 118 },
    gull: { x: 8, y: 170, width: 158, height: 124 },
    pretzel: { x: 176, y: 176, width: 174, height: 120 },
    hotdog: { x: 358, y: 178, width: 170, height: 112 },
    raincloud: { x: 548, y: 174, width: 186, height: 110 },
    wave2: { x: 744, y: 158, width: 184, height: 150 },
    suitcase: { x: 178, y: 334, width: 160, height: 146 },
    ferry: { x: 340, y: 340, width: 182, height: 132 },
    tractor: { x: 8, y: 502, width: 148, height: 112 },
    cards: { x: 498, y: 502, width: 144, height: 114 },
    jersey: { x: 644, y: 500, width: 148, height: 112 },
    hattrick: { x: 1060, y: 496, width: 240, height: 126 },
    map: { x: 0, y: 664, width: 180, height: 132 },
    rocket: { x: 188, y: 688, width: 152, height: 96 },
    stadium: { x: 1060, y: 814, width: 286, height: 154 },
    directFlight: { x: 704, y: 680, width: 238, height: 124 },
  };

  function formatNumber(value) {
    const safeValue = Number.isFinite(value) ? value : 0;
    return safeValue.toLocaleString("no-NO");
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function randomItem(list) {
    if (!Array.isArray(list) || list.length === 0) {
      return null;
    }
    return list[Math.floor(Math.random() * list.length)];
  }

  function weightedChoice(entries) {
    const total = entries.reduce((sum, entry) => sum + (entry.rarity || 1), 0);
    let roll = Math.random() * total;
    for (const entry of entries) {
      roll -= entry.rarity || 1;
      if (roll <= 0) {
        return entry;
      }
    }
    return entries[entries.length - 1] || null;
  }

  function stageForDistance(distance) {
    if (distance < 900) {
      return "fosen";
    }
    if (distance < 2200) {
      return "city";
    }
    if (distance < 3300) {
      return "ocean";
    }
    if (distance < 4300) {
      return "island";
    }
    if (distance < 5000) {
      return "ice";
    }
    if (distance < 5700) {
      return "canada";
    }
    if (distance < 6200) {
      return "usa";
    }
    return "finale";
  }

  function createImageAsset(path) {
    const image = new Image();
    image.decoding = "async";
    image.src = encodeURI(path);
    return image;
  }

  function createCornerMaskedCanvasFromImage(image) {
    try {
      if (!image || !image.naturalWidth || !image.naturalHeight) {
        return null;
      }

      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) {
        return null;
      }

      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;
      const visited = new Uint8Array(width * height);
      const queue = [];

      function isBackgroundPixel(offset) {
        const red = data[offset];
        const green = data[offset + 1];
        const blue = data[offset + 2];
        const alpha = data[offset + 3];
        if (alpha === 0) {
          return false;
        }
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const chroma = max - min;
        return min >= 220 && chroma <= 22;
      }

      function pushPixel(x, y) {
        if (x < 0 || y < 0 || x >= width || y >= height) {
          return;
        }
        const index = y * width + x;
        if (visited[index]) {
          return;
        }
        const offset = index * 4;
        if (!isBackgroundPixel(offset)) {
          return;
        }
        visited[index] = 1;
        queue.push(index);
      }

      pushPixel(0, 0);
      pushPixel(width - 1, 0);
      pushPixel(0, height - 1);
      pushPixel(width - 1, height - 1);

      while (queue.length > 0) {
        const index = queue.shift();
        const x = index % width;
        const y = Math.floor(index / width);
        const offset = index * 4;
        data[offset + 3] = 0;

        pushPixel(x + 1, y);
        pushPixel(x - 1, y);
        pushPixel(x, y + 1);
        pushPixel(x, y - 1);
      }

      context.putImageData(imageData, 0, 0);
      return canvas;
    } catch {
      return null;
    }
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
      milestoneBox: root.querySelector('[data-role="milestone-box"]'),
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

    const assets = {
      playerIdle: createImageAsset(ASSET_PATHS.playerIdle),
      playerRunA: createImageAsset(ASSET_PATHS.playerRunA),
      playerRunB: createImageAsset(ASSET_PATHS.playerRunB),
      playerRunC: createImageAsset(ASSET_PATHS.playerRunC),
      playerJump: createImageAsset(ASSET_PATHS.playerJump),
      playerWin: createImageAsset(ASSET_PATHS.playerWin),
      iconSheet: createImageAsset(ASSET_PATHS.iconSheet),
    };
    const preparedPlayerSprites = {};

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
      milestoneIndex: 0,
      backgroundShift: 0,
      crashMessage: "",
      lastPickupMessage: WIDGET_CONFIG.facts[0],
      finalTokensCollected: 0,
      player: {
        x: 92,
        y: 0,
        width: 86,
        height: 114,
        vy: 0,
        jumping: false,
      },
      milestoneToast: {
        text: "",
        ttl: 0,
      },
      obstacles: [],
      pickups: [],
      particles: [],
      fireworks: [],
    };

    function updateCanvasSize() {
      const width = Math.max(320, Math.min(980, Math.floor(root.clientWidth - 2)));
      const height = Math.floor(width * 0.5625);
      elements.canvas.width = width;
      elements.canvas.height = height;
    }

    function currentStage() {
      return stageForDistance(state.distance);
    }

    function setFact(text) {
      if (elements.factBox) {
        elements.factBox.textContent = text;
      }
    }

    function showMilestoneToast(text) {
      state.milestoneToast.text = text || "";
      state.milestoneToast.ttl = 210;
      if (elements.milestoneBox) {
        elements.milestoneBox.textContent = text || "";
        elements.milestoneBox.classList.remove("pmwv-hidden");
      }
    }

    function hideMilestoneToast() {
      state.milestoneToast.ttl = 0;
      state.milestoneToast.text = "";
      if (elements.milestoneBox) {
        elements.milestoneBox.classList.add("pmwv-hidden");
      }
    }

    function updateHud() {
      const travelled = Math.floor(state.distance);
      const remaining = Math.max(0, WIDGET_CONFIG.totalDistance - travelled);
      if (elements.kmCount) {
        elements.kmCount.textContent = `${formatNumber(travelled)} km`;
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
        const finaleCopy =
          currentStage() === "finale"
            ? ` Finaleutfordring: ${state.finalTokensCollected} av 3 VM-symboler.`
            : "";
        elements.routeCopy.textContent =
          `Du har kommet ${formatNumber(travelled)} km. Det er ${formatNumber(remaining)} km igjen til VM 2026 i USA, Canada og Mexico.` +
          finaleCopy;
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
      state.milestoneIndex = 0;
      state.backgroundShift = 0;
      state.crashMessage = "";
      state.lastPickupMessage = WIDGET_CONFIG.facts[0];
      state.finalTokensCollected = 0;
      state.obstacles = [];
      state.pickups = [];
      state.particles = [];
      state.fireworks = [];
      state.player.y = WIDGET_CONFIG.groundY - state.player.height;
      state.player.vy = 0;
      state.player.jumping = false;
      hideMilestoneToast();

      setFact(WIDGET_CONFIG.facts[0]);
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
      if (state.obstacles.some((obstacle) => obstacle.x > elements.canvas.width - 240)) {
        return;
      }
      const stage = currentStage();
      const variants = WIDGET_CONFIG.obstacleTypes.filter(
        (entry) => entry.stages.includes("all") || entry.stages.includes(stage)
      );
      const chosen = weightedChoice(variants);
      if (!chosen) {
        return;
      }
      state.obstacles.push({
        ...chosen,
        x: elements.canvas.width + 80,
      });
    }

    function spawnPickup() {
      const stage = currentStage();
      const variants = WIDGET_CONFIG.pickupTypes.filter(
        (entry) => entry.stages.includes("all") || entry.stages.includes(stage)
      );
      const chosen = weightedChoice(variants);
      if (!chosen) {
        return;
      }
      const width = chosen.type === "stadium" ? 58 : chosen.type === "directFlight" ? 54 : 44;
      const height = chosen.type === "stadium" ? 42 : chosen.type === "directFlight" ? 34 : 44;
      const yRange = chosen.maxY - chosen.minY;
      const offsetY = chosen.minY + Math.random() * Math.max(0, yRange);
      state.pickups.push({
        ...chosen,
        x: elements.canvas.width + 64,
        y: WIDGET_CONFIG.groundY - 148 - offsetY,
        width,
        height,
        bob: Math.random() * Math.PI * 2,
      });
    }

    function addParticles(x, y, color, size, count) {
      const amount = count || 10;
      for (let index = 0; index < amount; index += 1) {
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
      for (let index = 0; index < 52; index += 1) {
        state.particles.push({
          x: 100 + Math.random() * (elements.canvas.width - 200),
          y: -20 - Math.random() * 30,
          vx: (Math.random() - 0.5) * 3.2,
          vy: 1.2 + Math.random() * 2.4,
          life: 70 + Math.random() * 28,
          color: colors[index % colors.length],
          size: 5 + Math.random() * 4,
        });
      }
    }

    function launchFireworksBurst() {
      const originX = 120 + Math.random() * (elements.canvas.width - 240);
      const originY = 70 + Math.random() * 170;
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

    function entityCollisionRect(entity, kind) {
      if (kind === "player") {
        return {
          x: entity.x + 20,
          y: entity.y + 12,
          width: entity.width - 36,
          height: entity.height - 20,
        };
      }

      const hitbox = entity.hitbox;
      if (hitbox) {
        return {
          x: entity.x + hitbox.x,
          y: entity.y + hitbox.y,
          width: hitbox.width,
          height: hitbox.height,
        };
      }

      return {
        x: entity.x + 6,
        y: entity.y + 6,
        width: Math.max(12, entity.width - 12),
        height: Math.max(12, entity.height - 12),
      };
    }

    function drawAtlasSprite(name, dx, dy, dw, dh) {
      const sprite = ICON_ATLAS[name];
      const sheet = assets.iconSheet;
      if (!sprite || !sheet.complete || !sheet.naturalWidth) {
        return false;
      }
      ctx.drawImage(sheet, sprite.x, sprite.y, sprite.width, sprite.height, dx, dy, dw, dh);
      return true;
    }

    function getPreparedPlayerSprite(name, asset) {
      if (!asset || !asset.complete || !asset.naturalWidth) {
        return null;
      }
      if (!(name in preparedPlayerSprites)) {
        preparedPlayerSprites[name] = createCornerMaskedCanvasFromImage(asset) || asset;
      }
      return preparedPlayerSprites[name];
    }

    function updateFacts() {
      state.factTimer += 1;
      if (state.milestoneToast.ttl > 0) {
        state.milestoneToast.ttl -= 1;
        if (state.milestoneToast.ttl <= 0) {
          hideMilestoneToast();
        }
      }

      if (state.factTimer % 280 === 0) {
        const index = Math.floor((state.factTimer / 280) % WIDGET_CONFIG.facts.length);
        setFact(WIDGET_CONFIG.facts[index]);
      }

      const nextMilestone = WIDGET_CONFIG.milestones[state.milestoneIndex + 1];
      if (nextMilestone && state.distance >= nextMilestone.at) {
        state.milestoneIndex += 1;
        const remaining = Math.max(0, WIDGET_CONFIG.totalDistance - Math.floor(state.distance));
        const text = `Sorloth har nadd ${nextMilestone.label}! ${formatNumber(remaining)} km igjen til VM.`;
        setFact(text);
        showMilestoneToast(text);
      }
    }

    function endGame(won) {
      state.running = false;
      state.gameOver = true;
      state.won = won;

      if (elements.gameOverTitle) {
        elements.gameOverTitle.textContent = won ? "Sorloth vant VM!" : "Oi, der kom hindringen";
      }
      if (elements.gameOverText) {
        elements.gameOverText.textContent = won
          ? `Gratulerer! Du fikk Sorloth helt til topps i VM 2026, og na lofter han trofeet med ${formatNumber(state.score)} poeng.`
          : `${state.crashMessage || "Reisen stoppet opp."} Du samlet ${formatNumber(Math.floor(state.distance))} km og ${formatNumber(state.score)} poeng.`;
      }

      if (won) {
        setFact("Sorloth vant VM 2026 og lofter trofeet!");
        if (elements.victoryBanner) {
          elements.victoryBanner.classList.remove("pmwv-hidden");
        }
        if (elements.gameOverPanel) {
          elements.gameOverPanel.classList.add("pmwv-victory");
        }
        showMilestoneToast("Sorloth vant hele VM! Trofeet er hjemme.");
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

    function collectPickup(pickup) {
      state.score += pickup.score;
      state.distance = Math.min(WIDGET_CONFIG.totalDistance, state.distance + pickup.value);
      state.lastPickupMessage = pickup.message;
      setFact(pickup.message);
      addParticles(pickup.x, pickup.y, pickup.type === "trophy" ? "#ffd166" : "#ffffff", 5, pickup.type === "rocket" ? 18 : 12);

      if (currentStage() === "finale" && pickup.finalToken) {
        state.finalTokensCollected += 1;
        showMilestoneToast(`Finale! Samle 3 VM-symboler: ${state.finalTokensCollected} av 3.`);
      }
    }

    function canFinishJourney() {
      if (currentStage() !== "finale") {
        return state.distance >= WIDGET_CONFIG.totalDistance;
      }
      return state.distance >= WIDGET_CONFIG.totalDistance && state.finalTokensCollected >= 3;
    }

    function update(delta) {
      if (!state.running) {
        draw();
        return;
      }

      state.backgroundShift += state.speed * delta * 0.7;
      state.speed = Math.min(WIDGET_CONFIG.maxSpeed, state.speed + WIDGET_CONFIG.speedGrowth * delta * 60);
      state.distance = Math.min(WIDGET_CONFIG.totalDistance, state.distance + state.speed * WIDGET_CONFIG.distanceFactor * delta);

      state.player.vy += WIDGET_CONFIG.gravity * delta * 1.2;
      state.player.y += state.player.vy * delta * 1.2;

      if (state.player.y >= WIDGET_CONFIG.groundY - state.player.height) {
        state.player.y = WIDGET_CONFIG.groundY - state.player.height;
        state.player.vy = 0;
        state.player.jumping = false;
      }

      state.obstacleTimer += delta;
      state.pickupTimer += delta;
      const stage = currentStage();
      const obstacleDelay = stage === "finale" ? 124 : stage === "ocean" ? 142 : 136;
      const pickupDelay = stage === "finale" ? 54 : 60;

      if (state.obstacleTimer > Math.max(88, obstacleDelay - state.speed * 6.2)) {
        spawnObstacle();
        state.obstacleTimer = 0;
      }

      if (state.pickupTimer > Math.max(30, pickupDelay - state.speed * 4.4)) {
        spawnPickup();
        state.pickupTimer = 0;
      }

      state.obstacles.forEach((obstacle) => {
        obstacle.x -= state.speed * 6 * delta;
      });

      state.pickups.forEach((pickup) => {
        pickup.x -= state.speed * 6 * delta;
        pickup.bob += 0.08 * delta;
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

      state.obstacles = state.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -30);
      state.pickups = state.pickups.filter((pickup) => pickup.x + pickup.width > -30);
      state.particles = state.particles.filter((particle) => particle.life > 0);
      state.fireworks = state.fireworks.filter((particle) => particle.life > 0);

      const playerRect = entityCollisionRect(state.player, "player");
      for (const obstacle of state.obstacles) {
        if (rectsCollide(playerRect, entityCollisionRect(obstacle, "obstacle"))) {
          state.crashMessage = obstacle.message;
          endGame(false);
          break;
        }
      }

      state.pickups = state.pickups.filter((pickup) => {
        if (!rectsCollide(playerRect, entityCollisionRect(pickup, "pickup"))) {
          return true;
        }
        collectPickup(pickup);
        return false;
      });

      updateFacts();
      updateHud();

      if (state.distance >= WIDGET_CONFIG.totalDistance && currentStage() === "finale" && state.finalTokensCollected < 3) {
        setFact(`VM-malvakta venter. Samle ${3 - state.finalTokensCollected} VM-symboler til for a vinne.`);
      }

      if (canFinishJourney()) {
        endGame(true);
      }

      draw();
    }

    function drawSky() {
      const stage = currentStage();
      let top = "#8ad0ff";
      let mid = "#d8f0ff";
      if (stage === "ocean" || stage === "island") {
        top = "#7cc3ff";
        mid = "#cbe8ff";
      } else if (stage === "ice") {
        top = "#a7daf2";
        mid = "#ebfbff";
      } else if (stage === "usa" || stage === "finale") {
        top = "#84c3ff";
        mid = "#f0f6ff";
      }
      const gradient = ctx.createLinearGradient(0, 0, 0, elements.canvas.height);
      gradient.addColorStop(0, top);
      gradient.addColorStop(0.42, mid);
      gradient.addColorStop(0.43, "#8fda7c");
      gradient.addColorStop(1, "#5aac58");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, elements.canvas.width, elements.canvas.height);
    }

    function drawCloud(x, y, scale, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(0, 10, 18, Math.PI, Math.PI * 2);
      ctx.arc(22, 4, 24, Math.PI, Math.PI * 2);
      ctx.arc(48, 12, 18, Math.PI, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawSeaBand() {
      ctx.fillStyle = "#7ec8f8";
      ctx.fillRect(0, WIDGET_CONFIG.groundY - 44, elements.canvas.width, 44);
      ctx.fillStyle = "#5fb4ef";
      for (let index = 0; index < 16; index += 1) {
        const x = ((index * 90) - state.backgroundShift * 2.4) % (elements.canvas.width + 100);
        ctx.fillRect(x, WIDGET_CONFIG.groundY - 18, 42, 3);
      }
    }

    function drawLocalBackdrop(offsetX) {
      const x = elements.canvas.width * 0.64 + offsetX;
      ctx.save();
      ctx.translate(x, 278);

      ctx.fillStyle = "#7da8c8";
      ctx.beginPath();
      ctx.moveTo(-180, 120);
      ctx.lineTo(-80, 20);
      ctx.lineTo(20, 120);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#f1e4c1";
      ctx.fillRect(-18, -8, 62, 48);
      ctx.fillStyle = "#b6252d";
      ctx.fillRect(6, -34, 16, 30);
      ctx.fillStyle = "#8b6a44";
      ctx.fillRect(-34, 28, 114, 16);

      ctx.fillStyle = "#f8f8f8";
      ctx.fillRect(108, 16, 76, 26);
      ctx.fillStyle = "#3b6ca8";
      ctx.fillRect(124, -4, 22, 20);
      ctx.fillStyle = "#d93232";
      ctx.fillRect(146, 0, 24, 10);

      ctx.strokeStyle = "#e2eef8";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-126, 78);
      ctx.quadraticCurveTo(-86, 24, -28, 66);
      ctx.stroke();

      ctx.strokeStyle = "#b0b9c2";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(220, 48);
      ctx.lineTo(220, -18);
      ctx.moveTo(220, 0);
      ctx.lineTo(190, 28);
      ctx.moveTo(220, 0);
      ctx.lineTo(250, 24);
      ctx.stroke();
      ctx.restore();
    }

    function drawCityBackdrop(offsetX) {
      const x = elements.canvas.width * 0.66 + offsetX;
      ctx.save();
      ctx.translate(x, 288);
      ctx.fillStyle = "#a5bfd8";
      ctx.beginPath();
      ctx.moveTo(-240, 110);
      ctx.lineTo(-120, 12);
      ctx.lineTo(-30, 110);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = "#658ab4";
      ctx.fillRect(50, 18, 24, 92);
      ctx.fillRect(82, -10, 34, 120);
      ctx.fillRect(126, 24, 26, 86);
      ctx.fillStyle = "#d18831";
      ctx.fillRect(-8, -60, 38, 170);
      ctx.fillStyle = "#f6d49f";
      ctx.fillRect(2, -98, 10, 38);

      ctx.fillStyle = "#406f41";
      ctx.fillRect(-94, 72, 42, 38);
      ctx.fillRect(-84, 52, 18, 22);
      ctx.restore();
    }

    function drawOceanBackdrop(offsetX) {
      const x = elements.canvas.width * 0.7 + offsetX;
      ctx.save();
      ctx.translate(x, 290);
      ctx.fillStyle = "#7bb9d8";
      ctx.beginPath();
      ctx.moveTo(-200, 120);
      ctx.lineTo(-110, 24);
      ctx.lineTo(-10, 120);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#628fb4";
      ctx.beginPath();
      ctx.moveTo(-30, 120);
      ctx.lineTo(98, -12);
      ctx.lineTo(236, 120);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#f7fbff";
      ctx.fillRect(118, 14, 58, 18);
      ctx.fillStyle = "#2d7fb8";
      ctx.beginPath();
      ctx.moveTo(82, 42);
      ctx.quadraticCurveTo(128, -8, 156, 18);
      ctx.quadraticCurveTo(174, 36, 202, 14);
      ctx.lineTo(202, 42);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawIceBackdrop(offsetX) {
      const x = elements.canvas.width * 0.68 + offsetX;
      ctx.save();
      ctx.translate(x, 298);
      ctx.fillStyle = "#d7f4fb";
      ctx.beginPath();
      ctx.moveTo(-140, 110);
      ctx.lineTo(-46, 40);
      ctx.lineTo(20, 110);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#b9dce5";
      ctx.beginPath();
      ctx.moveTo(24, 110);
      ctx.lineTo(126, 18);
      ctx.lineTo(222, 110);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#d14646";
      ctx.fillRect(-182, 4, 22, 86);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-176, -34, 10, 38);
      ctx.restore();
    }

    function drawNorthAmericaBackdrop(offsetX) {
      const x = elements.canvas.width * 0.68 + offsetX;
      ctx.save();
      ctx.translate(x, 292);
      ctx.fillStyle = "#5f6c7b";
      ctx.fillRect(-88, 24, 28, 86);
      ctx.fillRect(-42, -16, 34, 126);
      ctx.fillRect(14, 8, 30, 102);
      ctx.fillStyle = "#9da8b6";
      ctx.fillRect(66, -48, 14, 158);
      ctx.fillStyle = "#7abf63";
      ctx.fillRect(-164, 84, 72, 26);
      ctx.fillRect(104, 90, 80, 20);
      ctx.fillStyle = "#2d9d55";
      ctx.fillRect(-120, 92, 20, 18);
      ctx.fillRect(-88, 92, 20, 18);
      ctx.fillStyle = "#d62828";
      ctx.fillRect(-158, 74, 6, 18);
      ctx.fillStyle = "#6fb26a";
      ctx.fillRect(140, 52, 16, 40);
      ctx.fillRect(124, 74, 48, 18);
      ctx.restore();
    }

    function drawBackground() {
      const shift = state.backgroundShift % elements.canvas.width;
      drawSky();

      for (let index = -1; index < 3; index += 1) {
        const x = index * elements.canvas.width - shift;
        drawCloud(x + 140, 88, 1, "rgba(255,255,255,0.95)");
        drawCloud(x + 390, 122, 0.72, "rgba(255,255,255,0.88)");
        drawCloud(x + 690, 84, 0.84, "rgba(255,255,255,0.9)");
      }

      drawSeaBand();
      const parallax = ((state.backgroundShift * 0.35) % 280) * -1;
      const stage = currentStage();

      if (stage === "fosen") {
        drawLocalBackdrop(parallax);
      } else if (stage === "city") {
        drawCityBackdrop(parallax);
      } else if (stage === "ocean" || stage === "island") {
        drawOceanBackdrop(parallax);
      } else if (stage === "ice") {
        drawIceBackdrop(parallax);
      } else {
        drawNorthAmericaBackdrop(parallax);
      }

      ctx.fillStyle = "#5aad59";
      ctx.fillRect(0, WIDGET_CONFIG.groundY, elements.canvas.width, elements.canvas.height - WIDGET_CONFIG.groundY);
      ctx.fillStyle = "#79c86f";
      ctx.fillRect(0, WIDGET_CONFIG.groundY - 34, elements.canvas.width, 34);
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, WIDGET_CONFIG.groundY + 18, elements.canvas.width, 14);
      ctx.fillStyle = "#c73333";
      for (let stripeIndex = 0; stripeIndex < 10; stripeIndex += 1) {
        ctx.fillRect((stripeIndex * 110 - shift * 1.1) % (elements.canvas.width + 120), WIDGET_CONFIG.groundY + 21, 48, 8);
      }

      drawRouteSign();
    }

    function drawRouteSign() {
      const milestone = WIDGET_CONFIG.milestones[state.milestoneIndex] || WIDGET_CONFIG.milestones[0];
      ctx.save();
      ctx.translate(elements.canvas.width - 150, 94);
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.fillRect(-72, -22, 144, 44);
      ctx.strokeStyle = milestone.color;
      ctx.lineWidth = 4;
      ctx.strokeRect(-72, -22, 144, 44);
      ctx.fillStyle = milestone.color;
      ctx.font = 'bold 18px var(--font-system, system-ui, sans-serif)';
      ctx.textAlign = "center";
      ctx.fillText(milestone.label, 0, 6);
      ctx.restore();
    }

    function drawPlayer() {
      const { x, y, width, height } = state.player;
      const runPhase = state.running ? Math.sin(state.backgroundShift * 0.22) : 0;
      const lift = state.player.jumping ? -8 : runPhase * 2;

      ctx.save();
      ctx.translate(x, y + lift);

      ctx.fillStyle = "rgba(32, 64, 84, 0.18)";
      ctx.fillRect(10, height - 6, width - 20, 7);

      let sprite = assets.playerIdle;
      if (state.gameOver && state.won) {
        sprite = assets.playerWin;
      } else if (state.player.jumping) {
        sprite = assets.playerJump;
      } else if (state.running) {
        const runFrames = [assets.playerRunA, assets.playerRunB, assets.playerRunC];
        sprite = runFrames[Math.floor((state.backgroundShift / 12) % runFrames.length)] || assets.playerIdle;
      }

      const preparedSprite = getPreparedPlayerSprite(
        state.gameOver && state.won
          ? "playerWin"
          : state.player.jumping
            ? "playerJump"
            : state.running
              ? sprite === assets.playerRunA
                ? "playerRunA"
                : sprite === assets.playerRunB
                  ? "playerRunB"
                  : "playerRunC"
              : "playerIdle",
        sprite
      );

      if (preparedSprite) {
        const sway = state.player.jumping ? 0.08 : runPhase * 0.025;
        const scaleX = 1 + Math.abs(runPhase) * 0.02;
        const scaleY = 1 - Math.abs(runPhase) * 0.02;
        const drawWidth = state.gameOver && state.won ? width * 1.2 : width * 1.08;
        const drawHeight = state.gameOver && state.won ? height * 1.26 : height * 1.14;
        ctx.translate(width * 0.5, height * 0.5);
        ctx.rotate(sway);
        ctx.scale(scaleX, scaleY);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
          preparedSprite,
          0,
          0,
          preparedSprite.width || preparedSprite.naturalWidth,
          preparedSprite.height || preparedSprite.naturalHeight,
          -drawWidth * 0.52,
          -drawHeight * 0.56,
          drawWidth,
          drawHeight
        );
        ctx.restore();
        return;
      }

      ctx.restore();
    }

    function drawRaincloud(obstacle) {
      ctx.fillStyle = "#8ea1b4";
      ctx.beginPath();
      ctx.arc(18, 18, 16, Math.PI, Math.PI * 2);
      ctx.arc(34, 12, 20, Math.PI, Math.PI * 2);
      ctx.arc(54, 18, 15, Math.PI, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#71aee8";
      ctx.lineWidth = 3;
      for (let i = 0; i < 4; i += 1) {
        ctx.beginPath();
        ctx.moveTo(16 + i * 14, 32);
        ctx.lineTo(12 + i * 14, obstacle.height - 2);
        ctx.stroke();
      }
    }

    function drawWave(obstacle) {
      ctx.fillStyle = "#46a6de";
      ctx.beginPath();
      ctx.moveTo(0, obstacle.height);
      ctx.quadraticCurveTo(18, 8, 34, 20);
      ctx.quadraticCurveTo(50, 2, 66, 16);
      ctx.quadraticCurveTo(78, 24, obstacle.width, 8);
      ctx.lineTo(obstacle.width, obstacle.height);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#e8f9ff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(18, 12);
      ctx.quadraticCurveTo(34, -2, 52, 10);
      ctx.stroke();
    }

    function drawRoadwork(obstacle) {
      ctx.fillStyle = "#d93a32";
      ctx.fillRect(6, 20, obstacle.width - 12, 26);
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 3; i += 1) {
        ctx.fillRect(12 + i * 18, 24, 10, 18);
      }
      ctx.fillStyle = "#f7be3a";
      ctx.beginPath();
      ctx.arc(obstacle.width * 0.28, 12, 8, 0, Math.PI * 2);
      ctx.arc(obstacle.width * 0.72, 12, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#80572a";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(18, obstacle.height);
      ctx.lineTo(22, 40);
      ctx.moveTo(obstacle.width - 18, obstacle.height);
      ctx.lineTo(obstacle.width - 22, 40);
      ctx.stroke();
    }

    function drawGull(obstacle) {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(2, 20);
      ctx.quadraticCurveTo(18, 2, 32, 18);
      ctx.quadraticCurveTo(46, 0, 62, 20);
      ctx.stroke();
      ctx.fillStyle = "#f3c34d";
      ctx.fillRect(28, 20, 8, 5);
    }

    function drawSuitcase(obstacle) {
      ctx.fillStyle = "#6d4934";
      ctx.fillRect(0, 10, obstacle.width, obstacle.height - 10);
      ctx.fillStyle = "#472b1e";
      ctx.fillRect(14, 0, 24, 12);
      ctx.fillStyle = "#d62828";
      ctx.beginPath();
      ctx.arc(obstacle.width * 0.7, obstacle.height * 0.55, 10, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawFerry(obstacle) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(10, 18, 70, 26);
      ctx.fillStyle = "#2d7fb8";
      ctx.fillRect(22, 6, 36, 14);
      ctx.fillStyle = "#d62828";
      ctx.fillRect(48, 0, 4, 12);
      ctx.fillStyle = "#5fb4ef";
      ctx.beginPath();
      ctx.moveTo(0, 44);
      ctx.lineTo(obstacle.width, 44);
      ctx.lineTo(obstacle.width - 12, obstacle.height);
      ctx.lineTo(12, obstacle.height);
      ctx.closePath();
      ctx.fill();
    }

    function drawDefender(obstacle, goalkeeper) {
      ctx.fillStyle = "#f0c49f";
      ctx.beginPath();
      ctx.arc(obstacle.width * 0.5, 14, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = goalkeeper ? "#1f7d4a" : "#202d65";
      ctx.fillRect(18, 28, 30, 34);
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(30, 28, 6, 34);
      ctx.strokeStyle = "#16233e";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(28, 62);
      ctx.lineTo(18, obstacle.height - 4);
      ctx.moveTo(38, 62);
      ctx.lineTo(48, obstacle.height - 4);
      ctx.moveTo(18, 40);
      ctx.lineTo(6, 58);
      ctx.moveTo(48, 40);
      ctx.lineTo(60, goalkeeper ? 30 : 56);
      ctx.stroke();
      if (goalkeeper) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(60, 28, 10, 10);
      }
    }

    function drawCard(color) {
      ctx.fillStyle = color;
      ctx.fillRect(6, 0, 22, 34);
      ctx.fillStyle = "#f3d6b6";
      ctx.fillRect(0, 18, 34, 40);
    }

    function drawThunder(obstacle) {
      drawRaincloud(obstacle);
      ctx.fillStyle = "#ffcf33";
      ctx.beginPath();
      ctx.moveTo(34, 30);
      ctx.lineTo(24, 52);
      ctx.lineTo(34, 52);
      ctx.lineTo(26, 72);
      ctx.lineTo(48, 42);
      ctx.lineTo(38, 42);
      ctx.closePath();
      ctx.fill();
    }

    function drawTractor(obstacle) {
      ctx.fillStyle = "#349253";
      ctx.fillRect(12, 18, 44, 24);
      ctx.fillRect(38, 0, 24, 24);
      ctx.fillStyle = "#9fd3ff";
      ctx.fillRect(44, 4, 14, 12);
      ctx.fillStyle = "#14213d";
      ctx.beginPath();
      ctx.arc(22, 48, 12, 0, Math.PI * 2);
      ctx.arc(58, 46, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawObstacle(obstacle) {
      ctx.save();
      ctx.translate(obstacle.x, obstacle.y);

      const obstacleSpriteMap = {
        raincloud: "raincloud",
        wave: "wave2",
        roadwork: "roadwork",
        gull: "gull",
        suitcase: "suitcase",
        ferry: "ferry",
        redcard: "cards",
        yellowcard: "cards",
        thunder: "raincloud",
        tractor: "tractor",
      };
      const spriteName = obstacleSpriteMap[obstacle.type];
      if (spriteName && drawAtlasSprite(spriteName, 0, 0, obstacle.width, obstacle.height)) {
        if (obstacle.type === "yellowcard") {
          ctx.fillStyle = "rgba(255, 207, 51, 0.85)";
          ctx.fillRect(4, 4, obstacle.width - 10, obstacle.height - 20);
        } else if (obstacle.type === "redcard") {
          ctx.fillStyle = "rgba(214, 40, 40, 0.85)";
          ctx.fillRect(4, 4, obstacle.width - 10, obstacle.height - 20);
        } else if (obstacle.type === "thunder") {
          ctx.fillStyle = "#ffcf33";
          ctx.beginPath();
          ctx.moveTo(obstacle.width * 0.48, obstacle.height * 0.28);
          ctx.lineTo(obstacle.width * 0.34, obstacle.height * 0.62);
          ctx.lineTo(obstacle.width * 0.5, obstacle.height * 0.62);
          ctx.lineTo(obstacle.width * 0.4, obstacle.height * 0.92);
          ctx.lineTo(obstacle.width * 0.68, obstacle.height * 0.46);
          ctx.lineTo(obstacle.width * 0.52, obstacle.height * 0.46);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
        return;
      }

      switch (obstacle.type) {
        case "raincloud":
          drawRaincloud(obstacle);
          break;
        case "wave":
          drawWave(obstacle);
          break;
        case "roadwork":
          drawRoadwork(obstacle);
          break;
        case "gull":
          drawGull(obstacle);
          break;
        case "suitcase":
          drawSuitcase(obstacle);
          break;
        case "ferry":
          drawFerry(obstacle);
          break;
        case "defender":
          drawDefender(obstacle, false);
          break;
        case "redcard":
          drawCard("#d62828");
          break;
        case "yellowcard":
          drawCard("#ffcf33");
          break;
        case "thunder":
          drawThunder(obstacle);
          break;
        case "tractor":
          drawTractor(obstacle);
          break;
        case "goalkeeper":
          drawDefender(obstacle, true);
          break;
        default:
          drawRoadwork(obstacle);
      }

      ctx.restore();
    }

    function drawBall(pickup) {
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(22, 22, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#183b7a";
      ctx.beginPath();
      ctx.arc(22, 22, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#d62828";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(22, 22, 14, 0.8, 2.2);
      ctx.stroke();
    }

    function drawTrophy(pickup) {
      ctx.shadowColor = "rgba(255, 214, 64, 0.8)";
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

    function drawFlag() {
      ctx.fillStyle = "#c72d32";
      ctx.fillRect(10, 8, 26, 18);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(20, 8, 4, 18);
      ctx.fillRect(10, 15, 26, 4);
      ctx.fillStyle = "#173d7a";
      ctx.fillRect(21, 8, 2, 18);
      ctx.fillRect(10, 16, 26, 2);
      ctx.fillStyle = "#b98b4d";
      ctx.fillRect(8, 6, 2, 28);
    }

    function drawTicket() {
      ctx.fillStyle = "#5aa35a";
      ctx.fillRect(2, 10, 40, 20);
      ctx.fillStyle = "#f0f5ff";
      ctx.fillRect(6, 14, 32, 12);
      ctx.fillStyle = "#173d7a";
      ctx.fillRect(24, 14, 4, 12);
    }

    function drawPassport() {
      ctx.fillStyle = "#1c3768";
      ctx.fillRect(6, 4, 30, 36);
      ctx.fillStyle = "#f0c96a";
      ctx.beginPath();
      ctx.arc(21, 18, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(14, 28, 14, 2);
    }

    function drawStatue() {
      ctx.fillStyle = "#69a989";
      ctx.fillRect(16, 6, 10, 22);
      ctx.fillRect(12, 26, 18, 10);
      ctx.fillStyle = "#487b63";
      ctx.fillRect(10, 36, 22, 6);
      ctx.fillStyle = "#8fd5b1";
      ctx.fillRect(24, 4, 3, 10);
    }

    function drawMap() {
      ctx.fillStyle = "#72b8d8";
      ctx.fillRect(2, 6, 40, 28);
      ctx.fillStyle = "#78c86f";
      ctx.fillRect(6, 10, 10, 20);
      ctx.fillRect(28, 12, 10, 16);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(14, 18);
      ctx.quadraticCurveTo(22, 8, 30, 20);
      ctx.stroke();
    }

    function drawPretzel() {
      ctx.strokeStyle = "#b0722f";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(16, 22, 8, 0, Math.PI * 2);
      ctx.arc(28, 22, 8, 0, Math.PI * 2);
      ctx.moveTo(8, 22);
      ctx.quadraticCurveTo(22, 2, 36, 22);
      ctx.stroke();
    }

    function drawHotdog() {
      ctx.fillStyle = "#f0bf68";
      ctx.fillRect(4, 16, 36, 12);
      ctx.fillStyle = "#b56536";
      ctx.fillRect(10, 14, 22, 8);
      ctx.fillStyle = "#d62828";
      ctx.fillRect(18, 16, 10, 4);
    }

    function drawRocket() {
      ctx.fillStyle = "#ffcf33";
      ctx.beginPath();
      ctx.moveTo(6, 22);
      ctx.lineTo(22, 8);
      ctx.lineTo(38, 22);
      ctx.lineTo(22, 36);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#d62828";
      ctx.fillRect(18, 14, 8, 16);
      ctx.fillStyle = "#ff8d1a";
      ctx.beginPath();
      ctx.moveTo(38, 18);
      ctx.lineTo(48, 22);
      ctx.lineTo(38, 26);
      ctx.closePath();
      ctx.fill();
    }

    function drawStadium() {
      ctx.fillStyle = "#2459a6";
      ctx.fillRect(4, 18, 42, 18);
      ctx.fillStyle = "#7ed36d";
      ctx.fillRect(14, 24, 22, 10);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(8, 14, 34, 6);
      ctx.fillStyle = "#ffcf33";
      ctx.beginPath();
      ctx.arc(24, 8, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawDirectFlight() {
      ctx.fillStyle = "#e8f3ff";
      ctx.beginPath();
      ctx.moveTo(2, 18);
      ctx.lineTo(28, 14);
      ctx.lineTo(46, 6);
      ctx.lineTo(50, 12);
      ctx.lineTo(36, 18);
      ctx.lineTo(50, 28);
      ctx.lineTo(46, 34);
      ctx.lineTo(28, 22);
      ctx.lineTo(2, 18);
      ctx.closePath();
      ctx.fill();
    }

    function drawHatTrick() {
      ctx.fillStyle = "#2d5ba6";
      ctx.fillRect(2, 16, 40, 18);
      ctx.fillStyle = "#ffcf33";
      ctx.beginPath();
      ctx.arc(10, 12, 5, 0, Math.PI * 2);
      ctx.arc(22, 8, 5, 0, Math.PI * 2);
      ctx.arc(34, 12, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawJersey() {
      ctx.fillStyle = "#b1262e";
      ctx.fillRect(10, 10, 24, 24);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(18, 10, 8, 24);
      ctx.fillStyle = "#183b7a";
      ctx.fillRect(20, 10, 4, 24);
      ctx.fillStyle = "#b1262e";
      ctx.fillRect(4, 12, 8, 12);
      ctx.fillRect(34, 12, 8, 12);
    }

    function drawPickup(pickup) {
      ctx.save();
      const bobOffset = Math.sin(pickup.bob) * 6;
      ctx.translate(pickup.x, pickup.y + bobOffset);

      const pickupSpriteMap = {
        ball: "ball",
        trophy: "trophy",
        flag: "flag",
        ticket: "ticket",
        passport: "passport",
        map: "map",
        statue: "statue",
        pretzel: "pretzel",
        hotdog: "hotdog",
        rocket: "rocket",
        stadium: "stadium",
        directFlight: "directFlight",
        hattrick: "hattrick",
        jersey: "jersey",
      };
      const spriteName = pickupSpriteMap[pickup.type];
      if (spriteName && drawAtlasSprite(spriteName, 0, 0, pickup.width, pickup.height)) {
        ctx.restore();
        return;
      }

      switch (pickup.type) {
        case "ball":
          drawBall(pickup);
          break;
        case "trophy":
          drawTrophy(pickup);
          break;
        case "flag":
          drawFlag();
          break;
        case "ticket":
          drawTicket();
          break;
        case "passport":
          drawPassport();
          break;
        case "statue":
          drawStatue();
          break;
        case "map":
          drawMap();
          break;
        case "pretzel":
          drawPretzel();
          break;
        case "hotdog":
          drawHotdog();
          break;
        case "rocket":
          drawRocket();
          break;
        case "stadium":
          drawStadium();
          break;
        case "directFlight":
          drawDirectFlight();
          break;
        case "hattrick":
          drawHatTrick();
          break;
        case "jersey":
          drawJersey();
          break;
        default:
          drawTrophy(pickup);
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
        ? `Jeg fikk Sorloth helt til VM 2026! ${formatNumber(Math.floor(state.distance))} km og ${formatNumber(state.score)} poeng. Klarer du sla meg?`
        : `Jeg kom ${formatNumber(Math.floor(state.distance))} km pa vei mot VM 2026 i USA, Canada og Mexico og fikk ${formatNumber(state.score)} poeng i Sorloths VM-reise.`;

      if (navigator.share) {
        navigator
          .share({
            title: "Sorloths VM-reise",
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

      if (state.gameOver && state.won && state.fireworks.length < 20 && Math.random() > 0.94) {
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
    state.player.y = WIDGET_CONFIG.groundY - state.player.height;
    updateHud();
    setFact(WIDGET_CONFIG.facts[0]);
    draw();
    window.requestAnimationFrame(frame);
  }

  const roots = Array.from(document.querySelectorAll(WIDGET_SELECTOR));
  roots.forEach((root, index) => {
    initializeWidget(root, index);
  });
})();
