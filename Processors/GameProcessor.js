export class GameController 
{
    isBoardSolvable(board) 
    {
        let numberOfHops = 0;
        const rowLength = Math.sqrt(board.length);

        if (rowLength % 2 == 0)
        {
            numberOfHops = this.#getNumberOfHops(board);
            numberOfHops = this.#addEmptyRowNumberToHops(board, numberOfHops);
        }
        else
        {
            numberOfHops = this.#getNumberOfHops(board);
        }

        const isSolvable = numberOfHops % 2 == 0;

        return isSolvable;
    }

    #addEmptyRowNumberToHops(board, numberOfHops)
    {
        const emptyTile = board.filter(tile => tile.Value == " ")[0];
        const emptyTileRow = emptyTile.Row;
        numberOfHops += emptyTileRow + 1;

        return numberOfHops;
    }

    #getNumberOfHops(board)
    {
        let numberOfHops = 0;

        for (let index = 0; index < board.length; index++) 
        {
            const currentMaxValue = board[index].Value;
            
            for (let iterator = index + 1; iterator < board.length && currentMaxValue != " "; iterator++)
            {
                const valueAtIndex = board[iterator].Value;

                if (valueAtIndex != " " && currentMaxValue > valueAtIndex) 
                {
                    numberOfHops++;
                }
            }
        }

        return numberOfHops;
    }
}