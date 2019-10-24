const orgSettings = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ORGANIZATION':
            return action.payload;
        default:
            return state;
    }
}

export default orgSettings;