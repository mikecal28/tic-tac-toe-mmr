import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useMiniMax from "../hooks/useMiniMax";

function DotsAndBoxes() {
  const boardSize = useRef([4, 4]);
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

  // const renderGameSquares = () =>
  //   gameBoard.map((square, idx) => (
  //     <div
  //       key={idx}
  //       className="game-square"
  //       style={endMessage ? { pointerEvents: "none" } : {}}
  //       onClick={() => makeMove(idx, "X")}
  //     >
  //       {square}
  //     </div>
  //   ));

  // function checkWin() {
  //   const winningCombinations = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];

  //   let winner = false;
  //   winningCombinations.forEach((combo) => {
  //     let a = combo[0];
  //     let b = combo[1];
  //     let c = combo[2];

  //     if (
  //       virtualBoard.current[a] &&
  //       virtualBoard.current[a] === virtualBoard.current[b] &&
  //       virtualBoard.current[a] === virtualBoard.current[c]
  //     ) {
  //       winner = virtualBoard.current[a];
  //     }
  //   });

  //   if (!winner && !virtualBoard.current.includes("")) {
  //     return "tie";
  //   }

  //   return winner;
  // }

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
                  style={{
                    width: `calc(${Math.floor(100 / boardSize.current[0])}%)`,
                  }}
                />
              );
            })}
          </div>
        );
      } else {
        return (
          <div
            key={groupIdx}
            className="vertical-group"
            style={{
              height: `calc(${Math.floor(100 / boardSize.current[1])}% - 5px)`,
            }}
          >
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

  return (
    <div className="dots-and-boxes-container">
      <Link to="/">Main Menu</Link>
      <div className="dots-and-boxes-wrapper">
        <div className="lines-wrapper">{renderLines()}</div>

        <div className="dots-wrapper">{renderDots()}</div>

        {/* <div>{endMessage}</div>
        {endMessage && <button onClick={reset}>Reset</button>} */}
      </div>
    </div>
  );
}

export default DotsAndBoxes;
