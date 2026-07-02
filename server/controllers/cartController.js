const Cart = require("../models/Cart");
const Book = require("../models/Book");

const addToCart = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;

        // Check if the book exists
        const book = await Book.findById(bookId);

        if(!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Check if the book is already in the user's cart
        let cartItem = await Cart.findOne({
            user: req.user.id,
            book: bookId
        });

        if(cartItem) {
            cartItem.quantity += quantity || 1;
            await cartItem.save();

            return res.status(200).json({
                message: "Cart updated successfully",
                cartItem
            });
        }

        //Create a new cart item
        cartItem = await Cart.create({
            user: req.user.id,
            book: bookId,
            quantity: quantity || 1
        });

        res.status(201).json({
            message: "Book added to cart",
            cartItem
        });
    } catch(error) {
        res.status(500).json({
            message: "Error adding book to cart",
            error: error.message
        });
    }
};

const getCart = async (req, res ) => {
    try {
        const cartItems = await Cart.find({
            user: req.user.id
        }).populate(
            "book",
            "title author genre price image stock"
        );

        res.status(200).json({
            message: "Cart fetched successfully",
            totalItems: cartItems.length,
            cartItems
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching cart",
            error: error.message
        });
    }
};

const updateCartQuantity = async (req, res) => {
    try {
        const { quantity } = req.body;

        const cartItem = await Cart.findById(req.params.id);

        if(!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        // Make sure users can update only their own cart
        if (cartItem.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({
            message: "Cart updated successfully",
            cartItem
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating cart",
            error: error.message
        });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id);

        if(!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        if (cartItem.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        await Cart.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Item removed from cart successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error removing item from cart",
            error: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartQuantity,
    removeFromCart
};