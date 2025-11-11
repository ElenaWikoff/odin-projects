/**
 * The file contains contants pertaining to Chess.
 *
 * @file Defines Chess information.
 * @author Elena Wikoff
 */

export type Players = "white" | "black";
export type Pieces = "pawn" | "king" | "queen" | "knight" | "rook" | "bishop";

export const pieces = ["pawn", "king", "queen", "knight", "rook", "bishop"];
export const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
export const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const getPieceSymbol = (piece: string): string => {
  const pieceLowerCase = piece.toLowerCase();
  switch (pieceLowerCase) {
    case "pawn":
      return "P";
    case "king":
      return "K";
    case "queen":
      return "Q";
    case "knight":
      return "N";
    case "rook":
      return "R";
    case "bishop":
      return "B";
    default:
      throw new Error(`Not valid chess piece: ${piece}`);
  }
};

export const startingBoard: string[][] = [
  [
    "black rook",
    "black knight",
    "black bishop",
    "black queen",
    "black king",
    "black bishop",
    "black knight",
    "black rook",
  ],
  [
    "black pawn",
    "black pawn",
    "black pawn",
    "black pawn",
    "black pawn",
    "black pawn",
    "black pawn",
    "black pawn",
  ],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  [
    "white pawn",
    "white pawn",
    "white pawn",
    "white pawn",
    "white pawn",
    "white pawn",
    "white pawn",
    "white pawn",
  ],
  [
    "white rook",
    "white knight",
    "white bishop",
    "white queen",
    "white king",
    "white bishop",
    "white knight",
    "white rook",
  ],
];
