import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddBook() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        price: "",
        stock: "",
    });

    const [image, setImage] = useState(null);

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

            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (image) {
                data.append("image", image);
            }

            await api.post("/books/add", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Book added successfully!");
            navigate("/seller/my-books");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Failed to add book");
        }
    };

    return (
        <div className="container my-5">
            <div className="card shadow p-4">
                <h2 className="mb-4 text-center">Add New Book</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Genre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="genre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
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
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Book Image</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Add Book
                    </button>

                </form>
            </div>
        </div>
    );
}

export default AddBook;