export class TableView
{
    #_elementOperations;
    #_rootElement;

    constructor(elementOperations)
    {
        this.#_elementOperations = elementOperations;
        this.#_rootElement = this.#_elementOperations.getElement("#table").getElementsByTagName("tbody")[0];
    }

    displayTable(table)
    {
        while (this.#_rootElement.lastChild.id != "tableHeadings")
        {
            const lastChild = this.#_rootElement.lastChild;
            this.#_rootElement.removeChild(lastChild);
        }

        table.forEach(tableEntry => 
        {
            const tableRow = this.#_elementOperations.createElement("tr", "table-row");
            const nameEntry = this.#createTableEntry(tableEntry.Name);
            const rankEntry = this.#createTableEntry(tableEntry.Rank);
            const gameLengthEntry = this.#createTableEntry(tableEntry.GameLength);
            const boardSizeEntry = this.#createTableEntry(tableEntry.BoardSize);
            const startingDateEntry = this.#createTableEntry(tableEntry.StartingDate);
            tableRow.append(nameEntry, rankEntry, gameLengthEntry, boardSizeEntry, startingDateEntry);
            this.#_rootElement.append(tableRow);
        });
    }

    #createTableEntry(value)
    {
        const tableEntry = this.#_elementOperations.createElement("td", "table-entry");
        tableEntry.textContent = value;

        return tableEntry;
    }
}