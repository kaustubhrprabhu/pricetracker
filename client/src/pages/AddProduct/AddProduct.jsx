import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
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

    if (!formData.url) {
      setLoading(false);
      return setErrorMessage("All fields are required");
    }

    try {
      const res = await fetch("/api/product/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage("Faild to add product! Please try again");
    }
  };

  return (
    <main>
      <div className="addproduct-content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="url">
              Enter the Amazon's / Flipkart's product URL
            </label>
            <input
              type="url"
              id="url"
              placeholder="Amazon's or Flipkart's URL"
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Please wait..." : "Add"}
            </button>
          </form>
          {errorMessage && <div className="errorbox">{errorMessage}</div>}
        </div>
      </div>
    </main>
  );
}

export default AddProduct;
