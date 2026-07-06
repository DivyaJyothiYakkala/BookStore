import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../services/api";

function BookDetails() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await api.get(`/books/${id}`);
                setBook(response.data.book);
            } catch (error) {
                console.error("Error fetching book:", error);
            }
        };
        fetchBook();
    }, [id]);

    if (!book) {
        return (
            <div className="text-center nt-5">
                <h3>Loading...</h3>
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
        <div className="container my-5">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`http://localhost:5000${book.image}`}
                        alt={book.title}
                        className="img-fluid rounded shadow"
                    />
                </div>
                <div className="col-md-8">
                    <h2>{book.title}</h2>
                    <h5 className="text-muted">
                        {book.author}
                    </h5>

                    <p className="mt-3">
                        <strong>Genre:</strong> {book.genre}
                    </p>

                    <p>
                        <strong>Price:</strong> ₹{book.price}
                    </p>

                    <p>
                        <strong>Stock:</strong> {book.stock}
                    </p>

                    <p>
                        <strong>Descrption:</strong>
                    </p>
                    <p>{book.description}</p>

                    <button 
                        className="btn btn-success"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookDetails;