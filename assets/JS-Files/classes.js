

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
    this.pickupBox = {
      x: this.x - this.w / 2 - this.w / 3,
      y: this.y - this.h / 2 - this.h / 3,
      w: this.w + (this.w/3)*2,
      h: this.h + (this.h/3)*2
    }

    this.Hitbox = {
      x: this.x - this.w/2,
      y: this.y - this.h/2,
      w: this.w,
      h: this.h
    }
    this.meleHitbox = {
      rad: 100,
      angle: atan2(mouseY - height/2, mouseX - width/2),
      x: cos(this.angle) * (this.rad/2) + width/2,
      y: sin(this.angle) * (this.rad/2) + height/2
    }

    this.Inv = new Inventory(60, 110, 4, 5, 80);

    this.equippedItem;

    this.hpMax = 100;
    this.hp = 100;

    this.baseDamage = 10;
    this.dead = false;
    this.itemDamage = 0;
  }

  draw() {
    if(this.hp <= 0){
      this.dead = true
      this.death()
    }

    if(this.hp > this.hpMax){
      this.hp = this.hpMax;
    }

    if(this.equipItem !== undefined){
      this.itemDamage = this.equipItem.damage
    }

    //meleHitbox//
    this.meleHitbox.angle = atan2(mouseY - height/2, mouseX - width/2)
    this.meleHitbox.x = cos(this.meleHitbox.angle) * (this.meleHitbox.rad/2) + width/2
    this.meleHitbox.y = sin(this.meleHitbox.angle) * (this.meleHitbox.rad/2) + height/2
    //

    this.Inv.draw()

    push()
    if (showDebug) {
      push()
      //item pickup hitbox//
      fill('green')
      rect(this.pickupBox.x, this.pickupBox.y, this.pickupBox.w, this.pickupBox.h)
      //collision hitbox//
      fill('red')
      rect(this.rightX, this.rightY, this.rightW, this.rightH) //right
      rect(this.leftX, this.leftY, this.leftW, this.leftH) //left
      rect(this.bottomX, this.bottomY, this.bottomW, this.bottomH) //bottom
      rect(this.topX, this.topY, this.topW, this.topH) //top
      //mele hit detection hitbox//
      fill('yellow')
      circle(this.meleHitbox.x,this.meleHitbox.y,this.meleHitbox.rad)
      pop()
    }
    fill('green')
    rect(this.x - this.w / 2, this.y - this.h/2 - 15, this.w/(this.hpMax/this.hp), 10)
    fill('white')
    rect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)
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
        if(map[y][x].isDoor){
          if(this.Hitbox.x > map[y][x].Xpos + map[y][x].w || this.Hitbox.x + this.Hitbox.w < map[y][x].Xpos || this.Hitbox.y > map[y][x].Ypos + map[y][x].h || this.Hitbox.y + this.Hitbox.h < map[y][x].Ypos){
          }
          else{
            if(!this.dead){
              map[y][x].doDoorStuff();
            }
            //patch for a bug that i dont know why it happens//
            else{
              this.dead = false;
            }
          }
        }
      }
    }
  }
  
  pickUpItem(map){
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if(map[y][x].itemSpawner !== undefined){
          let pickup = map[y][x].itemSpawner.pickUp;
          if(pickup !== undefined){
            //fix//
            if(!(this.pickupBox.x > pickup.xPos + pickup.w || this.pickupBox.x + this.pickupBox.w < pickup.xPos || this.pickupBox.y > pickup.yPos + pickup.h || this.pickupBox.y + this.pickupBox.h < pickup.yPos)){
              let item = pickup.item
              this.Inv.addItem(item, map[y][x].itemSpawner)
            }
          }
        }
      }
    }
  }
  getCurrentTile(map){
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if(this.Hitbox.x > map[y][x].Xpos + map[y][x].w || this.Hitbox.x + this.Hitbox.w < map[y][x].Xpos || this.Hitbox.y > map[y][x].Ypos + map[y][x].h || this.Hitbox.y + this.Hitbox.h < map[y][x].Ypos){
        }
        else{
          return {
            y: y,
            x: x
          }
        }
      }
    }
  }
  attack(){
    let dist;
    for (let i = 0; i < ai.length; i++) {
      dist = Math.round(Math.sqrt(Math.pow((ai[i].position.x + mapOffsetX) - (this.meleHitbox.x),2) + Math.pow((ai[i].position.y + mapOffsetY) - (this.meleHitbox.y),2)));
      if(dist < this.meleHitbox.rad/2){
        ai[i].damage(this.baseDamage + this.itemDamage)
      }
    }
  }

  damage(ammount){
    this.hp -= ammount
  }

  death(){
    // currentMap = 0;
    // mapOffsetX = 0
    // mapOffsetY = 0
    // Player.Inv.emptyInv()
    // Player.hp = Player.hpMax;
    startGame()
    console.log("dead")
  }

}

