import { takeEvery, put, call } from "redux-saga/effects";
import { GET_DAPPS, CREATE_DAPP } from "src/redux/User/Dapps/actionTypes";

import { dappActions } from "src/redux/User/Dapps/reducer";
import { getDApps, createDApp } from "src/services/User/dapps";

import { getNetwork } from "src/services/User/networks";

function* getUserDapps({ payload }) {
    try {
        const response = yield call(getDApps);
        const response_network = yield call(getNetwork, payload);
        let networkSawtooth = response_network.data.data.filter((network) => network["blockchain_type"] === "sawtooth");
        let networkIds = networkSawtooth.map((network) => network["network_id"]);
        if (response.data.status === "success") {
            let dappSawtooth = response.data.data.filter((dapp) => networkIds.includes(dapp["network_id"]));
            yield put(dappActions.getDAppsSuccessful(dappSawtooth));
        } else {
        }
    } catch (error) {}
}

function* createNewDApp({ payload }) {
    try {
        const response = yield call(createDApp, payload.body);
        if (response.data.status === "success") {
            yield put(dappActions.createDAppsSuccessful(response.data.data));
        } else {
        }
    } catch (error) {}
}

function* dappSagas() {
    yield takeEvery(GET_DAPPS, getUserDapps);
    yield takeEvery(CREATE_DAPP, createNewDApp);
}

export default dappSagas;
