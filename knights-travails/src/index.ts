import Board from "./chessboard.js";

const board = new Board();

console.log("Create Board");
console.log(String(board));

const start = [0, 1];
const end = [6, 4];
const startPiece = board.getPiece(start[0]!, start[1]!);
const endPiece = board.getPiece(end[0]!, end[1]!);
console.log(
  `Get ${startPiece} [${start[0]!},${start[1]!}] to ${endPiece} [${end[0]!},${end[1]!}]`,
);
const { path, moves } = board.travel(start, end);

console.log(`You made it in ${moves} moves! Here is your path:`);
let prev = path[0]!;
path.forEach((move) => {
  if (prev !== move) {
    const prevSquare = prev.getChessNotation();
    const moveSquare = move.getChessNotation();
    const seperator = !move.getPiece() ? "to" : "takes";
    console.log(`${prevSquare} ${seperator} ${moveSquare}.`);
    prev.move(move);
  }
  prev = move;
});

console.log(String(board));
