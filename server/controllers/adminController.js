const Book = require("../models/Book");
const Order = require("../models/Order");
const User = require("../models/User");

//Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            message: "Users fetched successfully",
            totalUsers: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching users",
            error: error.message
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Prevent deleting admin accounts
        if (user.role === "admin") {
            return res.status(403).json({
                message: "Admin account cannot be deleted"
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        });
    }
};

const getDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: "user" });
        const totalSellers = await User.countDocuments({ role: "seller" });
        const totalAdmins = await User.countDocuments({ role: "admin" });

        const totalBooks = await Book.countDocuments();
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find();

        const totalRevenue = orders.reduce(
            (sum, order) => sum + order.totalAmount,
            0
        );

        const pendingOrders = await Order.countDocuments({
            status: "Pending"
        });

        const processingOrders = await Order.countDocuments({
            status: "Processing"
        });

        const deliveredOrders = await Order.countDocuments({
            status: "Delivered"
        });

        res.status(200).json({
            message: "Dashboard data fetched successfully",
            dashboard: {
                totalUsers,
                totalSellers,
                totalAdmins,
                totalBooks,
                totalOrders,
                totalRevenue,
                pendingOrders,
                processingOrders,
                deliveredOrders
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching dashboard",
            error: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
    getDashboard
};