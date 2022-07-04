export class BoardView {
    #_elementOperations;
    #_rootElement;
    #_boardContainer;
    #_gameOverTitle;
    #_clickHandler;

    constructor(elementOperations)
    {
        this.#_elementOperations = elementOperations;
        this.#_rootElement = this.#_elementOperations.getElement("#root");
        this.#_boardContainer = this.#_elementOperations.createElement("div", "boardContainer");
        this.#_clickHandler = undefined;
        const gameTitle = this.#_elementOperations.createElement("h1");
        gameTitle.textContent = "GetSchwifty"
        this.#_rootElement.append(gameTitle, this.#_boardContainer);
        this.#_gameOverTitle = this.#_elementOperations.createElement("h2");
        this.#_gameOverTitle.textContent = ""
        this.#_rootElement.append(this.#_gameOverTitle);
    }

    displayBoard(gameBoard) 
    {
        while (this.#_boardContainer.firstChild)
        {
            const firstChild = this.#_boardContainer.firstChild;
            this.#_boardContainer.removeChild(firstChild);
        }

        this.#_gameOverTitle.textContent = ""
        const rowLength = Math.sqrt(gameBoard.length); 
        this.#_boardContainer.style.gridTemplateColumns = `repeat(${rowLength}, 1fr)`;

        gameBoard.forEach(currentTile => 
        {
                let tileButton = this.#_elementOperations.createElement("button", "tile-button");
                tileButton.textContent = currentTile.Value;
                tileButton.addEventListener("click", () => this.#_clickHandler(currentTile));
                this.#_boardContainer.append(tileButton);
        });
    }

    bindTileClick(handler)
    {
        this.#_clickHandler = handler;
    }

    onGameOver()
    {
        this.#_gameOverTitle.textContent = "Game Over"
    }
}