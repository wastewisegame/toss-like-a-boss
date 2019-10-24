const contestSettings = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONTESTS':
            return action.payload;
        default:
            return state;
    }
}

export default contestSettings;