const jwt = require("jsonwebtoken");
const config = require('../config/config');

const verifyToken = (req, res, next) => {
    // const token = req.header("Authorization");

    const token = req.body.token || req.query.token || req.headers['authorization'];
    if (!token) 
    { 
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // const decoded = jwt.verify(token.split(" ")[1],config.secret_jwt);
        decoded = jwt.verify(token,config.secret_jwt)
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
