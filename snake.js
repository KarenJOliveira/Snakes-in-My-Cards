const snakeHead = {x:5, y:3, d: 'e', hit: false};
const snakeBody = [
  {x:5, y:4},
  {x:5, y:5},
]
const snakeTail = {x:5, y:6};

function getSnake(){
  return {
    head: {...snakeHead},
    body: {...snakeBody},
    tail: {...snakeTail}
  }
}

function moveSnake() {
  //m0ve body
  
  //move tail
  snakeTail.x = snakeBody[snakeBody.length-1].x;
  snakeTail.y = snakeBody[snakeBody.length-1].y;
  for(let i= snakeBody.length-1; i>0; i--){
    //snakeBody[i] = {...snakeBody[i-1]};
    snakeBody[i].x = snakeBody[i-1].x;
    snakeBody[i].y = snakeBody[i-1].y;
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

function isColliding(){
  if((snakeHead.x === snakeTail.x && snakeHead.y === snakeTail.y)) return true;
  const c = snakeBody.filter((b=>(b.x === snakeHead.x && b.y === snakeHead.y)));
  return c.length>0;
}


export {getSnake, moveSnake};

