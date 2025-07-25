import mongoose, { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI not found in .env file");
}

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ DB connected"))
    .catch((err) => console.error("❌ DB connection error:", err));

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    type: String,
    userId: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
});

const LinkShare = new Schema({
    hash: String,
    userId: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true }],
});

export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Share", LinkShare);
