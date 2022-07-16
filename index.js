const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const score = document.getElementById('score');
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;
let appleIndex = 0;
let playerScore = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;
function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    squares.push(square);
    grid.appendChild(square);
  }
}

createGrid();

currentSnake.forEach((index) => squares[index].classList.add('snake'));

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove('snake'));
  squares[appleIndex].classList.remove('apple');
  clearInterval(timerId);

  currentSnake = [2, 1, 0];
  playerScore = 0;
  score.innerText = playerScore;
  intervalTime = 1000;
  generateApples();

  direction = 1;
  currentSnake.forEach((index) => squares[index].classList.add('snake'));
  timerId = setInterval(move, intervalTime);
}

function move() {
  //bottom wall

  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] + width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId);

  //right wall

  //left wall

  //top wall

  const tail = currentSnake.pop();
  squares[tail].classList.remove('snake');
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains('apple')) {
    squares[currentSnake[0]].classList.remove('apple');
    squares[tail].classList.add('snake');
    currentSnake.push(tail);
    generateApples();
    playerScore += 1;
    score.textContent = playerScore;
    clearInterval(timerId);
    console.log(intervalTime);
    intervalTime = intervalTime * speed;
    console.log(intervalTime);
    timerId = setInterval(move, intervalTime);
  }

  console.log(currentSnake);
  squares[currentSnake[0]].classList.add('snake');
}

move();

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));
  squares[appleIndex].classList.add('apple');
}

generateApples();

function control(e) {
  if (e.keyCode === 39) {
    //right arrow pressed
    console.log('right arrow');
    direction = 1;
  } else if (e.keyCode === 38) {
    //up arrow pressed
    console.log('up arrow');
    direction = -width;
  } else if (e.keyCode === 37) {
    //left arrow pressed
    console.log('left arrow');
    direction = -1;
  } else if (e.keyCode === 40) {
    //down arrow pressed
    console.log('down arrow');
    direction = +width;
  }
}

document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);
