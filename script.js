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
}())