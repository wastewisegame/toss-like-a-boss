const teamIdNumberReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_TEAM_ID_NUMBER':
            return action.payload;
        default:
            return state;
    }
}
export default teamIdNumberReducer;