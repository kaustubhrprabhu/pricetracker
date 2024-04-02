import { Link } from "react-router-dom";
import Dropdown from "./Dropdown/Dropdown";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <Link to="/">
        <h1 className="logo">
          P<span>₹</span>iceTracker
        </h1>
      </Link>
      <nav>{user ? <Dropdown /> : <Link to="/login">Login</Link>}</nav>
    </header>
  );
}

export default Header;
