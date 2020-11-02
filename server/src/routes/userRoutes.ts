import { Router, Request } from 'express';
import multer from 'multer';

const { PROFILE_IMAGE_UPLOAD_PATH, IMAGE_MIME_TYPES } = require('../helpers/consts');

const userController = require('../controllers/userController');

interface DoneCallback {
    (arg1: null, arg2: boolean | string): void;
}

const storage = multer.diskStorage({
    destination: (_req: Request, _file: any, done: DoneCallback): void => {
        done(null, PROFILE_IMAGE_UPLOAD_PATH);
    },
    filename: (req: Request, file: any, done: DoneCallback): void => {
        done(null, Date.now() + file.originalname);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (_req: Request, file: any, done: DoneCallback): void => {
        done(null, IMAGE_MIME_TYPES.includes(file.mimetype));
    },
});

const router = Router();

router.get('/', userController.currentUser);
router.post('/', userController.registerUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);

router.get('/logout', userController.logoutUser);

router.get('/image', userController.getUserImage);
router.put('/image', upload.single('image'), userController.updateUserImage);
router.delete('/image', userController.deleteUserImage);

module.exports = router;
