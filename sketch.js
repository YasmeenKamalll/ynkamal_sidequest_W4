/*
Sidequest — Multi-Level Maze with Colored Circle Goals
JSON data + loops + dynamic level switching
*/

const TS = 28;

// ----------------------------
// LEVEL DATA (JSON STYLE)
// ----------------------------

const levelData = {
  levels: [
    {
      name: "Level 1",
      playerStart: { r: 1, c: 1 },
      goalColor: [0, 200, 120], // green
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 3, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
    {
      name: "Level 2",
      playerStart: { r: 1, c: 1 },
      goalColor: [255, 100, 150], // pink
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 3, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 3, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
    {
      name: "Level 3",
      playerStart: { r: 1, c: 1 },
      goalColor: [100, 180, 255], // blue
      grid: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 3, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
  ],
};

// ----------------------------
// LEVEL CLASS
// ----------------------------

class Level {
  constructor(data, tileSize) {
    this.grid = data.grid;
    this.goalColor = data.goalColor;
    this.playerStart = data.playerStart;
    this.ts = tileSize;
    this.remainingGoals = this.countGoals();
  }

  rows() {
    return this.grid.length;
  }
  cols() {
    return this.grid[0].length;
  }
  pixelWidth() {
    return this.cols() * this.ts;
  }
  pixelHeight() {
    return this.rows() * this.ts;
  }

  isWall(r, c) {
    return this.grid[r][c] === 1;
  }

  isGoal(r, c) {
    return this.grid[r][c] === 3;
  }

  collectGoal(r, c) {
    if (this.isGoal(r, c)) {
      this.grid[r][c] = 0;
      this.remainingGoals--;
    }
  }

  countGoals() {
    let count = 0;
    for (let r = 0; r < this.rows(); r++) {
      for (let c = 0; c < this.cols(); c++) {
        if (this.grid[r][c] === 3) count++;
      }
    }
    return count;
  }

  draw() {
    for (let r = 0; r < this.rows(); r++) {
      for (let c = 0; c < this.cols(); c++) {
        const tile = this.grid[r][c];

        if (tile === 1) {
          fill(25, 45, 70);
          rect(c * this.ts, r * this.ts, this.ts, this.ts);
        }

        if (tile === 0) {
          fill(245);
          rect(c * this.ts, r * this.ts, this.ts, this.ts);
        }

        if (tile === 3) {
          fill(...this.goalColor);
          circle(
            c * this.ts + this.ts / 2,
            r * this.ts + this.ts / 2,
            this.ts * 0.5,
          );
        }
      }
    }
  }
}

// ----------------------------
// GAME STATE
// ----------------------------

let level;
let currentLevelIndex = 0;

let player = { r: 0, c: 0, direction: 0 };

// ----------------------------
// SETUP
// ----------------------------

function setup() {
  loadLevel(0);
  noStroke();
}

function loadLevel(index) {
  const data = levelData.levels[index];
  level = new Level(data, TS);

  createCanvas(level.pixelWidth(), level.pixelHeight());

  player.r = data.playerStart.r;
  player.c = data.playerStart.c;
}

// ----------------------------
// DRAW
// ----------------------------

function draw() {
  background(230);
  level.draw();
  drawPacman();
  checkLevelComplete();
}

// ----------------------------
// PACMAN
// ----------------------------

function drawPacman() {
  const x = player.c * TS + TS / 2;
  const y = player.r * TS + TS / 2;

  fill(255, 204, 0);

  let angleOffset = 0;
  if (player.direction === 0) angleOffset = 0;
  if (player.direction === 1) angleOffset = HALF_PI;
  if (player.direction === 2) angleOffset = PI;
  if (player.direction === 3) angleOffset = -HALF_PI;

  arc(
    x,
    y,
    TS * 0.8,
    TS * 0.8,
    radians(30) + angleOffset,
    radians(330) + angleOffset,
    PIE,
  );
}

// ----------------------------
// MOVEMENT
// ----------------------------

function keyPressed() {
  let newR = player.r;
  let newC = player.c;

  if (keyCode === UP_ARROW) {
    newR--;
    player.direction = 3;
  }
  if (keyCode === DOWN_ARROW) {
    newR++;
    player.direction = 1;
  }
  if (keyCode === LEFT_ARROW) {
    newC--;
    player.direction = 2;
  }
  if (keyCode === RIGHT_ARROW) {
    newC++;
    player.direction = 0;
  }

  if (!level.isWall(newR, newC)) {
    player.r = newR;
    player.c = newC;
    level.collectGoal(newR, newC);
  }
}

// ----------------------------
// LEVEL COMPLETE
// ----------------------------

function checkLevelComplete() {
  if (level.remainingGoals === 0) {
    currentLevelIndex++;

    if (currentLevelIndex < levelData.levels.length) {
      loadLevel(currentLevelIndex);
    } else {
      noLoop();
      fill(0);
      textSize(28);
      textAlign(CENTER, CENTER);
      text("All Levels Complete 🎉", width / 2, height / 2);
    }
  }
}
