import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUp from "./pages/FormPages/SignUp";
import SignIn from "./pages/FormPages/SignIn";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import ProductPage from "./pages/ProductPage/ProductPage";
import AddProduct from "./pages/AddProduct/AddProduct";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/profile/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
