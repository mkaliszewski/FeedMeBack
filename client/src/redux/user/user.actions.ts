import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../root-reducer';
import { User, UserActions, userActionTypes, UserResponse } from './user.types';

import API from '../../API';

export const fetchUserStart = (): UserActions => ({
    type: userActionTypes.FETCH_USER_START,
});

export const fetchUserSuccess = (user: User): UserActions => ({
    type: userActionTypes.FETCH_USER_SUCCESS,
    payload: user,
});

export const fetchUserFailure = (errorMessage: string): UserActions => ({
    type: userActionTypes.FETCH_USER_FAILURE,
    payload: errorMessage,
});

export const fetchUserAsync = (): ThunkAction<void, RootState, unknown, Action> => async (dispatch) => {
    dispatch(fetchUserStart());
    try {
        const response = await API.fetchUser();
        const { user }: UserResponse = await response.json();

        dispatch(fetchUserSuccess(user));
    } catch (err) {
        dispatch(fetchUserFailure(err.message));
    }
};
