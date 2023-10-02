import { moveSnake, getSnake } from "./snake.js";
import { getBonus, getObstacles, getHand, getDeck, getCards, playCard, getRandom, drawHand} from "./cards.js";

const snakeHeadDiv = document.querySelector("#head");
let snakeBodyDiv = document.querySelectorAll(".snake.body");
const snakeTailDiv = document.querySelector(".snake.tail");

let arrastado = null;
let rodada = 1;
const eDeck = document.querySelector(".deck");

let cont = getDeck().length;
const eCont = document.createElement("span");
eCont.classList.add(".cont");
eCont.textContent = cont;
eDeck.appendChild(eCont);

const eDiscardPile = document.querySelector(".discardPile");
const eHand = document.querySelector(".deck-jogador");
const eObstacles = document.querySelector(".obstacles");

eDiscardPile.addEventListener("dragover", dragOver);
eDiscardPile.addEventListener("drop", receiveCard);

const eCards = createCards();

updateCards();
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
  if(snakeBodyDiv.length < Object.keys(snake.body).length){ //problema no length
    const newBodyDiv = document.createElement("div");
    newBodyDiv.setAttribute("style", "gridColumn = 0, gridRow = 0")
    newBodyDiv.classList.add(".snake.body");
    newBodyDiv.style.gridColumn = snake.body[snakeBodyDiv.length-1].x;
    newBodyDiv.style.gridRow = snake.body[snakeBodyDiv.length-1].y;
  }
  snakeBodyDiv = document.querySelectorAll(".snake.body");

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

/*
const buttonAnda = document.querySelector("#anda");
buttonAnda.addEventListener('click', function(){
  moveSnake();

  updateSnake();
});
*/
function updateCards(){
  drawHand();
  drawHand();
  drawHand();
  
  eHand.replaceChildren();
  for(let i=0; i<getHand().length; i++){
    const idx = getCards().findIndex(c=>c.symbol === getHand()[i].symbol);
    eHand.appendChild(eCards[idx]);
  }
  const deck = getDeck();
  eCont.textContent = deck.length;
}

function createCards(){
  const cards = getCards();
  const eCards = []; 
  for(let i=0; i<cards.length; i++){
    const eCard = document.createElement("span");
    eCard.classList.add("card");
    eCard.setAttribute("draggable", true);
    eCard.addEventListener("dragstart", dragCard);
    eCard.dataset.efeito = cards[i].efeito;
    eCard.dataset.symbol = cards[i].symbol;
    eCard.dataset.id = i;

    const eSymbol = document.createElement("span");
    eSymbol.textContent = cards[i].symbol;
    console.log(cards[i].symbol);
    
    eCard.appendChild(eSymbol);
    eCards.push(eCard);
  }
  return eCards;
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
  //if(event.target != eDiscardPile) {return};
  
  if(rodada > 1){
    while(eDiscardPile.firstChild) {
      eDiscardPile.removeChild(eDiscardPile.firstChild);
  }
  }
  
  let descarte = document.getElementById("descarte");
  descarte.appendChild(arrastado);

  arrastado.add
  
  playCard({efeito: arrastado.dataset.efeito, symbol: arrastado.dataset.symbol});
  
  updateCards();
  moveSnake();
  updateSnake();
  rodada++;
  arrastado = null;
}
