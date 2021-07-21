``

var gMine = '💣'
var gFlag = '🚩'

gLevel = {
    SIZE: 4,
    MINES: 2
};
gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gBoard;
var ceckTime = 1;
var gTimerInterval;



function startAgain() {
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = 0;
    ceckTime = 1;
    init();

}



function init() {
    gBoard = buildBoard(gLevel.SIZE, gLevel.MINES)
    renderBoard(gBoard, '.board')
    gGame.isOn = true

}



function buildBoard(SIZE, MINES) {
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = cell;
        }

    }
    getRanduomMine(board, MINES);
    return board;
}

function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            cell.minesAroundCount = setMinesNegsCount(mat, { i, j })
            var className = `cell cell-${i}-${j}`;
            strHTML += `<td  oncontextmenu="rightClick()" onmouseup="cellClicked(event,this,${i},${j})"  class=" ${className}"></td>`;
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;


}

function cellClicked(ev, elCell, i, j) {
    console.log(ev.button)
    if (!gGame.isOn) return
    startTime();
    var cell = gBoard[i][j]
    switch (ev.button) {
        case 0:
            if (cell.isMarked) break;
            cell.isShown = true
            elCell.innerHTML = chackCell(cell);
            if (cell.isMine) {
                GameOver();
            }
            break;
        case 2:
            if (!cell.isMarked && !cell.isShown) {
                cell.isMarked = true
                elCell.innerHTML = gFlag;
                break
            } else {
                cell.isMarked = false
                elCell.innerHTML = chackCell(cell);
                break
            }

    }
}


function setMinesNegsCount(board, pos) {
    var count = 0
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === pos.i && j === pos.j) continue

            var cell = board[i][j]
            if (cell.isMine) count++
        }
    }
    return count
}




function chackCell(cell) {
    if (!cell.isShown) {
        return ''
    } else {
        return cell.isMine ? gMine : cell.minesAroundCount
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function getRanduomMine(board, Minenum) {
    var i = 0;
    while (i < Minenum) {
        var indxI = getRandomInt(0, board.length)
        var indxJ = getRandomInt(0, board.length)
        if (!board[indxI][indxJ].isMine) {
            board[indxI][indxJ].isMine = true;
            i++
        }
    }
}


function setLevels(SIZE = 4, MINES = 2) {
    gLevel.SIZE = SIZE;
    gLevel.MINES = MINES;
    gBoard = buildBoard(gLevel.SIZE, gLevel.MINES)
    renderBoard(gBoard, '.board')

}

function startTime() {
    if (ceckTime) {
        gStartTime = Date.now();
        var elTimer = document.querySelector('span');
        gTimerInterval = setInterval(function () {
            var passedSeconds = Math.floor((Date.now() - gStartTime) / 1000);
            elTimer.innerText = passedSeconds;
        }, 100);
    }
    ceckTime = 0
}

function GameOver() {
    alert('game over')
    clearInterval(gTimerInterval)
    gGame.isOn = false;

}

