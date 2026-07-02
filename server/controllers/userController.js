const User = require("../models/User");

const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching profile",
            error: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user.id);

        if(!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if(name) user.name = name;
        if(email) user.email = email;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating profile",
            error: error.message
        });
    }
};

module.exports = {
    getMyProfile,
    updateProfile
};