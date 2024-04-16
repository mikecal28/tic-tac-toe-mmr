import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function TicTacToe() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [endMessage, setEndMessage] = useState("");
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

  const virtualBoard = useRef(["", "", "", "", "", "", "", "", ""]);

  const makeVirtualMove = useCallback((position, player) => {
    if (isValidMove(position)) {
      const boardCopy = [...virtualBoard.current];
      boardCopy.splice(position, 1, player);
      virtualBoard.current = boardCopy;

      return true;
    }
    return false;
  }, []);

  const minimax = useCallback(
    (isMaximizing) => {
      let winner = checkWin();
      if (winner) {
        return { score: { X: -1, O: 1, tie: 0 }[winner] };
      }

      if (isMaximizing) {
        let bestScore = -2;
        const validMoves = getValidMoves();
        validMoves.forEach((move, idx) => {
          makeVirtualMove(move, "O");
          let score = minimax(false)["score"];
          virtualBoard.current[move] = "";
          if (score > bestScore) {
            bestScore = score;
          }
        });
        return { score: bestScore };
      } else {
        let bestScore = 2;
        const validMoves = getValidMoves();
        validMoves.forEach((move, idx) => {
          makeVirtualMove(move, "X");
          let score = minimax(true)["score"];

          virtualBoard.current[move] = "";

          if (score < bestScore) {
            bestScore = score;
          }
        });
        return { score: bestScore };
      }
    },
    [makeVirtualMove]
  );

  const findBestMove = useCallback(() => {
    let bestScore = -2;
    let moves = [];
    let bestMoves = [];

    getValidMoves().forEach((move, idx) => {
      makeVirtualMove(move, "O");
      let score = minimax(false)["score"];
      virtualBoard.current[move] = "";
      moves.push([score, move]);
      if (score > bestScore) {
        bestScore = score;
      }
    });

    moves.forEach((move) => {
      if (move[0] === bestScore) {
        bestMoves.push(move[1]);
      }
    });

    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
  }, [makeVirtualMove, minimax]);

  const makeMove = useCallback(
    (position, player) => {
      if (isValidMove(position)) {
        const boardCopy = [...gameBoard];
        boardCopy.splice(position, 1, player);
        setGameBoard(boardCopy);
        virtualBoard.current = boardCopy;

        return true;
      }
      return false;
    },
    [gameBoard]
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

  function isValidMove(position) {
    return !virtualBoard.current[position];
  }

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

  function getValidMoves() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(
      (move) => !virtualBoard.current[move]
    );
  }

  function reset() {
    setGameBoard(["", "", "", "", "", "", "", "", ""]);
    virtualBoard.current = ["", "", "", "", "", "", "", "", ""];
    setEndMessage("");
  }

  useEffect(() => {
    if (currentPlayer === "O" && !endMessage) {
      const timeOut = () =>
        setTimeout(() => {
          let move = findBestMove();
          if (move || move === 0) {
            makeMove(move, "O");
          }

          let win = checkWin();
          console.log("win: ", win);

          if (win || getValidMoves().length === 0) {
            if (win) {
              setEndMessage(`${win} wins!`);
            } else {
              setEndMessage("It's a tie!");
            }
          } else {
            setCurrentPlayer("X");
          }
        }, 2000);

      timeOut();

      clearTimeout(timeOut);
    }
  }, [currentPlayer, findBestMove, makeMove, endMessage]);

  useEffect(() => {
    const X = gameBoard.filter((char) => char === "X");
    const O = gameBoard.filter((char) => char === "O");

    if (X.length > O.length) {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }
  }, [gameBoard]);

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
