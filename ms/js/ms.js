// 게임 객체 프로토타입
function Firm(capital) {}

function City(population, condition, stdPrice) {
    this.population = population;
    this.condition = condition;
    this.stdPrice = stdPrice;
}


// 객체 초기화
var city = new City(1100000, 100, 110);

window.onload = function() {
    // HTML 초기화    
    var d = document;
    var p = city.population;
    
    console.log(city.population);
    
    //
    if (window.innerWidth < 1000) {
        document.getElementById('displayer').style.width = '100%';
    }
    else {
        document.getElementById('displayer').style.width = '50%';
    }
    
    // 인구수 표시할 때 10,000 넘으면 만으로, 10,000,000 넘으면 천만으로 끊음.
    d.getElementById('population').innerHTML = (function(p) {
        if(p >= 10000000) {
            return Math.floor(p/10000000) + '천만';
        }
        if(p >= 10000) {
            return Math.floor(p/10000) + '만';
        }
        return p;
    })(city.population);
    
    d.getElementById('eCondition').innerHTML = city.condition;
    
    d.getElementById('stdPrice').innerHTML = city.stdPrice;
}