import React from "react";
import axios from "axios";
import "../App.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartItemThunk } from "../store/slices/carProducts.slice";

const ProductsDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
      .then((resp) => setDetail(resp.data))
      .catch((error) => console.error(error));
  }, [id]);

  const addCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login to add products to cart");
      navigate("/login");
    } else {
      const data = {
        quantity: quantity,
        productId: id,
      };
      dispatch(addCartItemThunk(data));
    }
  };

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={detail?.images?.[0]?.url} />
      </div>
      <div className="product-info">
        <h1>{detail.title}</h1>
        <p>{detail.description}</p>
        <p>
          <strong>Price: </strong> ${detail.price}
        </p>
        <p>
          <strong>Category: </strong> {detail.brand}
        </p>
        <div className="quantity-selector">
          <button
            className="quantity-btn"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              } else {
                setQuantity(1);
              }
            }}
          >
            -
          </button>
          <span className="quantity">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
        </div>
        <button onClick={handleGoBack}>Go Back</button>
        <button
          onClick={() => addCart()}
          type="button"
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductsDetail;
