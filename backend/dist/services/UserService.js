"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
exports.UserService = {
    async login(username, password) {
        return await UserRepository_1.UserRepository.login(username, password);
    },
    async getCurrentUser(id) {
        const user = await UserRepository_1.UserRepository.findById(id);
        if (!user)
            throw new Error("User not found");
        return user;
    }
};
