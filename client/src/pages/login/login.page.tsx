import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import HeadingBlock from 'components/shared/heading-block/heading-block.component';
import LoginPanel from 'components/login-panel/login-panel.component';

/**
 * Component used as login page
 *
 * @return  {FC} LoginPage component
 *
 * @component
 * @example
 *
 * return (
 *    <LoginPage />
 * )
 *
 */

const LoginPage: FC = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <HeadingBlock iconName="sign-in" text={t('login.subHeading')} />
            <LoginPanel />
        </Container>
    );
};
export default LoginPage;
