import { BoardView } from "./Views/BoardView.js";
import { Board } from "./Models/Board.js";
import { BoardController } from "./Controllers/BoardController.js";
import { GameController } from "./libs/Processors/GameProcessor.js";
import { BasicWinStrategy } from "./libs/WinStrategies/BasicWinStrategy.js";
import { ElementOperations } from "./libs/ElementsOperations/ElementOperations.js";
import { TileOperations } from "./libs/TilesOperations/TileOperations.js";
import { LoginController } from "./Controllers/LoginController.js";
import { LoginView } from "./Views/LoginView.js";
import { User } from "./Models/User.js";
import { TableController } from "./Controllers/TableController.js";
import { TableView } from "./Views/TableView.js";
import { LatestFiveTable } from "./Models/LatestFiveTable.js";

export class Initiator 
{
    #_elementOperations;
    #_tableController;
    #_user;
    
    constructor()
    {
        this.#_elementOperations = new ElementOperations();
        this.#_user = new User();
        const tableView = new TableView(this.#_elementOperations);
        const tableModel = new LatestFiveTable();
        this.#_tableController = new TableController(tableView, tableModel, this.#_user);
    }

    initiate()
    {
        const loginView = new LoginView(this.#_elementOperations);
        const loginController = new LoginController(loginView, this.#_user, this.onLogin);
    }

    onLogin = (boardSize = undefined) => 
    {
        const tileOperations = new TileOperations();
        const board = new Board(tileOperations, boardSize);
        const boardView = new BoardView(this.#_elementOperations, this.#_user);
        const winStrategy = new BasicWinStrategy();
        const gameController = new GameController(winStrategy);
        const boardController = new BoardController(board, boardView, gameController, this.#_tableController.onGameOver);
    }
}




