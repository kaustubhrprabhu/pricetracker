import { useEffect, useRef, useState } from "react";
import "./Product.css";

export default function Product({ product }) {
  const [price, setPrice] = useState({
    symbol: "-",
    color: "rgb(255, 255, 0)",
  });
  const indicator = useRef();

  useEffect(() => {
    setPrice(
      product.price < product.oldprice
        ? { symbol: "▾", color: "rgb(50, 205, 50)" }
        : product.price > product.oldprice
        ? { symbol: "▴", color: "rgb(255, 0, 0)" }
        : { symbol: "-", color: "rgb(255, 255, 0)" }
    );

    indicator.current.style.background = price.color;
  }, [product]);

  return (
    <div className="product">
      <div className="image">
        <img src={product.image} alt="Product image" />
      </div>
      <div className="info">
        <div className="title">{product.title}</div>
        <div className="price">
          <span className="current-price">₹{product.price}</span>
          <span className="indicator" ref={indicator}>
            {price.symbol}
          </span>
        </div>
        <div className="time">
          Updated on{" "}
          <span className="update-time">
            {new Date(product.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
