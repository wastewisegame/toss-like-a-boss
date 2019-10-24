const compostBinReducer = (state = true, action) => {
    switch (action.type) {
        case 'NO_COMPOST_BIN':
            return false;
        default:
            return state;
    }
}

export default compostBinReducer;