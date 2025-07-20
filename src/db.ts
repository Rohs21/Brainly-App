import {Model, Schema} from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true },
    password:  String
});


export const userModel = new Model(UserSchema, 'user');


