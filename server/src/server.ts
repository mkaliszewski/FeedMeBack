import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

require('./models/userModel');
require('./services/authService');

const { MONGO_URI, COOKIE_KEY } = require('./config/keys');

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to database'));

const app = express();

app.use(express.urlencoded({ extended: false, limit: '5mb' }));
app.use(express.json());

const COOKIES_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
app.use(
    cookieSession({
        maxAge: COOKIES_MAX_AGE,
        keys: [COOKIE_KEY],
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api/user', userRouter);

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    return res.status(500).send({ errorMessage: error.toString() });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('You are connected to the server');
});
