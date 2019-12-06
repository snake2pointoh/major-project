

class PlayerCharacter {
  constructor(x1, y1, speed) {
    this.x = x1
    this.y = y1
    this.w = 40
    this.h = 40

    this.movespeed = speed

    //direction bools//
    this.left = true
    this.right = true
    this.top = true
    this.bottom = true

    //left collision//
    this.leftX = this.x - this.w / 2 - this.w / 3
    this.leftY = this.y - this.h / 2
    this.leftW = this.w / 3
    this.leftH = this.h

    //right collision//
    this.rightX = this.x + this.w / 2
    this.rightY = this.y - this.h / 2
    this.rightW = this.w / 3
    this.rightH = this.h

    //bottom collision//
    this.bottomX = this.x - this.w / 2
    this.bottomY = this.y + this.h / 2
    this.bottomW = this.w
    this.bottomH = this.h / 3

    //top collision//
    this.topX = this.x - this.w / 2
    this.topY = this.y - this.h / 2 - this.h / 3
    this.topW = this.w
    this.topH = this.h / 3

    //inventory//
    this.Inv = new Inventory(60, 110, 4, 5, 80);
    this.Hotbar = new Hotbar(20, 9, 60);
  }

  draw() {
    this.Inv.draw()
    this.Hotbar.draw()

    push()
    rectMode(CORNER)
    rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)
    fill("red")

    if (showDebug) {
      rect(this.rightX, this.rightY, this.rightW, this.rightH) //right
      rect(this.leftX, this.leftY, this.leftW, this.leftH) //left
      rect(this.bottomX, this.bottomY, this.bottomW, this.bottomH) //bottom
      rect(this.topX, this.topY, this.topW, this.topH) //top
    }

    pop()
  }

  move(direction) {
    if (direction === "up" && this.top) {
      mapOffsetY += this.movespeed
    }
    if (direction === "down" && this.bottom) {
      mapOffsetY -= this.movespeed
    }
    if (direction === "left" && this.left) {
      mapOffsetX += this.movespeed
    }
    if (direction === "right" && this.right) {
      mapOffsetX -= this.movespeed
    }
  }
  collisionDetect(map) {
    this.left = true
    this.right = true
    this.top = true
    this.bottom = true
    //collision detection//
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (map[y][x].hasCollision) {
          //right
          if (this.rightX > map[y][x].Xpos + map[y][x].w || this.rightX + this.rightW < map[y][x].Xpos || this.rightY > map[y][x].Ypos + map[y][x].h || this.rightY + this.rightH < map[y][x].Ypos) {
          }
          else {
            this.right = false
            //console.log("is colliding right")
          }
          //left
          if (this.leftX > map[y][x].Xpos + map[y][x].w || this.leftX + this.leftW < map[y][x].Xpos || this.leftY > map[y][x].Ypos + map[y][x].h || this.leftY + this.leftH < map[y][x].Ypos) {
          }
          else {
            this.left = false
            //console.log("is colliding left")
          }
          //top
          if (this.topX > map[y][x].Xpos + map[y][x].w || this.topX + this.topW < map[y][x].Xpos || this.topY > map[y][x].Ypos + map[y][x].h || this.topY + this.topH < map[y][x].Ypos) {
          }
          else {
            this.top = false
            //console.log("is colliding top")
          }
          //bottom
          if (this.bottomX > map[y][x].Xpos + map[y][x].w || this.bottomX + this.bottomW < map[y][x].Xpos || this.bottomY > map[y][x].Ypos + map[y][x].h || this.bottomY + this.bottomH < map[y][x].Ypos) {
          }
          else {
            this.bottom = false
            //console.log("is colliding bottom")
          }
        }
      }
    }
  }

}

class Hotbar {
  constructor(y1, tileCount1, tileSize1) {
    this.y = y1;

    this.tileCount = tileCount1;
    this.tileSize = tileSize1;

    this.invOpen = false;

    this.grid = [];

    for (let i = 0; i < this.tileCount; i++) {
      this.grid.push(new InventoryTile((width / 2 + (this.tileSize) * i) - this.tileSize * this.tileCount / 2, this.y, this.tileSize, this.tileSize, true))
    }
  }
  draw() {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].draw()
    }
  }
}

