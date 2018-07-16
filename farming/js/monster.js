var SIZE = {
    SMALL: 0,
    LARGE: 1
}

function Monster(name, exp, ac) {
    this.ac = ac || 10;
    this.hp = dice(exp,8);
    this.state = {
        "awaken": 1,
        "sleep": 0,
        "stunned": 0,
        "paralyzed": 0,
        "fleeing": 0,
        "trapped": 0
    }
    this.exp = exp;
    
    this.equipments = {
        armor: {},
        primary: {},
        ring1: {},
        ring2: {},
    }
    
    this.name = name;
    
    this.form = this.setForm(name);
    
    this.size = SIZE.SMALL;
    
    this.live = 0;
}

Monster.prototype.setForm = function(type) {
    type = type.toLowerCase();
    
    switch(type) {
        case 'orc':
            this.form = FORM.ORC;
    }
}