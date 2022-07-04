export class LoginController
{
    #_onLogin;

    constructor(view, model, onLogin)
    {
        this.View = view;
        this.Model = model;
        this.#_onLogin = onLogin;
        this.View.bindOnLogin(this.onLogin);
        this.onStart();
    }

    onStart()
    {
        if (this.Model.getUserFromDatabase())
        {
            this.#_onLogin();
        }
    }

    onLogin = (rank, name, boardSize) =>
    {
        this.Model.createUser(rank, name, boardSize);
        this.#_onLogin(boardSize);
    }
}