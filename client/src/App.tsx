import React, { FC } from 'react';
import StripeButton from './components/payments/stripe-button.component';

const App: FC = () => {
    return (
        <div className="app">
            <StripeButton />
        </div>
    );
};

export default App;
