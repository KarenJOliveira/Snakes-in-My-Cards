
const snakeHead = { x: 5, y: 3, d: 'e', hit: false, speed:2 };
const snakeBody = [
  { x: 5, y: 4 },
  { x: 5, y: 5 },
]
const snakeTail = { x: 5, y: 6 };

function getSnake() {
  return {
    head: { ...snakeHead },
    body: { ...snakeBody },
    tail: { ...snakeTail }
  }
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
    case 'n':
      snakeHead.y--;
      break;
    case 's':
      snakeHead.y++;
      break;
    case 'e':
      snakeHead.x++;
      break;
    case 'w':
      snakeHead.x--;
      break;
  }

  snakeHead.hit = isColliding();
}

function isColliding() {
  if ((snakeHead.x === snakeTail.x && snakeHead.y === snakeTail.y)) return true;
  const c = snakeBody.filter((b => (b.x === snakeHead.x && b.y === snakeHead.y)));
  return c.length > 0;
}

function turnClockwise() {
  switch (snakeHead) {
    case 'n':
      snakeHead.d = 'e';
      break;
    case 'e':
      snakeHead.d = 's';
      break; 
    case 's':
      snakeHead.d = 'w';
      break; 
    case 'w':
      snakeHead.d = 'n';
      break;
  }
}

function turnAntiClockwise() {
  switch (snakeHead) {
    case 'n':
      snakeHead.d = 'w';
      break;
    case 'e':
      snakeHead.d = 'n';
      break; 
    case 's':
      snakeHead.d = 'e';
      break; 
    case 'w':
      snakeHead.d = 's';
      break;
  }
}

function increaseSpeed() {
  snakeHead.speed += snakeHead.speed<8?1:0;
}
function decreaseSpeed() {
  snakeHead.speed -= snakeHead.speed>2?1:0;
}

function increaseSize(){
  snakeBody.push({x: snakeBody[snakeBody.length-1].x, y: snakeBody[snakeBody.length-1].y});

}
export { getSnake, moveSnake, turnAntiClockwise, turnClockwise, increaseSpeed, decreaseSpeed };

