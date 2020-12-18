export const API_ROUTES = {
    AUTH_FACEBOOK: '/auth/facebook',
    AUTH_GOOGLE: '/auth/google',
    LOGIN_USER: '/auth/login',
    USER: '/api/user',
    LOGOUT_USER: '/api/user/logout',
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
    fetchUser: (): Promise<Response> =>
        fetch(API_ROUTES.USER, {
            method: METHODS.GET,
            headers: HEADERS,
        }),
    registerUser: (data: RegisterUserData): Promise<Response> =>
        fetch(API_ROUTES.USER, {
            method: METHODS.POST,
            body: stringifyData(data),
            headers: HEADERS,
        }),
    loginUser: (data: LoginUserData): Promise<Response> =>
        fetch(API_ROUTES.LOGIN_USER, {
            method: METHODS.POST,
            body: stringifyData(data),
            headers: HEADERS,
        }),
};

export default API;
