const organizationTeamNamesReducer = (state = [{team_name: ''}], action) => {
    switch (action.type) {
        case 'SET_TEAM_NAMES':
            return action.payload
        default:
            return state;
    }
}

export default organizationTeamNamesReducer;