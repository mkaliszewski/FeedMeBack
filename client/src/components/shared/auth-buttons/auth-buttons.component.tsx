import React, { FC } from 'react';
import { Container, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_ROUTES } from 'API';
import routes from 'routeConstants';

import './auth-buttons.styles.scss';

type Role = 'registration' | 'login';

interface Props {
    page: Role;
}

/**
 * Component used as buttons which gives ability to auth via facebook or google
 *
 * @param   {string} page has value of registration or login, it indicates appropriate text with buttons
 * @return  {FC} AuthButtons component
 *
 * @component
 * @example
 *
 * return (
 *    <AuthButtons page="login" />
 * )
 *
 */

const AuthButtons: FC<Props> = ({ page }) => {
    const { t } = useTranslation();
    const { login, registration } = routes;

    const registrationData = {
        hasAccount: 'registration.hasAccount',
        action: 'registration.logIn',
        route: login.route,
    };

    const loginData = {
        hasAccount: 'login.hasAccount',
        action: 'login.createAcc',
        route: registration.route,
    };

    const data = page === 'registration' ? registrationData : loginData;

    return (
        <Container className="auth-buttons">
            {t(data.hasAccount)} <Link to={data.route}>{t(data.action)}</Link> {t('registration.or')}:
            <Container className="auth-buttons__social-buttons-container">
                <Button color="facebook" href={API_ROUTES.AUTH_FACEBOOK}>
                    <Icon name="facebook" /> Facebook
                </Button>
                <Button color="google plus" href={API_ROUTES.AUTH_GOOGLE}>
                    <Icon name="google" /> Google
                </Button>
            </Container>
        </Container>
    );
};

export default AuthButtons;
