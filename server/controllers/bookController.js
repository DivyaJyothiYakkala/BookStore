const Book = require("../models/Book");

const addBook = async (req, res) => {
    try {
        const { title, author, genre, description, price, stock } = req.body;

        const book = await Book.create({
            title,
            author,
            genre,
            description,
            price,
            stock,
            image: req.file ? `/uploads/${req.file.filename}` : "",
            seller: req.user.id
        });

        res.status(201).json({
            message: "Book added successfully",
            book
        });
    } catch(error) {
        res.status(500).json({
            message: "Error adding book",
            error: error.message
        });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const { search, author, genre } = req.query;

        let filter = {};
        //search by title
        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by author
        if (author) {
            filter.author = {
                $regex: author,
                $options: "i"            
            };
        }
        
        // Filter by genre
        if (genre) {
            filter.genre = {
                $regex: genre,
                $options: "i"
            };
        }

        const books = await Book.find(filter).populate(
            "seller",
            "name email"
        );

        res.status(200).json({
            message: "Books fetched successfully",
            totalBooks: books.length,
            books
        });
 
    } catch (error) {
        res.status(500).json({
            message: "Error fetching books",
            error: error.message
        });
    }
};

const getBookById =  async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate(
            "seller",
            "name email"
        );

        if(!book){
            return res.status(404).json({
                message: "Book not found",
            });
        }

        res.status(200).json({
            message: "Book fetched successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching book",
            error: error.message
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book) {
            return res.status(404).json({
                message: "Book not found",
            });
        }
        
        //seller can update only their books
        if(
            req.user.role === "seller" &&
            book.seller.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "You can only update your own books"
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating book",
            error: error.message
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        await Book.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting book",
            error: error.message
        });
    }
};
module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};