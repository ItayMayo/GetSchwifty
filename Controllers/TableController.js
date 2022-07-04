import { TableEntry } from "../Models/TableEntry.js";

export class TableController
{
    #_user;

    constructor(view, model, user)
    {
        this.View = view;
        this.Model = model;
        this.#_user = user;
        this.Model.bindOnTableChange(this.onTableChanged);
        this.Model.updateTable();
    }

    onTableChanged = latestFiveTable =>
    {
        this.View.displayTable(latestFiveTable);
    }

    onGameOver = (startingDate) =>
    {
        const playerName = this.#_user.Name;
        const playerRank = this.#_user.Rank;
        const boardSize = this.#_user.BoardSize;
        const gameLength = `${this.#calculateGameLength(startingDate)} minutes`;
        const formattedStartingDate = startingDate.toISOString().substring(0, 10);
        const tableEntry = new TableEntry(playerName, playerRank, gameLength, boardSize, formattedStartingDate);
        this.Model.addEntry(tableEntry);
    }

    #calculateGameLength(startingDate)
    {
        const endDate = new Date();
        const differenceInMilliseconds = endDate - startingDate;
        const differenceInMinutes = Math.round(((differenceInMilliseconds % 86400000) % 3600000) / 60000);

        return differenceInMinutes;
    }
}