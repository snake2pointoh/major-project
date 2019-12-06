

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
    swordTextures[0] = loadImage('assets/sword_normal.png');
    swordTextures[1] = loadImage('assets/sword_shiny.png');
}