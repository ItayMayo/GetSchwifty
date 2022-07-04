import { Tile } from "./Tile.js";

export class Board {
    constructor(boardSize = 3) 
    {
        this.board = JSON.parse(localStorage.getItem('board')) || this.createSolvableBoard(boardSize);
        this.boardSize = boardSize;
    }

    createSolvableBoard(boardSize) 
    {
        let isBoardSolvable = false;
        let board = undefined;

        while (!isBoardSolvable)
        {
            board = this.#createBoard(boardSize);
            isBoardSolvable = this.onBoardGenerated(board);
        }

        return board;
    }

    #createBoard(boardSize) 
    {
        const numberOfTiles = Math.pow(boardSize, 2);
        let board = [];
        let usedNumbers = [];
        let currentRowIndex = 0;
        let currentColumnIndex = 0;

        for (let index = 0; index < numberOfTiles; index++)
        {
            let randomNumber = this.#GenerateRandomUniqueNumber(usedNumbers, numberOfTiles);
            usedNumbers.push(randomNumber);
               
            if (randomNumber == numberOfTiles) {
                randomNumber = " "
            }
                
            let tile = new Tile(randomNumber,currentRowIndex, currentColumnIndex,  () => this.onTileClick(tile));
            board.push(tile);
            currentColumnIndex++;

            if (currentColumnIndex == boardSize) {
                currentRowIndex++;
                currentColumnIndex = 0;
            }
        }

        return board;

    }

    resetBoard()
    {
        this.board = this.createSolvableBoard(this.boardSize);
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
        const tile1_index = this.board.findIndex(tile => tile1.Value === tile.Value);
        const tile2_index = this.board.findIndex(tile => tile2.Value === tile.Value);
        tile1.Row = tile2_row;
        tile1.Column = tile2_column;
        tile2.Row = tile1_row;
        tile2.Column = tile1_column;
        this.board[tile1_index] = tile2;
        this.board[tile2_index] = tile1;
    }

    #GenerateRandomUniqueNumber(numbersBlacklist, numberOfTiles) 
    {
        let doesExist = true;
        let randomNumber = undefined;
        
        while (doesExist)
        {
            randomNumber = Math.floor(Math.random() * numberOfTiles) + 1;
            
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
            let tile = this.board.filter(tile => tile.Row === row + 1 && tile.Column === column)[0];
            neighbours.push(tile);
        }

        if (row > 0) 
        {
            let tile = this.board.filter(tile => tile.Row === row - 1 && tile.Column === column)[0];
            neighbours.push(tile);
        }
        
        if (column < this.boardSize - 1)
        {
            let tile = this.board.filter(tile => tile.Row === row&& tile.Column === column + 1)[0];
            neighbours.push(tile);
        }

        if (column > 0) 
        {
            let tile = this.board.filter(tile => tile.Row === row && tile.Column === column - 1)[0];
            neighbours.push(tile);
        }

        return neighbours;
    }

    bindBoardChanged(callback) 
    {
        this.onBoardChanged = callback;
    }

    bindOnBoardGenerated(callback)
    {
        this.onBoardGenerated = callback;
    }

    updateBoard()
    {
        this.onBoardChanged(this.board);
        const serializedBoard = JSON.stringify(this.board);
        localStorage.setItem('board', serializedBoard);
    }
}