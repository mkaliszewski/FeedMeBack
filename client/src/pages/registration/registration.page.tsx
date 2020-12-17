import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import HeadingBlock from 'components/shared/heading-block/heading-block.component';
import RegistrationPanel from 'components/registration-panel/registration-panel.component';

/**
 * Component used as registration page
 *
 * @return  {FC} RegistrationPage component
 *
 * @component
 * @example
 *
 * return (
 *    <RegistrationPage />
 * )
 *
 */

const RegistrationPage: FC = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <HeadingBlock iconName="signup" text={t('registration.subHeading')} />
            <RegistrationPanel />
        </Container>
    );
};
export default RegistrationPage;