class Inventory {
  constructor(x1, y1, xsize1, ysize1, tileSize1) {
    this.x = x1;
    this.y = y1;

    this.invOpen = false;

    this.invSpaces = xsize1 * ysize1;

    this.xSize = xsize1;
    this.ySize = ysize1;
    this.tileSize = tileSize1;

    this.grid = [];

    for (let y = 0; y < this.ySize; y++) {
      this.grid.push([])
      for (let x = 0; x < this.xSize; x++) {
        this.grid[y][x] = new InventoryTile(this.x + this.tileSize * x, this.y + this.tileSize * y, this.tileSize, this.tileSize, false)
      }
    }
  }
  draw() {
    //draw inventory
    if (this.invOpen) {
      for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
          this.grid[y][x].draw()
        }
      }
    }
    //draw hotbar

  }
}

class InventoryTile {
  constructor(x1, y1, w1, h1, isHotbar1) {
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    this.isHotbar = isHotbar1
  }
  draw() {
    push()
    fill(100)
    rect(this.x, this.y, this.w, this.h)
    pop()
  }
}

class InventoryItem {
  constructor() {

  }
}

//items//
//add more item types to spawn point//
class itemSpawnPoint{
  constructor(x1,y1,size1,itemtype1,randonly1,custonly1,custitem1){
    this.x = x1;
    this.y = y1;
    this.w = size1;
    this.h = size1;
    this.itemType = itemtype1;
    this.pickUp;
    if(randonly1 === undefined){
      this.randOnly = false;
    }
    else{
      this.randOnly = randonly1;
    }
    
    if(custonly1 === undefined){
      this.custOnly = false;
    }
    else{
      this.custOnly = custonly1;
    }

    if(custitem1 === undefined){
      this.custItem = null;
    }
    else{
      this.custItem = custitem1;
    }

    

    this.xPos = this.x;
    this.yPos = this.y;
  }
  draw(){
    this.xPos = this.x + mapOffsetX;
    this.yPos = this.y + mapOffsetY;
    if((this.xPos < width && this.xPos > -this.w) && (this.yPos < height && this.yPos > -this.h)){
      if(playing){
        if(this.pickUp !== undefined){
          this.pickUp.draw()
        }
      }
      else{
        push()
        fill(0,200,0);
        rect(this.xPos, this.yPos, this.w, this.h);
        pop()
      }
    }
  }
  spawnItem(){
    let item
    if(this.itemType === "sword"){
      if(this.custOnly === true && worldItems[0].length > 0 ){
        if(this.custItem === null){
          item = worldItems[0][Math.round(random(0, worldItems[0].length - 1))]
        }
        else item = this.custItem
      }
      else{
        if(worldItems[0].length > 0 && this.randOnly === false){
          if(random(0,100) < 31){
            item = worldItems[0][Math.round(random(0, worldItems[0].length - 1))]
          }
          else{
            item = randomItemGen(this.itemType)
          }
        }
        else{
          item = randomItemGen(this.itemType)
        }
      }
    }
    this.pickUp = new ItemPickup(this.x, this.y, this.w ,item)
  }
}

class ItemPickup {
  constructor(x1, y1, size1, item1) {
    this.x = x1;
    this.y = y1;
    this.w = size1;
    this.h = size1;
    this.item = item1

    this.xPos = this.x;
    this.yPos = this.y;
  }
  draw(){
    this.xPos = this.x + mapOffsetX;
    this.yPos = this.y + mapOffsetY;
    push()
    image(this.item.icon, this.xPos, this.yPos, this.w, this.h)
    pop()
  }
}

class SwordItem {
  constructor(attackrange1, attackspeed1, damage1, name1, icon1) {
    this.attackRange = attackrange1;
    this.attackSpeed = attackspeed1;
    this.damage = damage1;
    this.name = name1;
    this.icon = icon1;
    this.type = "sword";
  }
}

class BowItem {
  constructor(range1, drawspeed1, damage1, name1, icon1) {
    this.range = range1;
    this.drawSpeed = drawspeed1;
    this.damage = damage1;
    this.name = name1;
    this.icon = icon1;
    this.type = "bow";
  }
}

class StaffItem {
  constructor(castrange1, castspeed1, damage1, name1, icon1) {
    this.castRange = castrange1;
    this.castSpeed = castspeed1;
    this.damage = damage1;
    this.name = name1;
    this.icon = icon1;
    this.type = "staff";
  }
}

class PotionItem {
  constructor(duration1, affect1, strength1, name1, icon1) {
    this.duration = duration1;
    this.affect = affect1;
    this.strength = strength1;
    this.name = name1;
    this.icon = icon1;
    this.type = "potion";
  }
}
//items//

