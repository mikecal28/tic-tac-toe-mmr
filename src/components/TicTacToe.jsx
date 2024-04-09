import { useState } from "react";

function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameBoard, setGameBoard] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleTurn = (idx) => {
    const boardCopy = [...gameBoard];
    boardCopy.splice(idx, 1, currentPlayer);
    setGameBoard(boardCopy);
  };

  const renderGameSquares = () =>
    gameBoard.map((square, idx) => (
      <div key={idx} className="game-square" onClick={() => handleTurn(idx)}>
        {square}
      </div>
    ));

  return (
    <div className="tic-tac-toe-container">
      <div className="tic-tac-toe-wrapper">{renderGameSquares()}</div>
    </div>
  );
}

export default TicTacToe;
