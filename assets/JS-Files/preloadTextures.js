

//textures//
let textures = [];
let swordTextures = [];
let bowTextures = [];
let staffTextures = [];
let potionTextures = [];
//
let outsideTextures = [];

function preload() {
    //textures//
    textures[0] = new tile(loadImage('assets/Default.png'), false)//default
    textures[1] = new tile(loadImage('assets/Grass.png'), false)//grass
    textures[2] = new tile(loadImage('assets/Rock.png'), true)//rock
    //outside Textures//
    outsideTextures[0] = textures[1];
    outsideTextures[1] = textures[2];


    //item textures//
    swordTextures[0] = loadImage('assets/Item_Textures/Swords/Sword1.png');
    swordTextures[1] = loadImage('assets/Item_Textures/Swords/Sword2.png');
    swordTextures[2] = loadImage('assets/Item_Textures/Swords/Sword3.png');
    swordTextures[3] = loadImage('assets/Item_Textures/Swords/Sword4.png');

    bowTextures[0] = loadImage('assets/Item_Textures/Bows/Bow1.png');
    bowTextures[1] = loadImage('assets/Item_Textures/Bows/Bow2.png');
    bowTextures[2] = loadImage('assets/Item_Textures/Bows/Bow3.png');
    bowTextures[3] = loadImage('assets/Item_Textures/Bows/Bow4.png');

    staffTextures[0] = loadImage('assets/Item_Textures/Staffs/Staff1.png');
    staffTextures[1] = loadImage('assets/Item_Textures/Staffs/Staff2.png');
    staffTextures[2] = loadImage('assets/Item_Textures/Staffs/Staff3.png');
    staffTextures[3] = loadImage('assets/Item_Textures/Staffs/Staff4.png');

    potionTextures[0] = loadImage('assets/Item_Textures/Potions/Potion1.png');
    potionTextures[1] = loadImage('assets/Item_Textures/Potions/Potion2.png');
}