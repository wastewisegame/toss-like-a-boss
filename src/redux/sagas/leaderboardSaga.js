import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* getLeaderboard(action) {
  try {
    let response = yield axios.get(`api/score/leaderboard/${action.payload}`);
    yield put({
      type: "SET_LEADERBOARD",
      payload: response.data
    });
  } catch (error) {
  }
}

function* sendContestGameData(action) {
  try {
    yield axios.post(`api/score`, action.payload);
  } catch (error) {
  }
}

function* getCompanyId(action) {
  try {
    let response = yield axios.get(`api/score/leaderboard/company/${action.payload}`);
    yield put({
      type: "SET_COMPANY_ID",
      payload: response.data
    });
  } catch (error) {
  }
}

function* fetchTeamIdNumber(action) {
  const params = Object.keys(action.payload).map(key => key + '=' + action.payload[key]).join('&');
  try {
    const response = yield axios.get(`api/team/idnumber/${params}`);
    yield put({
      type: 'SET_TEAM_ID_NUMBER',
      payload: response.data
    });
  } catch (error) {
  }
}



function* watchMe() {
  yield takeEvery("FETCH_LEADERBOARD", getLeaderboard);
  yield takeEvery('SEND_CONTEST_GAME_DATA', sendContestGameData);
  yield takeEvery('GET_COMPANY_ID', getCompanyId);
  yield takeEvery('FETCH_TEAM_ID_NUMBER', fetchTeamIdNumber);
}

export default watchMe;
