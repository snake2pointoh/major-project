

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
}

function edditorPhys() {
    if (edditorMenu === "map") {
        playerController(Player);
        mapEdditor(mapList[currentMap].grid);
    }
}