class Hotbar {
  constructor(y1, tileCount1, tileSize1) {
    this.y = y1;

    this.tileCount = tileCount1;
    this.tileSize = tileSize1;

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
  equipItem(spot){
    spot -= 1
    if(this.grid[spot].item !== undefined){
      if(this.grid[spot].item.item.type !== "potion"){
        Player.equipItem = this.grid[spot].item.item
      }
      else{
        Player.hp += 20;
        this.grid[spot].item = undefined;
      }
    }
  }
  emptyInv(){
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].item = undefined;
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
    this.items = [];

    this.selectedTile;

    for (let y = 0; y < this.ySize; y++) {
      this.grid.push([])
      for (let x = 0; x < this.xSize; x++) {
        this.grid[y][x] = new InventoryTile(this.x + this.tileSize * x, this.y + this.tileSize * y, this.tileSize, this.tileSize, false)
      }
    }

    this.Hotbar = new Hotbar(20, 9, 60);
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
    this.Hotbar.draw()
  }
  addItem(item,itemSpawn){
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        let gridItem = this.grid[y][x];
        if(gridItem.item === undefined){
          gridItem.item = new InventoryItem(gridItem.x+5, gridItem.y+5, gridItem.w-10, item);
          itemSpawn.pickUp = undefined;
          return;
        } 
      }
    }
  }
  
  mouseOn(){
    if(this.invOpen){

      for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[y].length; x++) {
          if(this.selectedTile === undefined){
            if(this.grid[y][x].mouseOn()){
              this.selectedTile = this.grid[y][x];
              this.selectedTile.selected = true;
            }
          }
          else {
            if(this.grid[y][x].mouseOn()){
              this.swap(this.selectedTile,this.grid[y][x]);
            }
          }
        }
      }

      for(let i = 0; i < this.Hotbar.grid.length; i++){
        if(this.selectedTile === undefined){
          if(this.Hotbar.grid[i].mouseOn()){
            this.selectedTile = this.Hotbar.grid[i];
            this.selectedTile.selected = true;
          }
        }
        else{
          if(this.Hotbar.grid[i].mouseOn()){
            this.swap(this.selectedTile,this.Hotbar.grid[i]);
          }
        }
      }
    }
  }

  swap(item1,item2){
    let p = item1.item
    item1.item = item2.item;
    item2.item = p;
    item1.updateItemPos()
    item2.updateItemPos()
    item1.selected = false;
    this.selectedTile = undefined;
  }

  emptyInv(){
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        this.grid[y][x].item = undefined;
      }
    }
    this.Hotbar.emptyInv()
  }
}

