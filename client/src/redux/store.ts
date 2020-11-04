import { createStore, applyMiddleware, Store, Middleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store: Store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
