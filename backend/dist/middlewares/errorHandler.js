"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorHandler;
function errorHandler(err, _req, res, _next) {
    res.status(err.status || 500).json({
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "Something went wrong"
    });
}
