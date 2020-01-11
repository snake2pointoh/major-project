
i = 15

function doPhys() {
    if (scene === "game") {
        gamePhys()
    }
    if (scene === "editor") {
        edditorPhys()
    }
}

function gamePhys() {
    playerController(Player)
    Player.collisionDetect(mapList[currentMap].grid)
    if(i === 0){
        for (let i = 0; i < ai.length; i++) {
            ai[i].pathfind()
        }
        i = 15
    }
    else i--
}

function edditorPhys() {
    if (edditorMenu === "map") {
        playerController(Player);
        mapEdditor(mapList[currentMap].grid);
    }
    if (edditorMenu === "newMap") {
        playerController(Player);
    }
}