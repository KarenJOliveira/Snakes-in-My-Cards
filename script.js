import { moveSnake, getSnake, getObstacles } from "./snake.js";
import {
  getBonus,
  getHand,
  getDeck,
  getCards,
  playCard,
  getRandom,
  drawHand,
  getDiscard,
  getPlayed,
} from "./cards.js";

let arrastado = null;
let rodada = 1;
const eDeck = document.querySelector("#deck");

let cont = getDeck().length;
const eCont = document.createElement("div");
eCont.classList.add(".cont");
eCont.textContent = cont;
eDeck.appendChild(eCont);

const eGrid = document.querySelector("#grid");
const ePlayedPile = document.querySelector("#played");
const eDiscardPile = document.querySelector("#discard");
const eHand = document.querySelector("#hand");
const eObstacles = document.querySelector(".obstacles");

ePlayedPile.addEventListener("dragover", dragOver);
ePlayedPile.addEventListener("drop", receiveCard);
eDiscardPile.addEventListener("click", reshuffleCards);

const eCards = createCards();

updateCards();
updateGrid();

function updateGrid() {
  eGrid.innerHTML = "";
  updateSnake();
  updateObstacles();
}

function updateSnake() {
  const snake = getSnake();

  const snakeHeadDiv = document.createElement("div");
  snakeHeadDiv.classList.add("snake");
  snakeHeadDiv.classList.add("head");
  snakeHeadDiv.style.gridColumn = snake.head.x;
  snakeHeadDiv.style.gridRow = snake.head.y;
  eGrid.appendChild(snakeHeadDiv);

 


  //update body in grid
  for (let i = 0; i < snake.body.length; i++) {
    const newBodyDiv = document.createElement("div");
    newBodyDiv.classList.add("snake");
    newBodyDiv.classList.add("body");
    newBodyDiv.style.gridColumn = snake.body[i].x;
    newBodyDiv.style.gridRow = snake.body[i].y;
    eGrid.appendChild(newBodyDiv);
  }

  const snakeTailDiv = document.createElement("div");
  snakeTailDiv.classList.add("snake");
  snakeTailDiv.classList.add("tail");
  snakeTailDiv.style.gridColumn = snake.tail.x;
  snakeTailDiv.style.gridRow = snake.tail.y;
  eGrid.appendChild(snakeTailDiv);

}

/*
const buttonAnda = document.querySelector("#anda");
buttonAnda.addEventListener('click', function(){
  moveSnake();

  updateSnake();
});
*/

function updateObstacles() {
  const obstacles = getObstacles();

  for (let i = 0; i < obstacles.length; i++) {
    const newObstacle = document.createElement("div");
    newObstacle.classList.add("obstacle");
    newObstacle.style.gridColumn = obstacles[i].x;
    newObstacle.style.gridRow = obstacles[i].y;
    eGrid.appendChild(newObstacle);
  }
}

function updateCards() {
  drawHand();
  drawHand();
  drawHand();

  eHand.replaceChildren();
  for (let i = 0; i < getHand().length; i++) {
    const idx = getCards().findIndex((c) => c.symbol === getHand()[i].symbol);
    eHand.appendChild(eCards[idx]);
  }
  const deck = getDeck();
  eCont.textContent = deck.length;
}

function createCards() {
  const cards = getCards();
  const eCards = [];
  for (let i = 0; i < cards.length; i++) {
    const eCard = createCard(cards[i], i);
    eCards.push(eCard);
  }
  return eCards;
}

function createObstacles() {
  const obstacles = getObstacles();
  const eObstacles = [];
  for (let i = 0; i < obstacles.length; i++) {
    const eObstacle = document.createElement("div");
    eObstacle.classList.add(".obstacles");

    eObstacles.push(eObstacle);
  }
  return eObstacles;
}

function placeObstacles() {
  const obstacles = getObstacles();
  const idx = getRandom(getObstacles().length);
  eObstacles[idx].style.gridColumn = obstacles[idx].x;
  eObstacles[idx].style.gridRow = obstacles[idx].y;
}

function dragCard(event) {
  arrastado = event.target;
}

function dragOver(event) {
  event.preventDefault();
}

function updateDiscard() {
  const discard = getDiscard();
  eDiscardPile.innerHTML = "";
  discard.forEach((c) => eDiscardPile.appendChild(createCard(c)));
}
function updatePlayed() {
  const played = getPlayed();
  ePlayedPile.innerHTML = "";
  played.forEach((c) => ePlayedPile.appendChild(createCard(c)));
}
function receiveCard(event) {
  if (arrastado == null) {
    return;
  }
  //if(event.target != eDiscardPile) {return};

  // if (rodada > 1) {
  //   while (eDiscardPile.firstChild) {
  //     eDiscardPile.removeChild(eDiscardPile.firstChild);
  //   }
  // }

  // let descarte = document.querySelector("#discard");
  // descarte.appendChild(arrastado);

  // arrastado.add;

  playCard({
    efeito: arrastado.dataset.efeito,
    symbol: arrastado.dataset.symbol,
  });

  updateCards();
  moveSnake();
  updateGrid();
  updatePlayed();
  updateDiscard();
  rodada++;
  arrastado = null;
}

function reshuffleCards() {
  if (getCards().length > 0) return;
  drawHand();
}

function createCard(card, id) {
  const eCard = document.createElement("div");
  eCard.classList.add("card");
  eCard.setAttribute("draggable", true);
  eCard.addEventListener("dragstart", dragCard);
  eCard.dataset.efeito = card.efeito;
  eCard.title = card.efeito;
  eCard.dataset.symbol = card.symbol;
  eCard.dataset.id = id;

  const eSymbol = document.createElement("div");
  eSymbol.textContent = card.symbol;

  eCard.appendChild(eSymbol);
  return eCard;
}
