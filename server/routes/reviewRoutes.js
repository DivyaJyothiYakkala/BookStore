const express = require("express");
const router = express.Router();

const { 
    addReview,
    getReviewsByBook,
    updateReview,
    deleteReview
 } = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

// Add a review
router.post("/", authMiddleware, addReview);
router.get("/book/:bookId", getReviewsByBook);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);
module.exports = router;