import React from 'react';
import renderWithRouter from '__test__/utils/renderWithRouter';
import { Provider } from 'react-redux';
import { mockStore } from '__test__/mocks/mockStore';
import App from 'App';

const renderApp = () => {
    const utils = renderWithRouter(
        <Provider store={mockStore()}>
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
