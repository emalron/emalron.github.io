var FORM = {
    HUMAN: 0,
    ELF: 1,
    ORC: 2
}

var LOAD = {
    NORMAL: 0,
    BURDEN: 1,
    STRESSED: 2,
    STRAINTED: 3,
    OVERTAXED: 4,
    OVERLOADED: 5
}
                         

function Character(name, ac) {
    this.exp = 1;
    this.ac = ac || 10;
    this.luck = 0;
    this.isPolymorphed = false;
    this.isTrapped = false;
    this.hitDice = 0;
    
    this.equipments = {
        head: {},
        body: {},
        robe: {},
        globe: {},
        boots: {},
        primary: {},
        secondary: {},
        ring1: {acc: 0, dam: 0},
        ring2: {acc: 0, dam: 0},
        amulet: {}
    }
    
    this.form = FORM.HUMAN;
    this.loadState = LOAD.NORMAL;
}

Character.prototype.getToHIT = function(target) {
    let output = 0;
    
    // get target's ac
    output += target.ac;
    console.log('Target AC: ' + target.ac);
    
    // get MC's experience level or Hit dice if mc's polymorphing
    if(this.isPolymorphed) {
        output += this.hitDice;
        console.log('MC is polymorphing, its Hit dice: ' + this.hitDice);
    }
    else {
        output += this.exp;
        console.log('MC Experience level: ' + this.exp);
    }
    
    // luck factor range from -13 to 13
    output += this.luck;
    console.log('MC luck: ' + this.luck);
    
    // bonus from dextery
    output += 0
    
    // add increase accuracy bonus
    output += this.getBonus("acc");
    console.log('MC total accuracy bonus: ' + this.getBonus("acc"));
    
    // are you an elf attacking an orc?
    if(target.form == FORM.ORC && this.form == FORM.ELF) {
        output += 1;
    }
    
    // is target asleep?
    if(target.state.sleep == 1) {
        output += 2;
        target.state.sleep = 0;
    }
    
    // is the target paralyzed?
    if(target.state.paralyzed == 1) {
        output += 4;
        if(dice(1,10) == 10) {
            target.state.paralyzed = 0;
        }
    }
    
    // From here Melee procedure
    // basic advantage for melee fighting
    output += 1;
    
    // bonus from MC's strength
    output += 0;
    
    // beginner's luck
    if(this.exp <= 2) {
        output += 1;
    }
    
    // check load
    if (this.loadState >= LOAD.OVERTAXED) {
        return 0;
    }
    else {
        var table = [0, -1, -3, -5];
        output += table[this.loadState];
    }
    
    // ADD PENALTY FOR TRAPPED MC LATER -3
    // ADD ADVANTAGE FOR STUNNED MONSTERS LATER +2
    // ADD ADVANTAGE FOR FLEEING MONSTER LATER +2
    // ADD PENALTY FOR MONK WEARING BODY ARMOR LATER -20
    
    return output;
}

Character.prototype.getBonus = function(type) {
    var output = 0;
    type = type.toLowerCase();
    console.log(type)
    
    switch(type) {
        case "acc":
            // from equipment
            console.log(this.equipments);
            for(var x in this.equipments) {
                var cur = this.equipments[x].acc || 0;
                output += cur;
            }
            break;
        case 'dmg':
        case 'damage':
        case 'dam':
            break;
    }
    
    console.log('out of switch');
    return output;
}