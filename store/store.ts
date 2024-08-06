import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice.ts"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key : 'root',
    storage : AsyncStorage
}

const combReducers = combineReducers({
    cart : cartReducer,
})

const persistdReducer = persistReducer(persistConfig, combReducers)

export const store = configureStore({
    reducer : persistdReducer,
    devTools : process.env.NODE_ENV !== 'production',
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck : false})
})

export const persistor = persistStore(store)