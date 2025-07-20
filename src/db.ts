import mongoose, {model, Schema} from 'mongoose';

mongoose.connect("mongodb+srv://rohans212004:Rohans%4021@cluster0.vcoskqh.mongodb.net/Brainly-App")

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password:  String
});


export const UserModel = model('user',UserSchema);


