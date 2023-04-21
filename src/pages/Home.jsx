import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductsThunks,
  filterCategoriesThunk,
  filterNamelineThunk,
} from "../store/slices/products.slice";
import { addCartItemThunk } from "../store/slices/carProducts.slice";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunks());

    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories/")
      .then((resp) => setCategories(resp.data))
      .catch((error) => console.error(error));
  }, []);

  const addCart = (productId, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login to add products to cart");
      navigate("/login");
    } else {
      const data = {
        quantity: quantity,
        productId: productId,
      };
      dispatch(addCartItemThunk(data));
    }
  };

  return (
    <div>
      {/* Search  */}
      <div className="form-group">
        <div className="form-group">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Product name..."
              aria-label="Product name"
              aria-describedby="button-addon2"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon2"
              onClick={() => dispatch(filterNamelineThunk(inputSearch))}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Select  */}
      <div className="select-container">
        <label htmlFor="search">Category:</label>
        <select
          onChange={(e) => dispatch(filterCategoriesThunk(e.target.value))}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Card  */}
      <Container>
        <Row xs={1} md={2} lg={3} xl={4} className="py-3 equal-height">
          {products.map((item) => (
            <Col className="mb-3" key={item.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={item?.images?.[0]?.url}
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title>{item.brand}</Card.Title>
                  <Card.Text>{item.title}</Card.Text>
                  <Card.Title>$ {item.price}</Card.Title>
                  <Card.Text></Card.Text>
                  <div className="btn-container">
                    <Button
                      onClick={() => addCart(item.id, 1)}
                      variant="primary"
                    >
                      Add To Cart
                    </Button>

                    <Button
                      as={Link}
                      to={`/products/${item.id}`}
                      variant="primary"
                    >
                      Product Detail
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
