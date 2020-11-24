import path from 'path';

const { profileImageBasePath } = require('../models/userModel');

const PROFILE_IMAGE_UPLOAD_PATH = path.join('public', profileImageBasePath);
const IMAGE_MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

const RESPONSE_MESSAGES = {
    SUCCESS: 'Success',
    ADDED: 'Added',
    CREATED: 'Created',
    UPDATED: 'Updated',
    DELETED: 'Deleted',
    NOT_LOGGED_IN: 'User is not logged in',
    NOT_FOUND: 'Not found',
    ALREADY_EXISTS: 'This user already exists',
    ERROR: 'Something went wrong!',
};

const RESPONSE_STATUSES = {
    [RESPONSE_MESSAGES.SUCCESS ||
    RESPONSE_MESSAGES.ADDED ||
    RESPONSE_MESSAGES.UPDATED ||
    RESPONSE_MESSAGES.DELETED]: 200,
    [RESPONSE_MESSAGES.CREATED]: 201,
    [RESPONSE_MESSAGES.NOT_LOGGED_IN]: 403,
    [RESPONSE_MESSAGES.NOT_FOUND]: 404,
    [RESPONSE_MESSAGES.ALREADY_EXISTS]: 409,
    [RESPONSE_MESSAGES.ERROR]: 500,
};

module.exports = { PROFILE_IMAGE_UPLOAD_PATH, IMAGE_MIME_TYPES, RESPONSE_MESSAGES, RESPONSE_STATUSES };
