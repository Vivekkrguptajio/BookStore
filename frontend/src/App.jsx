import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SellerRegister from "./pages/SellerRegister";
import Login from "./pages/Login";
import SellerDashboard from "./pages/SellerDashboard";
import Books from "./pages/Books";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/seller-register" element={<SellerRegister />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/books" element={<Books />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/success" element={<Success />} />

        <Route path="/cancel" element={<Cancel />} />

        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
