import React, { FC, useEffect, useState } from 'react';
import { NavLink, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Segment, Menu, Header as Heading } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import routes from 'routeConstants';

import './header.styles.scss';

const { main, about, login, registration } = routes;

const navLinks = [
    {
        title: 'about',
        route: about.route,
    },
    {
        title: 'login',
        route: login.route,
    },
    {
        title: 'registration',
        route: registration.route,
    },
];

const Header: FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation();
    const [currentPath, setCurrentPath] = useState<string | undefined>(undefined);

    const getCurrentPath = (): string => history.location.pathname.substring(1);

    const updateCurrentPath = (): void => setCurrentPath(getCurrentPath());

    useEffect(() => {
        updateCurrentPath();
    }, [history.location.pathname]);

    const handleItemClick = () => {
        updateCurrentPath();
    };

    return (
        <Segment className="header" inverted>
            <Link to={main.route}>
                <Heading as="h2" className="header__heading">
                    Feed_Me_Back
                </Heading>
            </Link>

            <Menu className="header__menu" inverted pointing secondary>
                {navLinks.map(({ title, route }) => (
                    <Menu.Item
                        key={title}
                        name={title}
                        onClick={handleItemClick}
                        active={currentPath === title}
                        as={NavLink}
                        to={route}
                    >
                        {t(`header.${title}`)}
                    </Menu.Item>
                ))}
            </Menu>
        </Segment>
    );
};

export default withRouter(Header);
