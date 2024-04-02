import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import "./Profile.css";

export default function Profile() {
  const { user, removeUser } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const email = prompt(
      "Warning: Deleting account will remove all your data!\nAre you sure you want to delete your account?\n\nTo ensure, please enter your email:"
    );

    if (!email) return;
    if (email !== user.email) return alert("Email does not match");

    try {
      setLoading(true);

      const res = await fetch(`/api/user/delete/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = res.json();
      if (data.success === false) {
        alert(data.message);
        setLoading(false);
      }

      if (res.ok) {
        alert("Your account has been deleted!");
        removeUser();
        navigate("/signup");
      }
    } catch (err) {
      alert("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="profile-container">
        <h2>Profile</h2>
        <div className="profile">
          <div>
            <span className="label">Name</span>
            <span>{user.name}</span>
          </div>
          <div>
            <span className="label">Email</span>
            <span>{user.email}</span>
          </div>
          {user.isAdmin && (
            <Link to="admin">
              <button className="admin-button">Admin Panel</button>
            </Link>
          )}
        </div>
        <div className="danger">
          <span>Danger Zone</span>
          <button onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </main>
  );
}
