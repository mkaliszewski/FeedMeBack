import { Response } from 'express';

const { RESPONSE_STATUSES } = require('./consts');

const sendResponse = (res: Response, payload: any): Response => {
    if (typeof payload === 'string') {
        return res.status(RESPONSE_STATUSES[payload] || 200).json({ message: payload });
    }

    const { result, ...data } = payload;
    return res.status(RESPONSE_STATUSES[result]).json({ message: result, ...data });
};

const sendFile = (res: Response, payload: any): void => {
    const { result, imagePath } = payload;
    return res.status(RESPONSE_STATUSES[result]).sendFile(imagePath);
};

module.exports = { sendResponse, sendFile };
