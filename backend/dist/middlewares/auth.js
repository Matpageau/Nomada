"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            error: "Token required"
        });
        return;
    }
    const jwtSecret = process.env.JWT_SECRET;
    jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
        if (err || !decoded) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.userId = decoded.userId;
        next();
    });
}
