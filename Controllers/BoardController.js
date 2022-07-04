export class BoardController {
    #_gameController;
    #_gameOverHandler;

    constructor (model, view, gameController, onGameOver)
    {
        this.Model = model;
        this.View = view;
        this.#_gameController = gameController;
        this.#_gameOverHandler = onGameOver;
        this.Model.bindBoardChanged(this.onBoardChanged);
        this.Model.bindOnBoardGenerated(this.onBoardGenerated);
        this.Model.updateBoard();
        this.Model.checkRegeneration();
        this.View.bindChangeUserButtonClick(this.onChangeUserButtonClicked);
        this.View.bindTileClick(this.onTileClick);
        this.View.bindResetButtonClick(this.onResetButtonClicked);
    }

    onChangeUserButtonClicked = () =>
    {
        localStorage.removeItem("user");
        this.Model.resetBoard();
        location.reload();
    }

    onResetButtonClicked = () =>
    {
        this.Model.resetBoard();
    }

    onBoardGenerated = gameBoard =>
    {
        const isSolvable = this.#_gameController.isBoardSolvable(gameBoard);

        return isSolvable;
    }

    onBoardChanged = gameBoard => 
    {
        this.View.displayBoard(gameBoard);
        const isGameOver = this.#_gameController.isGameOver(gameBoard);

        if (isGameOver)
        {
            this.onGameOver();
        }
    }

    onGameOver = () =>
    {
        this.View.onGameOver();
        this.#_gameOverHandler(this.Model.BoardCreationDate);
        this.Model.resetBoard();
    }

    onTileClick = clickedTile => 
    {
        this.Model.onTileClick(clickedTile);
    }
}