const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const jumpSound = document.getElementById("jumpSound");
const gameoverSound = document.getElementById("gameoverSound");
const message = document.getElementById("message");

let isJumping = false;
let gameStarted = false;

function jump() {
  if (isJumping || !gameStarted) return;
  isJumping = true;
  player.classList.add("jump");
  jumpSound.currentTime = 0;
  jumpSound.play();

  setTimeout(() => {
    player.classList.remove("jump");
    isJumping = false;
  }, 500);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    if (!gameStarted) startGame();
    jump();
  }
});

// Listener pour recommencer la partie après un game over
document.addEventListener("keydown", (e) => {
  if (!gameStarted && e.code === "Space") {
    location.reload();
  }
});

function startGame() {
  gameStarted = true;
  message.style.display = "none";
  obstacle.style.animationPlayState = "running";

  const checkCollision = setInterval(() => {
    const playerBottom = parseInt(getComputedStyle(player).bottom);
    const obstacleRight = parseInt(getComputedStyle(obstacle).right);

    const obstacleLeftEdge = 800 - obstacleRight;
    if (
      obstacleLeftEdge > 50 &&
      obstacleLeftEdge < 90 &&
      playerBottom < 100
    ) {
      gameoverSound.play();
      obstacle.style.animationPlayState = "paused";
      message.textContent = "💀 GAME OVER - Appuie sur Espace pour rejouer";
      message.style.display = "block";
      clearInterval(checkCollision);
      gameStarted = false;
    }
  }, 10);
}
