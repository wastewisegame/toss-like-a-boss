import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });
    
    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({type: 'SET_TO_LOGIN_MODE'});
  } catch (error) {
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* addWasteWiseUser(action) {
  try {
    let response = yield axios.post('/api/user/register/admin', action.payload)
    yield put({
      type: 'FETCH_WASTE_WISE_USERS',
      payload: response.data
    })
  } catch (err) {
  }
}

function* fetchWasteWiseUsers(action) {
  try {
    let response = yield axios.get('/api/user/register/admin')
    yield put({
      type: 'SET_ADMIN_USERS',
      payload: response.data
    })
  } catch (err) {
  }
}

function* deleteUser(action) {
  try {
    let response = yield axios.delete(`/api/user/register/${action.payload}`)
    yield put({
      type: 'FETCH_WASTE_WISE_USERS',
      payload: response.data
    })
  } catch (err) {
  }
}

function* updateUser(action) {
  try {
    let response = yield axios.put('/api/user/register/edit', action.payload);
    yield put({
      type: 'FETCH_WASTE_WISE_USERS',
      payload: response.data
    })
  } catch (err) {
  }
}

function* updateUserWithoutPassword(action) {
  try {
    let response = yield axios.put('/api/user/register/editnopassword', action.payload);
    yield put({
      type: 'FETCH_WASTE_WISE_USERS',
      payload: response.data
    })
  } catch (err) {
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('ADD_WASTE_WISE_USER', addWasteWiseUser);
  yield takeLatest('FETCH_WASTE_WISE_USERS', fetchWasteWiseUsers);
  yield takeLatest('DELETE_USER', deleteUser);
  yield takeLatest('UPDATE_USER', updateUser);
  yield takeLatest('UPDATE_USER_WITHOUT_PASSWORD', updateUserWithoutPassword);
}

export default registrationSaga;
