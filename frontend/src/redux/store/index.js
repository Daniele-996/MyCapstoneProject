import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import roomsReducers from "../reducers/roomsReducer";
import authReducer from "../reducers/authReducer";
import calendarReducer from "../reducers/calendarReducer";
import errorReducer from "../reducers/errorReducer";
import reservationsReducer from "../reducers/reservationsReducer";
import paymentsReducer from "../reducers/paymentsReducer";
import userProfileReducer from "../reducers/userProfileReducer";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_PERSIST_KEY,
    }),
  ],
};

const rootReducer = combineReducers({
  rooms: roomsReducers,
  auth: authReducer,
  calendar: calendarReducer,
  error: errorReducer,
  payments: paymentsReducer,
  reservations: reservationsReducer,
  user: userProfileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
