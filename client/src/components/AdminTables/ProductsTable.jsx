import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import "./AdminTables.css";

export default function ProductsTable() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const { user } = useContext(UserContext);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/product/getall", {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        return setErrorMsg(data.message);
      }

      setLoading(false);
      setProductData(data);
    } catch (err) {
      console.error(err);
      setLoading(false);
      return setErrorMsg("Something went wrong!");
    }
  };

  const deleteProduct = async (id) => {
    const confirmation = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmation) return;

    try {
      setDeleting(true);
      const res = await fetch(`/api/product/delete/${id}/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setDeleting(false);
        return alert(data.message);
      }

      setProductData(productData.filter((product) => product._id !== id));
      setDeleting(false);
    } catch (err) {
      setDeleting(false);
      return alert("Something went wrong!");
    }
  };

  useEffect(() => {
    if (user.isAdmin) {
      fetchProducts();
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
        <h2>All Products</h2>
        <div>
          Total
          <span className="count">{productData.length}</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>ADDED BY</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product._id}>
              <td data-cell="ID">{product._id}</td>
              <td data-cell="Title">
                <a href={product.url} target="_blank" rel="noopener noreferrer">
                  {product.title}
                </a>
              </td>
              <td data-cell="Added By">{product.email}</td>
              <td>
                <button
                  onClick={async () => await deleteProduct(product._id)}
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
