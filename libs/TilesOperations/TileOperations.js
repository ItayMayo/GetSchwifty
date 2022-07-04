export class TileOperations 
{
    switchTiles(tile1, tile2)
    {
        const tile1_row = tile1.Row;
        const tile1_column = tile1.Column;
        const tile2_row = tile2.Row;
        const tile2_column = tile2.Column;
        tile1.Row = tile2_row;
        tile1.Column = tile2_column;
        tile2.Row = tile1_row;
        tile2.Column = tile1_column;
    }

    GetTileNeighbours(gameBoard, row, column)
    {
        let neighbours = [];
        const boardSize = Math.sqrt(gameBoard.length);

        if (row < boardSize - 1) {
            let tile = gameBoard.filter(tile => tile.Row === row + 1 && tile.Column === column)[0];
            neighbours.push(tile);
        }

        if (row > 0) 
        {
            let tile = gameBoard.filter(tile => tile.Row === row - 1 && tile.Column === column)[0];
            neighbours.push(tile);
        }
        
        if (column < boardSize - 1)
        {
            let tile = gameBoard.filter(tile => tile.Row === row&& tile.Column === column + 1)[0];
            neighbours.push(tile);
        }

        if (column > 0) 
        {
            let tile = gameBoard.filter(tile => tile.Row === row && tile.Column === column - 1)[0];
            neighbours.push(tile);
        }

        return neighbours;
    }
}