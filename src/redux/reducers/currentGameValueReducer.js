const currentGameValueReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT_CURRENT_GAME_VALUE':
            return state + 1;
        case 'RESET_CURRENT_GAME_VALUE':
            return 0;
        default:
            return state;
    }
}

export default currentGameValueReducer;