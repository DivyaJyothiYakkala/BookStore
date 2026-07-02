const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: "No token, access denied" });
    }

    //format: Bearer token
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "secretkey");

        req.user = decoded;
        next();
    }catch (error) {
        res.status(401).json({ message: "Invalid token"});
    }
};

module.exports = authMiddleware;