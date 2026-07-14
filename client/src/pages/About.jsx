function About() {
    return (
        <div className="container py-5">

            <div className="text-center mb-5">
                <h1 className="fw-bold">📚 About Book Store</h1>
                <p className="lead text-muted">
                    Your one-stop online destination for buying books.
                </p>
            </div>

            <div className="row">

                <div className="col-md-6">
                    <div className="card shadow border-0 h-100">
                        <div className="card-body">
                            <h3>🎯 Our Mission</h3>
                            <p>
                                We aim to make reading accessible by connecting
                                readers with thousands of books from trusted
                                sellers.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow border-0 h-100">
                        <div className="card-body">
                            <h3>🌍 Why Choose Us?</h3>

                            <ul>
                                <li>Thousands of Books</li>
                                <li>Secure Payment</li>
                                <li>Fast Delivery</li>
                                <li>Trusted Sellers</li>
                                <li>AI Book Recommendation</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default About;