const currentContestInfo = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CONTEST_INFO':
            return action.payload;
        default:
            return state;
    }
}

export default currentContestInfo;