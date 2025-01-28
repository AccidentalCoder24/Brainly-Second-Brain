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
// import cors from "cors" ;
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(cors()) ;
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username; //I will add zod later
    const password = req.body.password;
    try {
        yield db_1.UserModel.create({ username, password });
        res.json({ message: "Congratulations, You are signed up" });
    }
    catch (e) {
        res.status(409).json({ message: "Username already exists" });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existinguser = yield db_1.UserModel.findOne({ username, password });
    if (existinguser) {
        const token = jsonwebtoken_1.default.sign({ id: existinguser._id }, config_1.JWT_SECRET);
        res.json({ token });
    }
    else {
        res.status(403).json({ message: "Wrong username or password" });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, type, link } = req.body;
    yield db_1.ContentModel.create({
        //@ts-ignore
        title, type, link, userId: req.userId, tags: []
    });
    res.json({ message: "Content Added" });
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_1.ContentModel.find({ userId: userId }).populate("userId", "username");
    res.json(content);
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    //@ts-ignore
    yield db_1.ContentModel.deleteMany(contentId, { userId: req.userId });
    res.json({ message: "Successfully deleted" });
}));
app.post("/api/v1/brain/share", (req, res) => {
});
app.post("/api/v1/brain/:shareLink", (req, res) => {
});
app.listen(3000);
