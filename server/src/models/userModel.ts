import { Schema, model } from 'mongoose';
import path from 'path';
import interfaces = require('../interfaces');

const profileImageBasePath = 'uploads/profilePictures';

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        idGoogle: {
            type: String,
        },
        idFacebook: {
            type: String,
        },
        socialProvider: {
            type: String,
        },
        profileImageName: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.virtual('profileImagePath').get(function (this: interfaces.UserDocument) {
    return this.profileImageName ? path.join('public', profileImageBasePath, this.profileImageName) : null;
});

module.exports = model<interfaces.UserDocument>('User', userSchema);
module.exports.profileImageBasePath = profileImageBasePath;
