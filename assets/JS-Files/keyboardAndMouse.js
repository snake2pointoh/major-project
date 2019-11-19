

function keyTyped() {
  if (scene === "edditor") {
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

  if (scene === "edditor") {
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
      Player.Hotbar.invOpen = Player.Inv.invOpen;
      canMove = !Player.Inv.invOpen;
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
      //select what tile to paint//
      for (let i = 0; i < edditorUiButtons.length; i++) {
        if (edditorUiButtons[i].mouseOn() && mouseButton === LEFT) {
          selectedTexture = edditorUiButtons[i].tile
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
    if (edditorMenu === "items") {
      for (let i = 0; i < itemEdditorTextBoxes.length; i++) {
        itemEdditorTextBoxes[i].mouseOn()
      }
      if (itemCreatorType === "sword") {
        for (let i = 0; i < itemEdditorSwordIconButtons.length; i++) {
          if (itemEdditorSwordIconButtons[i].mouseOn()) {
            itemEdditorDemoIcon.image = itemEdditorSwordIconButtons[i].image
          }
        }
      }

      if (itemEdditorButtons[0].mouseOn()) { //new bow button//
        itemCreatorType = "sword";

        itemEdditorDemoIcon.image = itemEdditorSwordIconButtons[0].image

        itemEdditorText[0].textData = "Attack Range"
        itemEdditorText[1].textData = "Attack Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if (itemEdditorButtons[1].mouseOn()) { //new bow button//
        itemCreatorType = "bow";

        itemEdditorText[0].textData = "Range"
        itemEdditorText[1].textData = "Draw Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if (itemEdditorButtons[2].mouseOn()) { //new staff button//
        itemCreatorType = "staff";

        itemEdditorText[0].textData = "Cast Range"
        itemEdditorText[1].textData = "Cast Speed"
        itemEdditorText[2].textData = "Damage"
      }
      if (itemEdditorButtons[3].mouseOn()) { //new Potion button//
        itemCreatorType = "potion";

        itemEdditorText[0].textData = "Duration"
        itemEdditorText[1].textData = "Affect"
        itemEdditorText[2].textData = "Strength"
      }
      if (itemEdditorButtons[4].mouseOn()) { //saveItem button//
        worldItems.push(itemCreator(itemCreatorType));
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

  if (scene === "menu") {
    if (menuButtons[0].mouseOn()) {
      resetVals()
      scene = "editor";
    }
    if (menuButtons[1].mouseOn()) {
      resetVals()
      playing = true;
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