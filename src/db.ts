import {model, Schema} from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true },
    password:  String
});


export const UserModel = model('user',UserSchema);


