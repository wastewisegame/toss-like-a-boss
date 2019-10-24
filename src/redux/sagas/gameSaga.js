import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import ResultsGuestPlayer from "../../components/ResultsGuestPlayer/ResultsGuestPlayer";


function* addWrongAnswer(action) {
  try {
    yield put({
      type: "UPDATE_WRONG_ANSWER_ARRAY",
      payload: action.payload
    });
  } catch (error) {
    console.log("error with add wrong answer saga", error);
  }
}

function* fetchGameItems(action) {
  try {
    const response = yield axios.get(`/api/item`);
    yield put({
      type: "SET_GAME_ITEMS",
      payload: response.data
    });
  } catch (error) {
    console.log("error with fetch game items", error);
  }
}

function* firstTryCorrect(action) {
  console.log('first try correct action.payload is', action.payload.id)
  try {
    yield axios.put(`/api/item/correct`, action.payload);
    yield put({
      type: "ADD_CORRECT_ANSWER"
    });
    yield put({
      type: "UPDATE_GAME_SCORE"
    });
  } catch (error) {
    console.log("error with firstTryCorrect saga", error);
  }
}

function* firstTryIncorrect(action) {
  try {
    yield axios.put(`/api/item/incorrect`, action.payload);
  } catch (error) {
    console.log("error with firstTryIncorrect saga", error);
  }
}

function* getContestCompostBoolean(action) {
  try {
    console.log('id of current game is', action.payload)
    let id = action.payload
    const response = yield axios.get(`/api/contest/compost/${id}`)
    yield put ({
      type: 'SET_CONTEST_COMPOST_BOOLEAN',
      payload: response.data
    })
  } catch (error) {
    console.log('error with getContestCompostBoolean saga', error)
  }
}

function* getTeamNames(action) {
  try {
    let id = action.payload
    const response = yield axios.get(`/api/team/names/${id}`)
    yield put ({
      type: 'SET_TEAM_NAMES',
      payload: response.data
    })
  } catch (error) {
    console.log('error with get team names saga', error)
  }
}

function* fetchCurrentContestInfo(action) {
  try {
    console.log('the action.payload for current contest is', action.payload)
    let response = yield axios.get(`/api/contest/currentcontest/${action.payload}`)
    console.log('Current contest saga response:', response.data)
    yield put({
      type: 'SET_CURRENT_CONTEST_INFO',
      payload: response.data[0]
    })
  } catch (err) {
    console.log('error in CURRENT CONTEST GET', err);
  }
}

function* gameSaga() {
  yield takeEvery("FETCH_GAME_ITEMS", fetchGameItems);
  yield takeEvery("ADD_WRONG_ANSWER", addWrongAnswer);
  yield takeEvery("FIRST_TRY_CORRECT", firstTryCorrect);
  yield takeEvery("FIRST_TRY_INCORRECT", firstTryIncorrect);
  yield takeEvery('GET_CONTEST_COMPOST_BOOLEAN', getContestCompostBoolean);
  yield takeEvery('GET_TEAM_NAMES', getTeamNames);
  yield takeEvery('FETCH_CURRENT_CONTEST_INFO', fetchCurrentContestInfo);
}

export default gameSaga;
