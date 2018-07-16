

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
    
    this.form = this.setForm(name);
}

Monster.prototype.setForm = function(type) {
    type = type.toLowerCase();
    
    switch(type) {
        case 'orc':
            this.form = FORM.ORC;
    }
}