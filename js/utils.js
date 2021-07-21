function copyMat(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = []
        // newMat[i] = mat[i].slice();
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = mat[i][j];
        }
    }
    return newMat;
}


///Timer



// /// nabers loop
// function countFoodAround(board, pos) {
//     var count = 0
//     for (var i = pos.i - 1; i <= pos.i + 1; i++) {
//         if (i < 0 || i >= board.length) continue

//         for (var j = pos.j - 1; j <= pos.j + 1; j++) {
//             if (j < 0 || j >= board[0].length) continue
//             if (i === pos.i && j === pos.j) continue

//             var cell = board[i][j]
//             if (cell === gFoodIcon) count++
//         }
//     }
//     return count
// }

// function blowUpNegs(cellI, cellJ, board) {
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= board.length) continue
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= board[0].length) continue
//             if (i === cellI && j === cellJ) continue
//             if (board[i][j] === LIFE) {
//                 board[i][j] = ''
//                 renderCell({ i, j }, '')
//             }
//         }
//     }
// }



// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min);
// }

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }


// function buildBoard() {
//     //build the board 8 * 8
//     var board = [];
//     for (var i = 0; i < 4; i++) {
//         board[i] = [];
//         for (var j = 0; j < 4; j++) {
//             var cell = {
//                 minesAroundCount: 0,
//                 isShown: true,
//                 isMine: false,
//                 isMarked: true
//             };
//             board[i][j] = cell;
//         }

//     }
//     board[2][2].isMine = true;
//     board[3][3].isMine = true;
//     return board;
// }

// function renderBoard(mat, selector) {
//     var strHTML = '<table border="0"><tbody>';
//     for (var i = 0; i < mat.length; i++) {
//         strHTML += '<tr>';
//         for (var j = 0; j < mat[0].length; j++) {
//             var cell = mat[i][j];
//             var className = 'cell cell' + i + '-' + j;
//             strHTML += '<td class="' + className + '"></td>'
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>';
//     var elContainer = document.querySelector(selector);
//     elContainer.innerHTML = strHTML;
// }

// // location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
//     elCell.innerHTML = value;
// }


function rightClick() {
    event.preventDefault();
}


