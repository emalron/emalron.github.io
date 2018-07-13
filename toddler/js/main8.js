var gWidth = 640;
var gHeight = 340;

var game = new Phaser.Game(gWidth, gHeight, Phaser.AUTO);
var state = {preload: preload, create: create};

game.state.add('state', state);
game.state.start('state');

var arrows, animals, arrow, animal, isMoving, text;
var arrowData = [
    {sprite: 'leftArrow', posX: 40, direction: -1},
    {sprite: 'rightArrow', posX: 600, direction: 1}
]
var animalData = [
    {sprite: 'chicken', sound: 'dogsound', text: 'CHICKEN'},
    {sprite: 'horse', sound: 'horsesound', text: 'HORSE'},
    {sprite: 'pig', sound: 'pigsound', text: 'PIG'},
    {sprite: 'sheep', sound: 'sheepsound', text: 'SHEEP'}
]

function preload() {
    // set the scale
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    // load the background
    game.load.image('bg', 'assets/images/background.png');
    
    // load the spritesheets for animals
    game.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 393/3, 200, 3);
    game.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 636/3, 200, 3);
    game.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 891/3, 200, 3);
    game.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 732/3, 200, 3);
    
    // load the arrows
    game.load.image('rightArrow', 'assets/images/arrow.png');
    game.load.image('leftArrow', 'assets/images/arrow.png');
    
    // load audio for animals
    game.load.audio('dogsound', ['assets/audio/dogsound.mp3', 'assets/audio/dogsound.ogg']);
    game.load.audio('horsesound', ['assets/audio/horsesound.mp3', 'assets/audio/horsesound.ogg']);
    game.load.audio('pigsound', ['assets/audio/pigsound.mp3', 'assets/audio/pigsound.ogg']);
    game.load.audio('sheepsound', ['assets/audio/sheepsound.mp3', 'assets/audio/sheepsound.ogg']);
}

function create() {
    // set the background
    game.add.sprite(0,0,'bg');
    
    // set the arrows
    arrows = game.add.group();
    
    arrowData.forEach(function(e) {
        arrow = arrows.create(e.posX, game.world.centerY, e.sprite);
        arrow.customParams = {direction: e.direction};
        arrow.scale.setTo(0.5*e.direction, 0.5);
        arrow.anchor.setTo(.5);
        
        arrow.inputEnabled = true;
        arrow.input.pixelPerfectClick = true;
        arrow.events.onInputDown.add(switchAnimal);
    })
    
    // set the animals
    animals = game.add.group();
    
    animalData.forEach(function(e) {
        animal = animals.create(-1000, game.world.centerY, e.sprite);
        animal.anchor.setTo(0.5);
        
        animal.animations.add('move', [0, 1, 2, 1, 0, 1], 4);
        
        animal.customParams = {audio: e.sound, text: e.text};
        animal.fx = game.add.audio(e.sound);
        
        animal.inputEnabled = true;
        animal.input.pixelPerfectClick = true;
        animal.events.onInputDown.add(animateAnimal);
    })
    animal = animals.next();
    animal.position.x = game.world.centerX;
    isMoving = false;
    
    var style = { font: '32px Arial', fill: '#f00', align: 'center'};
    text = game.add.text(game.world.centerX, 300, '', style);
    text.anchor.setTo(.5);
}

function switchAnimal(o, e) {
    var destX, nextAnimal;
    
    if(isMoving) {
        return;
    }
    isMoving = true;
    
    text.setText('');
    
    if (o.customParams.direction == 1) {
        destX = gWidth + animal.width/2;
        nextAnimal = animals.next();
        nextAnimal.position.x = -nextAnimal.width/2;
    }
    else if (o.customParams.direction == -1) {
        console.log('left');
        destX = -animal.width/2;
        nextAnimal = animals.previous();
        nextAnimal.position.x = gWidth + nextAnimal.width/2;
    }
    
    var animalMovement = game.add.tween(animal).to({x: destX}, 1000).start();
    var nextAnimalMovement = game.add.tween(nextAnimal).to({x: game.world.centerX}, 1000).start();
    
    nextAnimalMovement.onComplete.add(function(e) { 
        isMoving = false; 
    })
    
    animal = nextAnimal;
}

function animateAnimal(o) {
    if(isMoving) {
        return;
    }
    o.play('move');
    o.fx.play(o.sound);
    showText(o);
}

function showText(o) {
    
    text.setText(o.customParams.text)
    console.log(o.text);
    
}