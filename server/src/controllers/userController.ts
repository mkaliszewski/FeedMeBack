import path from 'path';
import interfaces = require('../interfaces');

const userService = require('../services/userService');

const { RESPONSE_MESSAGES } = require('../helpers/consts');
const { sendResponse, sendFile } = require('../helpers/response');

const currentUser: interfaces.HTTPRequest = (req, res) => {
    if (!req.user) {
        return sendResponse(res, RESPONSE_MESSAGES.NOT_FOUND);
    }

    return sendResponse(res, { result: RESPONSE_MESSAGES.SUCCESS, user: req.user });
};

const logoutUser: interfaces.HTTPRequest = (req, res) => {
    req.logout();
    return res.redirect('/');
};

const registerUser: interfaces.HTTPAsyncRequest = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        sendResponse(res, RESPONSE_MESSAGES.ERROR);
    }

    try {
        const result = await userService.registerUser(username, email, password);

        return sendResponse(res, result);
    } catch (err) {
        console.error(err);
        return sendResponse(res, RESPONSE_MESSAGES.ERROR);
    }
};

const updateUser: interfaces.HTTPAsyncRequest = async (req, res) => {
    const {
        body: { username, password },
        user,
    } = req;

    if (!username || !password) {
        return sendResponse(res, RESPONSE_MESSAGES.NOT_FOUND);
    }

    try {
        const result = await userService.updateUser(username, password, user);

        return sendResponse(res, result);
    } catch (err) {
        console.error(err);
        return sendResponse(res, RESPONSE_MESSAGES.ERROR);
    }
};

const deleteUser: interfaces.HTTPAsyncRequest = async (req, res) => {
    const { user } = req;

    try {
        const result = await userService.deleteUser(user);

        return sendResponse(res, result);
    } catch (err) {
        console.error(err);
        return sendResponse(res, RESPONSE_MESSAGES.ERROR);
    }
};

const getUserImage: interfaces.HTTPAsyncRequestWithFile = async (req, res) => {
    const { user } = req;

    try {
        const result = await userService.getUserImage(user);

        const { imagePath } = await result;
        if (!imagePath || !path.extname(imagePath)) return sendResponse(res, result);

        return sendFile(res, result);
    } catch (err) {
        console.error(err);
        return sendResponse(res, RESPONSE_MESSAGES.ERROR);
    }
};

const updateUserImage: interfaces.HTTPAsyncRequestWithFile = async (req, res) => {
    const fileName = req.file ? req.file.filename : null;
    const { user } = req;

    try {
        const result = await userService.updateUserImage(fileName, user);

        return sendResponse(res, result);
    } catch (err) {
        console.error(err);
        return sendResponse(res, RESPONSE_MESSAGES.ERROR);
    }
};

const deleteUserImage: interfaces.HTTPAsyncRequest = async (req, res) => {
    const { user } = req;

    try {
        const result = await userService.deleteUserImage(user);

        return sendResponse(res, result);
    } catch (err) {
        console.error(err);
        return sendResponse(res, RESPONSE_MESSAGES.ERROR);
    }
};

module.exports = {
    currentUser,
    logoutUser,
    registerUser,
    updateUser,
    deleteUser,
    getUserImage,
    updateUserImage,
    deleteUserImage,
};
