import "./Dropdown.css";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

export default function Dropdown() {
  const [isOpen, setOpen] = useState(false);
  const dropdownContent = useRef();
  const { user, removeUser } = useContext(UserContext);
  const navigate = useNavigate();

  const displayDropdown = () => {
    if (isOpen) {
      setOpen(false);
      return (dropdownContent.current.style.display = "none");
    }
    setOpen(true);
    dropdownContent.current.style.display = "block";
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        removeUser();
        navigate("/login");
      }
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="dropdown" onClick={displayDropdown}>
      <a>{user.name} ▾</a>
      <div className="dropdown-content" ref={dropdownContent}>
        <Link to="/profile">Profile</Link>
        <a onClick={logout}>Logout</a>
      </div>
    </div>
  );
}
