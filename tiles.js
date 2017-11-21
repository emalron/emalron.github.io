var game;
    var omap =[
        [1,1,1,1,1,1,1],
        [1,0,0,0,1,1,1],
        [1,1,1,0,0,1,1],
        [1,1,1,1,0,1,1],
        [1,1,1,1,0,0,1],
        [1,1,1,1,1,3,1],
        [1,1,1,1,1,1,1]
    ];
    
var goal = 0;
var gameOptions = {
    // width of the game, in pixels
    gameWidth: 640,
    
    // tint colors to be applied to tiles
    tileColors: [0x00ff00, 0x00aa00],
    
    // number of tiles visible, works better if it's even, in this first prototype
    verticalTiles: 7
}

window.onload = function() {
    // determining window width and height
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    // if we are in landscape mode, then set window height to fake a potrait mode
    if(windowWidth > windowHeight) {
        windowHeight = windowWidth * 1.8;
    }
    
    // defining game height
    var gameHeight = windowHeight * gameOptions.gameWidth / windowWidth;
    
    // creation of the game itself
    game = new Phaser.Game(840, 600, Phaser.CANVAS, 'phaser-tiles', {preload: preload, create: create});
    document.addEventListener("keyup", keyb, false);
    document.addEventListener("mousedown", mb, false);
}

function preload() {
    game.load.image('tiles', 'sci-fi-tiles.png');
    game.load.image('hero', 'hero.png');
    
}

var cursors;

function create() {
    game.stage.backgroundColor = '#787878';
    // create some map data dynamically
    // map size is 7*7 tiles
    

    
    var data = '';
    
    data = '1,1,1,1,1,1,1\n1,0,0,0,1,1,1\n1,1,1,0,0,1,1\n1,1,1,1,0,1,1\n1,1,1,1,0,0,1\n1,1,1,1,1,3,1\n1,1,1,1,1,1,1\n';
    
    // add date to the cache
    game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);

    //  Create our map (the 16x16 is the tile size)
    map = game.add.tilemap('dynamicMap', 16, 16);
    map.addTilesetImage('tiles','tiles',16,16);
    map.setCollision(1);
    
    layer = map.createLayer(0);
    layer.resizeWorld();

    
    sprite = game.add.sprite(16,16,'hero');
    
    var tutor = game.add.text(16*7+10,16,'arrow keys can move hero. right click to find the flag');

}

function keyb(e) {
    move(e);
    checker();
}

function checker() {
    var i = sprite.x/16;
    var j = sprite.y/16;
    
    if (omap[j][i] == 3  && goal == 0) {
        alert('you did it.');
        goal = 1;
    }
}

function move(dir) {
    var i = sprite.x / 16;
    var j = sprite.y / 16;
    var k = 0;
    var l = 0;
    
    if (dir.keyCode == '38') {
        console.log(dir.keyCode);
        l--;
        // up arrow
    }
    else if (dir.keyCode == '40') {
        console.log(dir.keyCode);
        l++
        // down arrow
    }
    else if (dir.keyCode == '37') {
        console.log(dir.keyCode);
        k--;
       // left arrow
    }
    else if (dir.keyCode == '39') {
        console.log(dir.keyCode);
        k++;
       // right arrow
    }
    var target = {
        x: i+k,
        y: j+l
    };
    
    if(omap[j+l][i+k] != 1) {
        if(i != target.x) {
            sprite.x = target.x*16;
        }
        if(j != target.y ) {
            sprite.y = target.y*16;    
        }
        return true;
    }
    return false;
}

var jes = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
];

function find(i,j,g) {
    jes[j][i] =1 ;
    sprite.x = i*16;
    sprite.y = j *16;
    
    if(omap[j][i] == g) {
        console.log(jes);
        return true;
    }
    else {
        if(omap[j][i+1] != 1 && jes[j][i+1] == 0 && i < 6) find(i+1,j,g);
        if(omap[j+1][i] != 1 && jes[j+1][i] == 0 && j < 6) find(i,j+1,g);
        if(omap[j][i-1] != 1 && jes[j][i-1] == 0 && i > 0) find(i-1,j,g);
        if(omap[j-1][i] != 1 && jes[j-1][i] == 0 && j > 0) find(i,j-1,g);
    }
}

function mb(e) {
    if(e.which == 3) {
        find(sprite.x/16,sprite.y/16,3);
        checker();
    }
}

