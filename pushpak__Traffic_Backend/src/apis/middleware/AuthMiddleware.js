const jwt = require('jsonwebtoken');
require('dotenv').config();

// --- This is for Login --- \\
exports.Login = (req, res, next) => {
    next()
}
// --- This is for Login --- \\



// --- Admin JWT Token Validation --- \\
exports.Auth = (req, res, next) => {
    var token = req.headers.token;
    if (token === null || token === "") return res.json({ success: false, message: "Token should not be null" });
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.json({ success: false, message: "This token has been expired." })
        } else {
            req.decoded = decoded
            next();
        }
    });
}
// --- Admin JWT Token Validation --- \\
