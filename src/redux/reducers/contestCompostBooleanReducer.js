const contestCompostBooleanReducer = (state = ['compost': true], action) => {
    switch (action.type) {
        case 'SET_CONTEST_COMPOST_BOOLEAN':
            console.log('action.payload is', action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default contestCompostBooleanReducer;