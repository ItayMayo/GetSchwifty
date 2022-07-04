import { BoardView } from "./Views/BoardView.js";
import { Board } from "./Models/Board.js";
import { BoardController } from "./Controllers/BoardController.js";
import { GameController } from "./Processors/GameProcessor.js";

const board = new Board();
const boardView = new BoardView();
const gameController = new GameController();

const boardController = new BoardController(board, boardView, gameController);
