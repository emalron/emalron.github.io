var game = new Phaser.Game(640, 340, Phaser.AUTO);
var state = {
    preload: function() {
        // load background
        this.load.image('bg', 'assets/images/background.png');

        // load spritesheets
        this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
        this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
        this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297,200, 3);
        this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244,200,3);
        
        // load arrow sprite
        this.load.image('rightArrow', 'assets/images/arrow.png')
        this.load.image('leftArrow', 'assets/images/arrow.png')
    },
    create: function () {
        // display setting
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally= true;
        
        // load background
        this.background = game.add.sprite(0,0,'bg');

        // make a group for animals
        var animalData = [
            {key: 'chicken', text: 'CHICKEN'},
            {key: 'horse', text: 'HORSE'},
            {key: 'pig', text: 'PIG'},
            {key: 'sheep', text: 'SHEEP'},
        ]

        this.animals = game.add.group();
        var self = this;

        animalData.forEach(function(e) {
            self.animal = self.animals.create(-1000, self.game.world.centerY, e.key);
            self.animal.anchor.setTo(.5);
            self.animal.customParams = {text: e.text};

            self.animal.animations.add('animation', [0, 1, 2, 1, 0, 1], 3, false);

            self.animal.inputEnabled = true;
            self.animal.input.inputPerfectClick = true;
            self.animal.events.onInputDown.add(self.animateAnimal, self);
        })
        
        // let the animal appeared
        this.animal = this.animals.next();
        this.animal.position.x = this.game.world.centerX;
        
        // make the arrow group
        this.arrows = this.game.add.group();
        
        var arrowData = [
            {key: 'rightArrow', direction: 1, posX: 600},
            {key: 'leftArrow', direction: -1, posX: 40}
        ]
        
        arrowData.forEach(function(e) {
            var arrow = self.arrows.create(e.posX, self.game.world.centerY, e.key);
            arrow.anchor.setTo(.5);
            arrow.scale.setTo(.5*e.direction, .5);
            
            arrow.inputEnabled = true;
            arrow.input.inputPerfectClick = true;
            arrow.events.onInputDown.add(self.switchAnimal, self);
            
            arrow.customeParams = {direction: e.direction};
        })
        
        this.isMoving = false;
    },
    
    animateAnimal: function(object) {
        object.animations.play('animation');
    },
    
    switchAnimal: function(object) {
        if (this.isMoving) {
            return;
        }
        
        this.isMoving = true;
        
        var dir = object.customeParams.direction;
        var newAnimal;
        var endX;
        
        if(dir == 1) {
            // prepare new animal
            newAnimal = this.animals.next();
            newAnimal.position.x = -newAnimal.width/2;
            
            // for current animal
            endX = this.game.world.width + this.animal.width/2;
        }
        else if (dir == -1) {
            newAnimal = this.animals.previous();
            newAnimal.position.x = this.game.world.width + newAnimal.width/2;
            
            endX = -this.animal.width/2;
        }
        
        // tween!
        var currentAnimalMovement = this.game.add.tween(this.animal).to({x: endX}, 1000).start();
        var newAnimalMovement = this.game.add.tween(newAnimal).to({x: this.game.world.centerX}, 1000).start();
        
        newAnimalMovement.onComplete.add(function() { this.isMoving = false; }, this);
        currentAnimalMovement.onComplete.add(function() { this.isMoving = false; }, this);
        
        // update current animal
        this.animal = newAnimal;
        console.log('animal switched ' + object.customeParams.direction);
    }
}

game.state.add('state', state);
game.state.start('state');