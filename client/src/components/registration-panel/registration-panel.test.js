import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '__test__/mocks/mockStore';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { API_ROUTES } from 'API';
import renderWithRouter from '__test__/utils/renderWithRouter';
import mockRequest from '__test__/utils/fetchMock';

import RegistrationPanel from './registration-panel.component';

const renderRegistrationPanel = (storeData) => {
    const utils = renderWithRouter(
        <Provider store={mockStore(storeData)}>
            <RegistrationPanel />
        </Provider>
    );

    return { ...utils };
};

const inputs = [
    {
        name: 'username',
        label: 'registration.username',
        errorRequired: 'registration.errors.required',
        errorLength: 'registration.errors.usernameLength',
    },
    {
        name: 'email',
        label: 'registration.email',
        errorRequired: 'registration.errors.required',
    },
    {
        name: 'password',
        label: 'registration.password',
        errorRequired: 'registration.errors.required',
        errorLength: 'registration.errors.passwordLength',
    },
    {
        name: 'repeat password',
        label: 'registration.repeatPassword',
        errorRequired: 'registration.errors.required',
        errorLength: 'registration.errors.passwordLength',
    },
];

const mockUser = {
    username: 'testuser',
    email: 'testuser@test.com',
    password: 'testuser12345',
};

describe('RegistrationPanel', () => {
    it('renders without crashing', () => {
        const { unmount } = renderRegistrationPanel();

        unmount();
    });

    it('has submit button', () => {
        const { getByText } = renderRegistrationPanel();
        const submitButton = getByText('registration.createAcc');

        expect(submitButton).toBeInTheDocument();
    });

    it('has AuthButtons component', () => {
        const { getByText } = renderRegistrationPanel();
        const authButtonsComponent = getByText('registration.logIn');

        expect(authButtonsComponent).toBeInTheDocument();
    });

    describe('has input for:', () => {
        inputs.forEach(({ name, label }) => {
            it(name, () => {
                const { getByLabelText } = renderRegistrationPanel();
                const input = getByLabelText(label);

                expect(input).toBeInTheDocument();
            });
        });
    });

    describe('handles error messages for:', () => {
        inputs.forEach((input) => {
            it(input.name, async () => {
                const { name, label, errorRequired } = input;
                const { getByLabelText, getByText } = renderRegistrationPanel();
                const field = getByLabelText(label);

                fireEvent.change(field, { target: { value: 'abc' } });

                await waitFor(() => {
                    if (name !== 'email') {
                        const { errorLength } = input;
                        const error = getByText(errorLength);

                        expect(error).toBeInTheDocument();
                    }
                });

                fireEvent.change(field, { target: { value: '' } });

                await waitFor(() => {
                    const error = getByText(errorRequired);

                    expect(error).toBeInTheDocument();
                });
            });
        });
    });

    it('shows error message when passwords are not the same', async () => {
        const { getByLabelText, getByText } = renderRegistrationPanel();

        const passwordField = getByLabelText(inputs[2].label);
        const repeatPasswordField = getByLabelText(inputs[3].label);

        fireEvent.change(passwordField, { target: { value: 'abcdefgh' } });
        fireEvent.change(repeatPasswordField, { target: { value: 'hgfedcba' } });

        await waitFor(() => {
            const error = getByText('registration.errors.noMatch');
            expect(error).toBeInTheDocument();
        });
    });

    it('redirects to login page after succesfull registration', async () => {
        const { getByLabelText, getByText, history } = renderRegistrationPanel();
        mockRequest('post', API_ROUTES.USER, 201, { message: 'Registration completed' });

        const submitButton = getByText('registration.createAcc');
        const usernameField = getByLabelText(inputs[0].label);
        const emailField = getByLabelText(inputs[1].label);
        const passwordField = getByLabelText(inputs[2].label);
        const repeatPasswordField = getByLabelText(inputs[3].label);

        fireEvent.change(usernameField, { target: { value: mockUser.username } });
        fireEvent.change(emailField, { target: { value: mockUser.email } });
        fireEvent.change(passwordField, { target: { value: mockUser.password } });
        fireEvent.change(repeatPasswordField, { target: { value: mockUser.password } });

        await waitFor(() => {
            expect(history.location.pathname).toBe('/');
            fireEvent.click(submitButton);
        });

        expect(history.location.pathname).toBe('/login');
    });

    it('shows error after attempt to register account with te same email as in database', async () => {
        const { getByLabelText, getByText } = renderRegistrationPanel();
        mockRequest('post', API_ROUTES.USER, 409, { message: 'There is already user with that email' });

        const submitButton = getByText('registration.createAcc');
        const usernameField = getByLabelText(inputs[0].label);
        const emailField = getByLabelText(inputs[1].label);
        const passwordField = getByLabelText(inputs[2].label);
        const repeatPasswordField = getByLabelText(inputs[3].label);

        fireEvent.change(usernameField, { target: { value: mockUser.username } });
        fireEvent.change(emailField, { target: { value: mockUser.email } });
        fireEvent.change(passwordField, { target: { value: mockUser.password } });
        fireEvent.change(repeatPasswordField, { target: { value: mockUser.password } });

        await waitFor(() => {
            fireEvent.click(submitButton);
        });

        const error = getByText('registration.errors.alreadyExists');
        expect(error).toBeInTheDocument();
    });

    it('shows default error for unexpected errors', async () => {
        const { getByLabelText, getByText } = renderRegistrationPanel();
        mockRequest('post', API_ROUTES.USER, 500, { message: 'Some random error' });

        const submitButton = getByText('registration.createAcc');
        const usernameField = getByLabelText(inputs[0].label);
        const emailField = getByLabelText(inputs[1].label);
        const passwordField = getByLabelText(inputs[2].label);
        const repeatPasswordField = getByLabelText(inputs[3].label);

        fireEvent.change(usernameField, { target: { value: mockUser.username } });
        fireEvent.change(emailField, { target: { value: mockUser.email } });
        fireEvent.change(passwordField, { target: { value: mockUser.password } });
        fireEvent.change(repeatPasswordField, { target: { value: mockUser.password } });

        await waitFor(() => {
            fireEvent.click(submitButton);
        });

        const error = getByText('registration.errors.default');
        expect(error).toBeInTheDocument();
    });
});
