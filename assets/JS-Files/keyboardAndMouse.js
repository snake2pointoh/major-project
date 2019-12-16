

function keyTyped() {
  if (scene === "editor") {
    if (edditorMenu === "items") {
      for (let i = 0; i < itemEdditorTextBoxes.length; i++) {
        if (itemEdditorTextBoxes[i].focused) {
          itemEdditorTextBoxes[i].updateText(key)
        }
      }
    }
  }
}

function keyPressed() {
  if (key === "t") {
    showDebug = !showDebug
  }

  if (keyCode === ESCAPE && scene !== "menu") {
    paused = !paused
  }

  if (scene === "editor") {
    if (edditorMenu === "items") {
      for (let i = 0; i < itemEdditorTextBoxes.length; i++) {
        if (itemEdditorTextBoxes[i].focused) {
          if (keyCode === BACKSPACE) {
            itemEdditorTextBoxes[i].textBackspace()
          }
          if (keyCode === ENTER) {
            itemEdditorTextBoxes[i].setMax();
          }
        }
      }
    }
  }
  if (scene === "game") {
    if (key === "e" && !paused) {
      Player.Inv.invOpen = !Player.Inv.invOpen;
      
      canMove = !Player.Inv.invOpen;
    }
    if(key === 'f'){
      Player.pickUpItem(MainMap.grid)
    }
  }
}

