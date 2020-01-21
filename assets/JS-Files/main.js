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

/*
controls: wasd is for movement
f to puck up items
e for inv open/closed
mouse1/left click for moving items in the inv, clicking on buttons/text input boxes, and attacking
numbers 1-9 for selecting/using items in the hotbar
*/

let scene = "menu"

let backgroundColour = 255;

let fpsCounter = 0;
let lastFPSMillis = 0;

let mapOffsetX = 0;
let mapOffsetY = 0;
let playerPos = [[],[]];
let showDebug = false;
let canMove = true;

let playing = false;

//pause menu//
let paused = false;
let pauseBackground;
let backButton;
let resumeButton;

let saveLoad = [];

//editor stuffs//
let edditorUiBackground = [];
let edditorBrushes = [];
let edditorItemButtons = [];
let edditorAiButtons = [];
let Buttons = [];
let menuButtons = [];
let edditorMenuButtons = [];
let edditorMapMenuButtons = [];
let brushMode = "Single";
let edditorMenu = "map";
let edditorMapMenu = "tiles";
let brush = null;

let selectedTexture;
let selectedTextureList = "outside";

let outsideTextureList;

//load uploaded file//
var jsonF;
const reader = new FileReader();
let json;

//spawner settings//
let randomOnlyItems = false;
let customOnlyItems = false;
let customItem = null;

//items and inventory//
let worldItems = [ [],[],[],[] ]; //sword, bow, staff, potion//array order//
let itemEdditorButtons = [];
let itemEdditorTextBoxes = [];
let itemEdditorText = [];
let itemEdditorDemoIcon;

let itemEdditorSwordIconButtons;
let itemEdditorBowIconButtons;
let itemEdditorStaffIconButtons;
let itemEdditorPotionIconButtons;

let itemCreatorType = "sword";
let itemSpawnerType = "sword"

let customItemList;

//maps//
let mapList = [];
let currentMap = 0;
let mapSelectionButtons = [];
let mapSelectorList;

let newMapEditorText = [];
let newMapEditorTextbox = [];
let newMapEditorButtons = [];

let doorWorldId;
let doorOutId;
let doorId;
let doorEditorText = [];

let ai = [];

