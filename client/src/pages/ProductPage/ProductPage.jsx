import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isPageLoading, setPageLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      setPageLoading(true);
      const res = await fetch(`/api/product/getproducts?id=${id}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setProduct(data);
        setPageLoading(false);
      }
    } catch (err) {
      console.error(err);
      setPageLoading(false);
    }
  };

  const deleteProduct = async () => {
    const confirmation = confirm(
      "Do you want to delete this product from your tracking list?"
    );
    if (!confirmation) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/product/delete/${id}/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (isPageLoading)
    return (
      <main>
        <div className="instruction">
          <p>Loading...</p>
        </div>
      </main>
    );

  return (
    <main>
      {product ? (
        <div className="product-page">
          <div className="image">
            <img src={product.image} alt="Product image" />
          </div>
          <div className="info">
            <div className="title">{product.title}</div>
            <div className="prices">
              <div>
                <div className="price-label">Price (Created)</div>
                <span className="old-price">₹{product.oldprice}</span>
                <div className="price-label">
                  {new Date(product.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="price-label">Price (Now)</div>
                <span className="current-price">₹{product.price}</span>
                <div className="price-label">
                  {new Date(product.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
            <div className="action-buttons">
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                <button className="goto">Go to Product ↗</button>
              </a>
              <button className="delete" onClick={deleteProduct}>
                {isLoading ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="instruction">
          <p>Something went wrong</p>
        </div>
      )}
    </main>
  );
}
