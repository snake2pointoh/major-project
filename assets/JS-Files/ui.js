

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
    for (let i = 0; i < itemEdditorSwordIconButtons.length; i++) {
      itemEdditorSwordIconButtons[i].draw()
    }
  }
  itemEdditorDemoIcon.draw()
}

function mapEditorUi(){
  for(let i = 0; i < edditorMapMenuButtons.length; i++){
    edditorMapMenuButtons[i].draw()
  }

  if(edditorMapMenu === "tiles"){
    for(let i = 0; i < edditorUiButtons.length; i++){
      edditorUiButtons[i].draw()
    }
    for(let i = 0; i < edditorBrushes.length; i++){
      edditorBrushes[i].draw()
    }
  }

  if(edditorMapMenu === "items"){
    for(let i = 0; i < edditorItemButtons.length; i++){
      edditorItemButtons[i].draw()
    }
  }
}

function menuUi(){
  for(let i = 0; i < menuButtons.length; i++){
    menuButtons[i].draw()
  }
}

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