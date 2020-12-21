import { Router } from 'express';

const authController = require('../controllers/authController');

const router = Router();

router.get('/google', authController.authGoogle);
router.get('/google/callback', authController.authGoogleCallback, authController.redirectToMain);

router.get('/facebook', authController.authFacebook);
router.get('/facebook/callback', authController.authFacebookCallback, authController.redirectToMain);

router.post('/login', (req, res, next) => {
    authController.authLogin(req, res, next);
});

module.exports = router;
