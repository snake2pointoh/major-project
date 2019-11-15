// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

/*
item icon test images
https://opengameart.org/users/bizmasterstudios
https://www.youtube.com/c/BizmasterStudios
*/

let scene = "menu"

const backgroundColour = 255;

let mapOffsetX = 0;
let mapOffsetY = 0;
let showDebug = false;
let canMove = true;

//pause menu//
let paused = false;
let pauseBackground;
let backButton;
let resumeButton;

let saveLoad = [];

//textures//
let textures = [];
let swordTextures = [];
let bowTextures = [];
let staffTextures = [];
let potionTextures = [];

let edditorUiBackground = [];
let edditorUiButtons = [];
let edditorBrushes = [];
let Buttons = [];
let menuButtons = [];
let edditorMenuButtons = [];
let brushMode = "Single";
let edditorMenu = "map"
let brush = null;

let selectedTexture;

//load uploaded file//
var jsonF;
const reader = new FileReader();
let json;

//items and inventory//
let worldItems = [];
let itemEdditorButtons = [];
let itemEdditorTextBoxes = [];
let itemEdditorText = [];
let itemEdditorDemoIcon;

let itemEdditorSwordIconButtons = [];
let itemEdditorBowIconButtons = [];
let itemEdditorStaffIconButtons = [];
let itemEdditorPotionIconButtons = [];

let itemCreatorType = "sword";


//TODO//
/*
complete item edditor
*/

function preload(){
  //textures//
  textures[0] = new tile(loadImage('assets/Default.png'),false)//default
  textures[1] = new tile(loadImage('assets/Grass.png'),false)//grass
  textures[2] = new tile(loadImage('assets/Rock.png'),true)//rock

  //item textures//
  swordTextures[0] = loadImage('assets/sword_normal.png');
  swordTextures[1] = loadImage('assets/sword_shiny.png');
}

function setup() {
  frameRate(60);
  noSmooth();
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");
  
  //menu buttons//
  menuButtons[0] = new Button(width/2, height/2 + 40, 64, 64, "edditor")
  menuButtons[1] = new Button(width/2, height/2 - 40, 64, 64, "game")

  //pause menu buttons//
  pauseBackground = new UiBackground(width/2 -100, height/2 -200, 200, 400, 50, 10)
  backButton = new Button(width/2, height/2 + 40, 64, 64, "back")
  resumeButton = new Button(width/2, height/2 - 40, 64, 64, "resume")

  //player character//
  Player = new PlayerCharacter(width/2, height/2, 5);
  
  //make map//
  MainMap = new GridGen(400,400,64,textures[0])
  
  //edditor items & buttons//
  edditorUiBackground[0] = new UiBackground(0, 100, 200, height-100, 50, 10);
  edditorUiBackground[1] = new UiBackground(0,0,width,100,50,10);
  edditorUiBackground[2] = new UiBackground(width-200, 100, 200, height-100, 50, 10);

  edditorUiButtons[0] = new ImageButton(50, 150 , 64, 64, textures[1]);
  edditorUiButtons[1] = new ImageButton(150, 150 , 64, 64, textures[2]);
  
  Buttons[0] = new Button(width-50, 150 ,64, 64,"save");
  Buttons[1] = new Button(width-150, 150 ,64, 64,"def map");
  Buttons[2] = new Button(width-50, 250 ,64, 64,"custom map");

  //item edditor buttons//
  itemEdditorButtons[0] = new Button(50, 150 , 64, 64,"New Sword");
  itemEdditorButtons[1] = new Button(150, 150 , 64, 64,"New Bow");
  itemEdditorButtons[2] = new Button(50, 250 , 64, 64,"New Staff");
  itemEdditorButtons[3] = new Button(150, 250 , 64, 64,"New Potion");

  itemEdditorButtons[4] = new Button(width- 250, 150 , 64, 64,"Save Item");
  //item edditor text boxes//
  itemEdditorText[0] = new TextBox(225, height-330, 200, 25,"Attack Range")
  itemEdditorTextBoxes[0] = new TextInputBox(225, height -300, 200, 50, 4, true, 1000);

  itemEdditorText[1] = new TextBox(225, height-230, 200, 25,"Attack Speed")
  itemEdditorTextBoxes[1] = new TextInputBox(225, height -200, 200, 50, 4, true, 1000);

  itemEdditorText[2] = new TextBox(225, height-130, 200, 25,"Damage")
  itemEdditorTextBoxes[2] = new TextInputBox(225, height -100, 200, 50, 4, true, 1000);

  itemEdditorTextBoxes[3] = new TextInputBox(width/2 - 150, 150, 300, 50, 20);
  
  edditorMenuButtons[0] = new Button(100,50,64,64,"map");
  edditorMenuButtons[1] = new Button(200,50,64,64,"items");

  itemEdditorSwordIconButtons[0] = new ImageButton(250, 150 , 64, 64, swordTextures[0]);
  itemEdditorSwordIconButtons[1] = new ImageButton(250, 250 , 64, 64, swordTextures[1]);

  itemEdditorDemoIcon = new ImageBox(width/2 - 100,height/2 - 100,200,200,swordTextures[0]);
  
  //brush types//
  edditorBrushes[0] = new Button(50,250,64,64,"Single");
  edditorBrushes[1] = new Button(150,250,64,64,"Area");
  
  //fill the saveLoad array//
  saveLoad = []
  for(let y=0; y< MainMap.grid.length; y++){
    for(let x=0; x< MainMap.grid[y].length; x++){
      MainMap.grid[y][x].save(saveLoad)
    }
  }
  console.log("saved");

  selectedTexture = textures[1]
}

