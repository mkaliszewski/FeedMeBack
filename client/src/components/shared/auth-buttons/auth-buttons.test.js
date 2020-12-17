import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { API_ROUTES } from 'API';
import renderWithRouter from '__test__/utils/renderWithRouter';
import routes from 'routeConstants';

import AuthButtons from './auth-buttons.component';

const defaultProps = {
    page: 'login',
};

const renderAuthButtons = (props = defaultProps) => {
    const utils = renderWithRouter(<AuthButtons {...props} />);

    return { ...utils };
};

const registrationData = {
    action: 'registration.logIn',
    route: routes.login.route,
};

const loginData = {
    action: 'login.createAcc',
    route: routes.registration.route,
};

const socialProviders = {
    facebook: {
        name: 'Facebook',
        link: API_ROUTES.AUTH_FACEBOOK,
    },
    google: {
        name: 'Google',
        link: API_ROUTES.AUTH_GOOGLE,
    },
};

describe('AuthButtons', () => {
    it('renders without crashing', () => {
        const { unmount } = renderAuthButtons();

        unmount();
    });

    it('has facebook and google icon', () => {
        const { getByText } = renderAuthButtons();
        const facebookIcon = getByText(socialProviders.facebook.name);
        const googleIcon = getByText(socialProviders.google.name);

        expect(facebookIcon).toBeInTheDocument();
        expect(googleIcon).toBeInTheDocument();
    });

    it('has link to facebook and google auth', () => {
        const { getAllByRole } = renderAuthButtons();
        const buttons = getAllByRole('button');
        const facebookButton = buttons[0];
        const googleButton = buttons[1];
        const linkAttr = 'href';

        expect(facebookButton).toHaveAttribute(linkAttr, socialProviders.facebook.link);
        expect(googleButton).toHaveAttribute(linkAttr, socialProviders.google.link);
    });

    describe('for login page', () => {
        it('calls link to registration after click on it', () => {
            const { getByText, history } = renderAuthButtons();
            const linkToRegistration = getByText(loginData.action);
            const historyPushSpy = jest.spyOn(history, 'push');

            expect(historyPushSpy).not.toHaveBeenCalled();

            fireEvent.click(linkToRegistration);

            expect(historyPushSpy).toHaveBeenCalledTimes(1);
            expect(historyPushSpy).toHaveBeenCalledWith(loginData.route);
        });
    });

    describe('for registration page', () => {
        it('calls link to login after click on it', () => {
            const customProps = { page: 'registration' };
            const { getByText, history } = renderAuthButtons(customProps);
            const linkToLogin = getByText(registrationData.action);
            const historyPushSpy = jest.spyOn(history, 'push');

            expect(historyPushSpy).not.toHaveBeenCalled();

            fireEvent.click(linkToLogin);

            expect(historyPushSpy).toHaveBeenCalledTimes(1);
            expect(historyPushSpy).toHaveBeenCalledWith(registrationData.route);
        });
    });
});
