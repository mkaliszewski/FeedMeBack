import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

interface ReqRes {
    req: Request;
    res: Response;
    next: NextFunction;
}
interface HTTPRequest {
    (req: Request, res: Response, next: NextFunction): void;
}

interface HTTPAsyncRequest {
    (req: Request, res: Response, next: NextFunction): Promise<any>;
}

interface RequestWithFile extends Request {
    file: any;
}
interface HTTPAsyncRequestWithFile {
    (req: RequestWithFile, res: Response, next: NextFunction): Promise<any>;
}

interface User {
    username: string;
    email?: string;
    password?: string;
    idGoogle?: string;
    idFacebook?: string;
    socialProvider?: string;
    profileImageName?: string;
}

export interface UserDocument extends Document, User {}

export { ReqRes, HTTPRequest, HTTPAsyncRequest, HTTPAsyncRequestWithFile, UserDocument };
