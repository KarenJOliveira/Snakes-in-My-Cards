import { moveSnake, getSnake } from "./snake.js";
import {
  getBonus,
  getObstacles,
  getHand,
  getDeck,
  getCards,
  playCard,
  getRandom,
  drawHand,
  getDiscard,
  getPlayed,
} from "./cards.js";

const snakeHeadDiv = document.querySelector("#head");
let snakeBodyDiv = document.querySelectorAll(".snake.body");
const snakeTailDiv = document.querySelector(".snake.tail");

let arrastado = null;
let rodada = 1;
const eDeck = document.querySelector("#deck");

let cont = getDeck().length;
const eCont = document.createElement("div");
eCont.classList.add(".cont");
eCont.textContent = cont;
eDeck.appendChild(eCont);

const ePlayedPile = document.querySelector("#played");
const eDiscardPile = document.querySelector("#discard");
const eHand = document.querySelector("#hand");
const eObstacles = document.querySelector(".obstacles");

ePlayedPile.addEventListener("dragover", dragOver);
ePlayedPile.addEventListener("drop", receiveCard);
eDiscardPile.addEventListener("click", reshuffleCards);

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
  if (snakeBodyDiv.length < Object.keys(snake.body).length) {
    //problema no length
    const newBodyDiv = document.createElement("div");
    newBodyDiv.setAttribute("style", "gridColumn = 0, gridRow = 0");
    newBodyDiv.classList.add(".snake.body");
    newBodyDiv.style.gridColumn = snake.body[snakeBodyDiv.length - 1].x;
    newBodyDiv.style.gridRow = snake.body[snakeBodyDiv.length - 1].y;
  }
  snakeBodyDiv = document.querySelectorAll(".snake.body");

  for (let i = 0; i < snakeBodyDiv.length; i++) {
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
  updateSnake();
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
