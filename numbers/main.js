let gameValue = { cardNumber: 0};
let min = Math.ceil(1);
let max = Math.floor(100);
let result = 0;
const cards = [];

let game = new Proxy(gameValue, {
    set: (target, key, value) => {
        target[key] = value;
        check();
        setCard();
    }
})

function init() {
    for(let i=1; i<max.toString(2).length; i++) {
        let c_ = new Card(i);
        cards.push(c_);
    }
    game.cardNumber = 0;
    setCard();
}

function setCard() {
    const title = document.getElementById('title-number');
    const numbers = document.getElementById('numbers');
    let {cardNumber} = gameValue;
    title.textContent = cardNumber+1;
    numbers.textContent = cards[cardNumber].numbers;
}

function check() {
    let {cardNumber} = gameValue;
    if(cardNumber === (max.toString(2).length-1)) {
        alert(`생각하신 숫자는 ${result} 입니다.`);
        game.cardNumber = 0;
        result = 0;
    }
}

function submit(value) {
    let {cardNumber} = gameValue;
    if(value === 'yes') {
        result += cards[cardNumber].numbers[0];
    }
    game.cardNumber++;
}

const main = (() => {
    init();
})();
