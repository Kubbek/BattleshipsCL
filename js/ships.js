function shipError() {
    console.log("You can't put your ship here");
}


function generateAlignment() {
    let result = Math.random();
    if (result >= 0.5) {
        return "Vertical"
    } else {
        return "Horizontal"
    }
}


//* 4 functions checking if there are no ships on nearby fields
function horizontalColumn(player, startX, startY, size) {
    for (let i = startX; i < (startX + size); i++) {
        if (player[i][(startY - 1)] !== 0 || player[i][(startY + 1)] !== 0) {
            return shipError()
        }
    }
}

function horizontalRow(player, startX, startY, size) {
    if (player[(startX - 1)][startY] !== 0 || player[(startX + size + 1)][startY !== 0]) {
        return shipError()
    }
}

function verticalColumn(player, startX, startY, size) {
    if (player[startX][(startY + size + 1)] !== 0 || player[startX][(startY - 1)] !== 0) {
        return shipError()
    }
}

function verticalRow(player, startX, startY, size) {
    for (let i = startY; i < (startY + size); i++) {
        if (player[startX + 1][i] !== 0 || player[startX - 1][i] !== 0) {
            return shipError()
        }
    }
}


function generateRandomShips() {
    const shipsArr = [4, 3, 3, 2, 2, 1, 1]
    for (let i = 0; i < shipsArr.length; i++) {
        let startX = Math.round(Math.random() * 14);
        let startY = Math.round(Math.random() * 14);
        let orientation = generateAlignment();
        if(orientation === "Vertical"){
            verticalColumn(arrP2,startX,startY,shipsArr[i]);
            verticalRow(arrP2,startX,startY,shipsArr[i]);
        } else {
            horizontalColumn((arrP2,startX,startY,shipsArr[i]));
            horizontalRow((arrP2,startX,startY,shipsArr[i]));
        }
    }
}