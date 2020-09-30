const currentContestInfo = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CURRENT_CONTEST_INFO':
            return action.payload
        case 'CURRENT_CONTEST_USER_PLAYED_AGAIN':
            return (state = {})
        default:
            return state
    }
}

export default currentContestInfo
