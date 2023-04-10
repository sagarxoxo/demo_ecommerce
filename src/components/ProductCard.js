import React from "react";
import { BsCartCheck } from "react-icons/bs";

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="img-pc text-center">
        <img src={product.image} width="150px" height="150px" />
      </div>
      <div className="prod-section">
        <div className="product-info">
          <span className="category-title">{product.category}</span>
          <h3>{product.title.slice(0, 46)}</h3>
          <span className="product-card-price">${product.price}</span>
        </div>
        <div className="product-add-cart">
          <a>Add to cart</a>
          <BsCartCheck />
        </div>
      </div>
    </div>
  );
}
