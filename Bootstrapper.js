import { BoardView } from "./Views/BoardView.js";
import { Board } from "./Models/Board.js";
import { BoardController } from "./Controllers/BoardController.js";
import { GameController } from "./libs/Processors/GameProcessor.js";
import { BasicWinStrategy } from "./libs/WinStrategies/BasicWinStrategy.js";
import { ElementOperations } from "./libs/ElementsOperations/ElementOperations.js";
import { TileOperations } from "./libs/TilesOperations/TileOperations.js";

const tileOperations = new TileOperations();
const board = new Board(tileOperations);
const elementOperations = new ElementOperations();
const boardView = new BoardView(elementOperations);
const winStrategy = new BasicWinStrategy();
const gameController = new GameController(winStrategy);

const boardController = new BoardController(board, boardView, gameController);
