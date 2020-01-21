//counter for waht ai to update//
i = 0

function doPhys() {
    if (scene === "game") {
        gamePhys()
    }
    if (scene === "editor") {
        edditorPhys()
    }
}

//runs movement and collision detection//
function gamePhys() {
    playerController(Player)
    Player.collisionDetect(mapList[currentMap].grid)
}

//runs the ai pathfinding for each ai//
function aiPath() {
    if(i < ai.length){
        ai[i].pathfind()
        i++
    }
    else{
        i = 0
    }
}

//runs movement and the map edditor//
function edditorPhys() {
    if (edditorMenu === "map") {
        playerController(Player);
        if(mapList.length > 0){
            mapEdditor(mapList[currentMap].grid);
        }
    }
    if (edditorMenu === "newMap") {
        playerController(Player);
    }
}