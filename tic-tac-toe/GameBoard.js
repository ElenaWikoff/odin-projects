/**
 * A gameboard grid.
 * @param {*} cell Object to populate board grid with
 * @param {number} rows Number of rows on board
 * @param {number} cols Number of columns on board
 * @param {[*]} args Arguments to pass to cell object
 * @returns game board object
 */
export default function GameBoard(cell, rows = 3, cols = 3, ...args) {
    if (rows < 1 && cols < 1) {
        throw new Error(`Game board must have at least 1 row and 1 column`);
    }
    // Constructor/Initializer
    const _init = () =>  {
        const board = Array.from({ length: rows }, () => []);
        board.forEach((row) => {
            for (let i = 0; i < cols; i++) {
                if (typeof cell === "function") {
                    row.push(cell(...args));
                } else {
                    row.push(cell);
                }
            }
        });
        return board;
    }
    // Game board matrix of size: rows x cols.
    let _board = _init();

    /**
     * Internal method to validate that provided rows and columns fit _board size.
     * @param {number} row 
     * @param {number} col 
     * @returns True if coordinates within board bounds, false otherwise.
     */
    const _validateCoordinates = (row, col) => {
        let valid = true;
        if (row < 0 || row > _board.length) {
            valid = false;
            console.error(`Invalid row: ${row}, 0 <= row < ${_board.length}`);
        }
        if (col < 0 || col > _board[0].length) {
            valid = false;
            console.error(`Invalid col, ${col} !== ${validCoord.join(" | ")}`);
        }
        return valid;
    }

    /**
     * Return object in game board at (row, col).
     * @param {number} row 
     * @param {number} col 
     * @returns Object
     */
    const getCell = (row, col) => {
        // Validate that row and col are in bounds of board
        if (!_validateCoordinates()) {
            throw new Error(`Failed validation, invalid coordinates: (${row}, ${col})`);
        }
        else {
            return _board[row][col];
        }
    }

    /**
     * @returns Copy of game board.
     */
    const getBoard = () => _board.map((row) => [...row]);

    /**
     * Reinitializes gameboard.
     */
    const clear = () => _board = _init();

    /**
     * @returns String of game board.
     */
    const toString = () => {
        let output = "";
        _board.forEach((row) => output += row.join(" | ") + "\n");
        return output;
    };

    return { rows, cols, getCell, getBoard, clear, toString };
}