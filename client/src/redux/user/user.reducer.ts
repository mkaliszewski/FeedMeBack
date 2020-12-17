import { userActionTypes, UserState, UserActions } from './user.types';

const INITIAL_STATE: UserState = {
    currentUser: undefined,
    responseMessage: null,
    isLoading: false,
    isError: false,
    errorCode: null,
};

const userReducer = (state = INITIAL_STATE, action: UserActions): UserState => {
    switch (action.type) {
        case userActionTypes.START_USER_ACTION:
            return {
                ...state,
                isLoading: true,
            };

        case userActionTypes.CLEAR_USER_ERRORS:
            return {
                ...state,
                responseMessage: null,
                isError: false,
                errorCode: null,
            };

        case userActionTypes.FETCH_USER_SUCCESS:
            return {
                currentUser: action.payload,
                responseMessage: null,
                isLoading: false,
                isError: false,
                errorCode: null,
            };

        case userActionTypes.FETCH_USER_FAILURE:
            return {
                ...state,
                currentUser: undefined,
                responseMessage: null,
                isLoading: false,
                isError: true,
            };

        case userActionTypes.REGISTER_USER_SUCCESS:
            return {
                ...state,
                responseMessage: action.payload,
                isLoading: false,
                isError: false,
                errorCode: null,
            };

        case userActionTypes.REGISTER_USER_FAILURE:
            return {
                ...state,
                responseMessage: null,
                isLoading: false,
                isError: true,
                errorCode: action.payload,
            };

        case userActionTypes.LOGIN_USER_SUCCESS:
            return {
                ...state,
                responseMessage: action.payload,
                isLoading: false,
                isError: false,
                errorCode: null,
            };

        case userActionTypes.LOGIN_USER_FAILURE:
            return {
                ...state,
                responseMessage: null,
                isLoading: false,
                isError: true,
                errorCode: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;
