function dice(n, y) {
    let m = n;
    let output = 0;
    
    for(var i=0; i<m; i++) {
        output += Math.floor(Math.random()*y) + 1;
    }
    
    return output;
}