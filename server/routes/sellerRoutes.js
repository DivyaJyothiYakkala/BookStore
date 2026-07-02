const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
    getMyBooks,
    getSellerOrders,
    getSellerDashboard
} = require("../controllers/sellerController");

router.get(
    "/books",
    authMiddleware,
    roleMiddleware("seller"),
    getMyBooks
);

router.get(
    "/orders",
    authMiddleware,
    roleMiddleware("seller"),
    getSellerOrders
);

router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("seller"),
    getSellerDashboard
);

module.exports = router;