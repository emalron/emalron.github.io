function gauss() {
    var run = 0;
    var trial = 6;

    for(var i=0;i<trial;i++) {
        run += (Math.random() - 0.5)*2.0;
    }
    return run/trial
}
            
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function createCompany(num) {
    var numOfCompany = num;
    var namesOfCompany = new Array(numOfCompany);
    namesOfCompany = ['A', 'B', 'C', 'D','E'];

    var arr = createArray(2,numOfCompany+1);
    arr[0][0] = "Days";
    for(var i=0;i<numOfCompany;i++) {
        arr[0][1+i] = namesOfCompany[i];
    }
    
    return arr;
}

// Class Company
function Company () {
    this.price = 0.0;
    this.history = [];
    this.vol = 0.0
}
Company.prototype.init = function(_price, _volUB) {
    this.price = _price
    this.vol = _volUB
    this.history = [_price]
}
Company.prototype.getPrice = function() {
    var _price = this.price;
    return _price;
}
Company.prototype.setPrice = function(_price) {
    this.price = _price;
}
Company.prototype.makeMove = function(bias, mo) {
    var oldPrice = this.price
//    console.log('this.price @makeMove: ' + this.price)
    var baseMove = gauss()*this.vol + bias
    var _price = oldPrice + baseMove;
    _price += mo;
//    console.log('_price @makeMove: ' + _price)
    this.setPrice(_price)
//    console.log('final price @makeMove: ' + this.price)
}
Company.prototype.record = function (_price) {
    this.history.push(_price)
}

// Class SimpleMarket
function SimpleMarket() {
    this.companies = [];
    this.bias = 0.0;
    this.history = [];
}
SimpleMarket.prototype.init = function(howmanycompanies, volUB) {
    for (var i=0;i<howmanycompanies;i++) {
        var volatility = Math.random()*volUB;
        this.addCompany(new Company());
        this.companies[i].init(100.0,volatility)
    }
}
SimpleMarket.prototype.addCompany = function(comp) {
    this.companies.push(comp);
}
SimpleMarket.prototype.setBias = function(b) {
    this.bias = b
}
SimpleMarket.prototype.getBias = function() {
    return this.bias;
}
SimpleMarket.prototype.getCompany = function() {
    return this.companies;
}
SimpleMarket.prototype.move = function (mo) {
    var prices = [];
    for(var i=0;i<this.companies.length;i++) {
        this.companies[i].makeMove(this.bias, mo)
//        console.log(this.companies[i].getPrice())
        prices.push(this.companies[i].getPrice())
    }
    return prices;
}

SimpleMarket.prototype.makeHistory = function (num) {
    var history = createArray(1,num+1);
    history.fill(0)
    return history;
}

// Class Market
function Market(SimpleMarket) {
    
}

// Class simMkt
