'use strict'

var gMine = '💣'
var gFlag = '🚩'

var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var gBoard;
var ceckTime = 1;
var gTimerInterval;



function startAgain() {
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = '😀';
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = 0;
    ceckTime = 1;
    clearInterval(gTimerInterval)
    init();

}



function init() {
    document.querySelector('.modal').style.display = 'none'
    gBoard = buildBoard(gLevel.SIZE, gLevel.MINES)
    renderBoard(gBoard, '.board')
    gGame.isOn = true
    gGame.shownCount = 0;
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
    gGame.markedCount = gLevel.MINES
    var elMarkedCount = document.querySelector('.flagCount');
    elMarkedCount.innerText = gGame.markedCount
    return board;
}

function renderBoard(mat, selector) {
    console.log(gBoard)
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            cell.minesAroundCount = setMinesNegsCount(mat, { i, j })
            if (cell.minesAroundCount === 0) {
                cell.minesAroundCount = ''
            }
            var className = `cell cell-${i}-${j}`;
            strHTML += `<td  oncontextmenu="rightClick()"  onmouseup="cellClicked(event,this,${i},${j})"  class=" ${className}"></td>`;
        }
        strHTML += '</tr>'

    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function cellClicked(ev, elCell, i, j) {
    if (!gGame.isOn) return
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerText = '🙄';
    startTime();
    var cell = gBoard[i][j]
    switch (ev.button) {
        case 0:
            if (cell.isMarked) break;
            if (cell.isShown) break;
            else {
                cell.isShown = true
                gGame.shownCount++
                console.log(gGame.shownCount)
            }
            blowUpNegs(i, j, gBoard, elCell)
            elCell.innerHTML = chackCell(cell);
            if (cell.isMine) {
                elCell.style.backgroundColor = '#f35858d2'
                var elEmoji = document.querySelector('.emoji');
                elEmoji.innerText = '😵';
                GameOver();
            } else {
                GameWin()
            }
            break;
        case 2:
            if (!cell.isMarked && !cell.isShown) {
                cell.isMarked = true
                gGame.markedCount--
                var elMarkedCount = document.querySelector('.flagCount');
                elMarkedCount.innerText = gGame.markedCount
                elCell.innerHTML = gFlag;

                break
            } else {
                cell.isMarked = false
                if (!cell.isShown) {
                    gGame.markedCount++
                    var elMarkedCount = document.querySelector('.flagCount');
                    elMarkedCount.innerText = gGame.markedCount
                }
                elCell.innerHTML = chackCell(cell);

                break
            }
    }
}



function blowUpNegs(cellI, cellJ, board, elCell) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[0].length) continue;
            if (i === cellI && j === cellJ) continue;
            var cell = board[cellI][cellJ]
            if (!cell.isMine && cell.minesAroundCount === '') {
                if (!board[i][j].isShown) {

                    gGame.shownCount++
                }
                board[i][j].isShown = true;
                var elmins = document.querySelector(`.cell-${i}-${j}`);
                elmins.innerHTML = board[i][j].minesAroundCount
                if (board[i][j].minesAroundCount === '') {
                    elmins.classList.add('emty')
                    elCell.classList.add('emty')
                }
            }
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
        var gStartTime = Date.now();
        var elTimer = document.querySelector('.timer');
        gTimerInterval = setInterval(function () {
            var passedSeconds = Math.floor((Date.now() - gStartTime) / 1000);
            elTimer.innerText = passedSeconds;
        }, 100);
    }
    ceckTime = 0
}





function GameOver() {
    // alert('game over')
    clearInterval(gTimerInterval)
    gGame.isOn = false;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine) {
                var elmins = document.querySelector(`.cell-${i}-${j}`);
                elmins.innerHTML = gMine
            }

        }

    }
    document.querySelector('.modal').style.display = 'block'
    document.querySelector('.modal h2').innerText = 'You Lose'
}

function GameWin() {
    if (gGame.shownCount === Math.pow(gBoard.length, 2) - gLevel.MINES) {
        var elEmoji = document.querySelector('.emoji');
        elEmoji.innerText = '😎';
        clearInterval(gTimerInterval)
        gGame.isOn = false;
        document.querySelector('.modal').style.display = 'block'
        document.querySelector('.modal h2').innerText = 'You Win'
    }
}





