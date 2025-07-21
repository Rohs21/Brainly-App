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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000);
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = yield db_1.UserModel.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    yield db_1.UserModel.create({ username, password });
    return res.json({ message: "User signed up successfully" });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existinguser = yield db_1.UserModel.findOne({
        username: username,
        password: password
    });
    if (existinguser) {
        const token = jsonwebtoken_1.default.sign({ id: existinguser._id }, config_1.JWT_SECRET);
        res.json({
            message: "User Signin successfully",
            token: token
        });
    }
    else {
        res.status(401).json({
            message: "Incorrect Credentials"
        });
    }
}));
app.post('/api/v1/content', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_1.ContentModel.create({
        link,
        type,
        //@ts-ignore-
        userId: req.userId,
        tags: []
    });
    res.json({
        msg: "content added"
    });
}));
app.get("/api/v1/content", (req, res) => {
});
app.delete("/api/v1/content", (req, res) => {
});
app.post("/api/v1/brain/share", (req, res) => {
});
app.get("/api/v1/brain/:shareLink", (req, res) => {
});
