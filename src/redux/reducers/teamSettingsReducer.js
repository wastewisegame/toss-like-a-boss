const teamSettings = (state = [], action) => {
    switch (action.type) {
        case 'SET_TEAMS':
            return action.payload;
        default:
            return state;
    }
}

export default teamSettings;