function draw() {
  background(backgroundColour);

  if(scene === "menu"){
    menu()
  }

  if(scene === "game"){
    game()
  }
  
  if(scene === "edditor"){
    edditor()
  }

  if(paused === true){
    pauseBackground.draw()
    backButton.draw()
    resumeButton.draw()
  }

  //show fps//
  push()
  textSize(30)
  text(Math.round(frameRate()), 10, 40,)
  pop()

}

function mapEdditor(mapGrid){
  let mouseOnUi = false;
  if(!paused){
    //update for 2d array//
    for(let y = 0; y < mapGrid.length; y++){
      for(let x = 0; x < mapGrid[y].length; x++){
        mouseOnUi = false;
        for(let j = 0; j < edditorUiBackground.length; j++){
          if(edditorUiBackground[j].mouseOverUi()){
            mouseOnUi = true
          }
        }
        if(mouseOnUi === false){
          if(brushMode === "Single"){
            if(mouseIsPressed && mapGrid[y][x].mouseOverTile()){
              mapGrid[y][x].tile = selectedTexture
              mapGrid[y][x].hasCollision = selectedTexture.hasCollision
              
            }
          }
        }
      }
    }
  }
  //draw edditor ui//
  
  for(let i = 0; i < edditorUiButtons.length; i++){
    edditorUiButtons[i].draw()
  }
  for(let i = 0; i < edditorBrushes.length; i++){
    edditorBrushes[i].draw()
  }
  
}

function itemEdditorUi(){
  for(let i = 0; i < itemEdditorButtons.length; i++){
    itemEdditorButtons[i].draw()
  }
  for(let i = 0; i < itemEdditorTextBoxes.length; i++){
    itemEdditorTextBoxes[i].draw()
  }
  for(let i = 0; i < itemEdditorText.length; i++){
    itemEdditorText[i].draw()
  }
  if(itemCreatorType === "sword"){
    for(let i = 0; i < itemEdditorSwordIconButtons.length; i++){
      itemEdditorSwordIconButtons[i].draw()
    }
  }
  itemEdditorDemoIcon.draw()
}

