const express = require("express");
const router = express.Router();

const { 
    addBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook } = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/upload");

router.get("/", getAllBooks);
router.get("/:id",getBookById);

// Seller and Admin can add books
router.post(
    "/add",
    authMiddleware,
    roleMiddleware("seller", "admin"),
    upload.single("image"),
    addBook
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("seller", "admin"),
    updateBook
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteBook
);
module.exports = router;