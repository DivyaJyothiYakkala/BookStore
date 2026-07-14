import { useState } from "react";
import api from "../services/api";

function AIRecommendation() {
    const [genre, setGenre] = useState("");
    const [books, setBooks] = useState([]);

    const recommendBooks = async () => {
        try {
            const response = await api.get("/books");

            const filtered = response.data.books.filter((book) =>
                book.genre.toLowerCase().includes(genre.toLowerCase())
            );

            setBooks(filtered);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container py-5">

            <div className="card shadow-lg border-0 p-4">

                <h2 className="text-center mb-4">
                    🤖 AI Book Recommendation
                </h2>

                <p className="text-center text-muted">
                    Enter your favourite genre and discover books.
                </p>

                <div className="row">

                    <div className="col-md-8">
                        <input
                            className="form-control"
                            placeholder="Fantasy, Programming, History..."
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4">
                        <button
                            className="btn btn-primary w-100"
                            onClick={recommendBooks}
                        >
                            Recommend Books
                        </button>
                    </div>

                </div>

            </div>

            <div className="row mt-5">

                {books.map((book) => (
                    <div className="col-md-3 mb-4" key={book._id}>
                        <div className="card shadow h-100">

                            <img
                                src={
                                    book.image
                                        ? `http://localhost:5000${book.image}`
                                        : "https://via.placeholder.com/300x400?text=No+Image"
                                }
                                className="card-img-top"
                                style={{
                                    height: "250px",
                                    objectFit: "cover"
                                }}
                                alt={book.title}
                            />

                            <div className="card-body">

                                <h5>{book.title}</h5>

                                <p>{book.author}</p>

                                <h4 className="text-success">
                                    ₹{book.price}
                                </h4>

                            </div>

                        </div>
                    </div>
                ))}

                {books.length === 0 && genre && (
                    <h4 className="text-center mt-4">
                        No books found for this genre.
                    </h4>
                )}

            </div>

        </div>
    );
}

export default AIRecommendation;