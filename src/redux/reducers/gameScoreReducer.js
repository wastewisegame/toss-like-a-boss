const gameScoreReducer = (state = 0, action) => {
    switch (action.type) {
        case 'UPDATE_GAME_SCORE':
            return state + 1
        case 'RESET_GAME_SCORE':
            return 0
        default:
            return state;
    }
}

export default gameScoreReducer;