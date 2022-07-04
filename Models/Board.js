import { Tile } from "./Tile.js";

export class Board {
    constructor(boardSize = 3) 
    {
        this.board = JSON.parse(localStorage.getItem('board')) || this.createBoard(boardSize);
        this.boardSize = boardSize;
    }

    createBoard(boardSize) 
    {
        let board = [];
        let usedNumbers = [];

        for (let row = 0; row < boardSize; row++)
        {
            board[row] = [];
            
            for(let column = 0; column < boardSize; column++) 
            {
                let randomNumber = this.#GenerateRandomUniqueNumber(usedNumbers, boardSize);
                usedNumbers.push(randomNumber);
                
                if (randomNumber == boardSize) {
                    randomNumber = " "
                }
                
                let tile = new Tile(randomNumber,row, column,  () => this.onTileClick(tile));
                board[row].push(tile);
            }  
        }

        return board;
    }

    resetBoard()
    {
        this.board = this.createBoard(this.boardSize);
        this.updateBoard();
    }

    onTileClick(clickedTile) 
    {
        const neighbours = this.#GetTileNeighbours(clickedTile.Row, clickedTile.Column);

        const isNearEmptyTile = neighbours.some((tile) => tile.Value === " ");

        if (isNearEmptyTile) {
            const emptyTile = neighbours.filter((tile) => tile.Value === " ")[0];
            this.#switchTiles(clickedTile, emptyTile);
            this.updateBoard();
        }
    }

    #switchTiles(tile1, tile2) 
    {
        const tile1_row = tile1.Row;
        const tile1_column = tile1.Column;
        const tile2_row = tile2.Row;
        const tile2_column = tile2.Column;
        tile1.Row = tile2_row;
        tile1.Column = tile2_column;
        tile2.Row = tile1_row;
        tile2.Column = tile1_column;
        this.board[tile1.Row][tile1.Column] = tile1;
        this.board[tile2.Row][tile2.Column] = tile2;
    }

    #GenerateRandomUniqueNumber(numbersBlacklist, max) 
    {
        max *= max;
        let doesExist = true;
        let randomNumber = undefined;
        
        while (doesExist)
        {
            randomNumber = Math.floor(Math.random() * max) + 1;
            
            doesExist = numbersBlacklist.some((number) => {
                return number == randomNumber;
            });
        }

        return randomNumber;
    }

    #GetTileNeighbours(row, column)
    {
        let neighbours = [];

        if (row < this.boardSize - 1) {
            let tile = this.board[row + 1][column];
            neighbours.push(tile);
        }

        if (row > 0) 
        {
            let tile = this.board[row - 1][column];
            neighbours.push(tile);
        }
        
        if (column < this.boardSize - 1)
        {
            let tile = this.board[row][column + 1];
            neighbours.push(tile);
        }

        if (column > 0) 
        {
            let tile = this.board[row][column - 1];
            neighbours.push(tile);
        }

        return neighbours;
    }

    bindBoardChanged(callback) 
    {
        this.onBoardChanged = callback;
    }

    updateBoard()
    {
        this.onBoardChanged(this.board);
        const serializedBoard = JSON.stringify(this.board);
        localStorage.setItem('board', serializedBoard);
    }
}