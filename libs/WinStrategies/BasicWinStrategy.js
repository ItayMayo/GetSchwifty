export class BasicWinStrategy 
{
    didPlayerWin(board) 
    {
        let lastValue = 0;
        let didWin = true;

        for (let index = 0; index < board.length && didWin; index++)
        {
            const currentValue = board[index].Value;

            if(currentValue == " " && index != board.length - 1)
            {
                didWin = false;
            }
            else if (currentValue != " " && currentValue - 1 != lastValue)
            {
                didWin = false;
            }
            else
            {
                lastValue = currentValue;
            }
        }

        return didWin;
    }
}