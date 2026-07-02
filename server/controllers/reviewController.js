const Review = require("../models/Review");
const Book = require("../models/Book");

//Add a review
const addReview = async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;

        //check if the book exists
        const book = await Book.findById(bookId);

        if(!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }
        //check if the user has already reviewed this book
        const existingReview = await Review.findOne({
            user: req.user.id,
            book: bookId
        });
        if(existingReview) {
            return res.status(400).json({
                message: "You have already reviewed this book"
            });
        }

        const review = await Review.create({
            user: req.user.id,
            book: bookId,
            rating,
            comment
        });

        res.status(201).json({
            message: "Review added successfully",
            review
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding review",
            error: error.message
        });
    }
};

const getReviewsByBook = async (req, res) => {
    try{
        const reviews = await Review.find({
            book: req.params.bookId
        }).populate("user", "name email");

        res.status(200).json({
            message: "Reviews fetched successfully",
            totalReviews: reviews.length,
            reviews
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching reviews",
            error: error.message
        });
    }
};
const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = await Review.findById(req.params.id);
        if(!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }
        //only the review owner can update it
        if(review.user.toString() !== req.user.id){
            return res.status(403).json({
                message: "You can only update your own review"
            });
        }
        if (rating) review.rating = rating;
        if (comment) review.comment = comment;
        await review.save();
        res.status(200).json({
            message: "Review updated successfully",
            review
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating review",
            error: error.message
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if(!review){
            return res.status(404).json({
                message: "Review not found"
            });
        }

        //only the review owner can delete it
        if(review.user.toString() !== req.user.id){
            return res.status(403).json({
                message: "You can only delete your own review"
            });
        }
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Review deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting review",
            error: error.message
        });
    }
};

module.exports = {
    addReview,
    getReviewsByBook,
    updateReview,
    deleteReview
};