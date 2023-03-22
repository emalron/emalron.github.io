class Card {
    digit;
    numbers;
    constructor(digit) {
        this.digit = digit;
        this.numbers = this.findNumbers(digit);
    }

    findNumbers(digit) {
        const numbers = [];
        let min = 1;
        let max = 100;
        for (let i=min; i<=max; i++) {
            let binaryRep = i.toString(2).split('').reverse();
            if(binaryRep[digit-1] === '1') {
                numbers.push(i);
            }
        }
        return numbers;
    }
}