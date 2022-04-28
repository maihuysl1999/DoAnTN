import { takeEvery, put, call } from "redux-saga/effects";
import { getUserInfo } from "src/services/Guest/login";
import { GET_PROFILE } from "src/redux/Guest/actionTypes";
import { userActions } from "src/redux/Guest/reducer";

function* getUserProfile({ payload }) {
    const { user_id } = payload;
    try {
        const response = yield call(getUserInfo, user_id);
        const body = response.data;
        if (body.status === "success") {
            yield put(userActions.getProfileSuccessful(body.data.user));
        } else {
            console.error(body);
        }
    } catch (error) {
        console.error(error);
    }
}

function* userSagas() {
    yield takeEvery(GET_PROFILE, getUserProfile);
}

export default userSagas;
