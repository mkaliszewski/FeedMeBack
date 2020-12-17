import { API_ROUTES } from 'API';

const routes = {
    main: {
        title: 'homepage',
        route: '/',
    },
    about: {
        title: 'about',
        route: '/about',
    },
    login: {
        title: 'login',
        route: '/login',
    },
    registration: {
        title: 'registration',
        route: '/registration',
    },
    account: {
        title: 'account',
        route: '/account',
    },
    logout: {
        title: 'logout',
        route: API_ROUTES.LOGOUT_USER,
    },
};

export default routes;
