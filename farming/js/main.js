window.onload = function() {
    var mc = new Character("Jack");
    var orc = new Monster("Orc", 2);
    
    console.log(orc.hp);
    console.log(mc.getToHIT(orc));
    
    var d = dice(1,20);
    var acc = mc.getToHIT(orc);
    var wp = mc.equipments.primary;
    

    
    var news = "";
    news += introMC(mc);
    news += introMC(orc);
    
    
    if(d < acc) {
        news += mc.name + " attacked " + orc.name + " [dice(" + d + ") < accuracy (" + acc +")]";
    }
    else {
        news += mc.name + " attacked " + orc.name + " [dice(" + d + ") >= accuracy (" + acc +")]";
    }
    
    document.getElementById("output").innerHTML = news;
}

