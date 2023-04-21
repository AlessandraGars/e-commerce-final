import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCarThunk,
  deleteCartThunk,
  updateCartThunk,
  carCheckoutThunk,
} from "../store/slices/carProducts.slice";

const CarSidebar = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const productsItem = useSelector((state) => state.carProducts);

  useEffect(() => {
    dispatch(getCarThunk());
  }, []);

  const updateCart = (id, quantity) => {
    const data = {
      quantity: quantity,
    };
    dispatch(updateCartThunk(id, data));
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement={"end"}>
      <Offcanvas.Header
        closeButton
        style={{ backgroundColor: "#44444499", borderBottom: "none" }}
      >
        <Offcanvas.Title style={{ fontSize: "24px", fontWeight: "bold" }}>
          E-commerce
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <ul
          className="cart-items"
          style={{ listStyleType: "none", padding: "0" }}
        >
          {productsItem.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div style={{ marginRight: "20px" }}>
                <img
                  src={item?.product?.images?.[0]?.url}
                  alt=""
                  style={{ width: "100px" }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4 style={{ margin: "0", marginBottom: "10px" }}>
                  {item.product.title}
                </h4>
                <p style={{ margin: "0", marginBottom: "10px" }}>
                  {item.product.price}
                </p>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={() => updateCart(item.id, item.quantity - 1)}
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      marginRight: "5px",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      border: "1px solid #000",
                    }}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button
                    onClick={() => updateCart(item.id, item.quantity + 1)}
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      marginRight: "5px",
                      fontWeight: "bold",
                      fontSize: "1.2em",
                      border: "1px solid #000",
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(deleteCartThunk(item.id))}
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      borderRadius: "5px",
                      padding: "5px",
                      fontWeight: "bold",
                      border: "1px solid #000",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
          <p style={{ margin: "20px 0" }}>
            Total:{" "}
            {productsItem.reduce((acc, item) => {
              return acc + item.product.price * item.quantity;
            }, 0)}
          </p>
          <button
            onClick={() => dispatch(carCheckoutThunk())}
            style={{
              backgroundColor: "transparent",
              color: "#000",
              borderRadius: "5px",
              padding: "10px",
              fontWeight: "bold",
              border: "2px solid #000",
            }}
          >
            CheckOut
          </button>
        </ul>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CarSidebar;
