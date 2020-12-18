import { waitFor } from '@testing-library/react';
import mockRequest from '__test__/utils/fetchMock';
import fetchMock from 'fetch-mock';
import { mockStore } from '__test__/utils/reduxStore';
import { API_ROUTES } from 'API';
import * as userActions from './user.actions';
import { userActionTypes } from './user.types';

const {
    startUserAction,
    clearUserErrors,
    fetchUserSuccess,
    fetchUserFailure,
    RegisterUserSuccess,
    RegisterUserFailure,
    LoginUserSuccess,
    LoginUserFailure,
    fetchUserAsync,
    registerUserAsync,
    loginUserAsync,
} = userActions;

const {
    START_USER_ACTION,
    CLEAR_USER_ERRORS,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
} = userActionTypes;

const syncUserActions = [
    {
        title: 'startUserAction',
        action: startUserAction,
        type: START_USER_ACTION,
    },
    {
        title: 'clearUserErrors',
        action: clearUserErrors,
        type: CLEAR_USER_ERRORS,
    },
    {
        title: 'fetchUserSuccess',
        action: fetchUserSuccess,
        type: FETCH_USER_SUCCESS,
    },
    {
        title: 'fetchUserFailure',
        action: fetchUserFailure,
        type: FETCH_USER_FAILURE,
        payload: 500,
    },
    {
        title: 'RegisterUserSuccess',
        action: RegisterUserSuccess,
        type: REGISTER_USER_SUCCESS,
        payload: 'test message',
    },
    {
        title: 'RegisterUserFailure',
        action: RegisterUserFailure,
        type: REGISTER_USER_FAILURE,
        payload: 500,
    },
    {
        title: 'LoginUserSuccess',
        action: LoginUserSuccess,
        type: LOGIN_USER_SUCCESS,
        payload: 'test message',
    },
    {
        title: 'LoginUserFailure',
        action: LoginUserFailure,
        type: LOGIN_USER_FAILURE,
        payload: 500,
    },
];

describe('User sync actions are fired as expected for action:', () => {
    syncUserActions.forEach((userAction) => {
        const { title, action, type } = userAction;
        it(title, () => {
            const expectedAction = {
                type,
                payload: userAction?.payload,
            };

            expect(action(userAction?.payload)).toEqual(expectedAction);
        });
    });
});

describe('User async actions are fired as expected for action:', () => {
    describe('fetchUserAsync', () => {
        afterEach(() => {
            fetchMock.restore();
        });
        it('success', async () => {
            const testUser = 'test user';
            mockRequest('get', API_ROUTES.USER, 200, { user: testUser });

            const expectedActions = [
                {
                    type: START_USER_ACTION,
                },
                { type: FETCH_USER_SUCCESS, payload: testUser },
            ];

            const store = mockStore();
            store.dispatch(fetchUserAsync());

            await waitFor(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('failure', async () => {
            const errorStatus = 500;

            mockRequest('get', API_ROUTES.USER, errorStatus, { user: undefined });

            const expectedActions = [
                {
                    type: START_USER_ACTION,
                },
                {
                    type: FETCH_USER_FAILURE,
                    payload: errorStatus,
                },
            ];

            const store = mockStore();
            store.dispatch(fetchUserAsync());

            await waitFor(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('registerUserAsync', () => {
        afterEach(() => {
            fetchMock.restore();
        });

        it('success', async () => {
            const testMessage = 'success';
            mockRequest('post', API_ROUTES.USER, 201, { message: testMessage });

            const expectedActions = [
                {
                    type: START_USER_ACTION,
                },
                { type: REGISTER_USER_SUCCESS, payload: testMessage },
            ];

            const store = mockStore();
            store.dispatch(registerUserAsync());

            await waitFor(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('failure', async () => {
            const errorStatus = 500;
            const testMessage = 'failure';

            mockRequest('post', API_ROUTES.USER, errorStatus, { message: testMessage });

            const expectedActions = [
                {
                    type: START_USER_ACTION,
                },
                { type: REGISTER_USER_FAILURE, payload: errorStatus },
            ];

            const store = mockStore();
            store.dispatch(registerUserAsync());

            await waitFor(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('loginUserAsync', () => {
        afterEach(() => {
            fetchMock.restore();
        });

        it('success', async () => {
            const testMessage = 'success';
            const testUser = 'test user';

            mockRequest('post', API_ROUTES.LOGIN_USER, 200, { message: testMessage });
            mockRequest('get', API_ROUTES.USER, 200, { user: testUser });

            const expectedActions = [
                {
                    type: START_USER_ACTION,
                },
                {
                    type: START_USER_ACTION,
                },

                { type: LOGIN_USER_SUCCESS, payload: testMessage },
                { type: FETCH_USER_SUCCESS, payload: testUser },
            ];

            const store = mockStore();
            store.dispatch(loginUserAsync());

            await waitFor(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });

        it('failure', async () => {
            const errorStatus = 500;
            const testMessage = 'failure';

            mockRequest('post', API_ROUTES.LOGIN_USER, errorStatus, { message: testMessage });

            const expectedActions = [
                {
                    type: START_USER_ACTION,
                },
                { type: LOGIN_USER_FAILURE, payload: errorStatus },
            ];

            const store = mockStore();
            store.dispatch(loginUserAsync());

            await waitFor(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