function setup() {
  frameRate(60);
  noSmooth();
  createCanvas(windowWidth, windowHeight);
  console.log(width + " Width " + height + " Height ");

  //menu buttons//
  menuButtons[0] = new Button(width / 2, height / 2 + 40, 64, 64, "editor")
  menuButtons[1] = new Button(width / 2, height / 2 - 40, 64, 64, "game")

  //pause menu buttons//
  pauseBackground = new UiBackground(width / 2 - 100, height / 2 - 200, 200, 400, 50, 10)
  backButton = new Button(width / 2, height / 2 + 40, 64, 64, "back")
  resumeButton = new Button(width / 2, height / 2 - 40, 64, 64, "resume")

  //player character//
  Player = new PlayerCharacter(width / 2, height / 2, 5);

  //make map//
  //mapList[0] = new GridGen(100, 100, 64, textures[1])

  //edditor items & buttons//
  edditorUiBackground[0] = new UiBackground(0, 100, 200, height - 100, 80, 100);
  edditorUiBackground[1] = new UiBackground(0, 0, width, 100, 80, 100);
  edditorUiBackground[2] = new UiBackground(width - 200, 100, 200, height - 100, 80, 100);

  edditorMapMenuButtons[0] = new Button(34,150,48,48,"Tiles")
  edditorMapMenuButtons[1] = new Button(100,150,48,48,"Items")
  edditorMapMenuButtons[2] = new Button(168,150,48,48,"Ai")

  //ai spawn buttons//
  edditorAiButtons[0] = new Button(50, 230, 64, 64,"Ai Spawn Add");
  edditorAiButtons[1] = new Button(150, 230, 64, 64,"Ai Spawn Remove");

  //item spawn buttons//
  edditorItemButtons[0] = new Button(50, 230, 64, 64,"Item Spawn Add");
  edditorItemButtons[1] = new Button(150, 230, 64, 64,"Item Spawn Remove");
  
  edditorItemButtons[2] = new Button(34, 314, 48, 48,"Rand Item Only");
  edditorItemButtons[3] = new Button(168, 314, 48, 48,"Custom Item Only");
  edditorItemButtons[4] = new Button(34, 380, 48, 48,"All Items");
  edditorItemButtons[5] = new Button(100, 314, 48, 48,"All Custom Items");

  //brush types//
  edditorBrushes[0] = new Button(50, 230, 64, 64, "Single");
  edditorBrushes[1] = new Button(150, 230, 64, 64, "Area");

  //save load buttons//
  Buttons[0] = new Button(width - 50, 150, 64, 64, "save");
  Buttons[1] = new Button(width - 150, 150, 64, 64, "def map");
  Buttons[2] = new Button(width - 50, 250, 64, 64, "custom map");

  //item edditor buttons//
  itemEdditorButtons[0] = new Button(50, 150, 64, 64, "New Sword");
  itemEdditorButtons[1] = new Button(150, 150, 64, 64, "New Bow");
  itemEdditorButtons[2] = new Button(50, 250, 64, 64, "New Staff");
  itemEdditorButtons[3] = new Button(150, 250, 64, 64, "New Potion");

  itemEdditorButtons[4] = new Button(width - 250, 150, 64, 64, "Save Item");
  itemEdditorButtons[5] = new Button(width - 250, 250, 64, 64, "Delete Item");

  //item edditor text boxes//
  itemEdditorText[0] = new TextBox(225, height - 330, 200, 25, "Attack Range")
  itemEdditorTextBoxes[0] = new TextInputBox(225, height - 300, 200, 50, 4, true, 1000);

  itemEdditorText[1] = new TextBox(225, height - 230, 200, 25, "Attack Speed")
  itemEdditorTextBoxes[1] = new TextInputBox(225, height - 200, 200, 50, 4, true, 5000);

  itemEdditorText[2] = new TextBox(225, height - 130, 200, 25, "Damage")
  itemEdditorTextBoxes[2] = new TextInputBox(225, height - 100, 200, 50, 4, true, 1000);

  itemEdditorTextBoxes[3] = new TextInputBox(width / 2 - 150, 150, 300, 50, 20);

  edditorMenuButtons[0] = new Button(100, 50, 64, 64, "map editor");
  edditorMenuButtons[1] = new Button(200, 50, 64, 64, "add map");
  edditorMenuButtons[2] = new Button(300, 50, 64, 64, "items");

  itemEdditorSwordIconButtons = new TextureButtonList(200, 100, 200, 325, 55, swordTextures);
  itemEdditorBowIconButtons = new TextureButtonList(200, 100, 200, 325, 55, bowTextures);
  itemEdditorStaffIconButtons = new TextureButtonList(200, 100, 200, 325, 55, staffTextures);
  itemEdditorPotionIconButtons = new TextureButtonList(200, 100, 200, 325, 55, potionTextures);

  itemEdditorDemoIcon = new ImageBox(width / 2 - 100, height / 2 - 100, 200, 200, swordTextures[0]);

  customItemList = new ItemButtonList(0, 425, 200, height-425, 55, worldItems);

  outsideTextureList = new TextureButtonList(0, 425, 200, height-425, 55, outsideTextures)

  doorTextureList = new TextureButtonList(0, 550, 200, height-550, 55, doorTextures)
  
  doorEditorText[0] = new TextBox(20, 480, 70, 25, "Door ID")
  doorId = new TextInputBox(20, 510, 70, 40, 4, true);
  
  doorEditorText[1] = new TextBox(20, 410, 70, 25, "Map Out")
  doorWorldId = new TextInputBox(20, 440, 70, 40, 4, true);
  
  doorEditorText[2] = new TextBox(110, 410, 70, 25, "Door Out")
  doorOutId = new TextInputBox(110, 440, 70, 40, 4, true);

  doorEditorText[3] = new TextBox(110, 480, 70, 25, "Door Direc")
  doorOutDirection = new TextInputBox(110, 510, 70, 40, 4, true, 4, 1);

  mapSelectorList = new ButtonList(0, 425, 200, height-425, 55, mapList)

  //map selection//
  mapSelectionButtons[0] = new Button(34, 314, 48, 48,"Map List");
  mapSelectionButtons[1] = new Button(100, 314, 48, 48,"World Tileset");
  mapSelectionButtons[2] = new Button(168, 314, 48, 48,"Building Outside Tileset");
  mapSelectionButtons[3] = new Button(34, 380, 48, 48,"Building Inside Tileset");
  mapSelectionButtons[4] = new Button(100, 380, 48, 48,"Doors");

  //new map edditor//
  newMapEditorText[0] = new TextBox(20, 200, 160, 25, "X Size")
  newMapEditorTextbox[0] = new TextInputBox(20, 230, 160, 50, 4, true, 400);

  newMapEditorText[1] = new TextBox(20, 300, 160, 25, "Y Size")
  newMapEditorTextbox[1] = new TextInputBox(20, 330, 160, 50, 4, true, 400);

  newMapEditorButtons[0] = new Button(50, 150, 64, 64, "Create Map")
  newMapEditorButtons[1] = new Button(150, 150, 64, 64, "Delete Map")

  loadJSON("assets/MapSaveData.json", loadMap)
  console.log("saved");

  selectedTexture = textures[1]
}

