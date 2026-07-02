const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Book = require("../models/Book");

const placeOrder = async (req, res) => {
    try {
        const cartItems = await Cart.find({
            user: req.user.id
        }).populate("book");

        if (cartItems.length === 0) {
            return res.status(400).json({
                message: "Your cart is empty"
            });
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of cartItems) {
            if(item.book.stock < item.quantity) {
                return res.status(400).json({
                    message: '${item.book.title} is out of stock'
                });
            }

            totalAmount += item.book.price * item.quantity;

            orderItems.push({
                book: item.book._id,
                quantity: item.quantity,
                price: item.book.price
            });

            item.book.stock -= item.quantity;
            await item.book.save();
        }

        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            totalAmount
        });

        await Cart.deleteMany({
            user: req.user.id
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Error placing order",
            error: error.message
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        })
        .populate("items.book", "title author price image")
        .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Orders fetched successfully",
            totalOrders: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", "name email")
        .populate("items.book", "title author price")
        .sort({ createdAt: -1 });

        res.status(200).json({
            message: "All orders fetched successfully",
            totalOrders: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching all orders",
            error: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if(!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating order status",
            error: error.message
        });
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};