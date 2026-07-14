import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import api from "../services/api";

function BookDetails() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [recommendedBooks, setRecommendedBooks] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await api.get(`/books/${id}`);
                setBook(response.data.book);
                const allBooks = await api.get("/books");

                const recommendations = allBooks.data.books.filter(
                    (b) =>
                        b.genre === response.data.book.genre &&
                        b._id !== response.data.book._id
                );

                setRecommendedBooks(recommendations.slice(0, 4));
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        fetchBook();
    }, [id]);

    if (!book) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        try{
            const response = await api.post(
                "/cart",
                {
                    bookId: book._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add to cart");
        }
    };

    return (
    <div className="container py-5">

        <div className="card shadow-lg border-0 p-4">

            <div className="row align-items-center">

                <div className="col-lg-4 text-center">

                    <img
                        src={
                            book.image
                                ? `http://localhost:5000${book.image}`
                                : "https://via.placeholder.com/300x400?text=No+Image"
                                }
                        alt={book.title}
                        className="img-fluid rounded shadow"
                        style={{
                            height: "450px",
                            objectFit: "cover",
                        }}
                    />

                </div>

                <div className="col-lg-8">

                    <span className="badge bg-primary mb-3">
                        {book.genre}
                    </span>

                    <h1 className="fw-bold">
                        {book.title}
                    </h1>

                    <h5 className="text-muted mb-4">
                        by {book.author}
                    </h5>

                    <h2 className="text-success fw-bold">
                        ₹{book.price}
                    </h2>
                    <p className="text-warning fs-5">
                        ⭐⭐⭐⭐⭐ <strong>4.8</strong> (250+ Reviews)
                    </p>
                    <hr />

                    <p>
                        <strong>Availability: </strong>

                            {book.stock > 0 ? (
                                <span className="badge bg-success">
                                    In Stock ({book.stock})
                                </span>
                            ) : (
                                <span className="badge bg-danger">
                                    Out of Stock
                                </span>
                            )}
                    </p>

                    <p>
                        <strong>Seller:</strong>{" "}
                        {book.seller?.name || "Book Store"}
                    </p>

                    <hr />

                    <h5>Description</h5>

                    <p className="text-secondary">
                        {book.description}
                    </p>

                    <button
                        className="btn btn-success btn-lg mt-3"
                        onClick={handleAddToCart}
                    >
                        🛒 Add to Cart
                    </button>

                </div>

            </div>

        </div>
        <hr className="my-5" />

        <h2 className="mb-4">
            🤖 Recommended Books
        </h2>

        <div className="row">

            {recommendedBooks.map((item) => (

                <div className="col-md-3 mb-4" key={item._id}>

                    <div className="card shadow h-100">

                        <img
                            src={`http://localhost:5000${item.image}`}
                            className="card-img-top"
                            style={{
                                height: "250px",
                                objectFit: "cover",
                            }}
                            alt={item.title}
                        />

                        <div className="card-body">

                            <h6>{item.title}</h6>

                            <p className="text-muted">
                                {item.author}
                            </p>

                            <h5 className="text-success">
                                ₹{item.price}
                            </h5>

                            <Link
                                to={`/books/${item._id}`}
                                className="btn btn-primary w-100"
                            >
                                View
                            </Link>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    </div>
);
}

export default BookDetails;