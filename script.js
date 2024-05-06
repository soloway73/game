const winnerPositionsArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let restartBtn = document.querySelector(".restartBtn");
let square = document.querySelectorAll(".square");
let player = document.querySelector(".player");
let gameOver = document.querySelector(".gameOver");
let nextMark = "cross";
let closeBtn = document.querySelector(".restartBtn2");

player.textContent = "крестик";

let crossPlayerPositions = [];
let zeroPlayerPositions = [];

const audio = new Audio(); // Создаём новый элемент Audio
audio.src = "music.mp3"; // Указываем путь к звуку "клика"

function soundGameOver() {
  audio.play(); // Автоматически запускаем
}

let restart = () => {
  for (let i = 0; i < square.length; i++) {
    let element = square[i].querySelector("div");
    if (element) {
      square[i].removeChild(element);
      square[i].style.pointerEvents = "auto";
    }
  }
  nextMark = "cross";
  player.textContent = "крестик";
  crossPlayerPositions = [];
  zeroPlayerPositions = [];
};
restartBtn.onclick = () => restart();
closeBtn.onclick = () => {
  gameOver.style.display = "none";
  audio.pause();
  audio.currentTime = 0;
};
const checkWinner = (playerPosition) => {
  for (let j = 0; j < winnerPositionsArray.length; j++) {
    let hitCounter = 0;
    for (let i = 0; i <= 3; i++) {
      if (playerPosition.includes(winnerPositionsArray[j][i])) {
        hitCounter++;
      }

      if (hitCounter === 3) {
        audio.currentTime = 0;
        restart();
        soundGameOver();
        return true;
      }
    }
  }
};
const checkDraw = () => {
  if (crossPlayerPositions.length === 5) {
    restart();
    gameOver.querySelector(".message").textContent = "НИЧЬЯ";
    gameOver.style.display = "flex";
    soundGameOver();
  }
};

for (let i = 0; i < square.length; i++) {
  square[i].onclick = function () {
    let newMark = document.createElement("div");
    if (nextMark === "cross") {
      newMark.classList.add(nextMark);
      square[i].appendChild(newMark);

      square[i].style.pointerEvents = "none";
      crossPlayerPositions.push(i);
      if (checkWinner(crossPlayerPositions)) {
        gameOver.querySelector(".message").textContent =
          "Победил игрок: КРЕСТИК";
        gameOver.style.display = "flex";
      } else {
        nextMark = "zero";
        player.textContent = "нолик";
        checkDraw();
      }
    } else {
      newMark.classList.add(nextMark);
      square[i].appendChild(newMark);

      square[i].style.pointerEvents = "none";
      zeroPlayerPositions.push(i);
      if (checkWinner(zeroPlayerPositions)) {
        gameOver.querySelector(".message").textContent = "Победил игрок: НОЛИК";
        gameOver.style.display = "flex";
      } else {
        nextMark = "cross";
        player.textContent = "крестик";
      }
    }
  };
}
