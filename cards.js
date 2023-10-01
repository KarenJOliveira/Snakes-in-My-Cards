const cards = [
    {efeito: "turn-left", symbol: "&#8634"},
    {efeito: "turn-right", symbol:'&#8635'},
    {efeito: "increase-speed", symbol: "V"},
    {efeito: "decrease-speed", symbol: "S"},
    {efeito: "block-player", symbol: "P"},
    {efeito: "take-two", symbol: '&#127199'},
    {efeito: "increase-size", symbol: "+"},
    {efeito: "decrease-size", symbol: "-"},
    {efeito: "play-again", symbol: "M"}
]


const obstacles = [
    {x: 1, y: 1},
    {x: 3, y: 6},
    {x: 5, y: 2},
    {x: 7, y: 5},
    {x: 9, y: 3},
]

const bonus = [
    {x: 1, y: 7, type: "V"},
    {x: 3, y: 3, type: "+"},
    {x: 5, y: 5, type: "M"},
    {x: 7, y: 1, type: "S"},
]

export function getCards(){
    return cards;
}

export function getObstacles(){
    return obstacles;
}

export function getBonus(){
    return bonus;
}