//draws and updates everything in the game//
function draw() {
  background(backgroundColour);
  playerPos = [[mapOffsetX/64 *-1],[mapOffsetY/64 *-1]]
  if (scene === "menu") {
    drawMenu()
  }

  if (scene === "game") {
    drawGame()
    aiPath()
  }

  if (scene === "editor") {
    drawEditor()
  }

  if (paused === true) {
    pauseBackground.draw()
    backButton.draw()
    resumeButton.draw()
  }

  //show fps//
  push()
  textSize(30)
  rect(5,10,45,40)
  fill(0,200,0)
  text(fpsCounter, 10, 40)
  pop()

  //update fps counter every second//
  if(millis() > lastFPSMillis + 1000){
    lastFPSMillis = millis()
    fpsCounter = Math.round(frameRate())
  }

  doPhys()
}

//does all map edditor functionallity//
function mapEdditor(mapGrid) {
  let mouseOnUi = false;
  if (!paused) {
    //update for 2d array//
    for (let y = 0; y < mapGrid.length; y++) {
      for (let x = 0; x < mapGrid[y].length; x++) {
        mouseOnUi = false;
        for (let j = 0; j < edditorUiBackground.length; j++) {
          if (edditorUiBackground[j].mouseOverUi()) {
            mouseOnUi = true
          }
        }
        //checks if the mouse is over ui and wether to change the tiles when you press the mouse//
        if (mouseOnUi === false) {
          if (brushMode === "Single") {
            if (mouseIsPressed && mapGrid[y][x].mouseOverTile()) {
              mapGrid[y][x].tile = selectedTexture
              mapGrid[y][x].hasCollision = selectedTexture.hasCollision
              if(selectedTextureList === "doors"){
                mapGrid[y][x].isDoor = true;
                mapGrid[y][x].doorId = doorId.returnAsNum();
                mapGrid[y][x].DoorOut = doorOutId.returnAsNum();
                mapGrid[y][x].MapOut = doorWorldId.returnAsNum();
                mapGrid[y][x].doorDirection = doorOutDirection.returnAsNum();
              }
              else {
                mapGrid[y][x].isDoor = false;
                mapGrid[y][x].doorId = 0;
                mapGrid[y][x].DoorOut = 0;
                mapGrid[y][x].MapOut = 0;
                mapGrid[y][x].doorDirection = 1;
              }
            }
          }
          if (brushMode === "ItemSpawnAdd") {
            if (mouseIsPressed && mapGrid[y][x].mouseOverTile()) {
              mapGrid[y][x].itemSpawner = new itemSpawnPoint(mapGrid[y][x].x + 10, mapGrid[y][x].y + 10, mapGrid[y][x].w -20, randomOnlyItems, customOnlyItems, customItem)
            }
          }
          if (brushMode === "ItemSpawnRemove") {
            if (mouseIsPressed && mapGrid[y][x].mouseOverTile()) {
              mapGrid[y][x].itemSpawner = undefined;
            }
          }
          if (brushMode === "AiSpawnAdd") {
            if (mouseIsPressed && mapGrid[y][x].mouseOverTile()) {
              mapGrid[y][x].aiSpawner = new AiSpawn(mapGrid[y][x].x + 10, mapGrid[y][x].y + 10, mapGrid[y][x].w -20, currentMap)
            }
          }
          if (brushMode === "AiSpawnRemove") {
            if (mouseIsPressed && mapGrid[y][x].mouseOverTile()) {
              mapGrid[y][x].aiSpawner = undefined;
            }
          }
        }
      }
    }
  }
}

