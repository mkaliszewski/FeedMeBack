export const userActionTypes = {
    START_USER_ACTION: 'START_USER_ACTION',
    CLEAR_USER_ERRORS: 'CLEAR_USER_ERRORS',
    FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
    FETCH_USER_FAILURE: 'FETCH_USER_FAILURE',
    REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
    REGISTER_USER_FAILURE: 'REGISTER_USER_FAILURE',
    LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
    LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',
};

export interface User {
    username: string;
    email?: string;
    password?: string;
    idGoogle?: string;
    idFacebook?: string;
    socialProvider?: string;
    profileImageName?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Response {
    message: string;
    user: User;
}

export type CurrentUser = User | undefined;

export interface UserState {
    currentUser: CurrentUser;
    responseMessage: null | string;
    isLoading: boolean;
    isError: boolean;
    errorCode: null | number;
}

export interface StartUserAction {
    type: typeof userActionTypes.START_USER_ACTION;
    payload?: any;
}
export interface ClearUserErrorsAction {
    type: typeof userActionTypes.CLEAR_USER_ERRORS;
    payload?: any;
}

// fetching user
export interface FetchUserSuccessAction {
    type: typeof userActionTypes.FETCH_USER_SUCCESS;
    payload: User;
}
export interface FetchUserFailureAction {
    type: typeof userActionTypes.FETCH_USER_FAILURE;
    payload: number;
}

export type FetchUserActions = FetchUserSuccessAction | FetchUserFailureAction;

// registering user
export interface RegisterUserSuccessAction {
    type: typeof userActionTypes.REGISTER_USER_SUCCESS;
    payload: string;
}

export interface RegisterUserFailureAction {
    type: typeof userActionTypes.REGISTER_USER_FAILURE;
    payload: number;
}

export type RegisterUserActions = RegisterUserSuccessAction | RegisterUserFailureAction;

// logging user

export interface LoginUserSuccessAction {
    type: typeof userActionTypes.LOGIN_USER_SUCCESS;
    payload: string;
}
export interface LoginUserFailureAction {
    type: typeof userActionTypes.LOGIN_USER_FAILURE;
    payload: number;
}

export type LoginUserActions = LoginUserSuccessAction | LoginUserFailureAction;
export type UserActions =
    | StartUserAction
    | ClearUserErrorsAction
    | FetchUserActions
    | RegisterUserActions
    | LoginUserActions;
