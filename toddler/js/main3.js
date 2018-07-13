var game = new Phaser.Game(640, 360, Phaser.AUTO)

var gameState = {
    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('horse', 'assets/images/horse.png')
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('sheep', 'assets/images/sheep3.png')
    },
    create: function() {
        this.bg = this.game.add.sprite(0,0, 'background');
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(0.5, 0.5);
        
        this.horse = this.game.add.sprite(100, 100, 'horse');
        this.horse.scale.setTo(0.5);
        
        this.pig = this.game.add.sprite(500,300, 'pig');
        this.pig.anchor.setTo(0.5);
        this.pig.scale.setTo(.5,.5);
        
        this.sheep = this.game.add.sprite(500,100, 'sheep');
        this.sheep.anchor.setTo(0.5);
        this.sheep.scale.setTo(.5);
        
        this.sheep.angle = 30;
        
    },
    update: function() {
        this.sheep.angle += .5;
    }
};

game.state.add('gameState', gameState);
game.state.start('gameState');