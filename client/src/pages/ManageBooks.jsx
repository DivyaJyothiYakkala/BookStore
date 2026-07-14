import { useEffect, useState } from "react";
import api from "../services/api";

function ManageBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const response = await api.get("/books");
                setBooks(response.data.books);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        loadBooks();
    }, []);

    const deleteBook = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await api.delete(`/books/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Book deleted successfully.");

            setBooks((prevBooks) =>
                prevBooks.filter((book) => book._id !== id)
            );
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to delete book");
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-4">📚 Book Management</h2>
            <div className="card shadow-lg border-0 rounded-4 p-3">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead className="table-primary">
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Seller</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td>
                                    <img
                                        src={`http://localhost:5000${book.image}`}
                                        alt={book.title}
                                        width="70"
                                        height="95"
                                        className="rounded shadow-sm"
                                        style={{ objectFit: "cover" }}
                                    />
                                </td>

                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>₹{book.price}</td>
                                <td>{book.stock}</td>
                                <td>{book.seller?.name}</td>

                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => deleteBook(book._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}

export default ManageBooks;