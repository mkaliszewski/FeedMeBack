import React from 'react';
import renderWithRouter from '__test__/utils/renderWithRouter';
import { Provider } from 'react-redux';
import { mockStore } from '__test__/utils/store';
import App from 'App';

const store = mockStore();

const renderApp = () => {
    const utils = renderWithRouter(
        <Provider store={store}>
            <App />
        </Provider>
    );

    return { ...utils };
};

describe('App', () => {
    it('renders without crashing', () => {
        const { unmount } = renderApp();

        unmount();
    });
});
