import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import interfaces = require('../interfaces');

const { PROFILE_IMAGE_UPLOAD_PATH, RESPONSE_MESSAGES } = require('../helpers/consts');

const User = require('../models/userModel');

interface ResponseWithPayload {
    result: string;
    imagePath?: string;
}

type ServiceFunction = Promise<string | ResponseWithPayload>;

const registerUser = async (username: string, email: string, password: string): Promise<any> => {
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return RESPONSE_MESSAGES.ALREADY_EXISTS;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        return RESPONSE_MESSAGES.CREATED;
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
};

const updateUser = async (username: string, password: string, user: interfaces.UserDocument): ServiceFunction => {
    try {
        const updatedHashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(user.id, { username, password: updatedHashedPassword }, { new: true });

        return RESPONSE_MESSAGES.UPDATED;
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
};

const deleteUser = async (user: interfaces.UserDocument): ServiceFunction => {
    try {
        await User.findByIdAndDelete(user.id);
        return RESPONSE_MESSAGES.DELETED;
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
};

const getUserImage = async (user: interfaces.UserDocument): ServiceFunction => {
    try {
        const existingUser = await User.findById(user.id);

        if (!existingUser.profileImagePath) {
            return {
                result: RESPONSE_MESSAGES.NOT_FOUND,
                imagePath: '',
            };
        }

        const imagePath = path.resolve(existingUser.profileImagePath);

        return {
            result: RESPONSE_MESSAGES.SUCCESS,
            imagePath,
        };
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
};

const deleteProfilePicture = (fileName: string): void => {
    fs.unlink(path.join(PROFILE_IMAGE_UPLOAD_PATH, fileName), (err) => (err ? console.error(err) : null));
};
const updateUserImage = async (fileName: string, user: interfaces.UserDocument): ServiceFunction => {
    try {
        const existingUser = await User.findById(user.id);

        if (existingUser.profileImageName) {
            deleteProfilePicture(existingUser.profileImageName);
        }

        existingUser.profileImageName = fileName;

        await existingUser.save();

        return RESPONSE_MESSAGES.UPDATED;
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
};

const deleteUserImage = async (user: interfaces.UserDocument): ServiceFunction => {
    try {
        const existingUser = await User.findById(user.id);

        deleteProfilePicture(existingUser.profileImageName);
        existingUser.profileImageName = '';

        await existingUser.save();

        return RESPONSE_MESSAGES.DELETED;
    } catch (err) {
        console.error(err);
        return RESPONSE_MESSAGES.ERROR;
    }
};

module.exports = {
    registerUser,
    updateUser,
    deleteUser,
    getUserImage,
    updateUserImage,
    deleteUserImage,
};
