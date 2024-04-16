import { Link } from "react-router-dom";

function MainMenu() {
  return (
    <div className="main-menu-container">
      Menu
      <div className="main-menu-wrapper">
        <Link to="/tic-tac-toe">Tic Tac Toe</Link>
        <Link to="/dots-and-boxes">Dots and Boxes</Link>
      </div>
    </div>
  );
}

export default MainMenu;
