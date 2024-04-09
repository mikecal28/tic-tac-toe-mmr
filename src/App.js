import { Route, Routes } from "react-router-dom";

import TicTacToe from "./components/TicTacToe";

import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={TicTacToe} />
      </Routes>
    </div>
  );
}

export default App;
