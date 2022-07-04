export class LoginView 
{
    #_elementOperations;
    #_rootElement;
    #_formContainer;
    #_form;
    #_rankField;
    #_nameField;
    #_boardSizeField;
    #_startButton;
    #_errorMessage;

    constructor(elementOperations)
    {
        this.#_elementOperations = elementOperations;
        this.#_rootElement = this.#_elementOperations.getElement("#main");
        const title = this.#_elementOperations.createElement("h1");
        title.textContent = "GetSchwifty"
        this.#_formContainer = this.#_elementOperations.createElement("div", "formContainer");
        this.#_form = this.#_elementOperations.createElement("form", "loginForm");
        this.#_errorMessage = this.#_elementOperations.createElement("h4");
        this.#_formContainer.append(this.#_form);
        this.#_rootElement.append(title, this.#_formContainer, this.#_errorMessage);
        this.createForm();
    }

    createForm()
    {
        this.#_rankField = this.#createInput("Rank");
        this.#_nameField = this.#createInput("Name");
        this.#_boardSizeField = this.#createInput("Board Size", "number");
        this.#_startButton = this.#_elementOperations.createElement("button", "start-button");
        this.#_startButton.textContent = "Start";
        this.#_startButton.addEventListener("click", () => this.onStartButtonClick());
        this.#_formContainer.append(this.#_startButton);
    }

    #createInput(title, type = "text")
    {
        const inputTitle = this.#_elementOperations.createElement("label", "input-title");
        inputTitle.textContent = `${title}:`
        const inputField = this.#_elementOperations.createElement("input", "login-input");
        inputField.type = type;
        this.#_formContainer.append(inputTitle, inputField);

        return inputField;
    }

    onStartButtonClick()
    {
        this.#_errorMessage.textContent = "";
        const rankValue = this.#_rankField.value;
        const nameValue = this.#_nameField.value;
        const boardSizeValue = this.#_boardSizeField.value;

        if (!rankValue || !nameValue || !boardSizeValue)
        {
            this.#_errorMessage.textContent = "Fields must not be empty."

            return;
        }

        this.onLogin(rankValue, nameValue, boardSizeValue);
    }

    bindOnLogin(callback)
    {
        this.onLogin = callback;
    }
}