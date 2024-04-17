import { useCallback, useEffect, useRef, useState } from "react";

export default function useMiniMax(gameBoard, setGameBoard, checkWin) {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [endMessage, setEndMessage] = useState("");

  const baseGameBoard = useRef([...gameBoard]);
  const virtualBoard = useRef([...gameBoard]);

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
        validMoves.forEach((move) => {
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
        validMoves.forEach((move) => {
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
    [makeVirtualMove, checkWin]
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
    [gameBoard, setGameBoard]
  );

  function isValidMove(position) {
    return !virtualBoard.current[position];
  }

  function getValidMoves() {
    return Array.from(
      { length: virtualBoard.current.length },
      (_, index) => index
    ).filter((move) => !virtualBoard.current[move]);
  }

  function reset() {
    setGameBoard([...baseGameBoard.current]);
    virtualBoard.current = [...baseGameBoard.current];
    setEndMessage("");
    setCurrentPlayer("X");
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
    }

    return (timeOut) => (timeOut ? clearTimeout(timeOut) : null);
  }, [currentPlayer, findBestMove, makeMove, endMessage, checkWin]);

  useEffect(() => {
    const X = gameBoard.filter((char) => char === "X");
    const O = gameBoard.filter((char) => char === "O");

    if (X.length > O.length) {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }
  }, [gameBoard]);

  return { reset, makeMove, endMessage, virtualBoard };
}
