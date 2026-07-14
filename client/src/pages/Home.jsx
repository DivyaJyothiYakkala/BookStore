import { Link } from "react-router-dom";

function Home() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <section
                className="text-white py-5"
                style={{
                    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                    minHeight: "80vh",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-lg-6 fade-up">

                            <h1 className="display-3 fw-bold">
                                Discover Your Next
                                <br />
                                Favourite Book 📚
                            </h1>

                            <p className="lead mt-4">
                                Explore thousands of books from bestselling authors.
                                Read, discover and shop all in one place.
                            </p>

                            <div className="mt-4">

                                <Link
                                    to="/books"
                                    className="btn btn-light btn-lg me-3"
                                >
                                    Browse Books
                                </Link>

                                {!user && (
                                    <Link
                                        to="/register"
                                        className="btn btn-outline-light btn-lg"
                                    >
                                        Get Started
                                    </Link>
                                )}

                                {user?.role === "user" && (
                                    <Link
                                        to="/cart"
                                        className="btn btn-warning btn-lg"
                                    >
                                        My Cart
                                    </Link>
                                )}

                                {user?.role === "seller" && (
                                    <Link
                                        to="/seller/dashboard"
                                        className="btn btn-warning btn-lg"
                                    >
                                        Seller Dashboard
                                    </Link>
                                )}

                                {user?.role === "admin" && (
                                    <Link
                                        to="/admin/dashboard"
                                        className="btn btn-warning btn-lg"
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}

                            </div>

                        </div>

                        <div className="col-lg-6 text-center fade-up">

                            <img
                                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700"
                                alt="Books"
                                className="img-fluid rounded shadow-lg"
                            />

                        </div>

                    </div>
                </div>
            </section>
            <section className="container my-5">
                <div className="row g-4 text-center">

                    <div className="col-md-3">
                        <div className="card p-4">
                            <h1>📚</h1>
                            <h2>1000+</h2>
                            <p>Books</p>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-4">
                            <h1>👥</h1>
                            <h2>500+</h2>
                            <p>Readers</p>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-4">
                            <h1>🚚</h1>
                            <h2>24/7</h2>
                            <p>Delivery</p>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card p-4">
                            <h1>⭐</h1>
                            <h2>4.9</h2>
                            <p>Rating</p>
                        </div>
                    </div>

                </div>
            </section>

            <section className="container my-5">
                <h2 className="text-center mb-4">Why Choose Book Store?</h2>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow h-100 text-center">
                            <div className="card-body">
                                <h1>📚</h1>
                                <h4>Huge Collection</h4>
                                <p>
                                    Explore thousands of books across multiple genres and authors.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow h-100 text-center">
                            <div className="card-body">
                                <h1>🚚</h1>
                                <h4>Fast Delivery</h4>
                                <p>
                                    Get your favourite books delivered quickly and safely.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow h-100 text-center">
                            <div className="card-body">
                                <h1>⭐</h1>
                                <h4>Trusted Platform</h4>
                                <p>
                                    Shop confidently with verified sellers and secure ordering.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-light py-5 mt-5">
                <div className="container text-center">
                    <h2>Start Your Reading Journey Today</h2>
                    <p className="lead">
                        Browse our growing collection and find your next favourite book.
                    </p>
                    <Link to="/books" className="btn btn-primary btn-lg">
                        Explore Books
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Home;