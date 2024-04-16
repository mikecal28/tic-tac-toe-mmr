import { Route, Routes } from "react-router-dom";

import TicTacToe from "./components/TicTacToe";

import "./styles/app.scss";
import MainMenu from "./components/MainMenu";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={MainMenu} />
        <Route path="/tic-tac-toe" Component={TicTacToe} />
      </Routes>
    </div>
  );
}

export default App;
