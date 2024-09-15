// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import itemReducer from './slices/itemSlice';
import bodyFeaturesReducer from './slices/bodyFeaturesSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    items: itemReducer,
    bodyFeatures: bodyFeaturesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
