export class BoardController {
    #_gameController;

    constructor (model, view, gameController)
    {
        this.Model = model;
        this.View = view;
        this.#_gameController = gameController;
        this.Model.bindBoardChanged(this.onBoardChanged);
        this.Model.bindOnBoardGenerated(this.onBoardGenerated);
        this.Model.updateBoard();
        this.View.bindTileClick(this.onTileClick);
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
    }

    onTileClick = clickedTile => 
    {
        this.Model.onTileClick(clickedTile);
    }
}