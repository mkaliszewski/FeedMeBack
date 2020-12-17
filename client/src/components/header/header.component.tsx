import React, { FC, useEffect, useState } from 'react';
import { NavLink, Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { Segment, Menu, Header as Heading } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { State } from 'redux/root-reducer.types';
import routes from 'routeConstants';

import './header.styles.scss';

const { main, about, login, registration, account, logout } = routes;

const navLinksNotLogged = [
    {
        title: about.title,
        route: about.route,
    },
    {
        title: login.title,
        route: login.route,
    },
    {
        title: registration.title,
        route: registration.route,
    },
];

const navLinksLogged = [
    {
        title: account.title,
        route: account.route,
    },
    {
        title: logout.title,
        route: logout.route,
    },
];

/**
 * Component used as application header with navigation links
 *
 *
 * @return  {FC} Header component
 *
 * @component
 * @example
 *
 * return (
 *    <Header />
 * )
 *
 */

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

    const user = useSelector((state: State) => state.user.currentUser);

    const navLinks = user ? navLinksLogged : navLinksNotLogged;

    return (
        <Segment className="header" inverted>
            <Link to={main.route}>
                <Heading as="h2" className="header__heading">
                    Feed_Me_Back
                </Heading>
            </Link>

            <Menu className="header__menu" inverted pointing secondary>
                {navLinks.map(({ title, route }) => {
                    const isLogoutOption = title === navLinksLogged[1].title;
                    return (
                        <Menu.Item
                            key={title}
                            name={title}
                            onClick={handleItemClick}
                            active={currentPath === title}
                            as={isLogoutOption ? 'a' : NavLink}
                            to={route}
                            href={isLogoutOption ? route : undefined}
                        >
                            {t(`header.${title}`)}
                        </Menu.Item>
                    );
                })}
            </Menu>
        </Segment>
    );
};

export default withRouter(Header);