class InventoryTile {
  constructor(x1, y1, w1, h1, isHotbar1) {
    this.x = x1
    this.y = y1
    this.w = w1
    this.h = h1
    this.isHotbar = isHotbar1
    this.item = undefined;
    this.selected = false;
  }
  draw() {
    push()
    if(this.selected){
      fill(200);
    }
    else{
      fill(100)
    }
    rect(this.x, this.y, this.w, this.h)
    pop()
    if(this.item !== undefined){
      this.item.draw()
    }
  }
  mouseOn() {
    if ((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h)) {
      return true
    }
    else {
      return false
    }
  }
  updateItemPos(){
    if(this.item !== undefined){
      this.item.x = this.x+5;
      this.item.y = this.y+5;
      this.item.size = this.w-10;
    }
  }
}

class InventoryItem {
  constructor(x1,y1,size1,item1) {
    this.x = x1;
    this.y = y1;

    this.size = size1;
    this.item = item1;
  }
  draw(){
    push()
    fill(130);
    rect(this.x, this.y, this.size, this.size)
    image(this.item.icon,this.x+5, this.y+5, this.size-10, this.size-10)
    pop()
  }
}

//items//
//add more item types to spawn point//
class itemSpawnPoint{
  constructor(x1,y1,size1,randonly1,custonly1,custitem1,itemtype1){
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
    if(itemtype1 === undefined){
      this.allTypes = true;
    }
    else{
      this.itemType = itemtype1;
      this.allTypes = false;
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
    if(this.allTypes){
      let num = Math.round(random(0, 3))
      if(num === 0){
        this.itemType = "sword"
      }
      if(num === 1){
        this.itemType = "bow"
      }
      if(num === 2){
        this.itemType = "staff"
      }
      if(num === 3){
        this.itemType = "potion"
      }
    }

    let item
    let itemNum = 0;
    if(this.itemType === "sword"){
      itemNum = 0
    }
    if(this.itemType === "bow"){
      itemNum = 1
    }
    if(this.itemType === "staff"){
      itemNum = 2
    }
    if(this.itemType === "potion"){
      itemNum = 3
    }
    
    if(this.custOnly === true && worldItems[itemNum].length > 0 ){
      if(this.custItem === null){
        item = worldItems[0][Math.round(random(0, worldItems[itemNum].length - 1))]
        this.draw()
      }
      else item = this.custItem
      this.draw()
    }
    else{
      if(worldItems[itemNum].length > 0 && this.randOnly === false){
        if(random(0,100) < 31){
          item = worldItems[itemNum][Math.round(random(0, worldItems[itemNum].length - 1))]
          this.draw()
        }
        else{
          item = randomItemGen(this.itemType)
          this.draw()
        }
      }
      else{
        item = randomItemGen(this.itemType)
        this.draw()
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

//Ai//
class AiSpawn{
  constructor(x1,y1,size1,map1){
    this.x = x1;
    this.y = y1;
    this.map = map1;
    this.size = size1;
    this.yPos = this.y + mapOffsetY
    this.xPos = this.x + mapOffsetX
  }
  draw(){
    if(!playing){
      this.xPos = this.x + mapOffsetX
      this.yPos = this.y + mapOffsetY
      push()
      fill(200,0,0);
      rect(this.xPos, this.yPos, this.size, this.size);
      pop()
    }
  }

  spawnAi(){
    ai.push(new AiBase(this.x + 22, this.y + 22, 30, this.map))

  }
}

class AiBase{
  constructor(x1,y1,size1,map1){
    this.position = {
      x: x1,
      y: y1
    }
    this.size = size1;
    this.map = map1;
    
    this.speed = 3

    this.Hitbox = {
      x: this.position.x - this.size/2,
      y: this.position.y - this.size/2,
      w: this.size,
      h: this.size
    }

    this.path;
    this.optDist = 250;
    this.maxDist = 700;
    this.hpMax = 100;
    this.hp = 100;

    this.meleHitbox = {
      rad: 50,
      angle: atan2(mouseY - height/2, mouseX - width/2),
      x: cos(this.angle) * (this.rad/2) + width/2,
      y: sin(this.angle) * (this.rad/2) + height/2
    }

    this.counter = 0;
  }
  draw(){
    let dist;
    this.meleHitbox.angle = atan2(Player.y - this.position.y - mapOffsetY, Player.x - this.position.x - mapOffsetX)
    this.meleHitbox.x = cos(this.meleHitbox.angle) * (this.meleHitbox.rad/2)
    this.meleHitbox.y = sin(this.meleHitbox.angle) * (this.meleHitbox.rad/2)


    this.Hitbox.x = this.position.x - this.size/2
    this.Hitbox.y = this.position.y - this.size/2
    
    if(this.map === currentMap){
      if(this.hp <= 0){
        this.death()
      }
      push()
      //circle(this.position.x + mapOffsetX + this.meleHitbox.x, this.position.y + mapOffsetY + this.meleHitbox.y, this.meleHitbox.rad)
      
      fill('red')
      rect(this.Hitbox.x + mapOffsetX, this.Hitbox.y + mapOffsetY, this.Hitbox.w, this.Hitbox.h);
      fill('green')
      rect(this.Hitbox.x + mapOffsetX, this.Hitbox.y + mapOffsetY - 15, this.Hitbox.w / (this.hpMax/this.hp), 10);

      pop()
      if(this.path !== undefined){
        if(this.path.length > 0){
          this.move(this.path[this.path.length-1])
        }
      }
      dist = Math.round(Math.sqrt(Math.pow((this.position.x + mapOffsetX + this.meleHitbox.x) - (Player.x),2) + Math.pow((this.position.y + mapOffsetY + this.meleHitbox.y) - (Player.y),2)));
      if(dist < this.meleHitbox.rad/2){
        if(this.counter <= 0){
          Player.damage(10)
          this.counter = 30
        }
      }
      if(this.counter > 0){
        this.counter--
      }
    }
  }

  getCurrentTile(map){
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        if(this.Hitbox.x + mapOffsetX > map[y][x].Xpos + map[y][x].w || this.Hitbox.x + this.Hitbox.w + mapOffsetX < map[y][x].Xpos || this.Hitbox.y + mapOffsetY > map[y][x].Ypos + map[y][x].h || this.Hitbox.y + this.Hitbox.h + mapOffsetY < map[y][x].Ypos){
        }
        else{
          return {
            y: y,
            x: x
          }
        }
      }
    }
  }

  move(goal){
    let x = goal.x *64 + width/2;
    let y = goal.y *64 + height/2;
    if((this.position.x < x+8 && this.position.x > x-8) && (this.position.y < y+8 && this.position.y > y-8)){
      this.path.pop();
    }

    else{
      if(x > this.position.x){
        this.position.x += this.speed
      }
      if(x < this.position.x){
        this.position.x -= this.speed
      }

      if(y > this.position.y){
        this.position.y += this.speed
      }
      if(y < this.position.y){
        this.position.y -= this.speed
      }
    }
  }

  pathfind(){
    let dist = Math.round(Math.sqrt(Math.pow((this.position.x + mapOffsetX) - (Player.x),2) + Math.pow((this.position.y + mapOffsetY) - (Player.y),2)));
    //console.log(dist)
    if(this.map === currentMap && dist < this.maxDist){
      try {
        if(dist < this.optDist || this.path === undefined){
          this.path = mapList[currentMap].pathfind(this.getCurrentTile(mapList[currentMap].grid), Player.getCurrentTile(mapList[currentMap].grid))
          this.path.pop()
        }
        else{
          if(this.path.length === 0){
            this.path = mapList[currentMap].pathfind(this.getCurrentTile(mapList[currentMap].grid), Player.getCurrentTile(mapList[currentMap].grid))
            this.path.pop()
          }
        }
      } catch (error) {
        console.log("Pathfind Error" + error)
      }
    }
    else this.path = undefined;
  }

  damage(ammount){
    this.hp -= ammount
  }

  death(){
    ai.splice(ai.indexOf(this),1)
  }
}

//Ai//
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
          return this.buttons[i];
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

class ButtonList{
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
          return i;
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
        this.buttons[c] = new Button((this.scrollX + this.buttonGap/2) + ((this.buttonSize + this.buttonGap) * x), (this.scrollY + this.buttonGap/2) + ((this.buttonSize + this.buttonGap) * y), this.buttonSize, this.buttonSize, "map " + j)
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
  constructor(x1, y1, w1, h1, charLim1, numonly1, maxNum1, defNum1) {
    this.x = x1;
    this.y = y1;
    this.w = w1;
    this.h = h1;

    this.focused = false;
    this.textData = "";
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.charLimit = charLim1;

    if (defNum1 === undefined) {
      this.defNum = 0;
    } else this.defNum = defNum1;
    
    if (maxNum1 === undefined) {
      this.maxNum = 0;
    } else this.maxNum = maxNum1;

    if (numonly1 === undefined) {
      this.numOnly = false;
    } else this.numOnly = numonly1;

    if (this.numOnly) {
      this.textData = String(this.defNum);
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
    textSize(this.h/2);
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
    this.aiSpawner;

    this.isDoor = false;

    this.doorId = 0;
    this.DoorOut = 0;
    this.MapOut = 0;
    this.doorDirection = 1;

    this.doorData = "";
  }


  draw() {
    this.Xpos = this.x + this.offsetX
    this.Ypos = this.y + this.offsetY
    //draw GridItem if its on screen//Many FPS!!!//
    if (((this.x + this.offsetX) >= (0 - this.w) && (this.x + this.offsetX) < width) && ((this.y + this.offsetY) >= (0 - this.h) && (this.y + this.offsetY) < height)) {
      this.doorData = "door Id " + this.doorId + " Door Out " + this.DoorOut + " Map Out " + this.MapOut + " Door Direc " + this.doorDirection;
      push()
      image(this.tile.texture, this.Xpos, this.Ypos, this.w, this.h)
      if(this.itemSpawner !== undefined){
        this.itemSpawner.draw()
      }
      if(this.aiSpawner !== undefined){
        this.aiSpawner.draw()
      }

      if(!playing && this.isDoor){
        textAlign(CENTER, CENTER)
        textSize(this.h/6)
        text(this.doorData, this.x + this.offsetX, this.y + this.offsetY, this.w, this.h)
      }
      pop()
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
    let itemData = {
    }
    let aiData = {
    }
    
    let cutsomItem;
    
    if(this.itemSpawner !== undefined){
      
      if(this.itemSpawner.custItem !== null){
        cutsomItem = worldItems.indexOf(this.itemSpawner.custItem)
      }
      else{
        customItem = null;
      }
      
      itemData = {
        hasSpawner: true,
        x: this.itemSpawner.x,
        y: this.itemSpawner.y,
        size: this.itemSpawner.w,
        randOnly: this.itemSpawner.randOnly,
        custOnly: this.itemSpawner.custOnly,
        custItem: customItem,
        itemType: this.itemSpawner.itemType

      }
    }
    else{
      itemData = {
        hasSpawner: false,
      }
    }

    if(this.aiSpawner !== undefined){
      aiData = {
        hasSpawner: true,
        x: this.aiSpawner.x,
        y: this.aiSpawner.y,
        size: this.aiSpawner.size,
        map: this.aiSpawner.map
      }
    }
    else{
      aiData = {
        hasSpawner: false,
      }
    }

    let savedata = {
      textureId: textures.indexOf(this.tile),
      isDoor: this.isDoor,
      doorId: this.doorId,
      DoorOut: this.DoorOut,
      MapOut: this.MapOut,
      doorDirection: this.doorDirection,
      items: itemData,
      ai: aiData
    }
    list.push(savedata);
  }
  load(data) {
    this.tile = textures[data.textureId]
    this.hasCollision = textures[data.textureId].hasCollision

    this.isDoor = data.isDoor
    this.doorId = data.doorId
    this.DoorOut = data.DoorOut
    this.MapOut = data.MapOut
    this.doorDirection = data.doorDirection
    if(data.items.hasSpawner){
      let item = worldItems[data.items.custItem];
      this.itemSpawner = new itemSpawnPoint(this.x + 10, this.y + 10, this.w -20 ,data.items.randOnly ,data.items.custOnly ,item ,data.items.itemType)
    }
    if(data.ai.hasSpawner){
      this.aiSpawner = new AiSpawn(this.x + 10, this.y + 10, this.w -20 ,data.ai.map);
    }
  }
  doDoorStuff(){
    let xPos = (this.x - width/2 + 32)
    let yPos = (this.y - height/2 + 32)
    let map = mapList[this.MapOut]
    for(let y = 0; y < map.grid.length; y++){
      for(let x = 0; x < map.grid[y].length; x++){
        if(map.grid[y][x].isDoor && map.grid[y][x].doorId === this.DoorOut){
          xPos = (map.grid[y][x].x - width/2 + 32);
          yPos = (map.grid[y][x].y - height/2 + 32);
          if(map.grid[y][x].doorDirection === 1){
            yPos -= 64
          }
          if(map.grid[y][x].doorDirection === 2){
            xPos += 64
          }
          if(map.grid[y][x].doorDirection === 3){
            yPos += 64
          }
          if(map.grid[y][x].doorDirection === 4){
            xPos -= 64
          }
          currentMap = this.MapOut;
          teleport(xPos/64,yPos/64)
        }
      }
    }
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
        this.grid[y][x] = new GridItem(x * this.gridSize + (width/2 - this.gridSize/2), y * this.gridSize + (height/2 - this.gridSize/2), this.gridSize, this.gridSize, this.defaultTexture)
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
  pathfind(start,end){
    let pathfindArray = []
    let path = [];
    let atEnd = false
    let madePath = false;
    let map = mapList[currentMap].grid
    let isNextToWall = false;
    let g = 0;
    let h = 0;

    for (let y = 0; y < map.length; y++) {
      pathfindArray.push([])
      for (let x = 0; x < map[y].length; x++) {
        pathfindArray[y].push([])
      }
    }
    pathfindArray[start.y][start.x] = new PathFindTile(start.x, start.y, 0, 0, 'start')
    let currentTile = pathfindArray[start.y][start.x]
    let lastTile;
    while(!atEnd){
      for(let i = 0; i < pathfindArray.length; i++) {
        for(let j = 0; j < pathfindArray[i].length; j++) {
          if(pathfindArray[i][j].length !== 0){
            if(!pathfindArray[i][j].closed){
              if((currentTile.closed || pathfindArray[i][j].fCost < currentTile.fCost) || currentTile.parent === 'start'){
                currentTile = pathfindArray[i][j];
              }
            }
          }
        }
      }

      for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
          if(currentTile.y + y >= 0 && currentTile.x + x >= 0){
            if(map[currentTile.y + y][currentTile.x + x].hasCollision){
              isNextToWall = true;
            }
          }
        }
      }
      if(isNextToWall){
        for (let y = -1; y <= 1; y++) {
          if(y===0){
            for (let x = -1; x <= 1; x++) {
              if(x !== 0 || y !== 0){
                if(currentTile.y + y >= 0 && currentTile.x + x >= 0){
                  g = Math.round(Math.sqrt(Math.pow(x,2) + Math.pow(y,2))* 10 ) + currentTile.gCost;
                  h = Math.round(Math.sqrt(Math.pow(end.x - (currentTile.x+x),2) + Math.pow(end.y - (currentTile.y+y),2))* 10 );
                  
                  if(pathfindArray[currentTile.y+y][currentTile.x+x].length === 0){
                    pathfindArray[currentTile.y+y][currentTile.x+x] = new PathFindTile(currentTile.x+x, currentTile.y+y, g, h, currentTile)
                  }
                  else{
                    if(!pathfindArray[currentTile.y+y][currentTile.x+x].closed && pathfindArray[currentTile.y+y][currentTile.x+x].gCost > g){
                      pathfindArray[currentTile.y+y][currentTile.x+x] = new PathFindTile(currentTile.x+x, currentTile.y+y, g, h, currentTile)
                    }
                  }

                  if(map[currentTile.y+y][currentTile.x+x].hasCollision){
                    pathfindArray[currentTile.y+y][currentTile.x+x].closed = true;
                  }
                }
              }
            }
          }
          else{
            let x = 0;
            if(x !== 0 || y !== 0){
              if(currentTile.y + y >= 0 && currentTile.x + x >= 0){
                g = Math.round(Math.sqrt(Math.pow(x,2) + Math.pow(y,2))* 10 ) + currentTile.gCost;
                h = Math.round(Math.sqrt(Math.pow(end.x - (currentTile.x+x),2) + Math.pow(end.y - (currentTile.y+y),2))* 10 );
                
                if(pathfindArray[currentTile.y+y][currentTile.x+x].length === 0){
                  pathfindArray[currentTile.y+y][currentTile.x+x] = new PathFindTile(currentTile.x+x, currentTile.y+y, g, h, currentTile)
                }
                else{
                  if(!pathfindArray[currentTile.y+y][currentTile.x+x].closed && pathfindArray[currentTile.y+y][currentTile.x+x].gCost > g){
                    pathfindArray[currentTile.y+y][currentTile.x+x] = new PathFindTile(currentTile.x+x, currentTile.y+y, g, h, currentTile)
                  }
                }

                if(map[currentTile.y+y][currentTile.x+x].hasCollision){
                  pathfindArray[currentTile.y+y][currentTile.x+x].closed = true;
                }
              }
            }
          }
        }
      }
      else{
        for (let y = -1; y <= 1; y++) {
          for (let x = -1; x <= 1; x++) {
            if(x !== 0 || y !== 0){
              if(currentTile.y + y >= 0 && currentTile.x + x >= 0){
                if(!map[currentTile.y+y][currentTile.x+x].hasCollision){
                  g = Math.round(Math.sqrt(Math.pow(x,2) + Math.pow(y,2))* 10 ) + currentTile.gCost;
                  h = Math.round(Math.sqrt(Math.pow(end.x - (currentTile.x+x),2) + Math.pow(end.y - (currentTile.y+y),2))* 10 );
                  
                  if(pathfindArray[currentTile.y+y][currentTile.x+x].length === 0){
                    pathfindArray[currentTile.y+y][currentTile.x+x] = new PathFindTile(currentTile.x+x, currentTile.y+y, g, h, currentTile)
                  }
                  else{
                    if(!pathfindArray[currentTile.y+y][currentTile.x+x].closed && pathfindArray[currentTile.y+y][currentTile.x+x].gCost > g){
                      pathfindArray[currentTile.y+y][currentTile.x+x] = new PathFindTile(currentTile.x+x, currentTile.y+y, g, h, currentTile)
                    }
                  }
                } 
              }
            }
          }
        }
      }
      isNextToWall = false;
      currentTile.closed = true;
      lastTile = currentTile;

      if(pathfindArray[end.y][end.x].length !== 0){
        atEnd = true;
        if(map[end.y][end.x].hasCollision){
          path.push(lastTile)
        }
        else{
          path.push(pathfindArray[end.y][end.x])
        }
      }
    }
    while(!madePath){
      if(path[path.length-1] !== pathfindArray[start.y][start.x]){
        path.push(path[path.length-1].parent)
      }
      else{
        madePath = true;
      }
    }
    return path
  }
}

class PathFindTile{
  constructor(x1,y1,g1,h1,parentArray1){      
    this.x = x1;
    this.y = y1;
    this.gCost = g1;
    this.hCost = h1;
    this.fCost = g1 + h1;
    if(parentArray1 === 'start'){
      this.closed = true
    }
    else{
      this.closed = false
    }
    this.parent = parentArray1;
  }
}