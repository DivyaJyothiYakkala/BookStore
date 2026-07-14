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
import ManageUsers from "./pages/ManageUsers";
import ManageBooks from "./pages/ManageBooks";
import ManageOrders from "./pages/ManageOrders";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import AIRecommendation from "./pages/AIRecommendation";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return(
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route
           path="/cart" 
           element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Cart />
            </ProtectedRoute>
            } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <Orders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/seller/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/seller/add-book"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <AddBook />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/seller/my-books" 
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <MyBooks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/seller/edit-book/:id" 
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <EditBook />
            </ProtectedRoute>
          } />
        <Route 
          path="/seller/orders" 
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerOrders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/admin/books" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageBooks />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageOrders />
            </ProtectedRoute>
          } 
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ai" element={<AIRecommendation />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </MainLayout>
  );
}

export default App;