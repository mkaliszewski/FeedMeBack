export const userActionTypes = {
    FETCH_USER_START: 'FETCH_USER_START',
    FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
    FETCH_USER_FAILURE: 'FETCH_USER_FAILURE',
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

export interface UserResponse {
    message: string;
    user: User;
}

export type CurrentUser = User | null;

export interface UserState {
    currentUser: CurrentUser;
    isFetching: boolean;
    errorMessage: string;
}

export interface FetchUserStartAction {
    type: typeof userActionTypes.FETCH_USER_START;
    payload?: any;
}
export interface FetchUserSuccessAction {
    type: typeof userActionTypes.FETCH_USER_SUCCESS;
    payload: User;
}
export interface FetchUserFailureAction {
    type: typeof userActionTypes.FETCH_USER_FAILURE;
    payload: string;
}

export type UserActions = FetchUserStartAction | FetchUserSuccessAction | FetchUserFailureAction;
