import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductsDetail from "./pages/ProductsDetail";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import Register from "./pages/Register";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <HashRouter>
      <div className="App">
        {isLoading && <Loader />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/purchases" element={<Purchases />} />
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
