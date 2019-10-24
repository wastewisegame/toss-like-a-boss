import { put, takeEvery } from 'redux-saga/effects';
import axios from "axios";

function* fetchItems(action) {
    try {
        let response = yield axios.get('/api/item/admin')
        console.log('Saga response:', response.data)
        yield put({
            type: 'SET_ITEMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in ITEM GET', err);
    }
}

function* addItem(action) {
    try {
        let response = yield axios.post('/api/item/admin', action.payload)
        console.log('Add item saga response:', action.payload);
        yield put({
            type: 'FETCH_ITEMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in ADD ITEM POST', err);
    }
}

function* deleteItem(action) {
    try {
        let response = yield axios.delete(`/api/item/admin/${action.payload}`)
        console.log('Delete item saga response:', action.payload);
        yield put({
            type: 'FETCH_ITEMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in ITEM DELETE', err);
    }
}

function* uploadImage(action) {
    try {
        let response = yield axios.post('/api/item/admin/upload', action.payload)
        console.log('Upload item saga response:', action.payload);
        yield put({
            type: 'FETCH_ITEMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in UPLOAD ITEM POST', err);
    }
}

function* updateItem(action) {
    try {
        let response = yield axios.put('/api/item/admin', action.payload);
        console.log('Item update saga response:', action.payload);
        yield put({
            type: 'FETCH_ITEMS',
            payload: response.data
        })
    } catch (err) {
        console.log('error in ITEM INFO PUT', err);
    }
}

function* addItemImage(action) {
    try {
        if (action.payload.file !== null) {
            let file = action.payload.file;
            let fileParts = file.name.split('.');
            let fileName = fileParts[0];
            let fileType = fileParts[1];
            let awsSignedResponse = yield axios.post('/api/aws', {
                fileName: fileName,
                fileType: fileType
            });
            const returnData = awsSignedResponse.data.data.returnData;
            const signedRequest = returnData.signedRequest;
            const url = returnData.url;
            console.log('the image url happens to be:', url)
            action.payload.attachment_url = url;
            yield axios.put(signedRequest, action.payload.file, {
                headers: {
                    'Content-Type': action.payload.fileType
                }
            });
            yield put({
                type: 'SET_IMAGE_URL',
                payload: url
            })
            // yield put ({
            //     type: 'FETCH_IMAGE_URL'
            // })
        }
    } catch (error) {
        console.log(error);
    }
}

function* itemSaga() {
    yield takeEvery('FETCH_ITEMS', fetchItems);
    yield takeEvery('ADD_ITEM', addItem);
    yield takeEvery('DELETE_ITEM', deleteItem);
    yield takeEvery('UPLOAD_IMAGE', uploadImage);
    yield takeEvery('UPDATE_ITEM', updateItem);
    yield takeEvery('ADD_ITEM_IMAGE', addItemImage);
}

export default itemSaga;