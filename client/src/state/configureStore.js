import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./saga/rootSaga";
import songSlice from "./songSlice.js";

const reducer = combineReducers({
  song: songSlice,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), ...middleware],
});

sagaMiddleware.run(watcherSaga);

export default store;
