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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" to="/">
                    Book Store
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/books">
                                Books 
                            </Link>
                        </li>
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}

                        {user?.role === "user" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cart">
                                        Cart
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders">
                                        Orders
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders">
                                        My Orders
                                    </Link>
                                </li>
                            </>
                        )}

                        {user?.role === "seller" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/seller/dashboard">
                                    Seller Dashboard
                                </Link>
                            </li>
                        )}

                        {user?.role === "admin" && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/dashboard">
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}

                        {user && (
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger ms-2"
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