function mouseClicked() {
  let mouseOnUi = false;
  if (scene === "editor") {
    mouseOnUi = false;
    for (let j = 0; j < edditorUiBackground.length; j++) {
      if (edditorUiBackground[j].mouseOverUi()) {
        mouseOnUi = true
      }
    }
    if (edditorMenu === "map") {
      if(edditorMapMenuButtons[0].mouseOn()){
        edditorMapMenu = "tiles"
        brushMode = "Single"
      }
      if(edditorMapMenuButtons[1].mouseOn()){
        edditorMapMenu = "items"
        brushMode = "ItemSpawnAdd"
      }

      if(edditorMapMenu === "tiles"){
        //select what tile to paint//
        if(selectedTextureList === "outside"){
          if(outsideTextureList.mouseOn() !== undefined){
            selectedTexture = outsideTextureList.mouseOn().tile;
          }
        }
        //select brush bode//
        for (let i = 0; i < edditorBrushes.length; i++) {
          if (edditorBrushes[i].mouseOn()) {
            brushMode = edditorBrushes[i].name
            brush = null;
            canMove = true;
          }
        }
  
        //area Brush//
        if (brushMode === "Area") {
          if (!mouseOnUi) {
            if (brush === null) {
              brush = new areaBrush(mouseX, mouseY)
              canMove = false;
            }
            else {
              brush.updateSize(mouseX, mouseY)
              brush.changeTiles(MainMap.grid);
              brush = null;
              canMove = true;
            }
          }
        }
      }

      //select item spawn point//
      if(edditorMapMenu === "items"){
        if(edditorItemButtons[0].mouseOn()){
          brushMode = "ItemSpawnAdd"
        }
        if(edditorItemButtons[1].mouseOn()){
          brushMode = "ItemSpawnRemove"
        }
        if(edditorItemButtons[2].mouseOn()){
          randomOnlyItems = true;
          customOnlyItems = false;
        }
        
        if(edditorItemButtons[3].mouseOn()){
          randomOnlyItems = false;
          customOnlyItems = true;
        }
        if(edditorItemButtons[4].mouseOn()){
          randomOnlyItems = false;
          customOnlyItems = false;
        }
        if(edditorItemButtons[5].mouseOn()){
          customItem = null;
        }
        if(customItemList.mouseOn() !== undefined){
          customItem = customItemList.mouseOn()
          console.log('item updated')
        }
      }

    }
    if (edditorMenu === "items") {
      for (let i = 0; i < itemEdditorTextBoxes.length; i++) {
        itemEdditorTextBoxes[i].mouseOn()
      }
      
      if (itemCreatorType === "sword") {
        if (itemEdditorSwordIconButtons.mouseOn()) {
          itemEdditorDemoIcon.image = itemEdditorSwordIconButtons.mouseOn().image
        }
      }
      if (itemCreatorType === "bow") {
        if (itemEdditorBowIconButtons.mouseOn()) {
          itemEdditorDemoIcon.image = itemEdditorBowIconButtons.mouseOn().image
        }
      }
      if (itemCreatorType === "staff") {
        if (itemEdditorStaffIconButtons.mouseOn()) {
          itemEdditorDemoIcon.image = itemEdditorStaffIconButtons.mouseOn().image
        }
      }
      if (itemCreatorType === "potion") {
        if (itemEdditorPotionIconButtons.mouseOn()) {
          itemEdditorDemoIcon.image = itemEdditorPotionIconButtons.mouseOn().image
        }
      }

      if (itemEdditorButtons[0].mouseOn()) { //new bow button//
        itemCreatorType = "sword";

        itemEdditorDemoIcon.image = itemEdditorSwordIconButtons.buttons[0].image

        itemEdditorText[0].textData = "Attack Range"
        itemEdditorText[1].textData = "Attack Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if (itemEdditorButtons[1].mouseOn()) { //new bow button//
        itemCreatorType = "bow";

        itemEdditorDemoIcon.image = itemEdditorBowIconButtons.buttons[0].image

        itemEdditorText[0].textData = "Range"
        itemEdditorText[1].textData = "Draw Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if (itemEdditorButtons[2].mouseOn()) { //new staff button//
        itemCreatorType = "staff";

        itemEdditorDemoIcon.image = itemEdditorStaffIconButtons.buttons[0].image

        itemEdditorText[0].textData = "Cast Range"
        itemEdditorText[1].textData = "Cast Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if (itemEdditorButtons[3].mouseOn()) { //new Potion button//
        itemCreatorType = "potion";

        itemEdditorDemoIcon.image = itemEdditorPotionIconButtons.buttons[0].image

        itemEdditorText[0].textData = "Duration"
        itemEdditorText[1].textData = "Affect"
        itemEdditorText[2].textData = "Strength"
      }
      if (itemEdditorButtons[4].mouseOn()) { //saveItem button//
        if(itemCreatorType === "sword"){
          worldItems[0].push(itemCreator(itemCreatorType));
        }
        if(itemCreatorType === "bow"){
          worldItems[1].push(itemCreator(itemCreatorType));
        }
        if(itemCreatorType === "staff"){
          worldItems[2].push(itemCreator(itemCreatorType));
        }
        if(itemCreatorType === "potion"){
          worldItems[3].push(itemCreator(itemCreatorType));
        }
        customItemList.update();
      }
      if (itemEdditorButtons[5].mouseOn()){
        for(let i = 0; i< worldItems.length; i++){
          if(worldItems[i].includes(customItem)){
            worldItems[i].splice(worldItems[i].indexOf(customItem),1)
            customItemList.update();
          }
        }
      }
      
      if(customItemList.mouseOn() !== undefined){
        customItem = customItemList.mouseOn()
        console.log('item updated')
      }
    }

    //save load//UPDATE FOR 2D ARRAY
    if (Buttons[0].mouseOn()) { //save//
      saveLoad = []
      for (let y = 0; y < MainMap.grid.length; y++) {
        for (let x = 0; x < MainMap.grid[y].length; x++) {
          MainMap.grid[y][x].save(saveLoad)
        }
      }
      console.log("saved");
      var JsonSave = {
        saveData: saveLoad,
      }
      saveJSON(JsonSave, "MapSaveData");
    }

    if (Buttons[1].mouseOn()) { //load//
      //make better//
      loadJSON("assets/MapSaveData.json", loadMap)
    }
    if (Buttons[2].mouseOn()) { //load//
      //make better//
      loadMap(json);
    }

    //select edditor mode//
    if (edditorMenuButtons[0].mouseOn()) { //tiles
      edditorMenu = "map"
    }
    if (edditorMenuButtons[1].mouseOn()) { //items
      edditorMenu = "items"
      mapOffsetX = 0;
      mapOffsetY = 0;
    }
  }

  if(scene === "game"){
    if(Player.Inv.invOpen){
      Player.Inv.mouseOn()
    }
  }

  if (scene === "menu") {
    if (menuButtons[0].mouseOn()) {
      resetVals()
      scene = "editor";
    }
    if (menuButtons[1].mouseOn()) {
      resetVals()
      startGame()
      scene = "game";
    }
  }

  if (paused) {
    if (resumeButton.mouseOn()) {
      paused = false;
    }
    if (backButton.mouseOn()) {
      scene = "menu";
      resetVals();
    }
  }
}