import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/seller/books", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setBooks(response.data.books);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        loadBooks();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="mb-4 text-center">My Books</h2>

            <div className="row">
                {books.length === 0 ? (
                    <h4 className="text-center">No books added yet.</h4>
                ) : (
                    books.map((book) => (
                        <div key={book._id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">

                                <img
                                    src={`http://localhost:5000${book.image}`}
                                    alt={book.title}
                                    className="card-img-top"
                                    style={{
                                        height: "300px",
                                        objectFit: "cover",
                                    }}
                                />

                                <div className="card-body">
                                    <h5>{book.title}</h5>

                                    <p className="text-muted">
                                        {book.author}
                                    </p>

                                    <p>
                                        <strong>Genre:</strong> {book.genre}
                                    </p>

                                    <p>
                                        <strong>Price:</strong> ₹{book.price}
                                    </p>

                                    <p>
                                        <strong>Stock:</strong> {book.stock}
                                    </p>

                                    <Link
                                        to={`/seller/edit-book/${book._id}`}
                                        className="btn btn-warning w-100"
                                    >
                                        Edit Book
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyBooks;