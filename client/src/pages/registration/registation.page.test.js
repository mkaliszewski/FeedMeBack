import React from 'react';
import { render } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mockStore } from '__test__/utils/store';
import renderWithRouter from '__test__/utils/renderWithRouter';

import RegistrationPage from './registration.page';

const store = mockStore();

const renderLoginPage = () => {
    const utils = renderWithRouter(
        <Provider store={store}>
            <RegistrationPage />
        </Provider>
    );

    return { ...utils };
};

describe('RegistrationPage', () => {
    it('renders without crashing', () => {
        const { unmount } = renderLoginPage();

        unmount();
    });

    it('contains HeadingBlock component', () => {
        const { getByText } = renderLoginPage();
        const headingBlockComponent = getByText('registration.subHeading');

        expect(headingBlockComponent).toBeInTheDocument();
    });

    it('contains RegistrationPanel component', () => {
        const { getByText } = renderLoginPage();
        const registrationPanelComponent = getByText('registration.createAcc');

        expect(registrationPanelComponent).toBeInTheDocument();
    });
});
