import React from 'react';
import { render } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mockStore } from '__test__/mocks/mockStore';
import renderWithRouter from '__test__/utils/renderWithRouter';

import LoginPage from './login.page';

const renderLoginPage = () => {
    const utils = renderWithRouter(
        <Provider store={mockStore()}>
            <LoginPage />
        </Provider>
    );

    return { ...utils };
};

describe('LoginPage', () => {
    it('renders without crashing', () => {
        const { unmount } = renderLoginPage();

        unmount();
    });

    it('contains HeadingBlock component', () => {
        const { getByText } = renderLoginPage();
        const headingBlockComponent = getByText('login.subHeading');

        expect(headingBlockComponent).toBeInTheDocument();
    });

    it('contains LoginPanel component', () => {
        const { getByText } = renderLoginPage();
        const loginPanelComponent = getByText('login.logIn');

        expect(loginPanelComponent).toBeInTheDocument();
    });
});
