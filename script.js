import { moveSnake, getSnake } from "./snake.js";
import { getCards, getBonus, getObstacles } from "./cards.js";

const snakeHeadDiv = document.querySelector("#head");
const snakeBodyDiv = document.querySelectorAll(".body");
const snakeTailDiv = document.querySelector(".tail");
const speed = 0;

let arrastado = null;

const eDeck = document.querySelector(".deck");
const eDiscardPile = document.querySelector(".discardPile");
const playerDeck = document.querySelector(".deck-jogador");

let cont = 0;
let points = 0;

eDiscardPile.addEventListener("dragover", dragOver);
eDiscardPile.addEventListener("drop", receiveCard);

let hand = new Array();
let discardPile = new Array();
const deck = createDeck();


drawCard();
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

/*
function cardEffect(card){
  if(card.symbol === "&#8634"){
    switch(snake.head.d){
      case 'n':
        snake.head.d = 'w';
        break;
      case 's':
        snake.head.d = 'w';
        break;
      case 'e':
        snake.head.d = 'n';
        break;
      case 'w':
        snake.head.d = 's';
        break;
    }
  }else if(card.symbol === "&#8635"){
    switch(snake.head.d){
      case 'n':
        snake.head.d = 'e';
        break;
      case 's':
        snake.head.d = 'e';
        break;
      case 'e':
        snake.head.d = 's';
        break;
      case 'w':
        snake.head.d = 'n';
        break;
    }
  }else if(card.symbol === "+"){
    snake.body.push({x: snake.tail.x, y: snake.tail.y});
    snake.tail.x = snake.body[snake.body.length-1].x;
    snake.tail.y = snake.body[snake.body.length-1].y;
  }else if(card.symbol === "-"){
    if(snake.body.length > 1){
      snake.body.pop();
      snake.tail.x = snake.body[snake.body.length-1].x;
      snake.tail.y = snake.body[snake.body.length-1].y;
    }else{
      console.log("Não é possível diminuir o tamanho da cobra");
      return;
    }
  }
  updateSnake();
}
*/
function drawCard(){
  for(let i=0; i<3; i++){
    const card = deck.pop();
    hand.push(card);
    playerDeck.appendChild(card);
    card.style.display = 'block';
  }
}

function createDeck(){
  const deck = getCards();
  const cards = new Array();
  
  for(let i=0; i<deck.length; i++){
    const eCard = document.createElement("span");
    eCard.classList.add("card");
    eCard.setAttribute("draggable", true);
    eCard.addEventListener("dragstart", dragCard);

    const eSymbol = document.createElement("span");
    console.log(deck[i].symbol);
    eSymbol.innerHTML = (deck[i].symbol);
    eSymbol.style.display = 'block';
    eCard.appendChild(eSymbol);

    cards[i] = eCard;
  }

  eDeck.appendChild(cards[0]);
  return cards;
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
    arrastado = null;
}
