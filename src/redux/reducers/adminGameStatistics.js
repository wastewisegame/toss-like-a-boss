const adminGameStatistics = (state = [], action) => {
    switch (action.type) {
        case 'SET_GAME_STATISTICS':
            return action.payload;
        default:
            return state;
    }
}

export default adminGameStatistics;