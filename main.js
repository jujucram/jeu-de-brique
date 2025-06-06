const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 300;

let isGameOver = false;
let score = 0;

// Joueur
const player = {
  x: 50,
  y: 230,
  width: 40,
  height: 40,
  dy: 0,
  gravity: 0.8,
  jumpPower: -12,
  isJumping: false,

  draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },

  update() {
    this.dy += this.gravity;
    this.y += this.dy;

    if (this.y >= 230) {
      this.y = 230;
      this.dy = 0;
      this.isJumping = false;
    }
  },

  jump() {
    if (!this.isJumping) {
      this.dy = this.jumpPower;
      this.isJumping = true;
    }
  }
};

// Obstacle
class Obstacle {
  constructor() {
    this.x = canvas.width;
    this.y = 240;
    this.width = 20;
    this.height = 40;
    this.speed = 6;
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
  }
}

const obstacles = [];
let spawnTimer = 0;

function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  );
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function gameLoop() {
  if (isGameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Joueur
  player.update();
  player.draw();

  // Obstacles
  spawnTimer++;
  if (spawnTimer > 90) {
    obstacles.push(new Obstacle());
    spawnTimer = 0;
  }

  obstacles.forEach((obstacle, index) => {
    obstacle.update();
    obstacle.draw();

    // Collision
    if (checkCollision(player, obstacle)) {
      isGameOver = true;
      alert("Game Over! Score: " + score);
      location.reload();
    }

    // Supprimer obstacle hors écran
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(index, 1);
      score++;
    }
  });

  drawScore();

  requestAnimationFrame(gameLoop);
}

// Contrôles
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    player.jump();
  }
});

gameLoop();