class areaBrush {
  constructor(x1, y1) {
    this.x = x1
    this.y = y1
    this.w = 0
    this.h = 0

  }
  draw() {
    ellipse(this.x, this.y, 25)
  }
  updateSize(width1, height1) {
    //update selected area rectangle//
    if (width1 > this.x) {
      this.w = width1 - this.x;
    }
    else {
      this.w = width1 - this.x;
      this.x = this.x + this.w;
      this.w = (this.x - this.w) - this.x;
    }
    if (height1 > this.y) {
      this.h = height1 - this.y;
    }
    else {
      this.h = height1 - this.y;
      this.y = this.y + this.h;
      this.h = (this.y - this.h) - this.y;
    }
  }
  changeTiles(map) {
    //check if tile is in selected area and update it//
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if (!(this.x > map[y][x].Xpos + map[y][x].w || this.x + this.w < map[y][x].Xpos || this.y > map[y][x].Ypos + map[y][x].h || this.y + this.h < map[y][x].Ypos)) {
          map[y][x].tile = selectedTexture
          map[y][x].hasCollision = selectedTexture.hasCollision
        }
      }
    }
  }
}

class tile {
  constructor(texture1, hasCollision1) {
    this.texture = texture1
    this.hasCollision = hasCollision1
  }
}

class Button {
  constructor(x1, y1, w1, h1, name1) {

    //x and y position of the button//
    this.x = x1
    this.y = y1

    //width and height of the button//
    this.w = w1
    this.h = h1

    //button color//
    this.name = name1

    //sets pos to center
    this.x -= (this.w / 2)
    this.y -= (this.h / 2)
    this.textSize = h1/4
  }

  //draws the button//
  draw() {
    push()
    rectMode(CORNER)
    textAlign(CENTER, CENTER)

    fill(255)
    rect(this.x, this.y, this.w, this.h)

    fill(0)
    textSize(this.textSize)
    text(this.name, this.x + 2, this.y + 2, this.w, this.h)
    //text(str, x, y, x2, y2)
    pop()
  }
  mouseOn() {
    if ((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)) {
      return true
    }
    else {
      return false
    }
  }
}

class ItemButtonList{
  constructor(x1,y1,w1,h1,buttonsize1,array1){
    //add scrolling//
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;
    this.array = array1;
    this.buttons = [];
    this.scrollButtons = [];
    
    this.buttonSize = buttonsize1;
    this.rectHight = buttonsize1 + 10;
    this.buttonsWide = Math.floor(w1/buttonsize1);
    this.buttonGap = (w1 % buttonsize1) / this.buttonsWide;

    //scroll area//
    this.scrollX = x1 + buttonsize1/2;
    this.scrollY = y1 + buttonsize1/2 + this.rectHight;
    this.scrollOffset = 0;
    this.maxScrollOffset = 0;
    this.scrollSpeed = 15;

    this.topRect = {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.rectHight
    }

    this.bottomRect = {
      x: this.x,
      y: this.y + this.h - this.rectHight,
      w: this.w,
      h: this.rectHight
    }
    //setup//

    this.scrollButtons[0] = new Button(this.x + 5 + this.buttonSize/2, this.y + 5 + this.buttonSize/2, this.buttonSize, this.buttonSize, "Scroll Up")
    this.scrollButtons[1] = new Button((this.x + this.w) - 5 - this.buttonSize/2, this.y + 5 + this.buttonSize/2, this.buttonSize, this.buttonSize, "Scroll Down")
    this.scrollButtons[2] = new Button((this.x + this.w/2), this.y + 5 + this.buttonSize/2, this.buttonSize, this.buttonSize, "Scroll to Top")

    this.update()

  }
  draw(){
    push()
    push()
    fill(80,100)
    rect(this.x, this.y, this.w, this.h)
    pop()
    //draw buttons only if in the scroll area rect//
    for(let i = 0; i < this.buttons.length ; i++){
      if(this.buttons[i].y > this.y + 5 && this.buttons[i].y < this.y + (this.h - this.rectHight)){
        this.buttons[i].draw()
      }
    }
    //
    rect(this.topRect.x, this.topRect.y, this.topRect.w, this.topRect.h);
    rect(this.bottomRect.x, this.bottomRect.y, this.bottomRect.w, this.bottomRect.h);
    for(let i = 0; i < this.scrollButtons.length; i++){
      this.scrollButtons[i].draw()
    }
    pop()
  }
  mouseOn(){
    if((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y + this.rectHight && mouseY < this.y + this.h - this.rectHight)){
      for(let i = 0; i < this.buttons.length ; i++){
        if(this.buttons[i].mouseOn()){
          return this.buttons[i].item;
        }
      }
    }
    else {
      if(this.scrollButtons[0].mouseOn()){
        this.scroll("up",this.scrollSpeed)
      }
      if(this.scrollButtons[1].mouseOn()){
        this.scroll("down",this.scrollSpeed)
      }
      if(this.scrollButtons[2].mouseOn()){
        this.update()
      }
    }
  }
  update(){
    this.buttons = [];
    this.scrollOffset = 0;
    let x = 0;
    let y = 0;
    let c = 0
    for(let j = 0; j < this.array.length ; j++){
      for(let i = 0; i < this.array[j].length ; i++){
        this.buttons[c] = new ItemButton((this.scrollX + this.buttonGap/2) + ((this.buttonSize + this.buttonGap) * x), (this.scrollY + this.buttonGap/2) + ((this.buttonSize + this.buttonGap) * y), this.buttonSize, this.buttonSize, this.array[j][i])
        //todo//
        if(x < this.buttonsWide -1){
          x++;
        }
        else{
          x = 0;
          y++;
        }
        c++
      }
    }
    this.maxScrollOffset = ((this.buttonGap + this.buttonSize) * y-1) - this.buttonGap;
  }
  scroll(direction,speed){
    if(this.scrollOffset *-1 < this.maxScrollOffset){
      if(direction === 'up'){
        for(let i = 0; i < this.buttons.length ; i++){
          this.buttons[i].y -= speed;
        }
        this.scrollOffset -= speed;
      }
    }

    if(direction === 'down'){
      for(let i = 0; i < this.buttons.length ; i++){
        this.buttons[i].y += speed;
      }
      this.scrollOffset += speed;
    }
    if(this.scrollOffset > 0){
      for(let i = 0; i < this.buttons.length ; i++){
        this.buttons[i].y -= this.scrollOffset;
      }
      this.scrollOffset = 0;
    }
  }
}

