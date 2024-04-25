import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import useMiniMax from "../hooks/useMiniMax";

function DotsAndBoxes() {
  const boardSize = useRef([3, 3]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [endMessage, setEndMessage] = useState("");
  const [gameBoard, setGameBoard] = useState(
    new Array(boardSize.current[0] * 2 + 1).fill(0).map((_, idx) => {
      if (idx % 2 === 0) {
        return new Array(boardSize.current[1]).fill("");
      } else {
        return new Array(boardSize.current[1] + 1).fill("");
      }
    })
  );

  // const { reset, makeMove, endMessage, virtualBoard } = useMiniMax(
  //   gameBoard,
  //   setGameBoard,
  //   checkWin
  // );

  const checkWin = useCallback(() => {
    let isFinished = true;

    gameBoard.forEach((_, xIdx) => {
      gameBoard[xIdx].forEach((line) => {
        if (!line) isFinished = false;
      });
    });

    if (isFinished) {
      if (playerOneScore > playerTwoScore) {
        return "X";
      } else if (playerTwoScore > playerOneScore) {
        return "O";
      } else {
        return "tie";
      }
    }

    return isFinished;
  }, [gameBoard, playerOneScore, playerTwoScore]);

  const tallyScore = useCallback(
    (player) => {
      const isBox = (x, y) => {
        const lineOne = gameBoard[x][y];
        const lineTwo = gameBoard[x + 1][y];
        const lineThree = gameBoard[x + 1][y + 1];
        const lineFour = gameBoard[x + 2][y];

        if (lineOne && lineTwo && lineThree && lineFour) {
          return true;
        }

        return false;
      };

      let currentBoxes = 0;
      Array.from({ length: gameBoard.length }, (_, index) => index).forEach(
        (_, xIdx) => {
          if (xIdx % 2 === 0 && xIdx + 1 !== gameBoard.length) {
            gameBoard[xIdx].forEach((_, yIdx) => {
              if (isBox(xIdx, yIdx)) {
                currentBoxes += 1;
              }
            });
          }
        }
      );

      const pointsToAdd = currentBoxes - totalScore;

      if (player === "X") {
        setPlayerOneScore((prev) => (prev += pointsToAdd));
        setCurrentPlayer("O");
      } else {
        setPlayerTwoScore((prev) => (prev += pointsToAdd));
        setCurrentPlayer("X");
      }
    },
    [gameBoard, totalScore]
  );

  const renderLines = () => {
    return Array.from(
      { length: boardSize.current[0] * 2 + 1 },
      (_, index) => index
    ).map((groupIdx) => {
      if (groupIdx % 2 === 0) {
        return (
          <div key={groupIdx} className="horizontal-group">
            {Array.from(
              { length: boardSize.current[0] },
              (_, index) => index
            ).map((lineIdx) => {
              return (
                <div
                  key={lineIdx}
                  className={`horizontal-lines ${
                    gameBoard[groupIdx][lineIdx] === "X" ? "active" : ""
                  }`}
                  onClick={() =>
                    setGameBoard((prev) => {
                      prev[groupIdx].splice(lineIdx, 1, "X");
                      return [...prev];
                    })
                  }
                />
              );
            })}
          </div>
        );
      } else {
        return (
          <div key={groupIdx} className="vertical-group">
            {Array.from(
              { length: boardSize.current[1] + 1 },
              (_, index) => index
            ).map((lineIdx) => {
              return (
                <div
                  key={lineIdx}
                  className={`vertical-lines ${
                    gameBoard[groupIdx][lineIdx] === "X" ? "active" : ""
                  }`}
                  onClick={() =>
                    setGameBoard((prev) => {
                      prev[groupIdx].splice(lineIdx, 1, "X");
                      return [...prev];
                    })
                  }
                />
              );
            })}
          </div>
        );
      }
    });
  };

  const renderDots = () => {
    return Array.from(
      { length: boardSize.current[1] + 1 },
      (_, index) => index
    ).map((dotIdx) => {
      return (
        <div key={dotIdx} className="dot-group">
          {Array.from(
            { length: boardSize.current[0] + 1 },
            (_, index) => index
          ).map((dotIdx) => {
            return <div key={dotIdx} className="dot" />;
          })}
        </div>
      );
    });
  };

  useEffect(() => {
    console.log("game: ", gameBoard);
  }, [gameBoard]);

  useEffect(() => {
    if (!endMessage) {
      let totalLines = 0;
      gameBoard.forEach((_, xIdx) => {
        gameBoard[xIdx].forEach((line) => {
          if (line) totalLines += 1;
        });
      });

      if (totalLines % 2 !== 0) {
        tallyScore("X");
      } else {
        tallyScore("O");
      }
    }
  }, [gameBoard, endMessage, tallyScore]);

  useEffect(() => {
    console.log("currentPlayer: ", currentPlayer);
  }, [currentPlayer]);

  useEffect(() => {
    setTotalScore(playerOneScore + playerTwoScore);
    console.log("playerOneScore: ", playerOneScore);
    console.log("playerTwoScore: ", playerTwoScore);
  }, [playerOneScore, playerTwoScore]);

  useEffect(() => {
    const winner = checkWin();
    console.log("winner: ", winner);
    if (winner) setEndMessage(`${winner} wins!`);
  }, [totalScore, checkWin]);

  return (
    <div className="dots-and-boxes-container">
      <Link to="/">Main Menu</Link>
      <div className="dots-and-boxes-wrapper">
        <div
          className="lines-wrapper"
          style={{
            gridTemplateRows: `repeat(${boardSize.current[1]}, 5px auto) 5px`,
          }}
        >
          {renderLines()}
        </div>
        <div className="dots-wrapper">{renderDots()}</div>
        {/* {endMessage && <button onClick={reset}>Reset</button>} */}
      </div>
      <div>{endMessage}</div>
    </div>
  );
}

export default DotsAndBoxes;
