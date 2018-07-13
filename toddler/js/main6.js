var game = new Phaser.Game(640, 360, Phaser.AUTO);

var state = {
    preload: function() {
        this.load.image('bg', 'assets/images/background.png');
//        this.load.image('chicken', 'assets/images/chicken.png');
//        this.load.image('horse', 'assets/images/horse.png');
//        this.load.image('pig', 'assets/images/pig.png');
//        this.load.image('sheep', 'assets/images/sheep3.png');
        this.load.image('rightArrow', 'assets/images/arrow.png');
        this.load.image('leftArrow', 'assets/images/arrow.png');
        
        this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
        this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
        this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3);
        this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3);
    },
    create: function() {
        // set display
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        // load background images
        this.bg = this.game.add.sprite(0,0,'bg');
        
        // set a group for animals
        var animalData = [
            {key: 'chicken', text: 'CHICKEN'},
            {key: 'horse', text: 'HORSE'},
            {key: 'pig', text: 'PIG'},
            {key: 'sheep', text: 'SHEEP'},
        ];
        
        this.animals = this.game.add.group();
        
        var self=this;
        
        animalData.forEach(function(e) {
            self.animal = self.animals.create(-1000, self.game.world.centerY, e.key);
            self.animal.anchor.setTo(.5);
            
            self.animal.animations.add('animation', [0, 1, 2, 1, 0, 1], 3, false);
            
            self.animal.inputEnabled = true;
            self.animal.input.inputPerfectClick = true;
            self.animal.events.onInputDown.add(self.animateAnimal, self);
        });
        
        this.animal.current = this.animals.next();
        this.animal.current.position.x = this.game.world.centerX;
        
        // set a group for arrows
        this.arrows = this.game.add.group();
        
        var arrowData = [
            {key: 'rightArrow', posX: 580, direction: 1},
            {key: 'leftArrow', posX: 40, direction: -1}
        ]
        
        arrowData.forEach(function(e) {
            self.arrow = self.arrows.create(e.posX, self.game.world.centerY, e.key);
            self.arrow.anchor.setTo(.5);
            self.arrow.scale.setTo(e.direction*.5, .5);
            self.arrow.customParams = {direction: e.direction}
            
            self.arrow.inputEnabled = true;
            self.arrow.input.inputPerfectClick = true;
            self.arrow.events.onInputDown.add(self.switchAnimal, self);
        })
        
        this.isMoving = false;
    },
    
    switchAnimal: function(object, pointer) {
        
        if(this.isMoving) {
            return;
        }
        
        this.isMoving = true;
        
        var newAnimal, endX;
        var oldAnimalMovement = this.game.add.tween(this.animal.current);
        
        if(object.customParams.direction > 0) {
            endX = 800;
            newAnimal = this.animals.next();
            newAnimal.position.x = -150;
        }
        else if (object.customParams.direction < 0) {
            endX = -150;
            newAnimal = this.animals.previous();
            newAnimal.position.x = 800;
        }
        
        oldAnimalMovement.to({x: endX}, 1000).start();
        oldAnimalMovement.onComplete.add(function() {
            this.isMoving = false;
            console.log('a')
        }, this);        
        
        this.animal.current = newAnimal
        var newAnimalMovement = this.game.add.tween(newAnimal);
        newAnimalMovement.to({x: this.game.world.centerX}).start();
        newAnimalMovement.onComplete.add(function() {
            this.isMoving = false;
        }, this);
    },
    
    animateAnimal: function(object) {
        object.animations.play('animation')
    }
}

game.state.add('state', state);
game.state.start('state');