const compostBinReducer = (state = true, action) => {
    switch (action.type) {
        case 'COMPOST_BIN':
            return action.payload
        default:
            return state
    }
}

export default compostBinReducer
