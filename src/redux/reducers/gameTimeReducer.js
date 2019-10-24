const gameTimeReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_GAME_END_TIME':
            return action.payload
        case 'RESET_GAME_TIME':
            return 0
        default:
            return state;
    }
}

export default gameTimeReducer;