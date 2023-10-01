import { moveSnake, getSnake } from "./snake.js";
import { cards } from "./cards.js";

const snakeHeadDiv = document.querySelector("#head");
const snakeBodyDiv = document.querySelectorAll(".body");
const snakeTailDiv = document.querySelector(".tail");

const baralho = document.querySelector(".carta");

updateSnake();

function updateSnake() {
  const snake = getSnake();
  //update head in grid
  snakeHeadDiv.style.gridColumn = snake.head.x;
  snakeHeadDiv.style.gridRow = snake.head.y;
  snakeHeadDiv.dataset.hit = snake.head.hit;

  console.log(snakeHeadDiv.style.gridColumn);
  console.log(snakeHeadDiv.style.gridRow);

  //update body in grid
  for(let i=0; i<snakeBodyDiv.length; i++){
    snakeBodyDiv[i].style.gridColumn = snake.body[i].x;
    snakeBodyDiv[i].style.gridRow = snake.body[i].y;
  }

  //update tail in grid
  snakeTailDiv.style.gridColumn = snake.tail.x;
  snakeTailDiv.style.gridRow = snake.tail.y;
  console.log(snakeTailDiv.style.gridColumn);
  console.log(snakeTailDiv.style.gridRow);
}


const buttonAnda = document.querySelector("#anda");
buttonAnda.addEventListener('click', function(){
  moveSnake();

  updateSnake();
});

function criaCarta(){
  const carta = document.createElement("div");
  carta.classList.add("carta");
  
  const symbol = document.createElement("span");
  carta.appendChild(symbol);
  
  
  baralho.appendChild(carta);
}