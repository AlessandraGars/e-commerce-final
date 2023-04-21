import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import CarSidebar from "./CarSidebar";

const NavBar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const logOut = () => {
    localStorage.clear("token");
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            E-commerce
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link
              style={{ display: token ? "none" : "" }}
              as={Link}
              to="/login"
              className={token ? "not-loged" : ""}
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/register"
              style={{ display: token ? "none" : "" }}
              className={token ? "not-loged" : ""}
            >
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="/purchases">
              Purchases
            </Nav.Link>
            <Nav.Link onClick={() => setShow(true)}>
              <FontAwesomeIcon icon={faShoppingCart} /> Purchases (sidebar)
            </Nav.Link>

            <Nav.Link
              style={{ display: token ? "block" : "none" }}
              to="/"
              onClick={logOut}
              className={token ? "" : "not-loged"}
            >
              Log Out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <CarSidebar show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
