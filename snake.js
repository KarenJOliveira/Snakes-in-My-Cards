let snakeHead = { x: -1, y: -1, d: "e", hit: false, speed: 1 };
let snakeBody = [];
let snakeTail = { x: -1, y: -1 };
let obstacles = [];
let currentLevel = 1;
let actions = 1;

const GAME_STATES = ["RUNNING", "GAME_OVER"];
let gameState = "RUNNING";

function setGameState(newState) {
  if (!GAME_STATES.includes(newState)) {
    console.error("Estado inválido: ", newState);
  }
  gameState = newState;
}
function getGameState() {
  return gameState;
}

function getSnake() {
  return {
    head: { ...snakeHead },
    body: structuredClone(snakeBody),
    tail: { ...snakeTail },
  };
}

function moveSnake() {
  //m0ve body
  //move tail
  snakeTail.x = snakeBody[snakeBody.length - 1].x;
  snakeTail.y = snakeBody[snakeBody.length - 1].y;
  for (let i = snakeBody.length - 1; i > 0; i--) {
    //snakeBody[i] = {...snakeBody[i-1]};
    snakeBody[i].x = snakeBody[i - 1].x;
    snakeBody[i].y = snakeBody[i - 1].y;
  }

  snakeBody[0].x = snakeHead.x;
  snakeBody[0].y = snakeHead.y;
  switch (snakeHead.d) {
    case "s":
      snakeHead.y++;
      break;
    case "n":
      snakeHead.y--;
      break;
    case "e":
      snakeHead.x++;
      break;
    case "w":
      snakeHead.x--;
      break;
  }

  snakeHead.hit = isColliding() || isCollidingWithObstacle();
}

function isColliding() {
  if (snakeHead.x === snakeTail.x && snakeHead.y === snakeTail.y) return true;
  const c = snakeBody.filter((b) => b.x === snakeHead.x && b.y === snakeHead.y);
  return c.length > 0;
}

function isCollidingWithObstacle() {
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x === snakeHead.x && obstacles[i].y === snakeHead.y)
      return true;
    else if (obstacles[i].x === snakeTail.x && obstacles[i].y === snakeTail.y)
      return true;
    else {
      for (let index = 0; index < snakeBody.length; index++) {
        const element = snakeBody[index];
        if (obstacles[i].x === element.x && obstacles[i].y === element.y)
          return true;
      }
    }
  }
  return false;
}

function verifyCollisions() {
  return snakeHead.hit;
}

function turnClockwise() {
  switch (snakeHead.d) {
    case "n":
      snakeHead.d = "e";
      break;
    case "e":
      snakeHead.d = "s";
      break;
    case "s":
      snakeHead.d = "w";
      break;
    case "w":
      snakeHead.d = "n";
      break;
  }
}

function turnAntiClockwise() {
  switch (snakeHead.d) {
    case "n":
      snakeHead.d = "w";
      break;
    case "e":
      snakeHead.d = "n";
      break;
    case "s":
      snakeHead.d = "e";
      break;
    case "w":
      snakeHead.d = "s";
      break;
  }
}

function increaseSpeed() {
  snakeHead.speed += snakeHead.speed < 8 ? 1 : 0;
}
function decreaseSpeed() {
  snakeHead.speed -= snakeHead.speed > 2 ? 1 : 0;
}

function increaseSize() {
  snakeBody.push({ x: snakeTail.x, y: snakeTail.y });
}

function decreaseSize() {
  snakeBody.pop();
}

function getSpeed() {
  return snakeHead.speed;
}

function getObstacles() {
  return obstacles;
}

function setLevel(level, eGrid) {
  switch (level) {
    case 2:
      return setLevel2(eGrid);

    default:
      return setLevel1(eGrid);
  }
}

function setLevel1() {
  const rows = 10;
  const cols = 10;
  eGrid.templateRows = `repeat(${rows}, 20px)`;
  eGrid.templateColumns = `repeat(${cols}, 20px)`;
  snakeHead = { x: 6, y: 5, d: "e", hit: false, speed: 1 };
  snakeBody = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
  ];
  snakeTail = { x: 3, y: 5 };
  obstacles = [];

  //first row/col on grid css is 1
  for (let i = 1; i <= 10; i++) {
    obstacles.push({ x: i, y: 1 });
    obstacles.push({ x: i, y: 10 });
    obstacles.push({ x: 1, y: i });
    obstacles.push({ x: 10, y: i });
  }
  return { rows, cols };
}

function setLevel2() {
  const rows = 15;
  const cols = 8;

  snakeHead = { x: 3, y: 5, d: "s", hit: false, speed: 1 };
  snakeBody = [
    { x: 3, y: 4 },
    { x: 3, y: 3 },
  ];
  snakeTail = { x: 3, y: 2 };
  obstacles = [];

  //first row/col on grid css is 1
  for (let i = 1; i <= cols; i++) {
    obstacles.push({ x: i, y: 1 });
    obstacles.push({ x: i, y: rows });
  }
  for (let i = 1; i <= rows; i++) {
    obstacles.push({ x: 1, y: i });
    obstacles.push({ x: cols, y: i });
  }
  return { rows, cols };
}

function getCurentLevel() {
  return currentLevel;
}

function setActions(n) {
  actions = n;
}

function getActions() {
  return actions;
}

export {
  getSnake,
  moveSnake,
  turnAntiClockwise,
  turnClockwise,
  increaseSpeed,
  decreaseSpeed,
  increaseSize,
  decreaseSize,
  getObstacles,
  getCurentLevel,
  setLevel,
  setActions,
  getActions,
  verifyCollisions,
  setGameState,
  getGameState,
  getSpeed,
};
