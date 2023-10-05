const snakeHead = { x: 6, y: 5, d: "e", hit: false, speed: 2 };
const snakeBody = [
  { x: 5, y: 5 },
  { x: 4, y: 5 },
];
const snakeTail = { x: 3, y: 5 };
const obstacles = [];

//first row/col on grid css is 1
for (let i = 1; i <= 10; i++) {
  obstacles.push({ x: i, y: 1 });
  obstacles.push({ x: i, y: 10 });
  obstacles.push({ x: 1, y: i });
  obstacles.push({ x: 10, y: i });
}

function getSnake() {
  return {
    head: { ...snakeHead },
    body: [...snakeBody ],
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
    case "n":
      snakeHead.y++;
      break;
    case "s":
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

function isCollidingWithObstacle(){
  for(let i = 0; i < obstacles.length; i++){
    if(obstacles[i].x === snakeHead.x && obstacles[i].y === snakeHead.y) return true;
  }
  return false;
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
  console.log("aaaaaaa");
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

function decreaseSize(){
  snakeBody.pop();
}

function getObstacles() {
  return obstacles;
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
  getObstacles
};
