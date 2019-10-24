const gameWrongAnswerReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_WRONG_ANSWER_ARRAY':
            return [...state, action.payload]
        case 'CLEAR_WRONG_ANSWERS':
            return []
        default:
            return state;
    }
}

export default gameWrongAnswerReducer;