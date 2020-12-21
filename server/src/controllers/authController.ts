import passport from 'passport';
import interfaces = require('../interfaces');

const { sendResponse } = require('../helpers/response');
const { RESPONSE_MESSAGES } = require('../helpers/consts');

const authGoogle = passport.authenticate('google', { scope: ['email', 'profile'] });
const authGoogleCallback = passport.authenticate('google');
const authFacebook = passport.authenticate('facebook', { scope: ['email'] });
const authFacebookCallback = passport.authenticate('facebook', { scope: ['email'] });

const redirectToMain: interfaces.HTTPRequest = (req, res) => {
    return res.redirect('/');
};

const authLogin: interfaces.HTTPRequest = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return sendResponse(res, info);
        }
        return req.login(user, (error) => {
            if (error) return sendResponse(res, RESPONSE_MESSAGES.ERROR);

            return sendResponse(res, RESPONSE_MESSAGES.SUCCESS);
        });
    })(req, res, next);
};

module.exports = {
    authGoogle,
    authGoogleCallback,
    authFacebook,
    authFacebookCallback,
    redirectToMain,
    authLogin,
};
