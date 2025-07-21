import express from 'express';
import jwt from 'jsonwebtoken';
import { ContentModel, UserModel } from './db';
import { userMiddleware } from './middleware';
import { JWT_SECRET } from "./config"; 

const app = express();
app.use(express.json());
app.listen(3000);

app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    await UserModel.create({ username, password });

    return res.json({ message: "User signed up successfully" });
});


app.post("/api/v1/signin", async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existinguser = await UserModel.findOne({
         username: username, 
         password: password 
    });
    if(existinguser) {
        const token = jwt.sign({ id: existinguser._id }, JWT_SECRET);
        res.json({
            message: "User Signin successfully",
            token: token
        })
    } else {
        res.status(401).json({
            message:"Incorrect Credentials"
        });
    }

})


app.post('/api/v1/content', userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,
        type,
        //@ts-ignore-
        userId: req.userId,
        tags: []
    })

    res.json({
        msg: "content added"
    })

})


app.get("/api/v1/content", (req, res) => {

});



app.delete("/api/v1/content", (req, res) => {

});


app.post("/api/v1/brain/share", (req, res) => {

})   



app.get("/api/v1/brain/:shareLink", (req, res) => {

});