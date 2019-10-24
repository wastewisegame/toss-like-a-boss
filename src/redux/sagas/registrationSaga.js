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
      console.log('Error with user registration:', error);
      yield put({type: 'REGISTRATION_FAILED'});
  }
}

function* addWasteWiseUser(action) {
  try {
    let response = yield axios.post('/api/user/register/admin', action.payload)
    console.log('Add Waste Wise user saga response:', action.payload);
    yield put({
      type: 'FETCH_WASTE_WISE_USERS',
      payload: response.data
    })
  } catch (err) {
    console.log('error in ADD WASTE WISE USER POST', err);
  }
}

function* fetchWasteWiseUsers(action) {
  try {
    let response = yield axios.get('/api/user/register/admin')
    console.log('Saga response:', response.data)
    yield put({
      type: 'SET_ADMIN_USERS',
      payload: response.data
    })
  } catch (err) {
    console.log('error in USER GET', err);
  }
}

function* deleteUser(action) {
  try {
    let response = yield axios.delete(`/api/user/register/${action.payload}`)
    console.log('Delete user saga response:', action.payload);
    yield put({
      type: 'FETCH_WASTE_WISE_USERS',
      payload: response.data
    })
  } catch (err) {
    console.log('error in USER DELETE', err);
  }
}

function* updateUser(action) {
  try {
    let response = yield axios.put('/api/user/register/edit', action.payload);
    console.log('User update saga response:', action.payload);
    yield put({
      type: 'FETCH_WASTE_WISE_USERS',
      payload: response.data
    })
  } catch (err) {
    console.log('error in USER INFO PUT', err);
  }
}

function* updateUserWithoutPassword(action) {
  try {
    let response = yield axios.put('/api/user/register/editnopassword', action.payload);
    console.log('User update saga response:', action.payload);
    yield put({
      type: 'FETCH_WASTE_WISE_USERS',
      payload: response.data
    })
  } catch (err) {
    console.log('error in USER INFO PUT', err);
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
