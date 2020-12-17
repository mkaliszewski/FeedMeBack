import React from 'react';
import renderWithRouter from '__test__/utils/renderWithRouter';
import { Provider } from 'react-redux';
import { fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { mockStore } from '__test__/mocks/mockStore';
import routes from 'routeConstants';

import Header from './header.component';

const { main, about, login, registration, account, logout } = routes;

const renderHeader = (storeData) => {
    const utils = renderWithRouter(
        <Provider store={mockStore(storeData)}>
            <Header />
        </Provider>
    );

    return { ...utils };
};

const mainHeadingText = 'Feed_Me_Back';

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

describe('Header', () => {
    it('has main heading', () => {
        const { getByText } = renderHeader();
        const heading = getByText(mainHeadingText);

        expect(heading).toBeInTheDocument();
    });

    it('redirects to main page after click on main heading', () => {
        const { getByText, history } = renderHeader();
        const heading = getByText(mainHeadingText);
        const historyPushSpy = jest.spyOn(history, 'push');

        expect(historyPushSpy).not.toHaveBeenCalled();

        fireEvent.click(heading);

        expect(historyPushSpy).toHaveBeenCalledTimes(1);
        expect(historyPushSpy).toHaveBeenCalledWith(main.route);
    });

    describe('for not logged user it has all links and redirects to:', () => {
        navLinksNotLogged.forEach(({ title, route }) => {
            it(title, () => {
                const { getByText, history } = renderHeader();
                const historyPushSpy = jest.spyOn(history, 'push');

                const link = getByText(`header.${title}`);

                expect(link).toBeInTheDocument();
                expect(historyPushSpy).not.toHaveBeenCalled();

                fireEvent.click(link);

                expect(historyPushSpy).toHaveBeenCalledTimes(1);
                expect(history.location.pathname).toBe(route);
            });
        });
    });

    describe('for logged user it has links to:', () => {
        navLinksLogged.forEach(({ title, route }) => {
            it(title, () => {
                const customStoreData = { user: { currentUser: 'user' } };
                const { getByText, history } = renderHeader(customStoreData);

                const historyPushSpy = jest.spyOn(history, 'push');

                const link = getByText(`header.${title}`);

                expect(link).toBeInTheDocument();
                expect(historyPushSpy).not.toHaveBeenCalled();

                if (title === account.title) {
                    fireEvent.click(link);

                    expect(historyPushSpy).toHaveBeenCalledTimes(1);
                    expect(history.location.pathname).toBe(route);
                }
            });
        });
    });
});
