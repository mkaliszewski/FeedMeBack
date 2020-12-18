import { store } from './store';

const storeInitialState = {
    user: {
        currentUser: undefined,
        responseMessage: null,
        isLoading: false,
        isError: false,
        errorCode: null,
    },
    _persist: { version: -1, rehydrated: true },
};

describe('Store', () => {
    it('has expected initial state', () => {
        expect(store.getState()).toStrictEqual(storeInitialState);
    });
});
