
//Game config
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1024,
        height: 2162
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('planet-background', 'assets/backgrounds/planet-background.jpg')
    this.load.image('ground-texture', 'assets/ground-texture.png')
    this.load.image('pc-troop-dood', 'assets/player-characters/pc-troop-dood.png');
}

let ground;
let platforms;
let player;

function create () {
    // https://labs.phaser.io/edit.html?src=src\camera\follow%20offset.js
    //  Set the camera and physics bounds to be the size of 4x4 bg images
    // this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    // this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

    // //  Mash 4 images together to create our background
    // this.add.image(512, 1550, 'planet-background');
    // this.add.image(0, 2162, 'planet-background').setFlipX(true);
    // this.add.image(0, 1080, 'planet-background').setFlipY(true);
    // this.add.image(1920, 1080, 'planet-background').setFlipX(true).setFlipY(true);


    this.add.image(512, 1550, 'planet-background');


    ground = this.physics.add.staticGroup();
    ground.create(512, 2130, 'ground-texture').setScale(2.5).refreshBody();

    platforms = this.physics.add.staticGroup({
        key: 'ground-texture',
        repeat: 5,
        setXY: { x: 80, y: 2000, stepX: 70 }
    });

    platforms.children.iterate(function (platform) {
        // Set the x position randomly between 0 and the game width
        platform.x = Phaser.Math.Between(0, game.config.width);

        // Set the y position randomly between 100 and 500 (adjust as needed)
        platform.y = Phaser.Math.Between(0, game.config.height);

        platform.setScale(0.5)

        platform.refreshBody();
    });

    player = this.physics.add.sprite(512, 1500, 'pc-troop-dood');
    player.setScale(0.25);

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, ground)
    this.physics.add.collider(player, platforms)

    cursors = this.input.keyboard.createCursorKeys();
}

function update ()
    {
        if (cursors.left.isDown)
    {
        player.setVelocityX(-375);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(375);
    }
    else
    {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-600);
    }
}
