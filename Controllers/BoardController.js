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

    onBoardGenerated = board =>
    {
        const isSolvable = this.#_gameController.isBoardSolvable(board);

        return isSolvable;
    }

    onBoardChanged = board => 
    {
        this.View.displayBoard(board);
    }

    onTileClick = tile => 
    {
        this.Model.onTileClick(tile);
    }
}