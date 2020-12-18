import configureStore, { MockStore } from 'redux-mock-store';
import thunk from 'redux-thunk';
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

const middlewares = [thunk];
const initialMockStore = configureStore(middlewares);

const mockStore = (data: State = initialState): MockStore => initialMockStore(data);

export { initialState, mockStore };
