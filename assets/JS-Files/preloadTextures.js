

//textures//
let textures = [];
let swordTextures = [];
let bowTextures = [];
let staffTextures = [];
let potionTextures = [];

function preload() {
    //textures//
    textures[0] = new tile(loadImage('assets/Default.png'), false)//default
    textures[1] = new tile(loadImage('assets/Grass.png'), false)//grass
    textures[2] = new tile(loadImage('assets/Rock.png'), true)//rock

    //item textures//
    swordTextures[0] = loadImage('assets/sword_normal.png');
    swordTextures[1] = loadImage('assets/sword_shiny.png');
}