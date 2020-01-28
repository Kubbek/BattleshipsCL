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


//* 4 functions checking if position is right for horizontal ships
function horizontalTop(player, startX, startY, size) {
    for (let i = startY; i < (startY + size); i++) {
        if (player[startX - 1][i] !== 0) {
            return false;
        } else {
            player[startX][i] === "Ship";
            return true;
        }
    }
}

function horizontalBottom(player, startX, startY, size) {
    for (let i = startX; i < (startX + size); i++) {
        if (player[startX + 1][i] !== 0) {
            return false;
        } else {
            player[startX][i] === "Ship";
            return true;
        }
    }
}

function horizontalRight(player, startX, startY, size) {
    if (player[(startX)][startY + size + 1] !== 0) {
        return false
    }
}

function horizontalLeft(player, startX, startY,) {
    if (player[startX][startY - 1] !== 0) {
        return false
    }
}

//* 4 functions checking if vertical ships are set up right

function verticalTop(player, startX, startY) {
    if (player[startX - 1][startY] !== 0) {
        return false
    }
}

function verticalBottom(player, startX, startY, size) {
    if (player[startX + size + 1][startY] !== 0) {
        return false
    }
}

function verticalLeft(player, startX, startY, size) {
    for (let i = startY; i < (startY + size); i++) {
        if (player[(startX - 1)][i] !== 0) {
            return false
        } else {
            player[startX][i] === 'Ship';
            return true
        }
    }
}

function verticalRight(player, startX, startY, size) {
    for (let i = startY; i < (startY + size); i++) {
        if (player[(startX + 1)][i] !== 0) {
            return false
        } else {
            player[startX][i] === 'Ship';
            return true
        }
    }
}


export default function generateRandomShips(mapArr) {
    const shipsArr = [4, 3, 3, 2, 2, 1, 1];
    for (let i = 0; i < shipsArr.length; i++) {
        console.log('ship number', i);
        while(true){
        let startX = Math.round(Math.random() * (15 - 1)) + 1;
        let startY = Math.round(Math.random() * (15 - 1)) + 1;
        let orientation = generateAlignment();

        console.log(startX, startY, shipsArr[i]);


        let settedCol = false;
        let settedRow = false;
        if (orientation === "Vertical") {
            if (startY !== 1) {
                settedCol = verticalTop(mapArr, startX, startY, shipsArr[i])
            }
            if (startY !== 14) {
                settedCol = verticalBottom(mapArr, startX, startY, shipsArr[i])
            }
            if (startY + shipsArr[i] > 14) {return false}
            if (startX !== 1) {
                settedRow = verticalLeft(mapArr, startX, startY, shipsArr[i])
            }
            if (startX !== 14) {
                settedRow = verticalRight(mapArr, startX, startY, shipsArr[i])
            }
        } else {
            if (startX !== 1) {
                settedCol = horizontalBottom(mapArr, startX, startY, shipsArr[i])
            }
            if (startX !== 14) {
                settedCol = horizontalTop(mapArr, startX, startY, shipsArr[i])
            }
            if (startX + shipsArr[i] > 14) {return false}
            if (startY !== 14) {
                settedRow = horizontalRight(mapArr, startX, startY, shipsArr[i])
            }
            if (startY !== 1) {
                settedRow = horizontalLeft(mapArr, startX, startY, shipsArr[i])
            }
        }
        if (settedCol && settedRow) {
            console.log('in array');
            break;
        }
        // }
    }
}}