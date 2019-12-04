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

let fpsCounter = 0;
let lastFPSMillis = 0;

let mapOffsetX = 0;
let mapOffsetY = 0;
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
let edditorUiButtons = [];
let edditorBrushes = [];
let edditorItemButtons = [];
let Buttons = [];
let menuButtons = [];
let edditorMenuButtons = [];
let edditorMapMenuButtons = [];
let brushMode = "Single";
let edditorMenu = "map"
let edditorMapMenu = "tiles"
let brush = null;

let selectedTexture;

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

let itemEdditorSwordIconButtons = [];
let itemEdditorBowIconButtons = [];
let itemEdditorStaffIconButtons = [];
let itemEdditorPotionIconButtons = [];

let itemCreatorType = "sword";

let customItemList;

//TODO//
/*
complete item edditor
*/

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
  MainMap = new GridGen(400, 400, 64, textures[0])

  //edditor items & buttons//
  edditorUiBackground[0] = new UiBackground(0, 100, 200, height - 100, 80, 100);
  edditorUiBackground[1] = new UiBackground(0, 0, width, 100, 80, 100);
  edditorUiBackground[2] = new UiBackground(width - 200, 100, 200, height - 100, 80, 100);

  edditorMapMenuButtons[0] = new Button(50,150,64,64,"Tiles")
  edditorMapMenuButtons[1] = new Button(150,150,64,64,"Items")

  //item spawn buttons//
  edditorItemButtons[0] = new Button(50, 230, 64, 64,"Item Spawn Add");
  edditorItemButtons[1] = new Button(150, 230, 64, 64,"Item Spawn Remove");
  
  edditorItemButtons[2] = new Button(34, 314, 48, 48,"Rand Item Only");
  edditorItemButtons[3] = new Button(168, 314, 48, 48,"Custom Item Only");
  edditorItemButtons[4] = new Button(34, 380, 48, 48,"All Items");
  edditorItemButtons[5] = new Button(100, 314, 48, 48,"All Custom Items");

  //texture buttons//
  edditorUiButtons[0] = new ImageButton(50, 310, 64, 64, textures[1]);
  edditorUiButtons[1] = new ImageButton(150, 310, 64, 64, textures[2]);

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

  //item edditor text boxes//
  itemEdditorText[0] = new TextBox(225, height - 330, 200, 25, "Attack Range")
  itemEdditorTextBoxes[0] = new TextInputBox(225, height - 300, 200, 50, 4, true, 1000);

  itemEdditorText[1] = new TextBox(225, height - 230, 200, 25, "Attack Speed")
  itemEdditorTextBoxes[1] = new TextInputBox(225, height - 200, 200, 50, 4, true, 5000);

  itemEdditorText[2] = new TextBox(225, height - 130, 200, 25, "Damage")
  itemEdditorTextBoxes[2] = new TextInputBox(225, height - 100, 200, 50, 4, true, 1000);

  itemEdditorTextBoxes[3] = new TextInputBox(width / 2 - 150, 150, 300, 50, 20);

  edditorMenuButtons[0] = new Button(100, 50, 64, 64, "map");
  edditorMenuButtons[1] = new Button(200, 50, 64, 64, "items");

  itemEdditorSwordIconButtons[0] = new ImageButton(250, 150, 64, 64, swordTextures[0]);
  itemEdditorSwordIconButtons[1] = new ImageButton(250, 250, 64, 64, swordTextures[1]);

  itemEdditorDemoIcon = new ImageBox(width / 2 - 100, height / 2 - 100, 200, 200, swordTextures[0]);

  customItemList = new ButtonArea(0, 425, 200, height-425, 55, worldItems[0]);

  //fill the saveLoad array//
  saveLoad = []
  for (let y = 0; y < MainMap.grid.length; y++) {
    for (let x = 0; x < MainMap.grid[y].length; x++) {
      MainMap.grid[y][x].save(saveLoad)
    }
  }
  console.log("saved");

  selectedTexture = textures[1]
}

function draw() {
  background(backgroundColour);

  if (scene === "menu") {
    drawMenu()
  }

  if (scene === "game") {
    drawGame()
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

  //update fps counters every second//
  if(millis() > lastFPSMillis + 1000){
    lastFPSMillis = millis()
    fpsCounter = Math.round(frameRate())
  }
  doPhys()
}

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
        if (mouseOnUi === false) {
          if (brushMode === "Single") {
            if (mouseIsPressed && mapGrid[y][x].mouseOverTile()) {
              mapGrid[y][x].tile = selectedTexture
              mapGrid[y][x].hasCollision = selectedTexture.hasCollision
            }
          }
          if (brushMode === "ItemSpawnAdd") {
            if (mouseIsPressed && mapGrid[y][x].mouseOverTile()) {
              mapGrid[y][x].itemSpawner = new itemSpawnPoint(mapGrid[y][x].x + 10, mapGrid[y][x].y + 10, mapGrid[y][x].w -20, "sword", randomOnlyItems, customOnlyItems, customItem)
            }
          }
          if (brushMode === "ItemSpawnRemove") {
            if (mouseIsPressed && mapGrid[y][x].mouseOverTile()) {
              mapGrid[y][x].itemSpawner = undefined;
            }
          }
        }
      }
    }
  }
}

function randomItemGen(itemType){
  let item;
  if(itemType === "sword"){
    item = new SwordItem(Math.round(random(64, 128)), Math.round(random(900, 1500)), Math.round(random(100, 500)), "sword", swordTextures[Math.round(random(0, swordTextures.length-1))])
  }
  return item;
}

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

function loadMap(data) {
  console.log(data.saveData);
  saveLoad = data.saveData;
  let i = 0;
  for (let y = 0; y < MainMap.grid.length; y++) {
    for (let x = 0; x < MainMap.grid[y].length; x++) {
      MainMap.grid[y][x].load(saveLoad[i])
      i++
    }
  }
  console.log("Loaded");
}

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
    //sprinting//
    // if(keyIsDown(SHIFT)){
    //   Player.movespeed = 6
    // }
    // else Player.movespeed = 3
  }
}

function inventoryController() {
  //do
}

//load custom map save//
function calledFromHTML() {
  jsonF = document.getElementById("Json-file").files[0];
  reader.readAsText(jsonF)
  reader.onloadend = function () {
    json = JSON.parse(reader.result)
  }
}

function drawMenu() {
  menuUi();
}

function drawGame() {
  MainMap.draw()
  // for(let i = 0; i < itemSpawners.length;i++){
  //   itemSpawners[i].draw()
  // }
  Player.draw()
}

function drawEditor() {
  if (edditorMenu === "map") {
    MainMap.draw();
    editorUi();
    mapEditorUi();

    if (brush != null) {
      brush.draw();
    }
  }
  else if (edditorMenu === "items") {
    editorUi();
    itemEditorUi();
  }
}

function startGame(){
  playing = true;
  for (let y = 0; y < MainMap.grid.length; y++) {
    for (let x = 0; x < MainMap.grid[y].length; x++) {
      if(MainMap.grid[y][x].itemSpawner !== undefined){
        MainMap.grid[y][x].itemSpawner.spawnItem()
      }
    }
  }
}

function resetVals() {
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
  playing = false;
}