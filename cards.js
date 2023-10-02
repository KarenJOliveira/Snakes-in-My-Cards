import {turnClockwise, turnAntiClockwise, increaseSpeed, decreaseSpeed, increaseSize} from './snake.js';

const cards = [
    {efeito: "turn-left", symbol: "↻"},
    {efeito: "turn-right", symbol:"↺"},
    {efeito: "increase-speed", symbol: "⇡"}, 
    {efeito: "decrease-speed", symbol: "⭭"},
    {efeito: "block-player", symbol: "⭙"},
    {efeito: "take-two", symbol: "🃟"},
    {efeito: "increase-size", symbol: "+"},
    {efeito: "decrease-size", symbol: "-"},
    {efeito: "play-again", symbol: "🍀"}
]
const deck = [
    {...cards[0]},
    {...cards[1]},
    {...cards[2]},
    {...cards[3]},
    {...cards[4]},
    {...cards[5]},
    {...cards[6]},
    {...cards[7]},
    {...cards[8]}
];
const hand = [];

const discardPile = [];

const obstacles = [
    {x: 1, y: 1},
    {x: 3, y: 6},
    {x: 5, y: 2},
    {x: 7, y: 5},
    {x: 9, y: 3},
]

const bonus = [
    {x: 1, y: 7, type: "increase-speed"},
    {x: 3, y: 3, type: "increase-size"},
    {x: 5, y: 5, type: "play-again"},
    {x: 7, y: 1, type: "take-two"},
]

function getCards(){
    return cards;
}

function getDeck(){
    return deck;
}

function getHand(){
    return hand;
}

function getObstacles(){
    return obstacles;
}

function getBonus(){
    return bonus;
}

function playCard(card)
{
    switch(card.efeito)
    {
        case "turn-left": turnClockwise();  break;
        case "turn-right": turnAntiClockwise(); break;
        case "increase-speed": increaseSpeed(); break;
        case "decrease-speed": decreaseSpeed(); break;
        case "block-player": break;
        case "take-two": break;
        case "increase-size": increaseSize(); break;
        case "decrease-size": break;
        case "play-again": break;
    }
    hand.forEach(c=>discardPile.push(c));
    hand.splice(0, hand.length);
}

function drawHand(){
    if(deck.length>0){
        shuffle(deck);
        hand.push(deck.pop());
    }else{
        deck.push(...discardPile);
        discardPile.splice(0, discardPile.length);
        hand.push(deck.pop());
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function getRandom(num){
    return Math.floor(Math.random()*num);
}

export { getHand, getObstacles, getBonus, playCard, getCards, getDeck, getRandom, drawHand};