class ItemButton {
  constructor(x1, y1, w1, h1, item1) {

    //x and y position of the button//
    this.x = x1
    this.y = y1

    //width and height of the button//
    this.w = w1
    this.h = h1

    //button color//

    this.item = item1

    //sets pos to center
    this.x -= (this.w / 2)
    this.y -= (this.h / 2)
  }

  //draws the button//
  draw() {
    push()
    fill(50, 20)
    rect(this.x, this.y, this.w, this.h)
    image(this.item.icon, this.x + 5, this.y + 5, this.w - 10, this.h - 10)
    pop()
  }
  mouseOn() {
    if ((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)) {
      return true
    }
    else {
      return false
    }
  }
}

class TextureButtonList{
  constructor(x1,y1,w1,h1,buttonsize1,array1){
    //add scrolling//
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;
    this.array = array1;
    this.buttons = [];
    this.scrollButtons = [];
    
    this.buttonSize = buttonsize1;
    this.rectHight = buttonsize1 + 10;
    this.buttonsWide = Math.floor(w1/buttonsize1);
    this.buttonGap = (w1 % buttonsize1) / this.buttonsWide;

    //scroll area//
    this.scrollX = x1 + buttonsize1/2;
    this.scrollY = y1 + buttonsize1/2 + this.rectHight;
    this.scrollOffset = 0;
    this.maxScrollOffset = 0;
    this.scrollSpeed = 15;

    this.topRect = {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.rectHight
    }

    this.bottomRect = {
      x: this.x,
      y: this.y + this.h - this.rectHight,
      w: this.w,
      h: this.rectHight
    }
    //setup//

    this.scrollButtons[0] = new Button(this.x + 5 + this.buttonSize/2, this.y + 5 + this.buttonSize/2, this.buttonSize, this.buttonSize, "Scroll Up")
    this.scrollButtons[1] = new Button((this.x + this.w) - 5 - this.buttonSize/2, this.y + 5 + this.buttonSize/2, this.buttonSize, this.buttonSize, "Scroll Down")
    this.scrollButtons[2] = new Button((this.x + this.w/2), this.y + 5 + this.buttonSize/2, this.buttonSize, this.buttonSize, "Scroll to Top")

    this.update()

  }
  draw(){
    push()
    push()
    fill(80,100)
    rect(this.x, this.y, this.w, this.h)
    pop()
    //draw buttons only if in the scroll area rect//
    for(let i = 0; i < this.buttons.length ; i++){
      if(this.buttons[i].y > this.y + 5 && this.buttons[i].y < this.y + (this.h - this.rectHight)){
        this.buttons[i].draw()
      }
    }
    //
    rect(this.topRect.x, this.topRect.y, this.topRect.w, this.topRect.h);
    rect(this.bottomRect.x, this.bottomRect.y, this.bottomRect.w, this.bottomRect.h);
    for(let i = 0; i < this.scrollButtons.length; i++){
      this.scrollButtons[i].draw()
    }
    pop()
  }
  mouseOn(){
    if((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y + this.rectHight && mouseY < this.y + this.h - this.rectHight)){
      for(let i = 0; i < this.buttons.length ; i++){
        if(this.buttons[i].mouseOn()){
          return this.buttons[i].tile;
        }
      }
    }
    else {
      if(this.scrollButtons[0].mouseOn()){
        this.scroll("up",this.scrollSpeed)
      }
      if(this.scrollButtons[1].mouseOn()){
        this.scroll("down",this.scrollSpeed)
      }
      if(this.scrollButtons[2].mouseOn()){
        this.update()
      }
    }
  }
  update(){
    this.buttons = [];
    this.scrollOffset = 0;
    let x = 0;
    let y = 0;
    let c = 0
    for(let j = 0; j < this.array.length ; j++){
        this.buttons[c] = new ImageButton((this.scrollX + this.buttonGap/2) + ((this.buttonSize + this.buttonGap) * x), (this.scrollY + this.buttonGap/2) + ((this.buttonSize + this.buttonGap) * y), this.buttonSize, this.buttonSize, this.array[j])
        //todo//
        if(x < this.buttonsWide -1){
          x++;
        }
        else{
          x = 0;
          y++;
        }
        c++
    }
    this.maxScrollOffset = ((this.buttonGap + this.buttonSize) * y-1) - this.buttonGap;
  }
  scroll(direction,speed){
    if(this.scrollOffset *-1 < this.maxScrollOffset){
      if(direction === 'up'){
        for(let i = 0; i < this.buttons.length ; i++){
          this.buttons[i].y -= speed;
        }
        this.scrollOffset -= speed;
      }
    }

    if(direction === 'down'){
      for(let i = 0; i < this.buttons.length ; i++){
        this.buttons[i].y += speed;
      }
      this.scrollOffset += speed;
    }
    if(this.scrollOffset > 0){
      for(let i = 0; i < this.buttons.length ; i++){
        this.buttons[i].y -= this.scrollOffset;
      }
      this.scrollOffset = 0;
    }
  }
}

