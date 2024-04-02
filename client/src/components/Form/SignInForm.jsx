import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import "./Form.css";

function SignInForm() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!formData.email || !formData.password) {
      setLoading(false);
      return setErrorMessage("All fields are required");
    }

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        addUser(data);
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage("Login failed! Please try again");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Email*"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password*"
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Login"}
        </button>
      </form>
      {errorMessage && <div className="errorbox">{errorMessage}</div>}
      <span>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </span>
    </div>
  );
}

export default SignInForm;
