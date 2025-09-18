// app/stores/index.ts
import rootReducer from "@/app/stores/reduces";
import rootSaga from "@/app/stores/saga";
import { configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import createSagaMiddleware from "redux-saga";


// ✅ Cấu hình persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const sagaMiddleware = createSagaMiddleware();

// ✅ Tạo persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

// ✅ Tạo persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;