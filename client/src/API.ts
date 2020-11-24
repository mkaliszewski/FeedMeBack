/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export const API_ROUTES = {
    LOGIN_USER: 'auth/login',
    USER: '/api/user',
    LOGOUT_USER: '/api/user/logout',
    STRIPE: '/api/stripe',
};

const HEADERS = { 'Content-Type': 'application/json' };

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

const stringifyData = (data: any) => JSON.stringify(data);

interface RegisterUserData {
    username: string;
    email: string;
    password: string;
}

interface LoginUserData {
    email: string;
    password: string;
}

const API = {
    fetchUser: () =>
        fetch(API_ROUTES.USER, {
            method: METHODS.GET,
            headers: HEADERS,
        }),
    registerUser: (data: RegisterUserData) =>
        fetch(API_ROUTES.USER, {
            method: METHODS.POST,
            body: stringifyData(data),
            headers: HEADERS,
        }),
    loginUser: (data: LoginUserData) =>
        fetch(API_ROUTES.LOGIN_USER, {
            method: METHODS.POST,
            body: stringifyData(data),
            headers: HEADERS,
        }),
    handleStripePayment: (token: string) =>
        fetch(API_ROUTES.STRIPE, {
            method: METHODS.POST,
            body: stringifyData(token),
            headers: HEADERS,
        }),
};

export default API;
