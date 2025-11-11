/**
 * This file defines the class for a chess square.
 *
 * @file Defines chess Square.
 * @author Elena Wikoff
 */

import { ranks, files } from "./chess.js";
import type Piece from "./piece.js";

/**
 * Square on a chess board. Includes moves a knight can make from that square.
 */
class Square {
  /** Horizontal Row. */
  private rank: number;
  /** Vertical Column. */
  private file: number;
  /** Chess piece on Square. */
  private piece: Piece | null;
  /** Moves a knight can make from this square. */
  private knightMoves: Square[];

  /**
   * Creates a new *Square* on a chess board.
   * @param {number} rank Horizontal Row.
   * @param {number} file Vertical Column.
   */
  constructor(rank: number, file: number, piece: Piece | null = null) {
    this.rank = rank;
    this.file = file;
    this.piece = piece;
    this.knightMoves = [];
  }

  /**
   * Returns the rank of the square.
   * @returns Rank
   */
  getRank(): number {
    return this.rank;
  }

  /**
   * Returns the actual rank of a square (1-8).
   * @returns Rank
   */
  getActualRank(): number {
    return ranks[this.rank]!;
  }

  /**
   * Returns the file of the square.
   * @returns File
   */
  getFile(): number {
    return this.file;
  }

  /**
   * Returns the actual file of a square (a-h).
   * @returns File
   */
  getActualFile(): string {
    return files[this.file]!;
  }

  /**
   * Returns the chess notation of square.
   * @returns "[piece symbol][file][rank]"
   */
  getChessNotation(): string {
    let output = this.piece === null ? "" : this.piece!.getSymbol();
    output += this.getActualFile();
    output += this.getActualRank();
    return output;
  }

  /**
   * Returns the piece on square.
   * @returns Piece or empty string if empty.
   */
  getPiece(): Piece | null {
    return this.piece;
  }

  /**
   * Returns an array of possible moves `piece` on Square has.
   * @returns Array of Squares.
   */
  getMoves(piece: string = ""): Square[] {
    if (piece.length === 0) {
      return [];
    } else if (piece === "knight") {
      return this.knightMoves;
    }
    return [];
  }

  /**
   * Check if possible *Square* is inbounds of chess board (8x8).
   * @param {number} rank Horizontal Row.
   * @param {number} file Vertical Column.
   * @returns True if in bounds, false otherwise.
   */
  private validSquare(rank: number, file: number) {
    return rank >= 0 && rank <= 7 && file >= 0 && file <= 7;
  }

  /**
   * Add all possible knight moves to `moves`.
   * @param {Square[][]} squares Matrix of Squares on chess board.
   */
  private addKnightMoves(squares: Square[][]) {
    const LEFT_TWO = this.file - 2;
    const UP_ONE = this.rank + 1;
    const LEFT_ONE = this.file - 1;
    const UP_TWO = this.rank + 2;
    const DOWN_ONE = this.rank - 1;
    const DOWN_TWO = this.rank - 2;
    const RIGHT_ONE = this.file + 1;
    const RIGHT_TWO = this.file + 2;

    if (this.validSquare(LEFT_TWO, UP_ONE)) {
      this.knightMoves.push(squares[LEFT_TWO]![UP_ONE]!);
    }

    if (this.validSquare(LEFT_ONE, UP_TWO)) {
      this.knightMoves.push(squares[LEFT_ONE]![UP_TWO]!);
    }

    if (this.validSquare(LEFT_TWO, DOWN_ONE)) {
      this.knightMoves.push(squares[LEFT_TWO]![DOWN_ONE]!);
    }

    if (this.validSquare(LEFT_ONE, DOWN_TWO)) {
      this.knightMoves.push(squares[LEFT_ONE]![DOWN_TWO]!);
    }

    if (this.validSquare(RIGHT_TWO, UP_ONE)) {
      this.knightMoves.push(squares[RIGHT_TWO]![UP_ONE]!);
    }

    if (this.validSquare(RIGHT_ONE, UP_TWO)) {
      this.knightMoves.push(squares[RIGHT_ONE]![UP_TWO]!);
    }

    if (this.validSquare(RIGHT_TWO, DOWN_ONE)) {
      this.knightMoves.push(squares[RIGHT_TWO]![DOWN_ONE]!);
    }

    if (this.validSquare(RIGHT_ONE, DOWN_TWO)) {
      this.knightMoves.push(squares[RIGHT_ONE]![DOWN_TWO]!);
    }
  }

  /**
   * Adds all possible moves for `piece` type.
   * @param {Square[][]} squares Matrix of Squares arranged in [`rank`, `file`].
   * @param {string} piece Piece type: "knight", "rook", etc.
   */
  addMoves(squares: Square[][], piece: string) {
    if (piece === "knight" && this.knightMoves.length === 0) {
      this.addKnightMoves(squares);
    }
  }

  /**
   * Set piece on this *Square* to `piece`.
   * @param {Piece} piece Chess Piece
   */
  setPiece(piece: Piece | null) {
    this.piece = piece;
  }

  /**
   * Move the piece on this **Square** to the `dest` **Square**.
   * @param {Square} dest Destination Square
   */
  move(dest: Square) {
    const temp = this.getPiece();
    this.piece = null;
    dest.setPiece(temp);
  }

  /**
   * String representation (chess notation).
   * @returns Chess Notation
   */
  toString(): string {
    return `${this.piece ? this.piece : " "}`;
  }
}

export default Square;
