/**
 * This file defines the class for a Chess Piece.
 *
 * @file Defines chess Piece.
 * @author Elena Wikoff
 */

import { getPieceSymbol, type Players, type Pieces } from "./chess.js";

/**
 * Represents a chess piece.
 */
class Piece {
  /** Color of piece: white or black */
  private color: Players;
  /** Type of piece: knight, rook, etc.*/
  private piece: Pieces;

  constructor(color: Players, piece: Pieces) {
    this.color = color;
    this.piece = piece;
  }

  /**
   * Get piece color.
   * @returns white | black
   */
  getColor() {
    return this.color;
  }

  /**
   * Get piece type.
   * @returns Piece
   */
  getPiece() {
    return this.piece;
  }

  /**
   * Get piece symbol (Chess notation).
   * @returns Letter
   */
  getSymbol() {
    return getPieceSymbol(this.piece);
  }

  /**
   * Get fancy output.
   * @returns "`[color]` `[piece]`"
   */
  toString() {
    const isWhite = (this.color = "white");
    switch (this.piece) {
      case "king":
        return isWhite ? "♔" : "♚";
      case "queen":
        return isWhite ? "♕" : "♛";
      case "rook":
        return isWhite ? "♖" : "♜";
      case "bishop":
        return isWhite ? "♗" : "♝";
      case "knight":
        return isWhite ? "♘" : "♞";
      case "pawn":
        return isWhite ? "♙" : "♟";
    }
  }
}

export default Piece;
