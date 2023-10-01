const snakeHead = {x:1, y:3, d: 'n'};
const snakeBody = [
  {x:1, y:4},
  {x:1, y:5},
]
const snakeTail = {x:1, y:6};

const snakeHeadDiv = document.querySelector("#head");
const snakeBodyDiv = document.querySelectorAll("#body");
const snakeTailDiv = document.querySelector("#tail");

function updateSnake(params) {
  //update head in grid
  snakeHeadDiv.style.gridColumn = snakeHead.x;
  snakeHeadDiv.style.gridRow = snakeHead.y;

  //update body in grid
  for(let i=0; i<snakeBodyDiv.length; i++){
    snakeBodyDiv[i].style.gridColumn = snakeBody[i].x;
    snakeBodyDiv[i].style.gridRow = snakeBody[i].y;
  }

  //update tail in grid
  snakeTailDiv.style.gridColumn = snakeTail.x;
  snakeTailDiv.style.gridRow = snakeTail.y;
}


const buttonAnda = document.querySelector("#anda");
buttonAnda.addEventListener('click', function(){
  snakeHead.y ++;
  //m0ve body
  for(let i= snakeBody.length-1; i>0; i--){
    //snakeBody[i] = {...snakeBody[i-1]};
    snakeBody[i].x = snakeBody[i-1].x;
    snakeBody[i].y = snakeBody[i-1].y;
  }
  snakeBody[0].x = snakeHead.x;
  snakeBody[0].y = snakeHead.y;

  snakeBody[length-1].x = snakeTail.x;
  snakeBody[length-1].y = snakeTail.y;

  updateSnake();
});
