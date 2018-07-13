var game = new Phaser.Game(600, 360, Phaser.AUTO);

var gameState = {
    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('hores', 'assets/images/horse.png');
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('sheep', 'assets/images/sheep3.png');
    },
    create: function() {
        this.background = this.game.add.sprite(0,0,'background')
        
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(0.5,0.5);
    },
    update: function() {
        
    }
};

game.state.add('gameState', gameState);
game.state.start('gameState');