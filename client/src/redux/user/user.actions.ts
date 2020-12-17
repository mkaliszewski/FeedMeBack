import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import API from 'API';
import { RootState } from '../root-reducer';
import {
    userActionTypes,
    User,
    StartUserAction,
    ClearUserErrorsAction,
    FetchUserActions,
    RegisterUserActions,
    LoginUserActions,
    Response,
} from './user.types';

const DEFAULT_ERROR_CODE = 500;

export const startUserAction = (): StartUserAction => ({
    type: userActionTypes.START_USER_ACTION,
});

export const clearUserErrors = (): ClearUserErrorsAction => ({
    type: userActionTypes.CLEAR_USER_ERRORS,
});

export const fetchUserSuccess = (user: User): FetchUserActions => ({
    type: userActionTypes.FETCH_USER_SUCCESS,
    payload: user,
});

export const fetchUserFailure = (): FetchUserActions => ({
    type: userActionTypes.FETCH_USER_FAILURE,
});

export const RegisterUserSuccess = (message: string): RegisterUserActions => ({
    type: userActionTypes.REGISTER_USER_SUCCESS,
    payload: message,
});

export const RegisterUserFailure = (errorCode: number): RegisterUserActions => ({
    type: userActionTypes.REGISTER_USER_FAILURE,
    payload: errorCode,
});

export const LoginUserSuccess = (message: string): LoginUserActions => ({
    type: userActionTypes.LOGIN_USER_SUCCESS,
    payload: message,
});
export const LoginUserFailure = (errorCode: number): LoginUserActions => ({
    type: userActionTypes.LOGIN_USER_FAILURE,
    payload: errorCode,
});

export const fetchUserAsync = (): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
    dispatch(startUserAction());
    try {
        const response = await API.fetchUser();
        const { user }: Response = await response.json();
        return dispatch(fetchUserSuccess(user));
    } catch (err) {
        console.error(err);
        return dispatch(fetchUserFailure());
    }
};

export const registerUserAsync = (
    email: string,
    username: string,
    password: string
): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
    dispatch(startUserAction());
    try {
        const response = await API.registerUser({ email, username, password });
        const { status } = response;
        const { message }: Response = await response.json();

        if (status === 201) {
            return dispatch(RegisterUserSuccess(message));
        }

        return dispatch(RegisterUserFailure(status));
    } catch (err) {
        console.error(err);
        return dispatch(RegisterUserFailure(DEFAULT_ERROR_CODE));
    }
};

export const loginUserAsync = (
    email: string,
    password: string
): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
    dispatch(startUserAction());
    try {
        const response = await API.loginUser({ email, password });

        const { status } = response;
        const { message }: Response = await response.json();

        if (status === 200) {
            dispatch(fetchUserAsync());
            dispatch(LoginUserSuccess(message));
        }

        return dispatch(LoginUserFailure(status));
    } catch (err) {
        console.error(err);
        return dispatch(LoginUserFailure(DEFAULT_ERROR_CODE));
    }
};
