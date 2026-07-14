import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark shadow-sm"
            style={{ backgroundColor: "#343a40" }}
        >
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" to="/">
                    📚 Book Store
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item mx-1">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item mx-1">
                            <Link className="nav-link" to="/books">
                                Books 
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ai">
                                🤖 AI Recommender
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                Contact
                            </Link>
                        </li>
                        {!user && (
                            <>
                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}

                        {user?.role === "user" && (
                            <>
                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/cart">
                                        Cart
                                    </Link>
                                </li>

                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/orders">
                                        My Orders
                                    </Link>
                                </li>
                            </>
                        )}

                        {user?.role === "seller" && (
                            <>
                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/seller/dashboard">
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/seller/add-book">
                                        Add Book
                                    </Link>
                                </li>

                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/seller/my-books">
                                        My Books
                                    </Link>
                                </li>

                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/seller/orders">
                                        Orders
                                    </Link>
                                </li>
                            </>
                        )}

                        {user?.role === "admin" && (
                            <>
                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/admin/dashboard">
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/admin/users">
                                        Users
                                    </Link>
                                </li>
                                
                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/admin/books">
                                        Book Management
                                    </Link>
                                </li>

                                <li className="nav-item mx-1">
                                    <Link className="nav-link" to="/admin/orders">
                                        Orders
                                    </Link>
                                </li>
                            </>
                        )}

                        {user && (
                            <li className="nav-item mx-1">
                                <button
                                    className="btn btn-outline-light ms-3"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;