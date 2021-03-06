import axios from 'axios'
import { put, takeEvery } from 'redux-saga/effects'

function* getLeaderboard(action) {
    console.log('get LEADERBOARD: ', action.payload)
    try {
        const response = yield axios.get(
            `api/score/leaderboard/${action.payload}`
        )
        yield put({
            type: 'SET_LEADERBOARD',
            payload: response.data,
        })
    } catch (error) {}
}

function* getAllContestEntries(action) {
    console.log('GET ALL ENTRIES: ', action.payload)
    try {
        const response = yield axios.get(
            `api/score/leaderboard/all/${action.payload}`
        )
        yield put({
            type: 'SET_LEADERBOARD',
            payload: response.data,
        })
    } catch (error) {
        console.log(error)
    }
}

function* sendContestGameData(action) {
    console.log('SEND CONTEST DATA : ', action.payload)
    try {
        yield axios.post(`api/score`, action.payload)
    } catch (error) {}
}

function* getCompanyId(action) {
    try {
        let response = yield axios.get(
            `api/score/leaderboard/company/${action.payload}`
        )
        yield put({
            type: 'SET_COMPANY_ID',
            payload: response.data,
        })
    } catch (error) {}
}

function* fetchTeamIdNumber(action) {
    if (action.payload.teamName && action.payload.teamOrganizationId) {
        try {
            const response = yield axios.get('api/team/idnumber', {
                params: { ...action.payload },
            })
            yield put({
                type: 'SET_TEAM_ID_NUMBER',
                payload: response.data,
            })
        } catch (error) {}
    }
}

function* watchMe() {
    yield takeEvery('FETCH_LEADERBOARD', getLeaderboard)
    yield takeEvery('FETCH_ALL_CONTEST_ENTRIES', getAllContestEntries)
    yield takeEvery('SEND_CONTEST_GAME_DATA', sendContestGameData)
    yield takeEvery('GET_COMPANY_ID', getCompanyId)
    yield takeEvery('FETCH_TEAM_ID_NUMBER', fetchTeamIdNumber)
}

export default watchMe
