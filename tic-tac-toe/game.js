import Cell from "./Cell.js";
import GameBoard from "./GameBoard.js";

const x = "✕";
const o = "◯";

/**
 * Tic Tac Toe Game implementation
 */
const gamestate = (function () {
    const _gameboard = GameBoard(Cell, 3, 3);
    const _states = ["", x, o, "draw"]
    let _state = 0;
    const _players = [x, o];
    let _currPlayer = 0;

    /**
     * Determine if Tic Tac Toe game has ended
     * @returns 0: keep playing, 1: ✕ wins, 2: ◯ wins, and 3: draw
     */
    const _gameOver = () => {
        let winner = 0;
        const cell = _gameboard.getCell;

        // Check if winner
        const winConditions = [
            [[0, 0], [0, 1], [0, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[1, 0], [1, 1], [1, 2]],
            [[0, 1], [1, 1], [2, 1]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]],
        ];
        winConditions.forEach((cond) => {
            const currCell = cell(...cond[0]);
            if (currCell.getMark() &&
                currCell.equals(cell(...cond[1])) &&
                currCell.equals(cell(...cond[2]))) {
                winner = _states.indexOf(cell(...cond[0]).getMark());
                return;
            }
        });

        if (!winner) {
            // Check if game can still be played
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    // If there is cell not marked, keep playing
                    if (!cell(r, c).isMarked()) {
                        return 0; // keep playing
                    }
                }
            }
            return 3; // draw
        }
        return winner;
    };

    const mark = (row, col) => {
        if (_state === 0) {
            const cell = _gameboard.getCell(row, col);
            if (cell.isMarked()) {
                console.log(`Cell (${row}, ${col}) already marked with: '${cell.getMark()}'.`);
            } else {
                // Mark cell with symbol of current player: '✕' or '◯'
                cell.addMark(_players[_currPlayer]);
                // Update state of game
                _state = _gameOver();
                // Switch current player
                _currPlayer ^= 1;
            }
        }
    }

    const getState = () => _states[_state];

    const getCurrentPlayer = () => _players[_currPlayer];

    const reset = () => {
        _state = 0;
        _currPlayer = 0;
        _gameboard.clear();
    }

    const toString = () => {
        let output = "";
        switch (_state) {
            case 0: output += `Turn: ${getCurrentPlayer()}\n`; break;
            case 1:
            case 2: output += `${_states[_state]} wins!\n`; break;
            case 3:
            default: output += "Draw\n";
        }
        return output += _gameboard.toString();
    }

    const getBoard = () => {
        const board = [];
        _gameboard.getBoard().forEach((row) => row.forEach((cell) => {
            board.push(cell.getMark());
        }));
        return board;
    }

    return { mark, getState, getCurrentPlayer, getBoard, reset, toString };
})();

document.addEventListener("DOMContentLoaded", (event) => {
    // Object for displaying and manipulating the DOM
    const displayController = (function () {
        const _container = document.querySelector(".game-container");
        const _message = document.createElement("p");
        const _board = document.createElement("div");
        const _cells = [];
        const _resetButton = document.createElement("button");

        /**
         * Reset .cell element
         * @param {DOM Element} cell 
         */
        const _resetCell = (cell) => {
            cell.classList.remove("marked");
            cell.dataset.value = x;
            _container.dataset.state = "";
            _container.dataset.turn = x;
        }

        /**
         * Reset tic tac toe board
         */
        const reset = () => {
            _container.querySelectorAll(".cell").forEach((cell) => _resetCell(cell));
        }

        /**
         * Sets message above board based on game state: keep playing, win or draw.
         * @param {string} state "" | "✕" | "◯" | "draw"
         */
        const setMessage = (state) => {
            let message = "";
            switch (state) {
                case x:
                case o: message = "Winner: "; break;
                case "draw": message = "Draw"; break;
                case "":
                default: message = "Turn: ";
            }
            _message.textContent = message;
        }

        /**
         * Render a gamestate object to the DOM.
         * @param {Object} gamestate 
         */
        const render = (gamestate) => {
            // Set game state values
            _container.dataset.state = gamestate.getState();
            _container.dataset.turn = gamestate.getCurrentPlayer();

            // Set message
            setMessage(gamestate.getState());

            const board = gamestate.getBoard();

            // Render cell markings
            for (let i = 0; i < 9; i++) {
                if (board[i]) {
                    _cells[i].dataset.value = board[i];
                    _cells[i].classList.add("marked");
                }
            }
        }

        /**
         * Initialize values for game board based on gamestate.
         * @param {Object} gamestate 
         */
        const init = (gamestate) => {
            // Add message to game container
            _message.classList.add("message");
            _container.appendChild(_message);

            // Set game container values
            _container.dataset.state = "";
            _container.dataset.turn = x;

            // Create board div element
            _board.classList.add("board");

            // Create cell div elements
            for (let r = 0; r < 3; r++) {
                for (let c = 0; c < 3; c++) {
                    const cell = document.createElement("div");
                    cell.classList.add("cell");
                    cell.dataset.row = r;
                    cell.dataset.col = c;
                    cell.dataset.value = x;
                    cell.addEventListener("click", (e) => {
                        console.log(`Mark (${e.target.dataset.row}, ${e.target.dataset.col})`);
                        gamestate.mark(e.target.dataset.row, e.target.dataset.col);
                        render(gamestate);
                    });

                    // Add cell to board
                    _cells.push(cell);
                    _board.appendChild(cell);
                }
            }

            // Initialize reset game button
            _resetButton.setAttribute("type", "reset");
            _resetButton.classList.add("btn");
            _resetButton.classList.add("btn-reset");
            _resetButton.textContent = "Reset";
            _resetButton.addEventListener("click", (e) => {
                console.log("Reset Game");
                gamestate.reset();
                reset();
                render(gamestate);
            });

            // Add board and reset button to game container
            _container.appendChild(_board);
            _container.appendChild(_resetButton);
        }

        return { init, render, reset };
    })();

    // Initialize tic tac toe board DOM elements
    displayController.init(gamestate);
    displayController.render(gamestate);
});