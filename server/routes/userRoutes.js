const express = require("express");
const router = express.Router();

const { 
    getMyProfile,
    updateProfile
 } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Get logged-in user's profile
router.get("/profile", authMiddleware, getMyProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;