import { Link } from "react-router-dom";

function Home() {
    return(
        <>
            <section className="texr-center py-5 bg-light rounded">
                <div className="container">
                    <h1 className="display-4 fw-bold">
                        Welcome to Book Store
                    </h1>

                    <p className="lead mt-3">
                        Discover your next favorite book from thousandsof titles across differnt genres.
                    </p>

                    <div className="mt-4">
                        <Link to="/books" className="btn btn-primary me-3">
                            Browse Books
                        </Link>

                        <Link to="/login" className="btn btn-outline-dark">
                            Login
                        </Link>
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