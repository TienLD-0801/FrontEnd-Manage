import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
//import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import counterReducer, { CounterType } from './slices/CounterSlice';
import userReducer, { UserType } from './slices/UserSlice';
import scaleMenuReducer, { ScaleMenuType } from './slices/ScaleMenuSlice';

/* Defining the shape of the state. */
export interface RootStatesType {
  counter: CounterType;
  user: UserType;
  scale: ScaleMenuType;
}

/* Combining all the reducers into one reducer. */
const reducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
  scale: scaleMenuReducer,
});

/* The key for the redux-persist. */
const ROOT_KEY = 'root';

/** encryptor data app */
// const encryptor = encryptTransform({
//   secretKey: ROOT_KEY,
// });

/** The configuration for redux-persist.
 * Add slice name wanna be storage in whitelist
 */
const persistConfig = {
  key: ROOT_KEY,
  version: 1,
  storage,
  whitelist: ['user', 'scale'],
  // transforms: [encryptor],
};

/* A function that takes two arguments:
- persistConfig: The configuration for redux-persist.
- reducers: The reducers that we want to persist. */
const persistedReducer = persistReducer(persistConfig, reducers);

/* Creating a store with the persisted reducer. */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/* A function that takes a store as an argument and returns a persisted store. */
export const persistor = persistStore(store);
