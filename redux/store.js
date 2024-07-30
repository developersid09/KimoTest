import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import {logger} from 'redux-logger';
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "./reducers/User";

const rootReducer = combineReducers({
    user: User,
});

const configuration = {
    key: 'root',
    storage: AsyncStorage,
    version: 1
}

const PersistReducer = persistReducer(configuration, rootReducer);

const store = configureStore({
    reducer: PersistReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false,
        }).concat(logger);
    }
});

export default store;
export const persistor = persistStore(store);