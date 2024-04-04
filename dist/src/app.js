"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios = require('axios');
const app = (0, express_1.default)();
const PORT = 3000;
app.get('/', (req, res) => res.send('Hello, world!'));
app.get('/users/group-by-department', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch users from the external API
        const response = yield axios.get('https://dummyjson.com/users');
        const users = response.data.users;
        // Transform the data to group by department
        const usersByDepartment = users.reduce((acc, user) => {
            const department = user.company.department;
            if (!acc[department]) {
                acc[department] = [];
            }
            acc[department].push(user);
            return acc;
        }, {});
        // Respond with the transformed data
        res.json(usersByDepartment);
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('An error occurred while fetching user data.');
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
exports.default = app;