class ImageButton {
  constructor(x1, y1, w1, h1, tile1) {

    //x and y position of the button//
    this.x = x1
    this.y = y1

    //width and height of the button//
    this.w = w1
    this.h = h1

    //button color//

    if (tile1.texture !== undefined) {
      this.image = tile1.texture
      this.tile = tile1
    }
    else {
      this.image = tile1
    }

    //sets pos to center
    this.x -= (this.w / 2)
    this.y -= (this.h / 2)
  }

  //draws the button//
  draw() {
    push()
    fill(50, 20)
    rect(this.x, this.y, this.w, this.h)
    image(this.image, this.x + 5, this.y + 5, this.w - 10, this.h - 10)
    pop()
  }
  mouseOn() {
    if ((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)) {
      return true
    }
    else {
      return false
    }
  }
}

class UiBackground {
  constructor(x1, y1, w1, h1, grayVal1, a1) {
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    this.grayVal = grayVal1
    this.alpha = a1
  }
  draw() {
    push()
    rectMode(CORNER)
    fill(this.grayVal, this.alpha)
    rect(this.x, this.y, this.w, this.h)
    pop()
  }
  mouseOverUi() {
    if ((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)) {
      return true
    }
    else {
      return false
    }
  }
}

class TextInputBox {
  constructor(x1, y1, w1, h1, charLim1, numonly1, maxNum1) {
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;

    this.focused = false;
    this.textData = "";
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.charLimit = charLim1;

    if (maxNum1 === undefined) {
      this.maxNum = 0;
    } else this.maxNum = maxNum1;

    if (numonly1 === undefined) {
      this.numOnly = false;
    } else this.numOnly = numonly1;

    if (this.numOnly) {
      this.textData = "0";
    } else this.textData = "text";
  }
  draw() {
    push()
    rectMode(CORNER);
    textAlign(CENTER, CENTER);
    textSize(20)
    if (this.focused) {
      push()
      fill(0)
      rect(this.x - 5, this.y - 5, this.w + 10, this.h + 10)
      pop()
    }
    rect(this.x, this.y, this.w, this.h);
    text(this.textData, this.x, this.y, this.w, this.h);
    pop()
  }
  
