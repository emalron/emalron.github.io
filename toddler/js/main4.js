var game = new Phaser.Game(640, 360, Phaser.AUTO);

var gState = {
    preload: function() {
        this.load.image('bg', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('horse', 'assets/images/horse.png');
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('sheep', 'assets/images/sheep3.png');
    },
    create: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.background = this.game.add.sprite(0, 0, 'bg');
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(.5);
        
        this.horse = this.game.add.sprite(100, 200, 'horse');
        this.horse.scale.setTo(.5);
        
        this.pig = this.game.add.sprite(600, 200, 'pig');
        this.pig.scale.setTo(-.5,.5);
        
        this.sheep = this.game.add.sprite(200, 100, 'sheep');
        this.sheep.scale.setTo(.5);
        this.sheep.anchor.setTo(.5);
        
    },
    update: function() {
        // let the sheep rotate clockwise
        this.sheep.angle += .5;
    }
}

game.state.add('state', gState);
game.state.start('state');