var game = new Phaser.Game(800, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });


function preload() {
    game.load.image('sky', 'sky.png');
	game.load.image('ground', 'ground.png');
	game.load.spritesheet('dude', 'robot.png',50,37);
    game.load.spritesheet('jet', 'jet.png',50,6);

}

var player;
var jet;
var platforms;
var cursors;
var text;
var timer;
var state = [
    [1,0],
    [2,0],
    [3,1],
    [4,2],
    [4,3],
    [5,5],
    [6,6]
];
var curState;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
    
	game.add.sprite(0,0,'sky');
    
	var ground = game.add.sprite(0,game.world.height - 60,'ground');

	player = game.add.sprite(game.world.centerX,20,'dude');

	game.physics.arcade.enable(player);

	player.body.colliderWorldBounds = true;

	player.animations.add('live', [0], 10, true);
	player.animations.add('die', [1], 10, true);
    player.frame = 0;
    
    jet = game.add.sprite(player.body.x,player.body.y+37,'jet');
    game.physics.arcade.enable(jet);
    jet.animations.add('turnon', [0,1,2,3],10,true);

	cursors = game.input.keyboard.createCursorKeys();	

    timer =0;
    
	var style = { font: "15px Arial", fill: "#ff0044", align: "right" };
    text = game.add.text(game.world.width-10, 10, timer, style);
    text.anchor.set(1,0);
    
   // var text2 = game.add.text(game.world.centerX,game.world.centerY, 10, timer, {align:"center"});
   // text2.anchor.set(0.5);
    
    curState = 0;
    
    window.onkeyup = function (event) {
        console.log(event.keyCode);
        
        switch(event.keyCode) {
            case 38: // arrow up
            case 75: // k
                curState = state[curState][0];
                break;
            case 40: // arrow down
            case 74: // j
                curState = state[curState][1];
                break;
        }
    }
}

var dt = 0;
var thrust = [0, 2, 4, 6, 8];
var gravity = 7;
var fuel = 100;
var accel = 0;

function update() {
    
    dt = game.time.elapsed;
    text.text = 'Safety landing velocity: 20 m/s'
        + '\nThrust: ' + thrust[curState] 
        + '\nAccel: ' + (gravity-thrust[curState]) 
        + '\nVelocity: ' + player.body.velocity.y.toFixed(2)
        + '\nFuel: ' + fuel.toFixed(2);
    
    // did he land?
	if(player.body.y >= game.world.height-60-37) {
        player.body.y = game.world.height-60-37;
        if(player.body.velocity.y > 20) {
            console.log('you are dead @ ' + player.body.velocity.y + ' m/s');
            curState = 5;
            player.frame = 1;
        }
        curState = 6;
	}
    
    if(curState < 5)
    {
        accel = gravity;
        if(fuel > 0) {
            accel = gravity - thrust[curState];
            fuel -= thrust[curState]*dt/1000;
        }
        
        player.body.velocity.y = player.body.velocity.y + accel*dt/1000;
    }
    
    if(curState > 0 && curState < 5) {
        jet.body.x = player.body.x;
        jet.body.y = player.body.y+37;
        jet.animations.play('turnon');
    }
    
    if (curState == 0) {
        jet.frame = 0;
        jet.animations.stop();
    }
}