  updateText(textInput) {
    if (this.textData.length < this.charLimit || this.charLimit === 0) {
      if (this.numOnly) {
        for (let i = 0; i < this.numbers.length; i++) {
          if (parseInt(key) === this.numbers[i]) {
            this.textData += textInput;
            return;
          }
        }
      }
      else this.textData += textInput;
    }
  }

  textBackspace() {
    this.textData = this.textData.slice(0, -1)
  }

  setMax() {
    if (this.numOnly && this.maxNum > 0) {
      if (parseInt(this.textData) > this.maxNum) {
        this.textData = this.maxNum.toString();
      }
    }
    this.focused = false;
  }
  mouseOn() {
    if ((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)) {
      this.focused = true
    }
    else {
      this.setMax()
    }
  }
  returnAsNum() {
    return parseInt(this.textData)
  }
}

class TextBox {
  constructor(x1, y1, w1, h1, startingtext1) {
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;
    if (startingtext1 !== undefined) {
      this.textData = startingtext1;
    } else this.textData = "";

  }
  draw() {
    push()
    rectMode(CORNER);
    textAlign(CENTER, CENTER);
    textSize(20);
    rect(this.x, this.y, this.w, this.h);
    text(this.textData, this.x, this.y, this.w, this.h);
    pop()
  }
  updateText(textIn) {
    this.textData = textIn;
  }
}

class ImageBox {
  constructor(x1, y1, w1, h1, image1) {
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;
    this.image = image1
  }
  draw() {
    push()
    rect(this.x, this.y, this.w, this.h)
    image(this.image, this.x + 5, this.y + 5, this.w - 10, this.h - 10)
    pop()
  }
}

class GridItem {
  constructor(x1, y1, w1, h1, tile1) {
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1

    this.offsetX = 0
    this.offsetY = 0

    this.hasCollision = false

    this.tile = tile1

    this.Xpos = this.x + this.offsetX
    this.Ypos = this.y + this.offsetY

    this.itemSpawner;
  }


  draw() {
    this.Xpos = this.x + this.offsetX
    this.Ypos = this.y + this.offsetY
    //draw GridItem if its on screen//Many FPS!!!//
    if (((this.x + this.offsetX) >= (0 - this.w) && (this.x + this.offsetX) < width) && ((this.y + this.offsetY) >= (0 - this.h) && (this.y + this.offsetY) < height)) {
      push()
      image(this.tile.texture, this.Xpos, this.Ypos, this.w, this.h)
      pop()
      if(this.itemSpawner !== undefined){
        this.itemSpawner.draw()
      }
    }
  }

  mouseOverTile() {
    //check if mouse is over tile//
    if ((mouseX > (this.x + this.offsetX) && mouseX < (this.x + this.w) + this.offsetX) && (mouseY > (this.y + this.offsetY) && mouseY < (this.y + this.h) + this.offsetY)) {
      return true
    }
    else {
      return false
    }
  }
  save(list) {
    let textureId = textures.indexOf(this.tile);

    list.push(textureId);
  }
  load(data) {
    this.tile = textures[data]
    this.hasCollision = textures[data].hasCollision
  }
}

class GridGen {
  constructor(sizex, sizey, size, defTexture) {
    this.grid = []
    this.SizeX = sizex
    this.SizeY = sizey
    this.gridSize = size
    this.defaultTexture = defTexture

    this.gridX = 0
    this.gridY = 0

    for (let y = 0; y < this.SizeY; y++) {
      this.grid.push([]);
      for (let x = 0; x < this.SizeX; x++) {
        this.grid[y][x] = new GridItem(x * this.gridSize, y * this.gridSize, this.gridSize, this.gridSize, this.defaultTexture)
      }
    }
  }
  draw() {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        this.grid[y][x].offsetX = mapOffsetX
        this.grid[y][x].offsetY = mapOffsetY
        this.grid[y][x].draw()
      }
    }
  }
}