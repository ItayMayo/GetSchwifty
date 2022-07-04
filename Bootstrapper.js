import { BoardView } from "./Views/BoardView.js";
import { Board } from "./Models/Board.js";
import { BoardController } from "./Controllers/BoardController.js";
import { GameController } from "./libs/Processors/GameProcessor.js";
import { BasicWinStrategy } from "./libs/WinStrategies/BasicWinStrategy.js";

const board = new Board();
const boardView = new BoardView();
const winStrategy = new BasicWinStrategy();
const gameController = new GameController(winStrategy);

const boardController = new BoardController(board, boardView, gameController);
