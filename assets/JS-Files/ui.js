
//displays item editor ui//
function itemEditorUi() {
  for (let i = 0; i < itemEdditorButtons.length; i++) {
    itemEdditorButtons[i].draw()
  }
  for (let i = 0; i < itemEdditorTextBoxes.length; i++) {
    itemEdditorTextBoxes[i].draw()
  }
  for (let i = 0; i < itemEdditorText.length; i++) {
    itemEdditorText[i].draw()
  }

  if (itemCreatorType === "sword") {
    itemEdditorSwordIconButtons.draw()
  }
  if (itemCreatorType === "bow") {
    itemEdditorBowIconButtons.draw()
  }
  if (itemCreatorType === "staff") {
    itemEdditorStaffIconButtons.draw()
  }
  if (itemCreatorType === "potion") {
    itemEdditorPotionIconButtons.draw()
  }

  itemEdditorDemoIcon.draw()
  
  customItemList.draw()
}

//displays map edditor ui//
function mapEditorUi(){
  for(let i = 0; i < edditorMapMenuButtons.length; i++){
    edditorMapMenuButtons[i].draw()
  }

  if(edditorMapMenu === "tiles"){
    if(selectedTextureList === "outside"){
      outsideTextureList.draw()
    }
    if(selectedTextureList === "maps"){
      mapSelectorList.draw()
    }
    if(selectedTextureList === "doors"){
      doorTextureList.draw()
      doorWorldId.draw()
      doorOutId.draw()
      doorId.draw()
      doorOutDirection.draw()
      for(let i = 0; i < doorEditorText.length; i++){
        doorEditorText[i].draw()
      }
    }


    for(let i = 0; i < mapSelectionButtons.length; i++){
      mapSelectionButtons[i].draw()
    }

    for(let i = 0; i < edditorBrushes.length; i++){
      edditorBrushes[i].draw()
    }
  }

  if(edditorMapMenu === "items"){
    for(let i = 0; i < edditorItemButtons.length; i++){
      edditorItemButtons[i].draw()
    }
    customItemList.draw()
  }
  if(edditorMapMenu === "ai"){
    for(let i = 0; i < edditorAiButtons.length; i++){
      edditorAiButtons[i].draw()
    }
  }
}

//displays menu ui//
function menuUi(){
  for(let i = 0; i < menuButtons.length; i++){
    menuButtons[i].draw()
  }
}

//displays editor ui//
function editorUi() {
  for (let i = 0; i < edditorUiBackground.length; i++) {
    edditorUiBackground[i].draw()
  }
  for (let i = 0; i < edditorMenuButtons.length; i++) {
    edditorMenuButtons[i].draw()
  }
  for (let i = 0; i < Buttons.length; i++) {
    Buttons[i].draw()
  }
}

//displays new map creator ui//
function newMapEditorUi(){
  for (let i = 0; i < newMapEditorText.length; i++) {
    newMapEditorText[i].draw()
  }
  for (let i = 0; i < newMapEditorTextbox.length; i++) {
    newMapEditorTextbox[i].draw()
  }
  for (let i = 0; i < newMapEditorButtons.length; i++) {
    newMapEditorButtons[i].draw()
  }
  
  mapSelectorList.draw()
}

//displays game ui//
function gameUi(){
  push()
  rect(10,height-130, 300,100)
  textAlign(CENTER, CENTER)
  textSize(30)
  text(Player.itemDamage + " Weapon Damage",20,height-125, 300,100)
  pop()

}