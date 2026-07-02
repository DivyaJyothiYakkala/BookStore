const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    deleteUser,
    getDashboard
} = require("../controllers/adminController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("admin"),
    getDashboard
);

// Get all users
router.get(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    getAllUsers
);

// Delete user
router.delete(
    "/users/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteUser
);

module.exports = router;