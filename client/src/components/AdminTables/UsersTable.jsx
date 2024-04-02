import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import "./AdminTables.css";

export default function UsersTable() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { user } = useContext(UserContext);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/user/getall", {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        return setErrorMsg(data.message);
      }

      setLoading(false);
      setUserData(data);
    } catch (err) {
      console.error(err);
      setLoading(false);
      return setErrorMsg("Something went wrong!");
    }
  };

  const deleteUser = async (id) => {
    const confirmation = prompt(
      "Warning: Deleting account will remove all its data!\nAre you sure you want to delete this account?\n\nTo ensure please input: DELETE:"
    );
    if (confirmation !== "DELETE") return alert("Process canceled");

    try {
      setDeleting(true);
      const res = await fetch(`/api/user/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setDeleting(false);
        return alert(data.message);
      }

      setUserData(userData.filter((userDetails) => userDetails._id !== id));
      setDeleting(false);
    } catch (err) {
      setDeleting(false);
      return alert("Something went wrong!");
    }
  };

  useEffect(() => {
    if (user.isAdmin) {
      fetchUsers();
    }
  }, [user._id]);

  if (isLoading) {
    return (
      <div className="instruction">
        <p>Loading...</p>
      </div>
    );
  }

  return errorMsg ? (
    <div className="instruction">
      <p>{errorMsg}</p>
    </div>
  ) : (
    <div className="adtb-container">
      <div className="info">
        <h2>All Users</h2>
        <div>
          Total
          <span className="count">{userData.length}</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((userDetails) => (
            <tr key={userDetails._id}>
              <td data-cell="ID">{userDetails._id}</td>
              <td data-cell="Name">{userDetails.name}</td>
              <td data-cell="Email">{userDetails.email}</td>
              <td data-cell="Admin">{userDetails.isAdmin ? "✓" : "✕"}</td>
              <td>
                <button
                  onClick={() => deleteUser(userDetails._id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
