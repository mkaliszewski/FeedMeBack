import interfaces = require('../../interfaces');

const { RESPONSE_MESSAGES } = require('../consts');
const { sendResponse } = require('../response');

const isLoggedIn = (res, req, next): interfaces.HTTPRequest => {
    if (req.user) {
        return next();
    }
    console.log(req.user);
    return sendResponse(res, RESPONSE_MESSAGES.NOT_FOUND);
};

module.exports = isLoggedIn;