//creates and returns a random item class based on the input variable//
function randomItemGen(itemType){
  let item;
  if(itemType === "sword"){
    item = new SwordItem(Math.round(random(70, 120)), Math.round(random(1, 5)), Math.round(random(10, 60)), "sword", swordTextures[Math.round(random(0, swordTextures.length-1))])
  }
  if(itemType === "bow"){
    item = new BowItem(Math.round(random(70, 120)), Math.round(random(1, 5)), Math.round(random(10, 60)), "bow", bowTextures[Math.round(random(0, bowTextures.length-1))])
  }
  if(itemType === "staff"){
    item = new StaffItem(Math.round(random(70, 120)), Math.round(random(1, 5)), Math.round(random(10, 60)), "staff", staffTextures[Math.round(random(0, staffTextures.length-1))])
  }
  if(itemType === "potion"){
    item = new PotionItem(Math.round(random(70, 120)), Math.round(random(1, 5)), Math.round(random(10, 60)), "potion", potionTextures[Math.round(random(0, potionTextures.length-1))])
  }
  return item;
}

//used when creating custom items in the edditor//
//it uses all the data from the text inpot boxes and creates an item of your choosing//
function itemCreator(itemType) {
  let item;
  if (itemType === "sword") {
    item = new SwordItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  if (itemType === "bow") {
    item = new BowItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  if (itemType === "staff") {
    item = new StaffItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  if (itemType === "potion") {
    item = new PotionItem(itemEdditorTextBoxes[0].returnAsNum(), itemEdditorTextBoxes[1].returnAsNum(), itemEdditorTextBoxes[2].returnAsNum(), itemEdditorTextBoxes[3].textData, itemEdditorDemoIcon.image)
  }

  return item;
}

//loads all the data from any Json file//
function loadMap(data) {
  mapList = [];
  worldItems = [[],[],[],[]];
  currentMap = 0;
  
  //load items//
  for (let i = 0; i < data.items.length; i++) {
    for (let j = 0; j < data.items[i].length; j++) {
      let item = data.items[i];
      if(item.type === "sword"){
        worldItems[0].push(new SwordItem(item.v1, item.v2, item.v3, item.v4, swordTexture[item.v5]))
      }
      if(item.type === "bow"){
        worldItems[1].push(new BowItem(item.v1, item.v2, item.v3, item.v4, bowTextures[item.v5]))
      }
      if(item.type === "staff"){
        worldItems[2].push(new StaffItem(item.v1, item.v2, item.v3, item.v4, staffTextures[item.v5]))
      }
      if(item.type === "potion"){
        worldItems[3].push(new PotionItem(item.v1, item.v2, item.v3, item.v4, potionTextures[item.v5]))
      }
    }
  }
  
  //load maps//
  for (let i = 0; i < data.saveData.length; i++) {
    mapList.push(new GridGen(data.saveData[i][1], data.saveData[i][2], 64, textures[1]))

    let g = 0;
    for (let y = 0; y < mapList[i].grid.length; y++) {
      for (let x = 0; x < mapList[i].grid[y].length; x++) {
        mapList[i].grid[y][x].load(data.saveData[i][0][g])
        g++
      }
    }
  }

  mapSelectorList.array = mapList;
  mapSelectorList.update()
  customItemList.array = worldItems;
  customItemList.update();

  console.log("Loaded");
}

//controls the player movement//
function playerController(player) {
  if (!paused && canMove) {
    if (keyIsDown(87)) {
      player.move("up")
    }
    if (keyIsDown(83)) {
      player.move("down")
    }
    if (keyIsDown(65)) {
      player.move("left")
    }
    if (keyIsDown(68)) {
      player.move("right")
    }
  }
}

//load custom map save//
function calledFromHTML() {
  //runs when you want to load a custom map save json//
  jsonF = document.getElementById("Json-file").files[0];
  reader.readAsText(jsonF)
  reader.onloadend = function () {
    json = JSON.parse(reader.result)
  }
}

//draws menu//
function drawMenu() {
  menuUi();
}

//draws game//
function drawGame() {
  if(mapList.length > 0){
    mapList[currentMap].draw()
  }
  Player.draw()
  for (let i = 0; i < ai.length; i++) {
    ai[i].draw()
  }
  gameUi()
}

//draws edditor//
function drawEditor() {
  if (edditorMenu === "map") {
    if(mapList.length > 0){
      mapList[currentMap].draw()
    }
    editorUi();
    mapEditorUi();

    if (brush != null) {
      brush.draw();
    }
  }
  if (edditorMenu === "items") {
    editorUi();
    itemEditorUi();
  }
  if (edditorMenu === "newMap") {
    if(mapList.length > 0){
      mapList[currentMap].draw()
    }
    editorUi();
    newMapEditorUi();
  }
}

//runs at the start of a game to reset all values and spawn ai/items//
function startGame(){
  currentMap = 0;
  mapOffsetX = 0
  mapOffsetY = 0
  Player.hp = Player.hpMax;
  Player.Inv.emptyInv()
  playing = true;
  backgroundColour = 0;
  ai = [];
  for(let i = 0; i < mapList.length; i++){
    for (let y = 0; y < mapList[i].grid.length; y++) {
      for (let x = 0; x < mapList[i].grid[y].length; x++) {
        if(mapList[i].grid[y][x].itemSpawner !== undefined){
          mapList[i].grid[y][x].itemSpawner.spawnItem()
        }
        if(mapList[i].grid[y][x].aiSpawner !== undefined){
          mapList[i].grid[y][x].aiSpawner.spawnAi()
        }
      }
    }
  }
}

//resets all values//
function resetVals() {
  Player.left = true;
  Player.right = true;
  Player.top = true;
  Player.bottom = true;
  Player.Inv.invOpen = false;
  if(Player.Inv.selectedTile !== undefined){
    Player.Inv.selectedTile.selected = false;
    Player.Inv.selectedTile = undefined;
  }

  mapOffsetX = 0;
  mapOffsetY = 0;

  showDebug = false;
  canMove = true;
  brushMode = "Single";
  brush = null;

  paused = false;
  playing = false;
  backgroundColour = 255;
}

//moves the palyer to spacific x/y coordinates
function teleport(xVal,yVal){
  mapOffsetX = xVal*64 *-1
  mapOffsetY = yVal*64 *-1
  console.log('teleported!')
}
