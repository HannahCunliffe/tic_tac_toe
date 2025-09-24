//iife used to have a game scope function immediately executed

(function Game() {

    function generateBoard() {

        //factory function in an iife to build a storage array and a modify method for the game's board
        //iife used since only one gameBoard instance is needed in a game
        const gameBoard = (function () {
            //initialise each board space as null
            const board = [null, null, null, null, null, null, null, null, null];
            const showBoard = () => board;
            //method to change board space values given the index of the space and value to insert
            const modify = (index, mark) => {
                board[index] = mark;
            };
            //method to check if a player has won
            const checkWin = () => {
                //checks to see if the board has a full set of matching symbols in a line
                //also checks if not null since the board's default values could otherwise
                //trigger a false positive win
                //win check horizontal row 1
                if (board[0] == board[1] && board[1] == board[2] && board[0] !== null) {
                    return true;
                    //win check horizontal row 2
                } else if (board[3] == board[4] && board[4] == board[5] && board[3] !== null) {

                    return true;
                    //win check horizontal row 3
                } else if (board[6] == board[7] && board[6] == board[8] && board[6] !== null) {

                    return true;
                    // win check vertical row 1
                } else if (board[0] == board[3] && board[3] == board[6] && board[0] !== null) {

                    return true;
                    //win check vertical row 2
                } else if (board[1] == board[4] && board[4] == board[7] && board[1] !== null) {

                    return true;
                    //win check vertical row 3
                } else if (board[2] == board[5] && board[5] == board[8] && board[2] !== null) {
                    return true;

                    //win check diagonal left-right
                } else if (board[0] == board[4] && board[4] == board[8] && board[0] !== null) {
                    return true;

                    //win check diagonal right-left
                } else if (board[2] == board[4] && board[4] == board[6] && board[2] !== null) {
                    return true;
                
                //check for draw by checking if all board squares have values after checking win
                //conditions
                } else if (board.indexOf(null) == -1) {
                    return "draw"
                }else {
                    //return false if no win conditions met
                    return false;
                }

            };
            return { board, showBoard, modify, checkWin };
        })();

        //displays the game board, contains function to update display as moves are made
        const displayGame = (function () {
            //method for generating display of entire game board state
            const display = () => {
                let board = gameBoard.board;

                let gridContainer = document.createElement("div");
                gridContainer.classList.add("gridContainer");
                gridContainer.id = "gridContainer";

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
            }

            //takes index of a particular grid square, and updates the display value with the current
            //value it has in the board array
            //useful if only one square needs to be updated
            const update = (index) => {
                let square = document.getElementById(index);
                let squareValue = gameBoard.board[index];
                square.innerText = squareValue;
            }

            //removes display
            const remove = () => {
                let gridContainer = document.getElementById("gridContainer");
                gridContainer.remove();
            }

            return { display, update, remove };
        })();

        return { gameBoard, displayGame }
    }

    function makePlayer(playerName) {

        const name = playerName;
        let score = 0;

        const addPoint = () => score++;

        const getPoints = () => score;

        return { name, score, addPoint, getPoints }
    };

    const player1 = makePlayer("test");

    let currentBoard = generateBoard();

    currentBoard.displayGame.display();

    //function to play a game, currently configured to allow moves to be made via console
    function playGame() {
        do {
            let userPickIndex = Number(prompt("Enter the square number you wish to pick")) - 1;
            if (Number.isInteger(userPickIndex)) {
                currentBoard.gameBoard.modify(userPickIndex, "X")
                currentBoard.displayGame.update(userPickIndex);
                //failsafe to prevent cpu attempting to play if match is already over
                if (currentBoard.gameBoard.checkWin() == false) {
                     cpuPlay()
                }
            }
        } while (currentBoard.gameBoard.checkWin() == false)
    };

    function cpuPlay() {
        let moveMade = false;
        let board = currentBoard.gameBoard.board;
        while (moveMade == false) {
            //picks random square on the board to make a move
            let pickedSquare = Math.floor(Math.random() * 9);
            if (board[pickedSquare] === null) {
                currentBoard.gameBoard.modify(pickedSquare, "O");
                currentBoard.displayGame.update(pickedSquare);
                moveMade = true;
            }
        }
        currentBoard.gameBoard.checkWin()
    }


    playGame()

    // console.log("Test")

    // currentBoard.gameBoard.modify(1, "X")
    // currentBoard.displayGame.display();
    // console.log(currentBoard.gameBoard.board)

    // currentBoard.displayGame.remove();
    // currentBoard = generateBoard()
    // currentBoard.displayGame.display()
    // console.log(currentBoard.gameBoard.board)

}())