import { Tile } from "./Tile.js";

export class Board {
    #_tileOperations;

    constructor(tileOperations, boardSize = 3) 
    {
        this.#_tileOperations = tileOperations;
        this.gameBoard = JSON.parse(localStorage.getItem('board')) || this.createSolvableBoard(boardSize);
        this.boardSize = Math.sqrt(this.gameBoard.length);
    }

    createSolvableBoard(boardSize) 
    {
        let isBoardSolvable = false;
        let gameBoard = undefined;

        while (!isBoardSolvable)
        {
            gameBoard = this.#createBoard(boardSize);
            isBoardSolvable = this.onBoardGenerated(gameBoard);
        }

        return gameBoard;
    }

    #createBoard(boardSize) 
    {
        const numberOfTiles = Math.pow(boardSize, 2);
        let gameBoard = [];
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
            gameBoard.push(tile);
            currentColumnIndex++;

            if (currentColumnIndex == boardSize) {
                currentRowIndex++;
                currentColumnIndex = 0;
            }
        }

        return gameBoard;

    }

    resetBoard()
    {
        this.gameBoard = this.createSolvableBoard(this.boardSize);
        this.updateBoard();
    }

    onTileClick(clickedTile) 
    {
        const neighbours = this.#_tileOperations.GetTileNeighbours(this.gameBoard, clickedTile.Row, clickedTile.Column);

        const isNearEmptyTile = neighbours.some((tile) => tile.Value === " ");

        if (isNearEmptyTile) {
            const emptyTile = neighbours.filter((tile) => tile.Value === " ")[0];
            this.#switchTiles(clickedTile, emptyTile);
            this.updateBoard();
        }
    }

    #switchTiles(tile1, tile2) 
    {
        const tile1_index = this.gameBoard.findIndex(tile => tile1.Value === tile.Value);
        const tile2_index = this.gameBoard.findIndex(tile => tile2.Value === tile.Value);
        this.#_tileOperations.switchTiles(tile1, tile2);
        this.gameBoard[tile1_index] = tile2;
        this.gameBoard[tile2_index] = tile1;
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
        this.onBoardChanged(this.gameBoard);
        const serializedBoard = JSON.stringify(this.gameBoard);
        localStorage.setItem('board', serializedBoard);
    }
}