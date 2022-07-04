export class BoardController {
    constructor (model, view)
    {
        this.Model = model;
        this.View = view;

        this.Model.bindBoardChanged(this.onBoardChanged);
        this.Model.updateBoard();
        this.View.bindTileClick(this.onTileClick);
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