import React from 'react';
import { fireEvent, waitFor, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '__test__/mocks/mockStore';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { API_ROUTES } from 'API';
import renderWithRouter from '__test__/utils/renderWithRouter';
import mockRequest from '__test__/utils/fetchMock';

import LoginPanel from './login-panel.component';

const initialRoute = '/login';

const renderLoginPanel = (storeData) => {
    const utils = renderWithRouter(
        <Provider store={mockStore(storeData)}>
            <LoginPanel />
        </Provider>,
        { route: initialRoute }
    );

    return { ...utils };
};

const inputs = [
    {
        name: 'email',
        label: 'login.email',
        errorRequired: 'login.errors.required',
    },
    {
        name: 'password',
        label: 'login.password',
        errorRequired: 'login.errors.required',
    },
];

const mockUser = {
    email: 'testuser@test.com',
    password: 'testuser12345',
};

describe('LoginPanel', () => {
    it('renders without crashing', () => {
        const { unmount } = renderLoginPanel();

        unmount();
    });

    it('has submit button', () => {
        const { getByText } = renderLoginPanel();
        const submitButton = getByText('login.logIn');

        expect(submitButton).toBeInTheDocument();
    });

    it('has AuthButtons component', () => {
        const { getByText } = renderLoginPanel();
        const authButtonsComponent = getByText('login.logIn');

        expect(authButtonsComponent).toBeInTheDocument();
    });

    describe('has input for:', () => {
        inputs.forEach(({ name, label }) => {
            it(name, () => {
                const { getByLabelText } = renderLoginPanel();
                const input = getByLabelText(label);

                expect(input).toBeInTheDocument();
            });
        });
    });

    describe('handles error messages for:', () => {
        inputs.forEach(({ name, label, errorRequired }) => {
            it(name, async () => {
                const { getByLabelText, getByText } = renderLoginPanel();
                const field = getByLabelText(label);

                fireEvent.change(field, { target: { value: 'abc' } });

                fireEvent.change(field, { target: { value: '' } });

                await waitFor(() => {
                    const error = getByText(errorRequired);

                    expect(error).toBeInTheDocument();
                });
            });
        });
    });

    it('redirects to main page after succesfull login', async () => {
        const { getByLabelText, getByText, history } = renderLoginPanel();
        mockRequest('post', API_ROUTES.LOGIN_USER, 200, { message: 'Login completed' });
        mockRequest('get', API_ROUTES.USER, 200, { user: 'example user' });

        const submitButton = getByText('login.logIn');
        const emailField = getByLabelText(inputs[0].label);
        const passwordField = getByLabelText(inputs[1].label);

        fireEvent.change(emailField, { target: { value: mockUser.email } });
        fireEvent.change(passwordField, { target: { value: mockUser.password } });

        await waitFor(() => {
            expect(history.location.pathname).toBe(initialRoute);
            fireEvent.click(submitButton);
        });

        expect(history.location.pathname).toBe('/');
    });

    describe('shows error', () => {
        beforeEach(async () => {
            const { getByLabelText } = renderLoginPanel();

            const emailField = getByLabelText(inputs[0].label);
            const passwordField = getByLabelText(inputs[1].label);

            await act(async () => {
                fireEvent.change(emailField, { target: { value: mockUser.email } });
                fireEvent.change(passwordField, { target: { value: mockUser.password } });
            });
        });
        it('after attempt to log in with not matching email/password account', async () => {
            mockRequest('post', API_ROUTES.LOGIN_USER, 401, { message: 'Credtials doesnt match' });
            const submitButton = screen.getByText('login.logIn');

            fireEvent.click(submitButton);

            await waitFor(() => {
                const error = screen.getByText('login.errors.doesntMatch');
                expect(error).toBeInTheDocument();
            });
        });

        it('after attempt to log in to not existing account', async () => {
            mockRequest('post', API_ROUTES.LOGIN_USER, 404, { message: 'Account doesnt exist' });
            const submitButton = screen.getByText('login.logIn');

            fireEvent.click(submitButton);

            await waitFor(() => {
                const error = screen.getByText('login.errors.doesntExist');
                expect(error).toBeInTheDocument();
            });
        });
        it('for unexpected errors', async () => {
            mockRequest('post', API_ROUTES.LOGIN_USER, 500, { message: 'Some random error' });
            const submitButton = screen.getByText('login.logIn');

            fireEvent.click(submitButton);

            await waitFor(() => {
                const error = screen.getByText('login.errors.default');
                expect(error).toBeInTheDocument();
            });
        });
    });
});
