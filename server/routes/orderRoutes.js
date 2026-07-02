const express = require("express");
const router = express.Router();

const { 
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
 } = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

const roleMiddleware = require("../middlewares/roleMiddleware");

router.get(
    "/all",
    authMiddleware,
    roleMiddleware("admin"),
    getAllOrders,
);

router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("admin"),
    updateOrderStatus
);

router.get("/", authMiddleware, getMyOrders);

router.post("/", authMiddleware, placeOrder);

module.exports = router;