import { Link } from "react-router-dom";

function BookCard({ book }) {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div
                className="card h-100 shadow border-0"
                style={{
                    transition: "0.3s",
                    borderRadius: "15px",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                }}
            >
                <img
                    src={
                        book.image
                            ? `http://localhost:5000${book.image}`
                            : "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    className="card-img-top"
                    alt={book.title}
                    style={{
                        height: "300px",
                        objectFit: "cover",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                    }}
                />

                <div className="card-body d-flex flex-column">

                    <div className="d-flex justify-content-between mb-2">
                        <span className="badge bg-primary">
                            {book.genre}
                        </span>

                        <span
                            className={`badge ${
                                book.stock > 0
                                    ? "bg-success"
                                    : "bg-danger"
                            }`}
                        >
                            {book.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                    </div>

                    <h5 className="fw-bold">{book.title}</h5>

                    <p className="text-muted mb-1">
                        by {book.author}
                    </p>

                    <p className="text-warning fw-bold mb-2">
                        ⭐ 4.8 Rating
                    </p>

                    <h4 className="text-success">
                        ₹{book.price}
                    </h4>

                    <p>
                        {book.stock > 0 ? (
                            <span className="badge bg-success">In Stock</span>
                        ) : (
                            <span className="badge bg-danger">Out of Stock</span>
                        )}
                    </p>

                    <Link
                        to={`/books/${book._id}`}
                        className="btn btn-primary mt-auto"
                    >
                        View Details
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default BookCard;