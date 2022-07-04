export class LatestFiveTable
{
    #MAX_TABLE_SIZE;
    constructor()
    {
        this.#MAX_TABLE_SIZE = 5;
        this.latestFiveTable = JSON.parse(localStorage.getItem('latest_five_list')) || [];
    }

    addEntry(tableEntry)
    {
        this.latestFiveTable.push(tableEntry);

        if (this.latestFiveTable.length > this.#MAX_TABLE_SIZE)
        {
            this.latestFiveTable.shift();
        }

        this.updateTable();
    }

    bindOnTableChange(callback)
    {
        this.onTableChanged = callback;
    }

    updateTable()
    {
        this.onTableChanged(this.latestFiveTable);
        const serializedTable = JSON.stringify(this.latestFiveTable);
        localStorage.setItem('latest_five_list', serializedTable);
    }
}