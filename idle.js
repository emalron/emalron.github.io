var money = 0;
function moneyClick(num) {
    money = money + num;
    document.getElementById('myMoney').innerHTML = money;
}

var plant = 0;
function buyPlant() {
    var costPlant = Math.floor(10*Math.pow(1.1,plant));
    if(money >= costPlant) {
        plant = plant + 1;
        money = money - costPlant;
        document.getElementById('plants').innerHTML = plant;
        document.getElementById('myMoney').innerHTML = money;
    }
    
    var nextCost = Math.floor(10*Math.pow(1.1,plant));
    document.getElementById('costPlant').innerHTML = nextCost;
}

window.setInterval(function() {
    moneyClick(plant);
},1000);