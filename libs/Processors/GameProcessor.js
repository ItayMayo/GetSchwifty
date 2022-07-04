export class GameController 
{
    #_winStrategy;

    constructor(winStrategy)
    {
        this.#_winStrategy = winStrategy;
    }

    isGameOver(gameBoard) 
    {
        const isOver = this.#_winStrategy.didPlayerWin(gameBoard); 

        return isOver;
    }

    isBoardSolvable(gameBoard) 
    {
        let numberOfHops = 0;
        const rowLength = Math.sqrt(gameBoard.length);

        if (rowLength % 2 == 0)
        {
            numberOfHops = this.#getNumberOfHops(gameBoard);
            numberOfHops = this.#addEmptyRowNumberToHops(gameBoard, numberOfHops);
        }
        else
        {
            numberOfHops = this.#getNumberOfHops(gameBoard);
        }

        const isSolvable = numberOfHops % 2 == 0;

        return isSolvable;
    }

    #addEmptyRowNumberToHops(gameBoard, numberOfHops)
    {
        const emptyTile = gameBoard.filter(tile => tile.Value == " ")[0];
        const emptyTileRow = emptyTile.Row;
        numberOfHops += emptyTileRow + 1;

        return numberOfHops;
    }

    #getNumberOfHops(gameBoard)
    {
        let numberOfHops = 0;

        for (let index = 0; index < gameBoard.length; index++) 
        {
            const currentMaxValue = gameBoard[index].Value;
            
            for (let iterator = index + 1; iterator < gameBoard.length && currentMaxValue != " "; iterator++)
            {
                const valueAtIndex = gameBoard[iterator].Value;

                if (valueAtIndex != " " && currentMaxValue > valueAtIndex) 
                {
                    numberOfHops++;
                }
            }
        }

        return numberOfHops;
    }
}