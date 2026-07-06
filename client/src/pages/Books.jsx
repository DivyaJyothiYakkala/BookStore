import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";
function Books() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const response = await api.get("/books");
            setBooks(response.data.books);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };
        fetchBooks();
    }, []);


    return(
        <div className="container">
            <h2 className="my-4 text-center">Available Books</h2>

            <div className="row">
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
}

export default Books;