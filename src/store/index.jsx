import { createStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga, reducers } from "src/redux/index";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    // compose(applyMiddleware(sagaMiddleware))
    compose(applyMiddleware(sagaMiddleware), process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : null)
);
sagaMiddleware.run(rootSaga);

export default store;