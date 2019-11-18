

// function setup() {
//     frameRate(60);
//     console.log("nerd")
// }

// function draw() {
//     if (scene === "game") {
//         gamePhys()
//     }
//     if (scene === "edditor") {
//         edditorPhys()
//     }
// }

function gamePhys() {
    playerController(Player)
    Player.collisionDetect(MainMap.grid)
}

function edditorPhys() {
    if (edditorMenu === "map") {
        playerController(Player);
        mapEdditor(MainMap.grid);
    }
}