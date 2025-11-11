/**
 * This file defines the class for a Chess Board.
 *
 * @file Defines Board.
 * @author Elena Wikoff
 */

import Square from "./square.js";
import { ranks, startingBoard, type Pieces, type Players } from "./chess.js";
import Piece from "./piece.js";

/**
 * Standard chess board start.
 * @returns Starting chess *Board*.
 */
function initBoard(): Square[][] {
  const board: Square[][] = [];
  for (let r = 0; r < 8; r++) {
    board[r] = [];
    for (let f = 0; f < 8; f++) {
      const pieceString = startingBoard[r]![f]!;
      const pieceInfo = pieceString.split(" ");
      const piece =
        pieceString === ""
          ? null
          : new Piece(pieceInfo[0] as Players, pieceInfo[1] as Pieces);
      const square = new Square(r, f, piece);
      board[r]![f] = square;
    }
  }
  return board;
}

/**
 * Chess Board
 */
class Board {
  /** Matrix representing a chess board. */
  private board: Square[][];

  /**
   * Creates a new chess *Board*. Setting to a standard chess start if no
   * `board` provided. Must also initialize moves for each *Square*.
   * @param board Board
   */
  constructor(board: Square[][] | null = null) {
    if (board) {
      this.board = board;
    } else {
      this.board = initBoard();
      // Add knight moves to squares.
      this.board.forEach((rank) => {
        rank.forEach((square) => {
          square.addMoves(this.board, "knight");
        });
      });
    }
  }

  /**
   * Returns the *Square* at the `rank` and `file` on the chess board.
   * @param {number} rank Horizontal Row
   * @param {number} file Vertical Column
   * @returns Square at `rank` and `file`.
   */
  getSquare(rank: number, file: number): Square {
    if (rank < 0 || rank > 7 || file < 0 || file > 7) {
      throw new Error(`Invalid rank (${rank}) or file (${file}).`);
    }
    return this.board[rank]![file]!;
  }

  /**
   * Move the piece at [`b[0]`,`b[1]`] to [`e[0]`,`e[1]`].
   * @param {number} b Start [Rank, File]
   * @param {number} e Destination [Rank, File]
   * @returns The *path* of the piece and how many *moves* taken.
   */
  travel(b: number[], e: number[]) {
    const startSquare = this.getSquare(b[0]!, b[1]!);
    if (startSquare.getPiece() === null) {
      throw new Error("This square does not have a piece.");
    }
    // Initialize queue.
    const queue: Square[] = [startSquare];

    // Initialize parent array to keep track of path.
    const parent: (Square | null)[][] = Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => null),
    );

    // Initialize distance array.
    const dist = Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () => Infinity),
    );
    dist[b[0]!]![b[1]!] = 0;

    let finished = false;
    while (queue.length > 0) {
      const square = queue.shift()!; // Dequeue from queue
      const rank = square.getRank();
      const file = square.getFile();
      // Get all possible moves for piece.
      const moves = square.getMoves(startSquare.getPiece()!.getPiece());
      // Add all non-visited squares to queue.
      moves.forEach((move) => {
        const r = move.getRank();
        const f = move.getFile();
        if (dist[r]![f] === Infinity) {
          parent[r]![f] = square; // Set previous square.
          dist[r]![f] = dist[rank]![file]! + 1; // Set current distance.
          if (r === e[0] && f === e[1]) {
            // Break if destination reached
            finished = true;
          }
          queue.push(move); // Add square to queue.
        }
      });
      if (finished) {
        break;
      }
    }

    // Get shortest path to destination.
    const path = [];
    const distance = dist[e[0]!]![e[1]!]!;
    let curr = this.board[e[0]!]![e[1]!]!;
    path.push(this.board[e[0]!]![e[1]!]!);
    while (curr !== null) {
      path.push(curr);
      const square = parent[curr.getRank()]![curr.getFile()]!;
      curr = square;
    }

    // Return moves taken and number of moves.
    return {
      path: path.reverse(),
      moves: distance,
    };
  }

  /**
   * Returns the chess piece at the `rank` and `file` on the chess board.
   * @param {number} rank Horizontal Row
   * @param {number} file Vertical Column
   * @returns Piece at `rank` and `file`.
   */
  getPiece(rank: number, file: number): string {
    return this.board[rank]![file]!.getChessNotation();
  }

  /**
   * Returns a string representation of the chess board.
   * @returns Chess Board string
   */
  toString() {
    let output = "   ╔══╦══╦══╦══╦══╦══╦══╦══╗\n";
    for (let r = 0; r < 8; r++) {
      output += `${r}-${ranks[r]}║`;
      for (let f = 0; f < 8; f++) {
        output += `${this.board[r]![f]!} ║`;
      }
      output += "\n";
      output += r < 7 ? "   ╠══╬══╬══╬══╬══╬══╬══╬══╣\n" : "";
    }
    output += "   ╚══╩══╩══╩══╩══╩══╩══╩══╝\n";
    output += "    0  1  2  3  4  5  6  7 \n";
    output += "    a  b  c  d  e  f  g  h\n";
    return output;
  }
}

export default Board;
