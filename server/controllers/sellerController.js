const Book = require("../models/Book");
const Order = require("../models/Order");

// Get books added by logged-in seller
const getMyBooks = async (req, res) => {
    try {
        const books = await Book.find({ seller: req.user.id });

        res.status(200).json({
            message: "Seller books fetched successfully",
            totalBooks: books.length,
            books
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching seller books",
            error: error.message
        });
    }
};

const getSellerOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .populate("user", "name email")
        .populate("items.book");

        const sellerOrders = [];

        for (const order of orders) {
            const sellerItems = order.items.filter(item =>
                item.book &&
                item.book.seller &&
                item.book.seller.toString() === req.user.id
            );

            if (sellerItems.length > 0) {
                sellerOrders.push({
                    _id: order._id,
                    user: order.user,
                    items: sellerItems,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    createdAt: order.createdAt
                });
            }
        }

        res.status(200).json({
            message: "Seller orders fetched successfully",
            totalOrders: sellerOrders.length,
            orders: sellerOrders
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching seller orders",
            error: error.message
        });
    }
};

const getSellerDashboard = async (req, res) => {
    try {
        // Seller's books
        const books = await Book.find({ seller: req.user.id });
        const bookIds = books.map(book => book._id.toString());

        const orders = await Order.find().populate("items.book");

        let totalOrders = 0;
        let totalRevenue = 0;
        let pendingOrders = 0;
        let processingOrders = 0;
        let deliveredOrders = 0;

        orders.forEach(order => {
            const sellerItems = order.items.filter(item =>
                item.book &&
                bookIds.includes(item.book._id.toString())
            );

            if (sellerItems.length > 0) {
                totalOrders++;

                sellerItems.forEach(item => {
                    totalRevenue += item.price * item.quantity;
                });

                if (order.status === "Pending") pendingOrders++;
                if (order.status === "Processing") processingOrders++;
                if (order.status === "Delivered") deliveredOrders++;
            }
        });

        res.status(200).json({
            message: "Seller dashboard fetched successfully",
            dashboard: {
                totalBooks: books.length,
                totalOrders,
                totalRevenue,
                pendingOrders,
                processingOrders,
                deliveredOrders
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching seller dashboard",
            error: error.message
        });
    }
};

module.exports = {
    getMyBooks,
    getSellerOrders,
    getSellerDashboard
};