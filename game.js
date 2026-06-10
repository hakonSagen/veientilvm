(() => {
  const WIDGET_SELECTOR = '[id^="pm-widget-fosningen-vm-reise"]';
  const CANVAS_WIDTH = 960;
  const CANVAS_HEIGHT = 540;
  const WIDGET_CONFIG = {
    totalDistance: 6500,
    baseSpeed: 1.95,
    maxSpeed: 2.45,
    speedGrowth: 0.000018,
    distanceFactor: 0.72,
    gravity: 0.72,
    jumpPower: -15.2,
    groundY: 420,
    finalTokensRequired: 1,
    facts: [
      "Fosningen er på vei mot fotballfesten i 2026.",
      "Fotballfesten i 2026 spilles i USA, Canada og Mexico.",
      "Hele Fosen sender Fosningen videre mot Nord-Amerika.",
      "Bonusobjektene gir kilometer, poeng og litt ekstra medvind.",
    ],
    milestones: [
      { at: 0, label: "Rissa", stage: "fosen", color: "#4b8f4b" },
      { at: 900, label: "Brekstad", stage: "fosen", color: "#4b8f4b" },
      { at: 1800, label: "Norskehavet", stage: "ocean", color: "#2d7fb8" },
      { at: 3200, label: "Island", stage: "island", color: "#6f83c0" },
      { at: 4200, label: "Grønland", stage: "ice", color: "#7db8c6" },
      { at: 5100, label: "Newfoundland", stage: "canada", color: "#5e87b7" },
      { at: 5850, label: "New York", stage: "usa", color: "#7c4dff" },
      { at: 6500, label: "VM", stage: "finale", color: "#d62828" },
    ],
    pickupTypes: [
      {
        type: "coin",
        label: "Gullmynt",
        value: 60,
        score: 50,
        rarity: 8,
        minY: 6,
        maxY: 70,
        stages: ["all"],
        message: "Gullmynt plukket opp. Reisen ruller videre.",
      },
      {
        type: "ball",
        label: "Fotball",
        value: 78,
        score: 64,
        rarity: 6,
        minY: 12,
        maxY: 82,
        stages: ["all"],
        message: "Fotballen sender Fosningen videre!",
      },
      {
        type: "trophy",
        label: "Pokal",
        value: 160,
        score: 130,
        rarity: 3,
        minY: 8,
        maxY: 68,
        stages: ["all"],
        message: "Pokal plukket opp. Nå lukter det alvor!",
        finalToken: true,
      },
      {
        type: "sodd",
        label: "Sodd",
        value: 110,
        score: 92,
        rarity: 4,
        minY: 14,
        maxY: 78,
        stages: ["all"],
        message: "Ei skål sodd gir ny kraft i beina.",
      },
    ],
    obstacleTypes: [
      {
        type: "seamonster",
        label: "sjømonster",
        width: 124,
        height: 102,
        y: 318,
        rarity: 3,
        stages: ["ocean", "island", "ice"],
        message: "Et sjømonster dukket opp fra dypet.",
        hitbox: { x: 26, y: 24, width: 68, height: 58 },
      },
      {
        type: "gull",
        label: "sint måke",
        width: 112,
        height: 62,
        y: 232,
        rarity: 5,
        stages: ["fosen", "ocean"],
        message: "Oi! Fosningen traff en sint måke.",
        hitbox: { x: 12, y: 14, width: 82, height: 30 },
      },
      {
        type: "penguin",
        label: "forvilla pingvin",
        width: 84,
        height: 94,
        y: 326,
        rarity: 3,
        stages: ["ice", "canada"],
        message: "En forvilla pingvin sto midt i løypa.",
        hitbox: { x: 18, y: 20, width: 46, height: 62 },
      },
      {
        type: "ferry",
        label: "ferge",
        width: 148,
        height: 92,
        y: 328,
        rarity: 2,
        stages: ["fosen", "ocean"],
        message: "Ferga sperret hele leia.",
        hitbox: { x: 12, y: 28, width: 122, height: 40 },
      },
      {
        type: "defender",
        label: "forsvarsspiller",
        width: 76,
        height: 92,
        y: 328,
        rarity: 3,
        stages: ["usa", "finale"],
        message: "Forsvareren satte inn en sklitakling.",
        hitbox: { x: 12, y: 30, width: 48, height: 48 },
      },
      {
        type: "redcard",
        label: "rødt kort",
        width: 92,
        height: 108,
        y: 312,
        rarity: 3,
        stages: ["usa", "finale"],
        message: "Dommeren dro rett opp det røde kortet.",
        hitbox: { x: 22, y: 10, width: 44, height: 86 },
      },
      {
        type: "yellowcard",
        label: "gult kort",
        width: 92,
        height: 108,
        y: 312,
        rarity: 3,
        stages: ["usa", "finale"],
        message: "Gult kort og full stopp.",
        hitbox: { x: 22, y: 10, width: 44, height: 86 },
      },
      {
        type: "tractor",
        label: "traktor",
        width: 116,
        height: 82,
        y: 338,
        rarity: 3,
        stages: ["fosen"],
        message: "Traktoren tok hele fylkesveien.",
        hitbox: { x: 12, y: 20, width: 92, height: 44 },
      },
      {
        type: "goalkeeper",
        label: "VM-målvakt",
        width: 88,
        height: 78,
        y: 342,
        rarity: 3,
        stages: ["finale"],
        message: "VM-målvakta stengte buret.",
        hitbox: { x: 10, y: 20, width: 64, height: 36 },
      },
    ],
  };

  const ASSET_PATHS = {
    playerIdle: "Grafikk/Fosningen/ChatGPT Image 7. juni 2026, 21_29_26.png",
    playerRunA: "Grafikk/Fosningen/ChatGPT Image 7. juni 2026, 21_47_22.png",
    playerRunB: "Grafikk/Fosningen/ChatGPT Image 7. juni 2026, 21_48_29.png",
    playerRunC: "Grafikk/Fosningen/ChatGPT Image 7. juni 2026, 21_50_13.png",
    playerJump: "Grafikk/Fosningen/ChatGPT Image 7. juni 2026, 21_35_50.png",
    playerHurt: "Grafikk/Fosningen/Skadet.png",
    playerStopped: "Grafikk/Fosningen/Stoppet.png",
    playerWin: "Grafikk/Fosningen/player_celebrating_transparent_fixed_hand.png",
    bonusCoin: "Grafikk/Bonuser/ChatGPT Image 7. juni 2026, 22_11_33.png",
    bonusBall: "Grafikk/Bonuser/ChatGPT Image 7. juni 2026, 22_12_46.png",
    bonusTrophy: "Grafikk/Bonuser/ChatGPT Image 7. juni 2026, 22_18_27.png",
    bonusSoup: "Grafikk/Bonuser/ChatGPT Image 7. juni 2026, 22_20_06.png",
    swedeDefend: "Grafikk/swede_separate_originals/swede_defend.png",
    swedeDive: "Grafikk/swede_separate_originals/swede_dive.png",
    swedeSlide: "Grafikk/swede_separate_originals/swede_slide_left_fixed.png",
    swedeStand: "Grafikk/swede_separate_originals/swede_stand_front_fixed.png",
    hinderGull: "Grafikk/Hindre/ChatGPT Image 3. juni 2026, 08_31_35.png",
    hinderTractor: "Grafikk/Hindre/ChatGPT Image 3. juni 2026, 21_02_22.png",
    hinderRedcard: "Grafikk/Hindre/ChatGPT Image 3. juni 2026, 21_06_57.png",
    hinderYellowcard: "Grafikk/Hindre/ChatGPT Image 3. juni 2026, 21_09_53.png",
    hinderFerry: "Grafikk/Hindre/ChatGPT Image 3. juni 2026, 21_24_40.png",
    hinderPenguin: "Grafikk/Hindre/ChatGPT Image 3. juni 2026, 21_21_30.png",
    hinderSeaSerpent: "Grafikk/Hindre/sea_serpent_mirrored.png",
    austrattBorgen: "Grafikk/fosen_landmarks_hd_simple/austratt_borgen_hd.png",
    alteneset: "Grafikk/fosen_landmarks_hd_simple/alteneset_hd.png",
    fosenBrygge: "Grafikk/fosen_landmarks_hd_simple/fosen_brygge_hd.png",
    harbaksetra: "Grafikk/fosen_landmarks_hd_simple/harbaksetra_hd.png",
    munkstigen: "Grafikk/fosen_landmarks_hd_simple/munkstigen_hd.png",
    reinKloster: "Grafikk/fosen_landmarks_hd_simple/rein_kloster_hd.png",
    iconSheet: "Grafikk/ee2c2fd0-25c3-4daf-880e-0bb02b7f57c7.png",
  };

  const MILESTONE_CARD_CONFIG = {
    Rissa: {
      kicker: "Fra Fosna-Folket-land",
      title: "Rissa",
      text: "Avsparket går i Rissa, og nå sender Fosen Fosningen ut på VM-jakt.",
      imagePath: ASSET_PATHS.reinKloster,
    },
    Brekstad: {
      kicker: "Ut mot kysten",
      title: "Brekstad",
      text: "Brekstad er passert. Nå lukter det storreise og enda større fotballdrømmer.",
      imagePath: ASSET_PATHS.austrattBorgen,
    },
    Norskehavet: {
      kicker: "Den lange etappen",
      title: "Norskehavet",
      text: "Herfra handler alt om å holde kursen. Store deler av reisen går nå ute på havet.",
    },
    Island: {
      kicker: "Vestover",
      title: "Island",
      text: "Island er innen rekkevidde. VM-drømmen lever i beste velgående.",
    },
    Grønland: {
      kicker: "Kald milepæl",
      title: "Grønland",
      text: "Det er kaldt, langt og krevende, men Fosningen holder stø kurs mot VM.",
    },
    Newfoundland: {
      kicker: "Nesten framme",
      title: "Newfoundland",
      text: "Land i sikte. Atlanterhavet er nesten lagt bak ham nå.",
    },
    "New York": {
      kicker: "VM-pulsen stiger",
      title: "New York",
      text: "New York er passert. Nå er det bare innspurten igjen før VM-alvoret starter.",
    },
    VM: {
      kicker: "Alt står på spill",
      title: "VM",
      text: "Nå gjelder det. Ett siste rykk, så er Fosningen VM-klar.",
    },
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
    if (distance < 1500) {
      return "fosen";
    }
    if (distance < 3200) {
      return "ocean";
    }
    if (distance < 4200) {
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

      function readPixel(x, y) {
        const index = (y * width + x) * 4;
        return {
          red: data[index],
          green: data[index + 1],
          blue: data[index + 2],
          alpha: data[index + 3],
        };
      }

      const corners = [
        readPixel(0, 0),
        readPixel(width - 1, 0),
        readPixel(0, height - 1),
        readPixel(width - 1, height - 1),
      ].filter((pixel) => pixel.alpha > 0);

      if (corners.length === 0) {
        return canvas;
      }

      const background = corners.reduce(
        (accumulator, pixel) => ({
          red: accumulator.red + pixel.red,
          green: accumulator.green + pixel.green,
          blue: accumulator.blue + pixel.blue,
        }),
        { red: 0, green: 0, blue: 0 }
      );
      background.red /= corners.length;
      background.green /= corners.length;
      background.blue /= corners.length;
      const backgroundBrightness = (background.red + background.green + background.blue) / 3;
      const tolerance = backgroundBrightness > 180 ? 40 : 55;

      function isBackgroundPixel(offset) {
        const red = data[offset];
        const green = data[offset + 1];
        const blue = data[offset + 2];
        const alpha = data[offset + 3];
        if (alpha === 0) {
          return false;
        }
        return (
          Math.abs(red - background.red) <= tolerance &&
          Math.abs(green - background.green) <= tolerance &&
          Math.abs(blue - background.blue) <= tolerance
        );
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
      return trimTransparentCanvas(canvas) || canvas;
    } catch {
      return null;
    }
  }

  function trimTransparentCanvas(sourceCanvas) {
    try {
      if (!sourceCanvas || !sourceCanvas.width || !sourceCanvas.height) {
        return null;
      }

      const sourceContext = sourceCanvas.getContext("2d");
      if (!sourceContext) {
        return null;
      }

      const { width, height } = sourceCanvas;
      const imageData = sourceContext.getImageData(0, 0, width, height);
      const data = imageData.data;
      let minX = width;
      let minY = height;
      let maxX = -1;
      let maxY = -1;

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha > 0) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      if (maxX < minX || maxY < minY) {
        return null;
      }

      const trimmedCanvas = document.createElement("canvas");
      trimmedCanvas.width = maxX - minX + 1;
      trimmedCanvas.height = maxY - minY + 1;
      const trimmedContext = trimmedCanvas.getContext("2d");
      if (!trimmedContext) {
        return null;
      }

      trimmedContext.drawImage(
        sourceCanvas,
        minX,
        minY,
        trimmedCanvas.width,
        trimmedCanvas.height,
        0,
        0,
        trimmedCanvas.width,
        trimmedCanvas.height
      );

      return trimmedCanvas;
    } catch {
      return null;
    }
  }


  function initializeWidget(root, widgetIndex) {
    if (!root || root.dataset.widgetReady === "true") {
      return;
    }

    root.dataset.widgetReady = "true";
    if (widgetIndex > 0 || !root.id || !root.id.startsWith("pm-widget-fosningen-vm-reise")) {
      root.id = widgetIndex === 0 ? "pm-widget-fosningen-vm-reise" : `pm-widget-fosningen-vm-reise-${widgetIndex + 1}`;
    }

    const elements = {
      kmCount: root.querySelector('[data-role="km-count"]'),
      scoreCount: root.querySelector('[data-role="score-count"]'),
      speedCount: root.querySelector('[data-role="speed-count"]'),
      routeCopy: root.querySelector('[data-role="route-copy"]'),
      progressFill: root.querySelector('[data-role="progress-fill"]'),
      factBox: root.querySelector('[data-role="fact-box"]'),
      milestoneBox: root.querySelector('[data-role="milestone-box"]'),
      milestoneMedia: root.querySelector('[data-role="milestone-media"]'),
      milestoneKicker: root.querySelector('[data-role="milestone-kicker"]'),
      milestoneTitle: root.querySelector('[data-role="milestone-title"]'),
      milestoneText: root.querySelector('[data-role="milestone-text"]'),
      canvasShell: root.querySelector('.pmwv-canvas-shell'),
      canvas: root.querySelector('[data-role="game-canvas"]'),
      startOverlay: root.querySelector('[data-role="start-overlay"]'),
      gameOverOverlay: root.querySelector('[data-role="game-over-overlay"]'),
      gameCard: root.querySelector('.pmwv-game-card'),
      gameOverPanel: root.querySelector('[data-role="game-over-panel"]'),
      gameOverTitle: root.querySelector('[data-role="game-over-title"]'),
      gameOverText: root.querySelector('[data-role="game-over-text"]'),
      victoryBanner: root.querySelector('[data-role="victory-banner"]'),
      startButton: root.querySelector('[data-role="start-button"]'),
      startFullscreenButton: root.querySelector('[data-role="start-fullscreen-button"]'),
      fullscreenButton: root.querySelector('[data-role="fullscreen-button"]'),
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
      playerHurt: createImageAsset(ASSET_PATHS.playerHurt),
      playerStopped: createImageAsset(ASSET_PATHS.playerStopped),
      playerWin: createImageAsset(ASSET_PATHS.playerWin),
      bonusCoin: createImageAsset(ASSET_PATHS.bonusCoin),
      bonusBall: createImageAsset(ASSET_PATHS.bonusBall),
      bonusTrophy: createImageAsset(ASSET_PATHS.bonusTrophy),
      bonusSoup: createImageAsset(ASSET_PATHS.bonusSoup),
      swedeDefend: createImageAsset(ASSET_PATHS.swedeDefend),
      swedeDive: createImageAsset(ASSET_PATHS.swedeDive),
      swedeSlide: createImageAsset(ASSET_PATHS.swedeSlide),
      swedeStand: createImageAsset(ASSET_PATHS.swedeStand),
      hinderGull: createImageAsset(ASSET_PATHS.hinderGull),
      hinderTractor: createImageAsset(ASSET_PATHS.hinderTractor),
      hinderRedcard: createImageAsset(ASSET_PATHS.hinderRedcard),
      hinderYellowcard: createImageAsset(ASSET_PATHS.hinderYellowcard),
      hinderFerry: createImageAsset(ASSET_PATHS.hinderFerry),
      hinderPenguin: createImageAsset(ASSET_PATHS.hinderPenguin),
      hinderSeaSerpent: createImageAsset(ASSET_PATHS.hinderSeaSerpent),
      austrattBorgen: createImageAsset(ASSET_PATHS.austrattBorgen),
      alteneset: createImageAsset(ASSET_PATHS.alteneset),
      fosenBrygge: createImageAsset(ASSET_PATHS.fosenBrygge),
      harbaksetra: createImageAsset(ASSET_PATHS.harbaksetra),
      munkstigen: createImageAsset(ASSET_PATHS.munkstigen),
      reinKloster: createImageAsset(ASSET_PATHS.reinKloster),
      iconSheet: createImageAsset(ASSET_PATHS.iconSheet),
    };
    const preparedPlayerSprites = {};
    const preparedObstacleSprites = {};
    const preparedBackdropSprites = {};

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
      crashPose: "stopped",
      lastPickupMessage: WIDGET_CONFIG.facts[0],
      finalTokensCollected: 0,
      player: {
        x: 72,
        y: 0,
        width: 112,
        height: 116,
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
      const shell = elements.canvasShell || root;
      const isFullscreen = root.classList.contains("pmwv-is-fullscreen");
      const availableWidth = Math.max(320, Math.floor((shell.clientWidth || root.clientWidth) - 2));

      let width = Math.min(980, availableWidth);
      let height = Math.floor(width * 0.5625);

      if (isFullscreen && shell.clientHeight > 0) {
        const maxHeight = Math.max(240, Math.floor(shell.clientHeight - 6));
        if (height > maxHeight) {
          height = maxHeight;
          width = Math.floor(height / 0.5625);
        }
      }

      elements.canvas.width = CANVAS_WIDTH;
      elements.canvas.height = CANVAS_HEIGHT;
      elements.canvas.style.width = `${width}px`;
      elements.canvas.style.height = `${height}px`;
    }

    function currentStage() {
      return stageForDistance(state.distance);
    }

    function setFact(text) {
      if (elements.factBox) {
        elements.factBox.textContent = text;
      }
    }

    function showMilestoneToast(payload) {
      if (!elements.milestoneBox) {
        return;
      }
      const fallbackText = typeof payload === "string" ? payload : payload?.text || "";
      const card = typeof payload === "string" ? null : payload;
      state.milestoneToast.text = fallbackText;
      state.milestoneToast.ttl = 210;
      if (elements.milestoneBox) {
        elements.milestoneBox.classList.remove("pmwv-hidden");
      }
      if (elements.milestoneKicker) {
        elements.milestoneKicker.textContent = card?.kicker || "Milepæl";
      }
      if (elements.milestoneTitle) {
        elements.milestoneTitle.textContent = card?.title || fallbackText;
      }
      if (elements.milestoneText) {
        elements.milestoneText.textContent = card?.bodyText || card?.text || fallbackText;
      }
      if (elements.milestoneMedia) {
        if (card?.imagePath) {
          elements.milestoneMedia.style.backgroundImage = `url("${encodeURI(card.imagePath)}")`;
          elements.milestoneMedia.classList.remove("pmwv-hidden");
        } else {
          elements.milestoneMedia.style.backgroundImage = "";
          elements.milestoneMedia.classList.add("pmwv-hidden");
        }
      }
    }

    function hideMilestoneToast() {
      state.milestoneToast.ttl = 0;
      state.milestoneToast.text = "";
      if (elements.milestoneBox) {
        elements.milestoneBox.classList.add("pmwv-hidden");
      }
      if (elements.milestoneMedia) {
        elements.milestoneMedia.style.backgroundImage = "";
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
            ? ` Finaleutfordring: ${state.finalTokensCollected} av ${WIDGET_CONFIG.finalTokensRequired} VM-symboler.`
            : "";
        elements.routeCopy.textContent =
          `Du har kommet ${formatNumber(travelled)} km. Det er ${formatNumber(remaining)} km igjen til VM.` +
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
      state.crashPose = "stopped";
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

    function stageObstacleTypes(stage) {
      const simplified = {
        fosen: ["tractor", "gull", "ferry"],
        ocean: ["gull", "seamonster", "ferry"],
        island: ["seamonster"],
        ice: ["seamonster", "penguin"],
        canada: ["defender", "penguin"],
        usa: ["defender", "redcard"],
        finale: ["goalkeeper", "defender"],
      };
      return simplified[stage] || [];
    }

    function spawnObstacle() {
      if (state.obstacles.some((obstacle) => obstacle.x > elements.canvas.width - 300)) {
        return;
      }
      const stage = currentStage();
      const variants = WIDGET_CONFIG.obstacleTypes.filter(
        (entry) =>
          (entry.stages.includes("all") || entry.stages.includes(stage)) &&
          stageObstacleTypes(stage).includes(entry.type)
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
      const width = chosen.type === "trophy" ? 72 : chosen.type === "sodd" ? 68 : 62;
      const height = chosen.type === "trophy" ? 72 : chosen.type === "sodd" ? 68 : 62;
      const yRange = chosen.maxY - chosen.minY;
      const offsetY = chosen.minY + Math.random() * Math.max(0, yRange);
      state.pickups.push({
        ...chosen,
        x: elements.canvas.width + 64,
        y: WIDGET_CONFIG.groundY - 168 - offsetY,
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

    function getPreparedObstacleSprite(name, asset) {
      if (!asset || !asset.complete || !asset.naturalWidth) {
        return null;
      }
      if (!(name in preparedObstacleSprites)) {
        preparedObstacleSprites[name] = createCornerMaskedCanvasFromImage(asset) || asset;
      }
      return preparedObstacleSprites[name];
    }

    function getPreparedBackdropSprite(name, asset) {
      if (!asset || !asset.complete || !asset.naturalWidth) {
        return null;
      }
      if (!(name in preparedBackdropSprites)) {
        preparedBackdropSprites[name] = createCornerMaskedCanvasFromImage(asset) || asset;
      }
      return preparedBackdropSprites[name];
    }

    function drawBackdropSprite(assetName, imageAsset, x, groundY, width, height, options = {}) {
      const sprite = getPreparedBackdropSprite(assetName, imageAsset);
      if (!sprite) {
        return false;
      }
      const baseY = groundY - height;
      const shadowOpacity = options.shadowOpacity ?? 0.14;
      const hazeOpacity = options.hazeOpacity ?? 0.08;

      ctx.save();
      ctx.fillStyle = `rgba(20, 35, 40, ${shadowOpacity})`;
      ctx.beginPath();
      ctx.ellipse(x + width * 0.5, groundY - 4, width * 0.34, Math.max(8, height * 0.06), 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(
        sprite,
        0,
        0,
        sprite.width || sprite.naturalWidth,
        sprite.height || sprite.naturalHeight,
        x,
        baseY,
        width,
        height
      );
      const haze = ctx.createLinearGradient(0, baseY + height * 0.2, 0, groundY);
      haze.addColorStop(0, `rgba(255,255,255,0)`);
      haze.addColorStop(1, `rgba(255,255,255,${hazeOpacity})`);
      ctx.fillStyle = haze;
      ctx.fillRect(x, baseY, width, height);
      ctx.restore();
      return true;
    }

    function mixColorChannel(from, to, ratio) {
      return Math.round(from + (to - from) * ratio);
    }

    function colorFromRgb(rgb) {
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }

    function mixRgb(from, to, ratio) {
      return [
        mixColorChannel(from[0], to[0], ratio),
        mixColorChannel(from[1], to[1], ratio),
        mixColorChannel(from[2], to[2], ratio),
      ];
    }

    function journeyProgress() {
      return Math.max(0, Math.min(1, state.distance / WIDGET_CONFIG.totalDistance));
    }

    function environmentBlend() {
      const distance = state.distance;
      const landToOcean = Math.max(0, Math.min(1, (distance - 1200) / 650));
      const oceanToIce = Math.max(0, Math.min(1, (distance - 3300) / 700));
      const iceToOcean = Math.max(0, Math.min(1, (distance - 4800) / 500));
      const oceanToAmerica = Math.max(0, Math.min(1, (distance - 5600) / 600));

      const land = 1 - landToOcean;
      const ice = oceanToIce * (1 - iceToOcean);
      const ocean = landToOcean * (1 - oceanToIce) + iceToOcean * (1 - oceanToAmerica);
      const america = oceanToAmerica;

      return {
        land: Math.max(0, Math.min(1, land)),
        ocean: Math.max(0, Math.min(1, ocean)),
        ice: Math.max(0, Math.min(1, ice)),
        america: Math.max(0, Math.min(1, america)),
      };
    }

    function stageMoodPalette() {
      const progress = journeyProgress();
      if (progress < 0.3) {
        const ratio = progress / 0.3;
        return {
          top: mixRgb([145, 214, 255], [126, 196, 255], ratio),
          mid: mixRgb([227, 246, 255], [202, 232, 255], ratio),
          groundTop: mixRgb([132, 214, 112], [120, 204, 109], ratio),
          groundBottom: mixRgb([90, 172, 88], [83, 163, 82], ratio),
        };
      }
      if (progress < 0.68) {
        const ratio = (progress - 0.3) / 0.38;
        return {
          top: mixRgb([126, 196, 255], [166, 221, 244], ratio),
          mid: mixRgb([202, 232, 255], [236, 251, 255], ratio),
          groundTop: mixRgb([120, 204, 109], [143, 214, 124], ratio),
          groundBottom: mixRgb([83, 163, 82], [91, 170, 88], ratio),
        };
      }
      const ratio = (progress - 0.68) / 0.32;
      return {
        top: mixRgb([166, 221, 244], [255, 174, 120], ratio),
        mid: mixRgb([236, 251, 255], [255, 230, 196], ratio),
        groundTop: mixRgb([143, 214, 124], [180, 201, 108], ratio),
        groundBottom: mixRgb([91, 170, 88], [122, 151, 78], ratio),
      };
    }

    function drawLandmarkLabel(text, x, y) {
      if (!text) {
        return;
      }
      ctx.save();
      ctx.font = '600 14px var(--font-system, system-ui, sans-serif)';
      const textWidth = ctx.measureText(text).width;
      const pillWidth = Math.max(88, textWidth + 24);
      ctx.fillStyle = "rgba(15, 23, 42, 0.78)";
      ctx.beginPath();
      ctx.roundRect(x - pillWidth / 2, y - 16, pillWidth, 30, 10);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x, y - 1);
      ctx.restore();
    }

    function drawBackdropSequence(items, speedFactor, wrapWidth, options = {}) {
      const showLabels = options.showLabels !== false;
      const spriteOptions = options.spriteOptions || {};
      const shift = ((state.backgroundShift * speedFactor) % wrapWidth) * -1;
      items.forEach((item) => {
        let drawX = item.startX + shift;
        while (drawX < -item.width - 40) {
          drawX += wrapWidth;
        }
        if (drawX < elements.canvas.width + 120) {
          drawBackdropSprite(item.key, item.asset, drawX, item.groundY, item.width, item.height, {
            shadowOpacity: item.shadowOpacity ?? spriteOptions.shadowOpacity,
            hazeOpacity: item.hazeOpacity ?? spriteOptions.hazeOpacity,
          });
          if (showLabels && item.label && drawX > -item.width * 0.4 && drawX < elements.canvas.width - item.width * 0.2) {
            drawLandmarkLabel(item.label, drawX + item.width * 0.5, item.groundY - item.height - 16);
          }
        }
      });
    }

    function drawHorizonBlend(topY, bottomY, colorA, colorB) {
      const gradient = ctx.createLinearGradient(0, topY, 0, bottomY);
      gradient.addColorStop(0, colorA);
      gradient.addColorStop(1, colorB);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, topY, elements.canvas.width, bottomY - topY);
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
        const text = `Fosningen har nådd ${nextMilestone.label}! Bare ${formatNumber(remaining)} km igjen til VM.`;
        setFact(text);
        showMilestoneToast({
          ...(MILESTONE_CARD_CONFIG[nextMilestone.label] || {}),
          text,
          bodyText: MILESTONE_CARD_CONFIG[nextMilestone.label]?.text,
        });
      }
    }

    function endGame(won) {
      state.running = false;
      state.gameOver = true;
      state.won = won;

      if (!won) {
        state.player.vy = 0;
        state.player.jumping = false;
        state.player.y = WIDGET_CONFIG.groundY - state.player.height;
      }

      if (elements.gameOverTitle) {
        elements.gameOverTitle.textContent = won ? "Fosningen kom til VM!" : "Der sa det stopp";
      }
      if (elements.gameOverText) {
        elements.gameOverText.textContent = won
          ? `Gratulerer! Du fikk Fosningen hele veien til VM med sterke ${formatNumber(state.score)} poeng.`
          : `${state.crashMessage || "Reisen stoppet opp."} Du samlet ${formatNumber(Math.floor(state.distance))} km og ${formatNumber(state.score)} poeng.`;
      }

      if (won) {
        setFact("Fosningen er VM-klar!");
        if (elements.victoryBanner) {
          elements.victoryBanner.classList.remove("pmwv-hidden");
        }
        if (elements.gameOverPanel) {
          elements.gameOverPanel.classList.add("pmwv-victory");
        }
        showMilestoneToast("VM er nådd! Fosningen er klar for den store scenen.");
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
      addParticles(pickup.x, pickup.y, pickup.type === "trophy" || pickup.type === "coin" ? "#ffd166" : "#ffffff", 5, 12);

      if (currentStage() === "finale" && pickup.finalToken) {
        state.finalTokensCollected += 1;
        showMilestoneToast(`Finale! Samle ${WIDGET_CONFIG.finalTokensRequired} VM-symboler: ${state.finalTokensCollected} av ${WIDGET_CONFIG.finalTokensRequired}.`);
      }
    }

    function canFinishJourney() {
      if (currentStage() !== "finale") {
        return state.distance >= WIDGET_CONFIG.totalDistance;
      }
      return state.distance >= WIDGET_CONFIG.totalDistance && state.finalTokensCollected >= WIDGET_CONFIG.finalTokensRequired;
    }

    function crashPoseForObstacle(obstacleType) {
      return obstacleType === "gull" || obstacleType === "defender" || obstacleType === "goalkeeper" ? "hurt" : "stopped";
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
      const obstacleDelay = stage === "finale" ? 152 : stage === "ocean" ? 168 : 158;
      const pickupDelay = stage === "finale" ? 48 : 52;

      if (state.obstacleTimer > Math.max(112, obstacleDelay - state.speed * 3.6)) {
        spawnObstacle();
        state.obstacleTimer = 0;
      }

      if (state.pickupTimer > Math.max(24, pickupDelay - state.speed * 2.2)) {
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
          state.crashPose = crashPoseForObstacle(obstacle.type);
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

      if (state.distance >= WIDGET_CONFIG.totalDistance && currentStage() === "finale" && state.finalTokensCollected < WIDGET_CONFIG.finalTokensRequired) {
        setFact(`VM-målvakta venter. Samle ${WIDGET_CONFIG.finalTokensRequired - state.finalTokensCollected} VM-symboler til for å vinne.`);
      }

      if (canFinishJourney()) {
        endGame(true);
      }

      draw();
    }

    function drawSky() {
      const mood = stageMoodPalette();
      const gradient = ctx.createLinearGradient(0, 0, 0, elements.canvas.height);
      gradient.addColorStop(0, colorFromRgb(mood.top));
      gradient.addColorStop(0.42, colorFromRgb(mood.mid));
      gradient.addColorStop(0.43, colorFromRgb(mood.groundTop));
      gradient.addColorStop(1, colorFromRgb(mood.groundBottom));
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
      const blend = environmentBlend();
      const seaStrength = Math.max(blend.ocean, blend.ice * 0.9, blend.america * 0.22);
      const progress = journeyProgress();
      const seaMain = blend.ice > 0.35 ? "#7db8d6" : seaStrength > 0.35 ? "#5da9de" : progress > 0.68 ? "#73a9d8" : progress > 0.3 ? "#7bc7f3" : "#83cfff";
      const seaStripe = blend.ice > 0.35 ? "#5f95b5" : seaStrength > 0.35 ? "#3f8fc7" : progress > 0.68 ? "#5f92c3" : progress > 0.3 ? "#58afe7" : "#63b9ee";
      const topY = Math.round(WIDGET_CONFIG.groundY - (44 + seaStrength * 76));
      ctx.fillStyle = seaMain;
      ctx.fillRect(0, topY, elements.canvas.width, WIDGET_CONFIG.groundY - topY);
      ctx.fillStyle = seaStripe;
      for (let index = 0; index < (seaStrength > 0.35 ? 18 : 16); index += 1) {
        const x = ((index * 90) - state.backgroundShift * 2.4) % (elements.canvas.width + 100);
        const y = seaStrength > 0.35 ? topY + 22 + ((index % 3) * 18) : WIDGET_CONFIG.groundY - 18;
        ctx.fillRect(x, y, seaStrength > 0.35 ? 58 : 42, 3);
      }
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      for (let index = 0; index < (seaStrength > 0.35 ? 14 : 10); index += 1) {
        const x = ((index * 130) - state.backgroundShift * 1.2) % (elements.canvas.width + 160);
        const y = seaStrength > 0.35 ? topY + 10 + ((index % 4) * 20) : WIDGET_CONFIG.groundY - 32;
        ctx.fillRect(x, y, seaStrength > 0.35 ? 74 : 58, 2);
      }
      if (seaStrength > 0.15) {
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.fillRect(0, topY, elements.canvas.width, 4);
      }
    }

    function drawBackdropLayer(alpha, drawFn, offsetX) {
      if (alpha <= 0.02) {
        return;
      }
      ctx.save();
      ctx.globalAlpha = alpha;
      drawFn(offsetX);
      ctx.restore();
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
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(-260, 110, 460, 6);
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
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      ctx.fillRect(-260, 108, 520, 5);
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
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(-220, 110, 460, 6);
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
      ctx.fillStyle = "rgba(255, 201, 120, 0.18)";
      ctx.fillRect(-240, 106, 470, 8);
      ctx.restore();

    }

    function drawBackground() {
      const shift = state.backgroundShift % elements.canvas.width;
      drawSky();
      const progress = journeyProgress();
      const stage = currentStage();
      const blend = environmentBlend();
      const seaStrength = Math.max(blend.ocean, blend.ice * 0.9, blend.america * 0.22);
      const isSeaJourney = seaStrength > 0.35;

      for (let index = -1; index < 3; index += 1) {
        const x = index * elements.canvas.width - shift;
        const cloudColor = blend.ice > 0.35 ? "rgba(245, 250, 255, 0.94)" : progress > 0.7 ? "rgba(255,236,210,0.92)" : "rgba(255,255,255,0.94)";
        drawCloud(x + 110, 72, 1.12, cloudColor);
        drawCloud(x + 690, 82, 0.88, blend.america > 0.35 ? "rgba(255,239,221,0.9)" : cloudColor);
        if (!isSeaJourney) {
          drawCloud(x + 360, 124, 0.74, progress > 0.7 ? "rgba(255,229,198,0.84)" : "rgba(255,255,255,0.86)");
          drawCloud(x + 520, 54, 0.46, "rgba(255,255,255,0.6)");
        }
      }

      drawSeaBand();
      ctx.fillStyle = progress > 0.65 ? "rgba(255, 188, 102, 0.12)" : "rgba(255,255,255,0.08)";
      ctx.fillRect(0, 0, elements.canvas.width, 220);

      const farParallax = ((state.backgroundShift * 0.18) % 360) * -1;
      const parallax = ((state.backgroundShift * 0.35) % 280) * -1;
      const nearParallax = ((state.backgroundShift * 0.52) % 240) * -1;

      if (blend.land > 0.1 || blend.america > 0.22) {
        ctx.fillStyle = "rgba(115, 152, 190, 0.55)";
        for (let index = -1; index < 4; index += 1) {
          const baseX = index * 340 + farParallax;
          ctx.beginPath();
          ctx.moveTo(baseX - 50, 316);
          ctx.lineTo(baseX + 68, 204);
          ctx.lineTo(baseX + 176, 316);
          ctx.closePath();
          ctx.fill();
        }
        drawHorizonBlend(WIDGET_CONFIG.groundY - 120, WIDGET_CONFIG.groundY - 44, "rgba(126, 191, 218, 0.18)", "rgba(126, 191, 218, 0)");
      }

      if (seaStrength > 0.08) {
        ctx.fillStyle = blend.ice > 0.35 ? "rgba(220, 244, 250, 0.75)" : "rgba(255,255,255,0.2)";
        for (let index = -1; index < 4; index += 1) {
          const waveX = index * 320 + farParallax;
          ctx.beginPath();
          ctx.moveTo(waveX, 292);
          ctx.quadraticCurveTo(waveX + 70, 270, waveX + 140, 292);
          ctx.quadraticCurveTo(waveX + 210, 314, waveX + 280, 292);
          ctx.lineTo(waveX + 280, 320);
          ctx.lineTo(waveX, 320);
          ctx.closePath();
          ctx.fill();
        }
        drawHorizonBlend(WIDGET_CONFIG.groundY - 170, WIDGET_CONFIG.groundY - 96, "rgba(255,255,255,0.18)", "rgba(255,255,255,0)");
      }

      drawBackdropLayer(blend.land * 0.72, drawLocalBackdrop, parallax);
      drawBackdropLayer(blend.land, drawCityBackdrop, parallax);
      drawBackdropLayer(blend.ocean, drawOceanBackdrop, parallax);
      drawBackdropLayer(blend.ice, drawIceBackdrop, parallax);
      drawBackdropLayer(blend.america, drawNorthAmericaBackdrop, parallax);

      if (blend.land > 0.18 || blend.america > 0.28) {
        ctx.fillStyle = "rgba(40, 86, 44, 0.14)";
        for (let index = -1; index < 5; index += 1) {
          const hedgeX = index * 230 + nearParallax;
          ctx.fillRect(hedgeX, WIDGET_CONFIG.groundY - 12, 26, 52);
          ctx.fillRect(hedgeX + 42, WIDGET_CONFIG.groundY - 18, 20, 58);
        }
      }

      const mood = stageMoodPalette();
      ctx.fillStyle = colorFromRgb(mood.groundBottom);
      ctx.fillRect(0, WIDGET_CONFIG.groundY, elements.canvas.width, elements.canvas.height - WIDGET_CONFIG.groundY);
      ctx.fillStyle = colorFromRgb(mood.groundTop);
      ctx.fillRect(0, WIDGET_CONFIG.groundY - 34, elements.canvas.width, 34);
      if (seaStrength > 0.35) {
        drawHorizonBlend(WIDGET_CONFIG.groundY - 34, WIDGET_CONFIG.groundY + 8, "rgba(255,255,255,0.2)", "rgba(255,255,255,0)");
      } else {
        drawHorizonBlend(WIDGET_CONFIG.groundY - 48, WIDGET_CONFIG.groundY - 8, "rgba(255,255,255,0.1)", "rgba(255,255,255,0)");
      }
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
      const runPhase = state.running ? Math.sin(state.backgroundShift * 0.16) : 0;
      const isWinning = state.gameOver && state.won;
      const isCrashed = state.gameOver && !state.won;
      const lift = state.player.jumping ? -18 : isCrashed ? 0 : runPhase * 1.6;

      ctx.save();
      ctx.translate(x, y + lift);

      if (!state.player.jumping && !isCrashed) {
        ctx.fillStyle = "rgba(16, 24, 32, 0.08)";
        ctx.beginPath();
        ctx.ellipse(width * 0.48, height - 4, width * 0.24, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      let sprite = assets.playerIdle;
      if (isWinning) {
        sprite = assets.playerWin;
      } else if (isCrashed) {
        const crashSprite = state.crashPose === "hurt" ? assets.playerHurt : assets.playerStopped;
        sprite = crashSprite.complete && crashSprite.naturalWidth ? crashSprite : assets.playerIdle;
      } else if (state.player.jumping) {
        sprite = assets.playerJump;
      } else if (state.running) {
        const runFrames = [assets.playerRunA, assets.playerRunB, assets.playerRunC];
        sprite = runFrames[Math.floor((state.backgroundShift / 22) % runFrames.length)] || assets.playerIdle;
      }

      const preparedSprite = getPreparedPlayerSprite(
        isWinning
          ? "playerWin"
          : isCrashed
            ? state.crashPose === "hurt"
              ? "playerHurt"
              : "playerStopped"
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
        const isJumping = state.player.jumping;
        const poseName = isWinning
          ? "playerWin"
          : isCrashed
            ? state.crashPose === "hurt"
              ? "playerHurt"
              : "playerStopped"
          : isJumping
            ? "playerJump"
            : state.running
              ? sprite === assets.playerRunA
                ? "playerRunA"
                : sprite === assets.playerRunB
                  ? "playerRunB"
                  : "playerRunC"
              : "playerIdle";
        const poseConfig = {
          playerIdle: { scale: 1.16, anchorX: 0.5, anchorY: 1, dx: 0, dy: 0, sway: 0.01 },
          playerRunA: { scale: 1.16, anchorX: 0.5, anchorY: 1, dx: -2, dy: 0, sway: 0.015 },
          playerRunB: { scale: 1.16, anchorX: 0.5, anchorY: 1, dx: 0, dy: 1, sway: 0.012 },
          playerRunC: { scale: 1.16, anchorX: 0.5, anchorY: 1, dx: 2, dy: 0, sway: 0.015 },
          playerJump: { scale: 1.28, anchorX: 0.52, anchorY: 0.96, dx: 0, dy: -8, sway: 0.08 },
          playerHurt: { scale: 1.12, anchorX: 0.5, anchorY: 1, dx: 0, dy: -2, sway: 0 },
          playerStopped: { scale: 1.18, anchorX: 0.5, anchorY: 1, dx: 0, dy: 2, sway: 0 },
          playerWin: { scale: 1.3, anchorX: 0.5, anchorY: 1, dx: 0, dy: -4, sway: -0.04 },
        }[poseName] || { scale: 1.16, anchorX: 0.5, anchorY: 1, dx: 0, dy: 0, sway: 0.01 };
        const sway = isWinning || isCrashed ? poseConfig.sway : isJumping ? poseConfig.sway : runPhase * poseConfig.sway;
        const scaleX = isWinning ? 1.06 : 1;
        const scaleY = isWinning ? 1.06 : 1;
        const drawWidth = width * poseConfig.scale;
        const drawHeight = height * poseConfig.scale;
        const drawX = -drawWidth * poseConfig.anchorX + poseConfig.dx;
        const drawY = height - drawHeight * poseConfig.anchorY + poseConfig.dy;
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
          drawX,
          drawY,
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

      if (obstacle.type === "defender") {
        const sprite = getPreparedObstacleSprite("swedeSlide", assets.swedeSlide);
        if (sprite) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(
            sprite,
            0,
            0,
            sprite.width || sprite.naturalWidth,
            sprite.height || sprite.naturalHeight,
            0,
            0,
            obstacle.width,
            obstacle.height
          );
          ctx.restore();
          return;
        }
      }

      if (obstacle.type === "goalkeeper") {
        const sprite = getPreparedObstacleSprite("swedeDive", assets.swedeDive);
        if (sprite) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(
            sprite,
            0,
            0,
            sprite.width || sprite.naturalWidth,
            sprite.height || sprite.naturalHeight,
            0,
            0,
            obstacle.width,
            obstacle.height
          );
          ctx.restore();
          return;
        }
      }

      if (obstacle.type === "gull") {
        const sprite = getPreparedObstacleSprite("hinderGull", assets.hinderGull);
        if (sprite) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(sprite, 0, 0, sprite.width || sprite.naturalWidth, sprite.height || sprite.naturalHeight, 0, 0, obstacle.width, obstacle.height);
          ctx.restore();
          return;
        }
      }

      if (obstacle.type === "tractor") {
        const sprite = getPreparedObstacleSprite("hinderTractor", assets.hinderTractor);
        if (sprite) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(sprite, 0, 0, sprite.width || sprite.naturalWidth, sprite.height || sprite.naturalHeight, 0, 0, obstacle.width, obstacle.height);
          ctx.restore();
          return;
        }
      }

      if (obstacle.type === "redcard") {
        const sprite = getPreparedObstacleSprite("hinderRedcard", assets.hinderRedcard);
        if (sprite) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(sprite, 0, 0, sprite.width || sprite.naturalWidth, sprite.height || sprite.naturalHeight, 0, 0, obstacle.width, obstacle.height);
          ctx.restore();
          return;
        }
      }

      if (obstacle.type === "yellowcard") {
        const sprite = getPreparedObstacleSprite("hinderYellowcard", assets.hinderYellowcard);
        if (sprite) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(sprite, 0, 0, sprite.width || sprite.naturalWidth, sprite.height || sprite.naturalHeight, 0, 0, obstacle.width, obstacle.height);
          ctx.restore();
          return;
        }
      }

      if (obstacle.type === "ferry") {
        const sprite = getPreparedObstacleSprite("hinderFerry", assets.hinderFerry);
        if (sprite) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(sprite, 0, 0, sprite.width || sprite.naturalWidth, sprite.height || sprite.naturalHeight, 0, 0, obstacle.width, obstacle.height);
          ctx.restore();
          return;
        }
      }

      if (obstacle.type === "penguin") {
        const sprite = getPreparedObstacleSprite("hinderPenguin", assets.hinderPenguin);
        if (sprite) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(sprite, 0, 0, sprite.width || sprite.naturalWidth, sprite.height || sprite.naturalHeight, 0, 0, obstacle.width, obstacle.height);
          ctx.restore();
          return;
        }
      }

      if (obstacle.type === "seamonster") {
        const sprite = getPreparedObstacleSprite("hinderSeaSerpent", assets.hinderSeaSerpent);
        if (sprite) {
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(sprite, 0, 0, sprite.width || sprite.naturalWidth, sprite.height || sprite.naturalHeight, 0, 0, obstacle.width, obstacle.height);
          ctx.restore();
          return;
        }
      }

      switch (obstacle.type) {
        case "defender":
          drawDefender(obstacle, false);
          break;
        case "tractor":
          drawTractor(obstacle);
          break;
        case "goalkeeper":
          drawDefender(obstacle, true);
          break;
        default:
          drawTractor(obstacle);
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

    function drawSoup() {
      ctx.fillStyle = "#f7f8fb";
      ctx.beginPath();
      ctx.roundRect(8, 16, 32, 18, 8);
      ctx.fill();
      ctx.strokeStyle = "#6d87b8";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#a68845";
      ctx.beginPath();
      ctx.ellipse(24, 18, 13, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.beginPath();
      ctx.moveTo(18, 8);
      ctx.quadraticCurveTo(14, 2, 18, -2);
      ctx.moveTo(26, 8);
      ctx.quadraticCurveTo(30, 2, 26, -2);
      ctx.stroke();
    }

    function pickupAccent(type) {
      const accents = {
        coin: "#d8a82f",
        ball: "#2d7fb8",
        trophy: "#d8a82f",
        sodd: "#7f8fa6",
      };
      return accents[type] || "#7a8aa0";
    }

    function drawPickupToken(pickup, drawInner) {
      const accent = pickupAccent(pickup.type);
      const isRare = pickup.type === "trophy" || pickup.type === "coin";
      const outerRadius = Math.min(pickup.width, pickup.height) * 0.47;
      const innerRadius = outerRadius * 0.82;

      ctx.save();
      ctx.translate(pickup.width * 0.5, pickup.height * 0.5);

      if (isRare) {
        ctx.shadowColor = `${accent}66`;
        ctx.shadowBlur = 16;
      }

      ctx.fillStyle = "rgba(255,255,255,0.96)";
      ctx.beginPath();
      ctx.arc(0, 0, outerRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.lineWidth = 3;
      ctx.strokeStyle = accent;
      ctx.stroke();

      ctx.fillStyle = "rgba(248,250,253,0.98)";
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(24, 33, 47, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.translate(-pickup.width * 0.5, -pickup.height * 0.5);
      drawInner();
      ctx.restore();
    }

    function drawPickup(pickup) {
      ctx.save();
      const bobOffset = Math.sin(pickup.bob) * 4;
      ctx.translate(pickup.x, pickup.y + bobOffset);

      const spriteMap = {
        coin: ["bonusCoin", assets.bonusCoin],
        ball: ["bonusBall", assets.bonusBall],
        trophy: ["bonusTrophy", assets.bonusTrophy],
        sodd: ["bonusSoup", assets.bonusSoup],
      };
      const spriteEntry = spriteMap[pickup.type];
      if (spriteEntry) {
        const [spriteKey, spriteAsset] = spriteEntry;
        const sprite = getPreparedObstacleSprite(spriteKey, spriteAsset);
        if (sprite) {
          const glow = pickup.type === "coin" || pickup.type === "trophy";
          if (glow) {
            ctx.shadowColor = "rgba(255, 210, 70, 0.5)";
            ctx.shadowBlur = 12;
          }
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(
            sprite,
            0,
            0,
            sprite.width || sprite.naturalWidth,
            sprite.height || sprite.naturalHeight,
            0,
            0,
            pickup.width,
            pickup.height
          );
          ctx.restore();
          return;
        }
      }

      switch (pickup.type) {
        case "coin":
          drawPickupToken(pickup, () => drawTrophy(pickup));
          break;
        case "ball":
          drawPickupToken(pickup, () => drawBall(pickup));
          break;
        case "trophy":
          drawPickupToken(pickup, () => drawTrophy(pickup));
          break;
        case "sodd":
          drawPickupToken(pickup, drawSoup);
          break;
        default:
          drawPickupToken(pickup, () => drawTrophy(pickup));
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

    function flashShareButton(label) {
      if (!elements.shareButton) {
        return;
      }
      elements.shareButton.textContent = label;
      window.setTimeout(() => {
        if (elements.shareButton) {
          elements.shareButton.textContent = "Del resultat";
        }
      }, 2200);
    }

    function legacyCopyText(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "readonly");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      let copied = false;
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }
      document.body.removeChild(textarea);
      return copied;
    }

    async function shareScore() {
      const shareText = state.won
        ? `Jeg fikk Fosningen til VM! ${formatNumber(Math.floor(state.distance))} km og ${formatNumber(state.score)} poeng. Klarer du å slå meg?`
        : `Jeg kom ${formatNumber(Math.floor(state.distance))} km på vei mot VM og tok ${formatNumber(state.score)} poeng i Kommer fosningen til VM?.`;
      const sharePayload = `${shareText} ${window.location.href}`.trim();

      if (navigator.share) {
        try {
          await navigator.share({
            title: "Kommer fosningen til VM?",
            text: shareText,
            url: window.location.href,
          });
          flashShareButton("Delt");
          return;
        } catch (error) {
          if (error && error.name === "AbortError") {
            return;
          }
        }
      }

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(sharePayload);
          flashShareButton("Resultatet er kopiert");
          return;
        } catch {
          // fall through to older copy method
        }
      }

      if (legacyCopyText(sharePayload)) {
        flashShareButton("Resultatet er kopiert");
        return;
      }

      window.prompt("Kopier resultatet ditt her:", sharePayload);
      flashShareButton("Klar til kopiering");
    }

    async function toggleFullscreen() {
      const target = elements.gameCard || root;
      const isFullscreen = document.fullscreenElement === target;
      try {
        if (isFullscreen) {
          await document.exitFullscreen();
        } else if (target.requestFullscreen) {
          await target.requestFullscreen();
        }
      } catch {
        return;
      }
    }

    function syncFullscreenUi() {
      const target = elements.gameCard || root;
      const active = document.fullscreenElement === target;
      root.classList.toggle("pmwv-is-fullscreen", active);
      if (elements.gameCard) {
        elements.gameCard.classList.toggle("pmwv-is-fullscreen-target", active);
      }
      if (elements.fullscreenButton) {
        elements.fullscreenButton.textContent = active ? "Lukk fullskjerm" : "Fullskjerm";
      }
      if (elements.startFullscreenButton) {
        elements.startFullscreenButton.textContent = active ? "Spill i fullskjerm" : "Start i fullskjerm";
      }
      updateCanvasSize();
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
    if (elements.startFullscreenButton) {
      elements.startFullscreenButton.addEventListener("click", async () => {
        await toggleFullscreen();
        resetGame();
      });
    }
    if (elements.fullscreenButton) {
      elements.fullscreenButton.addEventListener("click", toggleFullscreen);
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
    document.addEventListener("fullscreenchange", syncFullscreenUi);

    updateCanvasSize();
    syncFullscreenUi();
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
