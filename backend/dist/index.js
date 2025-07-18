"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const MainRouter_1 = __importDefault(require("./Routes/MainRouter"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", MainRouter_1.default);
app.use(errorHandler_1.default);
const uri = process.env.DATABASE_URL;
const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true }
};
mongoose_1.default.connect(uri, clientOptions)
    .then(() => {
    console.log("Connected to database");
})
    .catch((err) => {
    console.error("Error while connecting to MongoDB", err);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
