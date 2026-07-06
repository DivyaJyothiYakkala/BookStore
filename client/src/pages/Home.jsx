import { Link } from "react-router-dom";

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <section className="text-center py-5 bg-light rounded">
                <div className="container">
                    <h1 className="display-4 fw-bold">
                        Welcome to Book Store
                    </h1>

                    <p className="lead mt-3">
                        Discover your next favorite book from thousands of titles across different genres.
                    </p>

                    <div className="mt-4">
                        <Link to="/books" className="btn btn-primary me-3">
                            Browse Books
                        </Link>

                        {!user && (
                            <Link to="/login" className="btn btn-outline-dark">
                                Login
                            </Link>
                        )}

                        {user?.role === "user" && (
                            <Link to="/cart" className="btn btn-success">
                                My Cart
                            </Link>
                        )}

                        {user?.role === "seller" && (
                            <Link
                                to="/seller/dashboard"
                                className="btn btn-success"
                            >
                                Seller Dashboard
                            </Link>
                        )}

                        {user?.role === "admin" && (
                            <Link
                                to="/admin/dashboard"
                                className="btn btn-success"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            <section className="container my-5">
                <h2 className="text-center mb-4">Why Choose Book Store?</h2>

                <div className="row">
                    <div className="col-md-4 text-center">
                        <h4>Huge Collection</h4>
                        <p>Explore books from every genre and popular authors.</p>
                    </div>

                    <div className="col-md-4 text-center">
                        <h4>Fast Delivery</h4>
                        <p>Quick and reliable delivery to your doorstep.</p>
                    </div>

                    <div className="col-md-4 text-center">
                        <h4>Trusted Platform</h4>
                        <p>Secure shopping experience with verified sellers.</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;