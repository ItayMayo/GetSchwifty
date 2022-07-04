import {ElementOperations} from "../Core/ElementsOperations/ElementOperations.js"

export class BoardView {
    #_elementOperations;
    #_rootElement;
    #_boardContainer;
    #_clickHandler;

    constructor() 
    {
        this.#_elementOperations = new ElementOperations();
        this.#_rootElement = this.#_elementOperations.getElement("#root");
        this.#_boardContainer = this.#_elementOperations.createElement("div", "boardContainer");
        this.#_clickHandler = undefined;
        const title = this.#_elementOperations.createElement("h1");
        title.textContent = "GetSchwifty"
        this.#_rootElement.append(title, this.#_boardContainer);
    }

    displayBoard(board) 
    {
        while (this.#_boardContainer.firstChild)
        {
            const firstChild = this.#_boardContainer.firstChild;
            this.#_boardContainer.removeChild(firstChild);
        }

        const rowLength = Math.sqrt(board.length); 
        this.#_boardContainer.style.gridTemplateColumns = `repeat(${rowLength}, 1fr)`;

        board.forEach(tile => 
        {
                let tileButton = this.#_elementOperations.createElement("button", "tile-button");
                tileButton.textContent = tile.Value;
                tileButton.addEventListener("click", () => this.#_clickHandler(tile));
                this.#_boardContainer.append(tileButton);
        });
    }

    bindTileClick(handler)
    {
        this.#_clickHandler = handler;
    }
}