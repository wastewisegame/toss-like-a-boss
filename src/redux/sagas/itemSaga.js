import { put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

function* fetchItems(action) {
    try {
        let response = yield axios.get('/api/item/admin')
        yield put({
            type: 'SET_ITEMS',
            payload: response.data,
        })
    } catch (err) {}
}

function* fetchGameStatistics(action) {
    try {
        let response = yield axios.get('/api/item/statistics')
        yield put({
            type: 'SET_GAME_STATISTICS',
            payload: response.data,
        })
    } catch (error) {}
}

function* addItem(action) {
    try {
        let response = yield axios.post('/api/item/admin', action.payload)
        yield put({
            type: 'FETCH_ITEMS',
            payload: response.data,
        })
    } catch (err) {}
}

function* deleteItem(action) {
    try {
        let response = yield axios.delete(`/api/item/admin/${action.payload}`)
        yield put({
            type: 'FETCH_ITEMS',
            payload: response.data,
        })
    } catch (err) {}
}

// function* uploadImage(action) {
//     try {
//         let response = yield axios.post('/api/item/admin/upload', action.payload)
//         yield put({
//             type: 'FETCH_ITEMS',
//             payload: response.data
//         })
//     } catch (err) {
//     }
// }

function* updateItem(action) {
    try {
        let response = yield axios.put('/api/item/admin', action.payload)
        yield put({
            type: 'FETCH_ITEMS',
            payload: response.data,
        })
    } catch (err) {}
}

function* addItemImage(action) {
    try {
        if (action.payload.file !== null) {
            let file = action.payload.file
            let fileParts = file.name.split('.')
            let fileName = fileParts[0]
            let fileType = fileParts[1]
            let awsSignedResponse = yield axios.post('/api/aws', {
                fileName: fileName,
                fileType: fileType,
            })
            const returnData = awsSignedResponse.data.data.returnData
            const signedRequest = returnData.signedRequest
            const url = returnData.url
            action.payload.attachment_url = url
            yield axios.put(signedRequest, action.payload.file, {
                headers: {
                    'Content-Type': action.payload.fileType,
                },
            })
            yield put({
                type: 'SET_IMAGE_URL',
                payload: url,
            })
            // yield put ({
            //     type: 'FETCH_IMAGE_URL'
            // })
        }
    } catch (error) {}
}

function* itemSaga() {
    yield takeEvery('FETCH_ITEMS', fetchItems)
    yield takeEvery('ADD_ITEM', addItem)
    yield takeEvery('DELETE_ITEM', deleteItem)
    // yield takeEvery('UPLOAD_IMAGE', uploadImage);
    yield takeEvery('UPDATE_ITEM', updateItem)
    yield takeEvery('ADD_ITEM_IMAGE', addItemImage)
    yield takeEvery('FETCH_GAME_STATISTICS', fetchGameStatistics)
}

export default itemSaga
