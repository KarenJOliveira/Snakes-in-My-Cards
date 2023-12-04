import {
  turnClockwise,
  turnAntiClockwise,
  increaseSpeed,
  decreaseSpeed,
  increaseSize,
  decreaseSize,
  setActions,
  getActions
} from "./snake.js";

const cards = [
  { efeito: "turn-clockwise", symbol: "↺", custo: 1 },
  { efeito: "turn-anticlockwise", symbol: "↻", custo: 1 },
  { efeito: "increase-speed", symbol: "⇡", custo: 1 },
  { efeito: "decrease-speed", symbol: "⭭", custo: 1 },
  { efeito: "block-player", symbol: "⭙", custo: 1 },
  { efeito: "take-two", symbol: "+2", custo: 1 },
  { efeito: "increase-size", symbol: "+", custo: 1 },
  { efeito: "decrease-size", symbol: "-", custo: 1 },
  { efeito: "play-again", symbol: "play again", custo: 1 },
];
const deck = [
  { ...cards[0] },
  { ...cards[1] },
  { ...cards[2] },
  { ...cards[3] },
  { ...cards[4] },
  { ...cards[5] },
  { ...cards[6] },
  { ...cards[7] },
  { ...cards[8] },
];
const hand = [];

const discard = [];
const played = [];
const scoreboard = {round:0 , score:0, actions: 0};

const bonus = [
  { x: 1, y: 7, type: "increase-speed" },
  { x: 3, y: 3, type: "increase-size" },
  { x: 5, y: 5, type: "play-again" },
  { x: 7, y: 1, type: "take-two" },
];

function getCards() {
  return cards;
}

function getDeck() {
  return structuredClone(deck);
}

function getHand() {
  return hand;
}

function getScoreboard() {
  return scoreboard;
}

function getBonus() {
  return bonus;
}

function getDiscard() {
  return discard;
}

function getPlayed() {
  return played;
}

function playCard(card) {
  console.log("played: ", card);
  switch (card.efeito) {
    case "turn-clockwise":
      turnClockwise();
      break;
    case "turn-anticlockwise":
      turnAntiClockwise();
      break;
    case "increase-speed":
      increaseSpeed();
      break;
    case "decrease-speed":
      decreaseSpeed();
      break;
    case "block-player":
      break;
    case "take-two": //falta implementar
    {
      takeTwo(card);
      return;
    }
    case "increase-size":
      increaseSize();
      break;
    case "decrease-size":
      decreaseSize();
      break;
    case "play-again": //falta implementar: jogo não deve atualizar(cobra não deve andar, cartas não devem ser atualizadas)
    {
      playAgain(card);
      return;
    }
    default:
      exit(1);
  }
  const idx = hand.findIndex((c) => c.efeito === card.efeito);
  played.push(hand.splice(idx,1)[0]);
  hand.forEach((c) => discard.push(c));
  hand.splice(0, hand.length);
  console.log(played, discard);
}

function drawHand() {
  if (deck.length > 0) {
    hand.push(deck.pop());
  } else {
    deck.push(...discard);
    deck.push(...played);
    played.splice(0, played.length);
    discard.splice(0, discard.length);
    shuffle(deck);
    hand.push(deck.pop());
  }
}

function takeTwo(card)
{
  const idx = hand.findIndex((c) => c.efeito === card.efeito);
  played.push(hand.splice(idx,1)[0]);
  drawHand();
  drawHand();
  return;
}
function playAgain(card)
{
  const idx = hand.findIndex((c) => c.efeito === card.efeito);
  played.push(hand.splice(idx,1)[0]);
  return;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function setScoreBoardValues(round, score, actions) {
  scoreboard.round = round;
  scoreboard.score = score;
  scoreboard.actions = actions;
}

export {
  getHand,
  getBonus,
  playCard,
  getCards,
  getDeck,
  drawHand,
  getDiscard,
  getPlayed,
  setScoreBoardValues,
  getScoreboard
};
