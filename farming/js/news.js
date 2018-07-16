function introMC(mc) {
    // NAME: XXX  EXP: XX  HP: (XX/XX)  AC: XX
    // ARMOR: XX
    // WEAPON: XX
    // RING1: XX  RING2: XX
    
    var output = "";
    
    output += "NAME: " + mc.name
    output += "  EXP: " + mc.exp
    output += "  HP: (" + mc.hp + "/" + mc.hp + ")"
    output += "  AC: " + mc.ac + "<br>";
    
    var armord = ""
    var arm = mc.equipments.armor;
    console.log(arm);
    
    if (arm.blessed) {
        armord += "blessed ";
    }
    if (arm.enchant > 0) {
        armord += "+" + arm.enchant + " armor";
    }
    if (arm.name == undefined) {
        armord = "NAKED";
    }
    else {
        armord += " " + arm.name;
    }
        
    var wpd = "";
    var wp = mc.equipments.primary;
    
    if(wp.blessed) {
        wpd += "blessed ";
    }
    if(wp.enchant > 0) {
        wpd += "+" + wp.enchant;
    }
    if(wp.name == undefined) {
        wpd = "BAREHAND";
    }
    else {
        wpd += " " + wp.name;
    }
    
    output += "ARMOR: " + armord + "<br>";
    output += "WEAPON: " + wpd + "<br><br>";
    
    return output;
}