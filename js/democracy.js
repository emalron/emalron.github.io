function Candidate(name, attributes) {
    this.name = name;
    this.attributes = attributes;
}
Candidate.prototype.setAttris = function(key, value) {
    if (key in this.attributes) {
        this.attributes[key] += value;
    }
}

function World() {
    this.player = new Candidate("Aaron", {'a': 10,'b': 11,'c': 5});
}

function update(world) {    
    var _name1 = world.player.name;
    $('#player1name').html(_name1);
    
    var okey = Object.keys(world.player.attributes);
            
    var _stat1 = "";
    for (i=0;i<okey.length;i++) {
        _stat1 += okey[i] + ": " + world.player.attributes[okey[i]] + "<br>";
    }
    $('#player1stat').html(_stat1);
}