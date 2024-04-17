import { Route, Routes } from "react-router-dom";

import TicTacToe from "./components/TicTacToe";

import "./styles/app.scss";
import MainMenu from "./components/MainMenu";
import DotsAndBoxes from "./components/DotsAndBoxes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={MainMenu} />
        <Route path="/tic-tac-toe" Component={TicTacToe} />
        <Route path="/dots-and-boxes" Component={DotsAndBoxes} />
      </Routes>
    </div>
  );
}

export default App;
