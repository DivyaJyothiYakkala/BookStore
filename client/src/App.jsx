import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import AddBook from "./pages/AddBook";
import MyBooks from "./pages/MyBooks";
import EditBook from "./pages/EditBook";
import SellerOrders from "./pages/SellerOrders";

function App() {
  return(
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/seller/add-book" element={<AddBook />} />
        <Route path="/seller/my-books" element={<MyBooks />} />
        <Route path="/seller/edit-book/:id" element={<EditBook />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
      </Routes>
    </MainLayout>
  );
}

export default App;