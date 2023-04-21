import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "../utils/getConfig";
const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://e-commerce-api-v2.academlo.tech/api/v1/purchases",
        getConfig()
      )
      .then((resp) => {
        // console.log(resp.data)
        setPurchases(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="purchases-container">
      <h1>Purchases</h1>
      <ul className="purchases-list">
        {purchases.map((purchase) => (
          <li key={purchase.id} className="purchases-item">
            <h3 id="purchase"># {purchase.id}</h3>
            <img
              src={purchase?.product?.images[0]?.url}
              alt={purchase?.product?.title}
              style={{ width: " 120px", height: "70px" }}
            />
            <h5>
              {" "}
              <b> Quantity: </b> {purchase.quantity}
            </h5>
            <h5>{purchase?.product?.title}</h5>
            <h5>
              {" "}
              <b>Date: </b> {purchase?.createdAt}
            </h5>
            <h5>
              {" "}
              <b>Unit Price: </b> $ {purchase?.product?.price}
            </h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
