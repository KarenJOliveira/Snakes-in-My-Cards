import { moveSnake, getSnake } from "./snake.js";
import { getBonus, getObstacles, getHand, getDeck, getCards, playCard, getRandom, drawHand} from "./cards.js";

const snakeHeadDiv = document.querySelector("#head");
const snakeBodyDiv = document.querySelectorAll(".snake.body");
const snakeTailDiv = document.querySelector(".snake.tail");

let arrastado = null;

const eDeck = document.querySelector(".deck");
const eDiscardPile = document.querySelector(".discardPile");
const eHand = document.querySelector(".deck-jogador");
const eObstacles = document.querySelector(".obstacles");

let cont = getDeck().length;
eDiscardPile.addEventListener("dragover", dragOver);
eDiscardPile.addEventListener("drop", receiveCard);

const eCards = createCards();

//updateCards();
updateSnake();

function updateSnake() {
  const snake = getSnake();
  //update head in grid
  snakeHeadDiv.style.gridColumn = snake.head.x;
  snakeHeadDiv.style.gridRow = snake.head.y;
  snakeHeadDiv.dataset.hit = snake.head.hit;

  //console.log(snakeHeadDiv.style.gridColumn);
  //console.log(snakeHeadDiv.style.gridRow);

  //update body in grid
  for(let i=0; i<snakeBodyDiv.length; i++){
    snakeBodyDiv[i].style.gridColumn = snake.body[i].x;
    snakeBodyDiv[i].style.gridRow = snake.body[i].y;
  }

  //update tail in grid
  snakeTailDiv.style.gridColumn = snake.tail.x;
  snakeTailDiv.style.gridRow = snake.tail.y;
  //console.log(snakeTailDiv.style.gridColumn);
  //console.log(snakeTailDiv.style.gridRow);
}


const buttonAnda = document.querySelector("#anda");
buttonAnda.addEventListener('click', function(){
  moveSnake();

  updateSnake();
});


function createCards(){
  const cards = getCards();
  for(let i=0; i<cards.length; i++){
    const eCard = document.createElement("span");
    eCard.classList.add("card");
    eCard.setAttribute("draggable", true);
    eCard.addEventListener("dragstart", dragCard);
    eCard.dataset.efeito = cards[i].efeito;
    eCard.dataset.symbol = cards[i].symbol;

    const eSymbol = document.createElement("span");
    eSymbol.textContent = cards[i].symbol;
    console.log(cards[i].symbol);
    
    eCard.appendChild(eSymbol);
    eHand.appendChild(eCard);
  }
}

function createObstacles(){
  const obstacles = getObstacles();
  const eObstacles = [];
  for(let i=0; i<obstacles.length; i++){
    const eObstacle = document.createElement("span");
    eObstacle.classList.add(".obstacles");
    
    eObstacles.push(eObstacle);
  }
  return eObstacles;
}

function placeObstacles(){
  const obstacles = getObstacles();
  const idx = getRandom(getObstacles().length);
  eObstacles[idx].style.gridColumn = obstacles[idx].x;
  eObstacles[idx].style.gridRow = obstacles[idx].y;
}

function dragCard(event){
  arrastado = event.target;
}

function dragOver(event){
    event.preventDefault();
}

function receiveCard(event){
  if(arrastado == null) {return};
  if(event.target != eDiscardPile) {return};
  event.target.appendChild(arrastado);
  
  playCard(arrastado.dataset.index);//{efeito: arrastado.dataset.efeito, symbol: arrastado.dataset.symbol}
  drawHand();
  updateSnake();
  //updateCards();
  
  arrastado = null;
}
