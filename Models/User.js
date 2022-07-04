export class User 
{
    getUserFromDatabase()
    {
        const user = JSON.parse(localStorage.getItem('user')) || undefined;

        if (!user) 
        {
            return false;
        }

        this.Name = user.Name;
        this.Rank = user.Rank;
        this.BoardSize = user.BoardSize; 

        return true;
    }

    createUser(rank, name, boardSize)
    {
        this.Name = name;
        this.Rank = rank;
        this.BoardSize = boardSize;
        this.updateUser();
    }

    updateUser()
    {
        const serializedUser = JSON.stringify(this);
        localStorage.setItem('user', serializedUser);
    }
}