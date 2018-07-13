var game = new Phaser.Game(640, 360, Phaser.auto)
var gameState = {
    preload: function() {
        // load background
        this.load.image('bg', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('horse', 'assets/images/horse.png');
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('sheep', 'assets/images/sheep3.png');
        this.load.image('arrow', 'assets/images/arrow.png');
    },
    create: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        // add background first
        this.bg = this.game.add.sprite(0,0,'bg');
        
        // make a group for animals
        
        var animalData = [
            {key: 'chicken', text: 'CHICKEN'},
            {key: 'horse', text: 'HORSE'},
            {key: 'pig', text: 'PIG'},
            {key: 'sheep', text: 'SHEEP'},
        ];
        
        this.animals = this.game.add.group();
        
        var self = this;
        this.animal;
        
        animalData.forEach(function(e) {
            self.animal = self.animals.create(-1000, self.world.centerY, e.key);
            self.animal.anchor.setTo(.5);
            
            self.animal.inputEnabled = true;
            self.animal.input.pixelPerfectClick = true;
            self.animal.events.onInputDown.add(self.animateAnimal, self);
            
            self.animal.customParams = {text: e.text};
        })
        
        this.animal.current = this.animals.next();
        this.animal.current.position.set(this.game.world.centerX, this.game.world.centerY)
        
        
        // add right arrow
        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(.5);
        this.rightArrow.customParams = {direction: 1}
        
        // add left arrow
        this.leftArrow = this.game.add.sprite(80, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.customParams = {direction: -1}
        
        // make group for arrows
        var arrowData = [
            this.rightArrow,
            this.leftArrow
        ];
        
        arrowData.forEach(function(e) {
            e.inputEnabled = true;
            e.input.pixelPerfectClick = true;
            e.events.onInputDown.add(self.switchAnimal, self);
        })
        
        
        
    },
    update: function() {
        
    },
    switchAnimal: function(object, pointer) {
        if (object.customParams.direction == 1) {
            this.animal.current.position.x = -1000;
            this.animal.current = this.animals.next();
            this.animal.current.position.set(this.game.world.centerX, this.game.world.centerY)
        }
        else if (object.customParams.direction == -1) {
            this.animal.current.position.x = -1000;
            this.animal.current = this.animals.previous();
            this.animal.current.position.set(this.game.world.centerX, this.game.world.centerY)
        }
        
    },
    animateAnimal: function(sprite, event) {
        console.log('animate..' + sprite);
        console.log(event);
    }
    
}

game.state.add('state', gameState);
game.state.start('state');