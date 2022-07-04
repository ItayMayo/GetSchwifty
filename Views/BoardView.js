export class BoardView {
    #_elementOperations;
    #_rootElement;
    #_boardContainer;
    #_gameOverTitle;
    #_clickHandler;
    #_onResetButtonClick;
    #_onChangeUserButtonClick;
    #_user;

    constructor(elementOperations, user)
    {
        this.#_user = user;
        this.#_elementOperations = elementOperations;
        this.#_rootElement = this.#_elementOperations.getElement("#main");
        this.clearRoot();
        this.#_boardContainer = this.#_elementOperations.createElement("div", "boardContainer");
        this.#_clickHandler = undefined;
        const gameTitle = this.#_elementOperations.createElement("h1");
        gameTitle.textContent = "GetSchwifty"
        this.#_rootElement.append(gameTitle, this.#_boardContainer);
        this.#_gameOverTitle = this.#_elementOperations.createElement("h2");
        this.#_gameOverTitle.textContent = ""
        this.#_rootElement.append(this.#_gameOverTitle);
        this.displayUserInfo();
        this.displayResetBoardButton();
        this.displayChangeUserButton();
    }

    clearRoot()
    {
        while (this.#_rootElement.firstChild)
        {
            const firstChild = this.#_rootElement.firstChild;
            this.#_rootElement.removeChild(firstChild);
        }
    }

    displayUserInfo()
    {
        const userInfoContainer = this.#_elementOperations.createElement("div", "user-info-container");
        const userInfoLabel = this.#_elementOperations.createElement("h4", "user-info-text");
        userInfoLabel.textContent = `Name: ${this.#_user.Name} Rank: ${this.#_user.Rank}`;
        userInfoContainer.append(userInfoLabel);
        this.#_rootElement.append(userInfoContainer);
    }

    displayResetBoardButton()
    {
        const resetBoardButton = this.#_elementOperations.createElement("button", "reset-button");
        resetBoardButton.textContent = "Reset Board";
        resetBoardButton.addEventListener("click", () => this.#_onResetButtonClick());
        this.#_rootElement.append(resetBoardButton);
    }

    displayChangeUserButton() 
    {
        const changeUserButton = this.#_elementOperations.createElement("button", "change-user-button");
        changeUserButton.textContent = "Change User";
        changeUserButton.addEventListener("click", () => this.#_onChangeUserButtonClick());
        this.#_rootElement.append(changeUserButton);
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

    bindResetButtonClick(handler)
    {
        this.#_onResetButtonClick = handler;
    }

    bindChangeUserButtonClick(handler)
    {
        this.#_onChangeUserButtonClick = handler;
    }

    onGameOver()
    {
        this.#_gameOverTitle.textContent = "Game Over"
    }
}