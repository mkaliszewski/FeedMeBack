/* eslint-disable import/order */
import { Router, Request, Response } from 'express';

const { STRIPE_SECRET_KEY } = require('../config/keys');

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const {
        body: { id },
    } = req;

    const charge = await stripe.charges.create({
        amount: 100,
        currency: 'usd',
        description: 'Some description',
        source: id,
    });
    res.send('ok');
});

module.exports = router;
