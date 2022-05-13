import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import Dapp from "src/redux/User/Dapps/reducer";
import dappSagas from "src/saga/dappSagas";

import Network from "src/redux/User/Networks/reducer";
import networkSagas from "src/saga/networkSagas";

import Storage from "src/redux/User/Storages/reducer";
// import storageSagas from "src/saga/storageSagas";

import User from "src/redux/Guest/reducer";
import userSagas from "src/saga/userSagas";

import Setting from "src/redux/User/Settings/reducer";
import settingSagas from "src/saga/settingSagas";

import Alert from "src/redux/User/Alerts/reducer";

export const reducers = combineReducers({
    Dapp,
    Network,
    Storage,
    User,
    Setting,
    Alert,
});

export function* rootSaga() {
    yield all([dappSagas(), networkSagas(), userSagas(), settingSagas()]);
}
