import { UserState, UserActions, userActionTypes } from './user.types';

const INITIAL_STATE: UserState = {
    currentUser: null,
    isFetching: false,
    errorMessage: '',
};

const userReducer = (state = INITIAL_STATE, action: UserActions): UserState => {
    switch (action.type) {
        case userActionTypes.FETCH_USER_START:
            return {
                ...state,
                isFetching: true,
            };

        case userActionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isFetching: false,
            };

        case userActionTypes.FETCH_USER_FAILURE:
            return {
                ...state,
                currentUser: null,
                isFetching: false,
                errorMessage: action.payload,
            };

        default:
            return state;
    }
};

export default userReducer;
