import React, { FC, FormEvent, useState } from 'react';
import StripeCheckout, { Token } from 'react-stripe-checkout';

const StripeButton: FC = () => {
    const [price, setPrice] = useState(0);

    const handlePriceChange = ({ currentTarget }: FormEvent) => {
        const { value } = currentTarget as HTMLInputElement;
        const inputValue = parseInt(value, 10);
        setPrice(inputValue);
    };

    const onToken = (token: Token): void => {
        console.log(token);
    };

    return (
        <div>
            <input type="number" onChange={handlePriceChange} value={price} />
            <StripeCheckout
                label="Zapłać"
                name="FeedMeBack"
                billingAddress
                shippingAddress
                description={`Your total is $${price}`}
                amount={price * 100}
                panelLabel="Pay Now"
                token={onToken}
                stripeKey={process.env.REACT_APP_STRIPE_KEY as string}
            >
                <button type="button">Dodaj kredyty</button>
            </StripeCheckout>
        </div>
    );
};

export default StripeButton;
