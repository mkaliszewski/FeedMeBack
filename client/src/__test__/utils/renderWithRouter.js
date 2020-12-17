import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderWithRouter = (
    children,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
) => {
    return {
        ...render(<Router history={history}>{children}</Router>),
        history,
    };
};

export default renderWithRouter;
