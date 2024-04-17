import { useState } from "react";
import { Link } from "react-router-dom";
import useMiniMax from "../hooks/useMiniMax";

function TicTacToe() {
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

  const { reset, makeMove, endMessage, virtualBoard } = useMiniMax(
    gameBoard,
    setGameBoard,
    checkWin
  );

  const renderGameSquares = () =>
    gameBoard.map((square, idx) => (
      <div
        key={idx}
        className="game-square"
        style={endMessage ? { pointerEvents: "none" } : {}}
        onClick={() => makeMove(idx, "X")}
      >
        {square}
      </div>
    ));

  function checkWin() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let winner = false;
    winningCombinations.forEach((combo) => {
      let a = combo[0];
      let b = combo[1];
      let c = combo[2];

      if (
        virtualBoard.current[a] &&
        virtualBoard.current[a] === virtualBoard.current[b] &&
        virtualBoard.current[a] === virtualBoard.current[c]
      ) {
        winner = virtualBoard.current[a];
      }
    });

    if (!winner && !virtualBoard.current.includes("")) {
      return "tie";
    }

    return winner;
  }

  return (
    <div className="tic-tac-toe-container">
      <Link to="/">Main Menu</Link>
      <div className="tic-tac-toe-wrapper">
        {renderGameSquares()}
        <div>{endMessage}</div>
        {endMessage && <button onClick={reset}>Reset</button>}
      </div>
    </div>
  );
}

export default TicTacToe;
