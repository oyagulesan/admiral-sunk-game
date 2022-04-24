import { COMPONENTS, EMPTY_BOARD } from '../util/constants'

const checkNeighbors = (board, x, y) => {
    // Check up
    if (x > 1) {
        if (board[x - 1][y] && board[x - 1][y] !== 'x') {
            return false
        }
    }
    // Check bottom
    if (x < 9) {
        if (board[x + 1][y] && board[x + 1][y] !== 'x') {
            return false
        }
    }
    // Check left
    if (y > 1) {
        if (board[x][y - 1] && board[x][y - 1] !== 'x') {
            return false
        }
    }
    // Check right
    if (y < 9) {
        if (board[x][y + 1] && board[x][y + 1] !== 'x') {
            return false
        }
    }
    // Check top left
    if (x > 1 && y > 1) {
        if (board[x - 1][y - 1] && board[x - 1][y - 1] !== 'x') {
            return false
        }
    }
    // Check top right
    if (x > 1 && y < 9) {
        if (board[x - 1][y + 1] && board[x - 1][y + 1] !== 'x') {
            return false
        }
    }
    // Check bottom left
    if (x < 9 && y > 1) {
        if (board[x + 1][y - 1] && board[x + 1][y - 1] !== 'x') {
            return false
        }
    }
    // Check bottom right
    if (x < 9 && y < 9) {
        if (board[x + 1][y + 1] && board[x + 1][y + 1] !== 'x') {
            return false
        }
    }
    return true
}

const findAvailableSpaces = (board, x, y, comp) => {
    const availableSpaces = [];
    // Check right
    let available = true;
    if (y + comp > 10) {
        available = false
    } else {
        for (let i = 0; i < comp; i++) {
            if (board[x][y + i] || !checkNeighbors(board, x, y + i)) {
                available = false;
                break;
            }
        }
        if (available) {
            const space = [];
            for (let i = 0; i < comp; i++) {
                space.push([x, y + i])
            }
            availableSpaces.push(space)
        }
    }
    // Check bottom
    available = true;
    if (x + comp > 10) {
        available = false
    } else {
        for (let i = 0; i < comp; i++) {
            if (board[x + i][y] || !checkNeighbors(board, x + i, y)) {
                available = false;
                break;
            }
        }
        if (available) {
            const space = [];
            for (let i = 0; i < comp; i++) {
                space.push([x + i, y])
            }
            availableSpaces.push(space)
        }
    }

    /*
    if (availableSpaces.length > 0) {
        console.log('availableSpaces', availableSpaces)
        console.log('\n')    
    }
    */
    return availableSpaces;
}

const getRandomSpace = (comp, board) => {
    let availableSpaces = [];
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            availableSpaces = availableSpaces.concat(findAvailableSpaces(board, x, y, comp));
        }    
    }
    // Make selection and update board
    if (availableSpaces.length > 0) {
        let localBoard = board.map(row => row.map(cell => cell))

        const ind = Math.floor((Math.random() * (availableSpaces.length - 1)));

        const selectedAvailableSpace = availableSpaces[ind]

        for (let i = 0; i < selectedAvailableSpace.length; i++) {
            localBoard[selectedAvailableSpace[i][0]][selectedAvailableSpace[i][1]] = comp
            // Fill up
            if (selectedAvailableSpace[i][0] > 0 && !localBoard[selectedAvailableSpace[i][0] - 1][selectedAvailableSpace[i][1]]) {
                localBoard[selectedAvailableSpace[i][0] - 1][selectedAvailableSpace[i][1]] = 'x'
            }
            // Fill bottom
            if (selectedAvailableSpace[i][0] < 9 && !localBoard[selectedAvailableSpace[i][0] + 1][selectedAvailableSpace[i][1]]) {
                localBoard[selectedAvailableSpace[i][0] + 1][selectedAvailableSpace[i][1]] = 'x'
            }
            // Fill left
            if (selectedAvailableSpace[i][1] > 0 && !localBoard[selectedAvailableSpace[i][0]][selectedAvailableSpace[i][1] - 1]) {
                localBoard[selectedAvailableSpace[i][0]][selectedAvailableSpace[i][1] - 1] = 'x'
            }
            // Fill right
            if (selectedAvailableSpace[i][1] < 9 && !localBoard[selectedAvailableSpace[i][0]][selectedAvailableSpace[i][1] + 1]) {
                localBoard[selectedAvailableSpace[i][0]][selectedAvailableSpace[i][1] + 1] = 'x'
            }
            // Fill top left
            if (selectedAvailableSpace[i][0] > 0 && selectedAvailableSpace[i][1] > 0 && !localBoard[selectedAvailableSpace[i][0] - 1][selectedAvailableSpace[i][1] - 1]) {
                localBoard[selectedAvailableSpace[i][0] - 1][selectedAvailableSpace[i][1] - 1] = 'x'
            }
            // Fill top right
            if (selectedAvailableSpace[i][0] > 0 && selectedAvailableSpace[i][1] < 9 && !localBoard[selectedAvailableSpace[i][0] - 1][selectedAvailableSpace[i][1] + 1]) {
                localBoard[selectedAvailableSpace[i][0] - 1][selectedAvailableSpace[i][1] + 1] = 'x'
            }
            // Fill bottom left
            if (selectedAvailableSpace[i][0] < 9 && selectedAvailableSpace[i][1] > 0 && !localBoard[selectedAvailableSpace[i][0] + 1][selectedAvailableSpace[i][1] - 1]) {
                localBoard[selectedAvailableSpace[i][0] + 1][selectedAvailableSpace[i][1] - 1] = 'x'
            } 
            // Fill bottom right
            if (selectedAvailableSpace[i][0] < 9 && selectedAvailableSpace[i][1] < 9 && !localBoard[selectedAvailableSpace[i][0] + 1][selectedAvailableSpace[i][1] + 1]) {
                localBoard[selectedAvailableSpace[i][0] + 1][selectedAvailableSpace[i][1] + 1] = 'x'
            }
        }
        return localBoard;    
    } else {
        console.log('Failed to find a place for comp ' + comp, board)
    }
    return board
}

const useInitializeBoard = () => {
    const initialize = () => {
        // Start with copying empty board
        let board = EMPTY_BOARD.map(row => row.map(cell => cell))
        for (let i = 0; i < COMPONENTS.length; i++) {
            const comp = COMPONENTS[i];
            board = getRandomSpace(comp, board);
        }
        /*
        console.log('\n\n')
        board.forEach(row => {
            console.log(row.join(" ").replace(/0/g, '.') + '\n')
        })
        */
        return board
    }
    return [initialize]
}

export default useInitializeBoard