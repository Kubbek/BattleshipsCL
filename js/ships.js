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
        if (player[startX - 1][i] !== 0) return false
    }
    return true
}

function horizontalBottom(player, startX, startY, size) {
    for (let i = startX; i < (startX + size); i++) {
        if (player[startX + 1][i] !== 0) return false
    }
    return true
}

function horizontalRight(player, startX, startY, size) {
    if (player[(startX)][startY + size + 1] !== 0) return false
    return true
}

function horizontalLeft(player, startX, startY,) {
    if (player[startX][startY - 1] !== 0) {
        return false
    }
    return true
}

//* 4 functions checking if vertical ships are set up right

function verticalTop(player, startX, startY) {
    if (player[startX - 1][startY] !== 0) {
        return false
    }
    return true;
}

function verticalBottom(player, startX, startY, size) {
    if (startX + size + 1 > 14) return false;
    if (player[(startX + size + 1)][startY] !== 0) {
        return false
    }
    return true;
}

function verticalLeft(player, startX, startY, size) {
    for (let i = startY; i < (startY + size); i++) {
        if (player[(startX - 1)][i] !== 0) {
            return false
        }
    }
    return true

}

function verticalRight(player, startX, startY, size) {
    for (let i = startY; i < (startY + size); i++) {
        if (player[(startX + 1)][i] !== 0) {
            return false
        }
    }
    return true;
}


function insertShipHorizontal(player, startX, startY, size) {
    for (let i = startX; i < (startX + size); i++) {
        player[i][startY] = 'ship'+size;
    }
}

function insertShipVertical(player, startX, startY, size) {
    for (let i = startY; i < (startY + size); i++) {
        player[startX][i] = 'ship'+size;
    }
}

function insertShip(player, startX,startY, size, orientation){
    if(orientation==='Vertical') insertShipVertical(player, startX, startY, size);
    if(orientation==='Horizontal') insertShipHorizontal(player, startX, startY, size);
}

export default function generateRandomShips(mapArr) {
    const shipsArr = [4, 3, 3, 2, 2, 1, 1];
    for (let i = 0; i < shipsArr.length; i++) {
        while (true) {
            console.log('ship number', i);
            let startX = Math.round(Math.random() * (14 - 1)) + 1;
            let startY = Math.round(Math.random() * (14 - 1)) + 1;
            let orientation = generateAlignment();

            console.log(startX, startY, shipsArr[i]);

            let setTop = false;
            let setBottom = false;
            let setRight = false;
            let setLeft = false;

            if (orientation === "Vertical") {
                if (startY !== 1) {
                    setTop = verticalTop(mapArr, startX, startY, shipsArr[i])
                }
                if (startY !== 14) {
                    setBottom = verticalBottom(mapArr, startX, startY, shipsArr[i])
                }
                if (startY + shipsArr[i] > 14) {
                    setBottom = false
                }
                if (startX !== 1) {
                    setLeft = verticalLeft(mapArr, startX, startY, shipsArr[i])
                }
                if (startX !== 14) {
                    setRight = verticalRight(mapArr, startX, startY, shipsArr[i])
                }
            } else {
                if (startX !== 1) {
                    setBottom = horizontalBottom(mapArr, startX, startY, shipsArr[i])
                }
                if (startX !== 14) {
                    setTop = horizontalTop(mapArr, startX, startY, shipsArr[i])
                }
                if (startX + shipsArr[i] > 14) {
                    setRight = false
                }
                if (startY !== 14) {
                    setRight = horizontalRight(mapArr, startX, startY, shipsArr[i])
                }
                if (startY !== 1) {
                    setLeft = horizontalLeft(mapArr, startX, startY, shipsArr[i])
                }
            }

            console.log(setTop, setBottom, setRight, setLeft);
            console.log(mapArr);
            if (setTop && setBottom && setLeft && setRight) {
                insertShip(mapArr, startX, startY, shipsArr[i], orientation);
                console.log('in array');
                break;
            }
        }

    }
}

