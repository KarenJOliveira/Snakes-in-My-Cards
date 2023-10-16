import { moveSnake, getSnake, getObstacles, setLevel, setActions, getActions } from "./snake.js";
import {
  getHand,
  getDeck,
  getCards,
  playCard,
  drawHand,
  getDiscard,
  getPlayed,
  setScoreBoardValues,
  getScoreboard
} from "./cards.js";

let arrastado = null;
let round = 1;
let score = 0;
let playAgain = false;
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
const eScoreBoard = document.querySelector("#scoreboard");
const eScore = document.querySelector("#score");
const eRound = document.querySelector("#round");
const eActions = document.querySelector("#actions");

ePlayedPile.addEventListener("dragover", dragOver);
ePlayedPile.addEventListener("drop", receiveCard);
eDiscardPile.addEventListener("click", reshuffleCards);

createScoreBoard();
setScoreBoardValues(round, score, getActions());
updateScoreBoard();
const eCards = createCards();

setLevel(2, eGrid);
drawHand();
drawHand();
drawHand();
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


function removeCards(){
  while (eHand.firstChild) {
    eHand.removeChild(eHand.firstChild);
  }
}
function updateCards() {

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

function dragCard(event) {
  arrastado = event.target;
}

function dragOver(event) {
  event.preventDefault();
}

function updateScoreBoard(){
  const scoreboard = getScoreboard();
  
  eRound.textContent = "Round: " + scoreboard.round + " / x";
  eScore.textContent = "Score: " + scoreboard.score;
  eActions.textContent = "Actions: " + scoreboard.actions;
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
  if(arrastado.dataset.custo > getScoreboard().actions) {
    return;
  }
  playCard({
    efeito: arrastado.dataset.efeito,
    symbol: arrastado.dataset.symbol,
  });
  
  if(arrastado.dataset.efeito === "play-again") {
    updatePlayed();
    eHand.removeChild(arrastado); 
    const scoreboard = getScoreboard();
    scoreboard.actions = getActions()+1;
    playAgain = true;
    arrastado = null;
    return;
  }
  if(playAgain === true){
    updatePlayed();
    eHand.removeChild(arrastado); 
    arrastado = null;
    return;
  }
  if(arrastado.dataset.efeito === "take-two"){
    updatePlayed();
    drawHand();
    drawHand();
    removeCards();  
    updateCards();
    arrastado = null;
    return;
  }
  if(getScoreboard().actions === 0){
    playAgain = false;
  }
  

  drawHand();
  drawHand();
  drawHand();
  removeCards();
  updateCards();
  moveSnake();
  updateGrid();
  updateDiscard();
  updatePlayed();
  round++;

  setScoreBoardValues(round, score, getActions());
  updateScoreBoard();

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
  eCard.dataset.custo = card.custo;
  eCard.dataset.id = id;

  const eSymbol = document.createElement("div");
  eSymbol.textContent = card.symbol;

  eCard.appendChild(eSymbol);
  return eCard;
}

function createScoreBoard(){
  const scoreboard = getScoreboard();
  
  eRound.textContent = "Round: " + scoreboard.round + " / x";
  eScoreBoard.appendChild(eRound);

  eScore.textContent = "Score: " + scoreboard.score;
  eScoreBoard.appendChild(eScore);

  eActions.textContent = "Actions: " + scoreboard.actions;
  eScoreBoard.appendChild(eActions);
}
