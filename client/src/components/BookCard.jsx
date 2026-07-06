import { Link } from "react-router-dom";

function BookCard({ book }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <img 
                    src={
                        book.image
                        ? `http://localhost:5000${book.image}`
                        : "https://via.placeholder.com/300x400?text=No+Image"
                    }
                    className="card-img-top"
                    alt={book.title}
                    style={{ height: "300px", objectFit: "cover" }}
                />

                <div className="card-body">
                    <h5>{book.title}</h5>

                    <p className="text-muted">
                        {book.author}
                    </p>

                    <h6 className="text-primary">
                        ₹{book.price}
                    </h6>

                    <Link
                        to={`/books/${book._id}`}
                        className="btn btn-primary w-100"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BookCard;