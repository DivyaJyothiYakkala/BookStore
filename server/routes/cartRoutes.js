const express = require("express");
const router = express.Router();

const { 
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart
} = require("../controllers/cartController");

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getCart);

router.post("/", authMiddleware, addToCart);

router.put("/:id", authMiddleware, updateCartQuantity);

router.delete("/:id", authMiddleware, removeFromCart);

module.exports = router;