import { createStore, Store, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'redux/root-reducer';
import { State } from 'redux/root-reducer.types';

const defaultStoreData = {
    user: {
        currentUser: undefined,
        responseMessage: null,
        isLoading: false,
        isError: false,
        errorCode: null,
    },
};

const mockStore = (data: State = defaultStoreData): Store => createStore(rootReducer, data, applyMiddleware(thunk));

export { defaultStoreData, mockStore };
