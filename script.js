//iife used to have a game scope function immediately executed

(function Game() {
    console.log("Test")

    //factory function in an iife to build a storage array and a modify method for the game's board
    //iife used since only one gameBoard instance is needed in a game
    const gameBoard = (function () {
        //initialise each board space as null
        const board = [null, null, null, null, null, null, null, null, null];
        //method to change board space values given the index of the space and value to insert
        const modify = (index, mark) => {
            board[index] = mark;
        };
        return {board, modify};
    })();

    gameBoard.modify(1, "X")
    console.log(gameBoard.board)

    //displays the game board, contains function to update display as moves are made
    const displayGame = (function () {
        let board = gameBoard.board;

        let gridContainer = document.createElement("div");
        gridContainer.classList.add("gridContainer");

        //iterates through the array of board values, assigns an id to
        //each of their grid elements identical to the array index to enable
        //the display and array values to be easily linked
        //then adds to overall grid container for display
        for (let i = 0; i < board.length; i++) {
            let gridSquare = document.createElement("p");
            gridSquare.id = i;
            gridSquare.textContent = board[i];
            gridContainer.appendChild(gridSquare);
        };

        document.body.appendChild(gridContainer);

        //takes index of a particular grid square, and updates the display value with the current
        //value it has in the board array
        const update = (index) => {
            let square = document.getElementById(index);
            let squareValue = gameBoard.board[index];
            square.innerText = squareValue;
        }
        return {update};
    })();

    
}())