import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Product from "../Product/Product";
import { UserContext } from "../../contexts/userContext";
import "./Dashboard.css";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { user, removeUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addproduct");
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/product/getproducts", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        removeUser();
        return navigate("/login");
      }

      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user._id]);

  if (isLoading)
    return (
      <main>
        <div className="instruction">
          <p>Loading...</p>
        </div>
      </main>
    );

  return (
    <main>
      {products && products.length > 0 ? (
        <div className="products-container">
          {products.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <Product product={product} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="instruction">
          <p>Click on '+' button in the bottom right corner to add product</p>
        </div>
      )}
      <button className="add" onClick={handleClick}>
        +
      </button>
    </main>
  );
}
