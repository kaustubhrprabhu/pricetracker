import "./Form.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpForm() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!formData.name || !formData.email || !formData.password) {
      setLoading(false);
      return setErrorMessage("All fields are required");
    }

    try {
      const res = await fetch("/api/auth/signup", {
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
        alert("Signup successful! Please log in to continue");
        navigate("/login");
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage("Signup failed! Please try again");
    }
  };

  return (
    <div className="form-container">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          placeholder="Name*"
          onChange={handleChange}
          required
        />
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
          {isLoading ? "Please wait..." : "Sign Up"}
        </button>
      </form>
      {errorMessage && <div className="errorbox">{errorMessage}</div>}
      <span>
        Already have an account? <Link to="/login">Login here</Link>
      </span>
    </div>
  );
}

export default SignUpForm;
