import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";
function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const response = await api.get("/books");
            setBooks(response.data.books);
        } catch (error) {
            console.error("Error fetching books:", error);
        }finally {
            setLoading(false);
        }
    };
        fetchBooks();
    }, []);
    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sort === "low") return a.price - b.price;
            if (sort === "high") return b.price - a.price;
            return 0;
        });
    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Loading books...</p>
            </div>
        );
    }  

    return(
        <div className="container py-5">
            <h2 className="text-center fw-bold mb-5">
                📚 Available Books
            </h2>
            <p className="text-center text-muted mb-4">
                {filteredBooks.length} Books Available
            </p>
            <div className="row mb-4">
                <div className="col-md-6 mx-auto">
                    <input
                        type="text"
                        className="form-control form-control-lg shadow-sm"
                        placeholder="🔍 Search books by title or author..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-3 mx-auto">
                    <select
                        className="form-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {filteredBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
                {filteredBooks.length === 0 && (
                    <div className="text-center mt-5">
                        <h4>No books found 📚</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Books;