import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        price: "",
        stock: "",
    });

    useEffect(() => {
        const loadBook = async () => {
            try {
                const response = await api.get(`/books/${id}`);
                setFormData({
                    title: response.data.book.title,
                    author: response.data.book.author,
                    genre: response.data.book.genre,
                    description: response.data.book.description,
                    price: response.data.book.price,
                    stock: response.data.book.stock,
                });
            } catch (error) {
                console.error("Error loading book:", error);
            }
        };

        loadBook();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            await api.put(`/books/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Book updated successfully!");
            navigate("/seller/my-books");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to update book");
        }
    };

    return (
        <div className="container my-5">
            <div className="card shadow p-4">
                <h2 className="mb-4 text-center">Edit Book</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                            type="text"
                            name="author"
                            className="form-control"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Genre</label>
                        <input
                            type="text"
                            name="genre"
                            className="form-control"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            className="form-control"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            className="form-control"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Update Book
                    </button>

                </form>
            </div>
        </div>
    );
}

export default EditBook;