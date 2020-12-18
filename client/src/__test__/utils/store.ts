import { createStore, Store, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'redux/root-reducer';
import { State } from 'redux/root-reducer.types';

const initialState = {
    user: {
        currentUser: undefined,
        responseMessage: null,
        isLoading: false,
        isError: false,
        errorCode: null,
    },
};

const mockStore = (data: State = initialState): Store => createStore(rootReducer, data, applyMiddleware(thunk));

export { initialState, mockStore };
