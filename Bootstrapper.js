import { BoardView } from "./Views/BoardView.js";
import { Board } from "./Models/Board.js";
import { BoardController } from "./Controllers/BoardController.js";

const board = new Board();
const boardView = new BoardView();

const boardController = new BoardController(board, boardView);
//board.resetBoard();