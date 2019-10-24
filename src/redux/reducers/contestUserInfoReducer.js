const contestUserInfoReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_SCORE_PERSONAL_INFO':
            return action.payload
        default:
            return state
    }
}

export default contestUserInfoReducer;