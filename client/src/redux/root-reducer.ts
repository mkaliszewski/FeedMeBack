import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import UserReducer from './user/user.reducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users'],
};

const rootReducer = combineReducers({
    user: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);