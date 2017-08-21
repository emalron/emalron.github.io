function Player(name, health, attack, defense) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
}

Player.prototype.getName = function() {
    var _name = this.name;
    return _name;
}
Player.prototype.getHealth = function() {
    return this.health;
}
Player.prototype.getAttack = function() {
    return this.attack;
}
Player.prototype.getDefense = function() {
    return this.defense;
}

Player.prototype.setHealth = function(input) {
    this.health = input;
}

Player.prototype.setAttack = function(input) {
    this.attack = input;
}

Player.prototype.setHealth = function(input) {
    this.health = input;
}

function Arena() {
    this.msg = [];
    this.aaron = new Player("Aaron", 10, 2, 2);
    this.das = new Player("Das", 3, 1, 1);
}

Arena.prototype.duel = function(me, you) {
    while(!this.isFatal(me) && !this.isFatal(you)) {
        this.attack(me,you);
        this.attack(you,me);
    }
    
    if(this.isFatal(me)) {
        this.msg.push("<font color=red>" + me.getName() + " was slain</font><br>");
    }
    if(this.isFatal(you)) {
        this.msg.push("<font color=red>" + you.getName() + " was slain</font><br>");
    }
}
Arena.prototype.attack = function(attacker, defender) {
    var dam = attacker.getAttack() - defender.getDefense();
    
    if(dam < 0) {
        dam = 0;
    }
    defender.setHealth(defender.getHealth() - dam);
    
    this.msg.push(attacker.getName() + " swing his sword! " + dam + "<br>")
}
Arena.prototype.isFatal = function(player) {
    if (player.getHealth() <= 0) {
        return true;
    }
    else {
        return false;
    }
}