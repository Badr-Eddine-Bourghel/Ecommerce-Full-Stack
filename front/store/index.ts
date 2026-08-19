import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(){
            return Promise.resolve(null);
        },
        setItem(value:string){
            return Promise.resolve(value);
        },
        removeItem(){
            return Promise.resolve();
        }
    }
}

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();
const persitConfig = {
    key:'root',
    storage,
    whitelist:[],
}
const rootReducer = combineReducers({});
const persistedReducer = persistReducer(persitConfig,rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:['persist/PERSIST','persist/REHYDRATE'],
        }
    }),
})