function itemCreator(itemType){
  let item;
  if(itemType === "sword"){
    item = new SwordItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  if(itemType === "bow"){
    item = new BowItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  if(itemType === "staff"){
    item = new StaffItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  if(itemType === "potion"){
    item = new PotionItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  return item;
}

function edditorUi(){
  for(let i = 0; i < edditorUiBackground.length; i++){
    edditorUiBackground[i].draw()
  }
  for(let i = 0; i < edditorMenuButtons.length; i++){
    edditorMenuButtons[i].draw()
  }
  for(let i = 0; i < Buttons.length; i++){
    Buttons[i].draw()
  }
}

function keyTyped(){
  if(scene === "edditor"){
    if(edditorMenu === "items"){
      for(let i = 0; i < itemEdditorTextBoxes.length; i++){
        if(itemEdditorTextBoxes[i].focused){
          itemEdditorTextBoxes[i].updateText(key)
        }
      }
    }
  }
}

function keyPressed(){
  if(key === "t"){
    showDebug = !showDebug
  }

  if(keyCode === ESCAPE && scene !== "menu"){
    paused = !paused
  }

  if(scene === "edditor"){
    if(edditorMenu === "items"){
      for(let i = 0; i < itemEdditorTextBoxes.length; i++){
        if(itemEdditorTextBoxes[i].focused){
          if(keyCode === BACKSPACE){
            itemEdditorTextBoxes[i].textBackspace()
          }
          if(keyCode === ENTER){
            itemEdditorTextBoxes[i].setMax();
          }
        }
      }
    }
  }
  if(scene === "game"){
    if(key === "e" && !paused){
      Player.Inv.invOpen = !Player.Inv.invOpen;
      Player.Hotbar.invOpen = Player.Inv.invOpen;
      canMove = !Player.Inv.invOpen;
    }
  }
}

function mouseClicked(){
  let mouseOnUi = false;
  if(scene === "edditor"){
    mouseOnUi = false;
    for(let j = 0; j < edditorUiBackground.length; j++){
      if(edditorUiBackground[j].mouseOverUi()){
        mouseOnUi = true
      }
    }
    if(edditorMenu === "map"){
      //select what tile to paint//
      for (let i = 0; i < edditorUiButtons.length; i++) {
        if(edditorUiButtons[i].mouseOn() && mouseButton === LEFT){
          selectedTexture = edditorUiButtons[i].tile
        }
      }
      //select brush bode//
      for(let i = 0; i < edditorBrushes.length; i++){
        if(edditorBrushes[i].mouseOn()){
          brushMode = edditorBrushes[i].name
          brush = null;
          canMove = true;
        }
      }
      //area Brush//
      if(brushMode === "Area"){
        if(!mouseOnUi){
          if(brush === null){
            brush = new areaBrush(mouseX, mouseY)
            canMove = false;
          }
          else{
            brush.updateSize(mouseX, mouseY)
            brush.changeTiles(MainMap.grid);
            brush = null;
            canMove = true;
          }
        }
      }
    }
    if(edditorMenu === "items"){
      for(let i = 0; i < itemEdditorTextBoxes.length; i++){
        itemEdditorTextBoxes[i].mouseOn()
      }
      if(itemCreatorType === "sword"){
        for(let i = 0; i < itemEdditorSwordIconButtons.length; i++){
          if(itemEdditorSwordIconButtons[i].mouseOn()){
            itemEdditorDemoIcon.image = itemEdditorSwordIconButtons[i].image
          }
        }
      }

      if(itemEdditorButtons[0].mouseOn()){ //new bow//
        itemCreatorType = "sword";

        itemEdditorDemoIcon.image = itemEdditorSwordIconButtons[0].image
        
        itemEdditorText[0].textData = "Attack Range"
        itemEdditorText[1].textData = "Attack Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if(itemEdditorButtons[1].mouseOn()){ //new bow//
        itemCreatorType = "bow";

        itemEdditorText[0].textData = "Range"
        itemEdditorText[1].textData = "Draw Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if(itemEdditorButtons[2].mouseOn()){ //new staff//
        itemCreatorType = "staff";

        itemEdditorText[0].textData = "Cast Range"
        itemEdditorText[1].textData = "Cast Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if(itemEdditorButtons[3].mouseOn()){ //new Potion//
        itemCreatorType = "potion";

        itemEdditorText[0].textData = "Duration"
        itemEdditorText[1].textData = "Affect"
        itemEdditorText[2].textData = "Strength"
      }
      if(itemEdditorButtons[4].mouseOn()){ //saveItem//
        worldItems.push(itemCreator(itemCreatorType));
      }
    }

    //save load//UPDATE FOR 2D ARRAY
    if(Buttons[0].mouseOn()){ //save//
      saveLoad = []
      for(let y=0; y< MainMap.grid.length; y++){
        for(let x=0; x< MainMap.grid[y].length; x++){
          MainMap.grid[y][x].save(saveLoad)
        }
      }
      console.log("saved");
      var JsonSave = {
        saveData: saveLoad,
      }
      saveJSON(JsonSave, "MapSaveData");
    }
    
    if(Buttons[1].mouseOn()){ //load//
      //make better//
      loadJSON("assets/MapSaveData.json", loadMap)
    }
    if(Buttons[2].mouseOn()){ //load//
      //make better//
      loadMap(json);
    }
    
    //select edditor mode//
    if(edditorMenuButtons[0].mouseOn()){ //tiles
      edditorMenu = "map"
    }
    if(edditorMenuButtons[1].mouseOn()){ //items
      edditorMenu = "items"
      mapOffsetX = 0;
      mapOffsetY = 0;
    }
  }

  if(scene === "menu"){
    if(menuButtons[0].mouseOn()){
      resetVals()
      scene = "edditor";
    }
    if(menuButtons[1].mouseOn()){
      resetVals()
      scene = "game";
    }
  }

  if(paused){
    if(resumeButton.mouseOn()){
      paused = false;
    }
    if(backButton.mouseOn()){
      scene = "menu";
      resetVals();
    }
  }
}

function loadMap(data){
  console.log(data.saveData);
  saveLoad = data.saveData;
  let i = 0;
  for(let y=0; y< MainMap.grid.length; y++){
    for(let x=0; x< MainMap.grid[y].length; x++){
      MainMap.grid[y][x].load(saveLoad[i])
      i++
    }
  }
  console.log("Loaded");
}

function playerController(player){
  if(!paused && canMove){
    if(keyIsDown(87)){
      player.move("up")
    }
    if(keyIsDown(83)){
      player.move("down")
    }
    if(keyIsDown(65)){
      player.move("left")
    }
    if(keyIsDown(68)){
      player.move("right")
    }
    //sprinting//
    // if(keyIsDown(SHIFT)){
    //   Player.movespeed = 6
    // }
    // else Player.movespeed = 3
  }
}

function inventoryController(){
  //do
}

//load custom map save//
function calledFromHTML(){
  jsonF = document.getElementById("Json-file").files[0];
  reader.readAsText(jsonF)
  reader.onloadend = function(){
    json = JSON.parse(reader.result)
  }
}

function menu(){
  for(let i = 0; i < menuButtons.length; i++){
    menuButtons[i].draw()
  }
}

function game(){
  MainMap.draw()
  playerController(Player)
  Player.draw()
  Player.collisionDetect(MainMap.grid)
}

function edditor(){
  if(edditorMenu === "map"){
    MainMap.draw();
    playerController(Player);
    mapEdditor(MainMap.grid);
    
    if(brush != null){
      brush.draw();
    }
  }
  else if(edditorMenu === "items"){
    itemEdditorUi();
  }
  edditorUi();
}

function resetVals(){
  Player.left = true;
  Player.right = true;
  Player.top = true;
  Player.bottom = true;
  Player.Inv.invOpen = false; 
  Player.Hotbar.invOpen = false;
  
  mapOffsetX = 0;
  mapOffsetY = 0;
  
  showDebug = false;
  canMove = true;
  brushMode = "Single";
  brush = null;
  
  paused = false;
}