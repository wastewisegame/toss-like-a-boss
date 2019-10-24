const companyIdNumberReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_COMPANY_ID':
            return action.payload[0].id;
        default:
            return state;
    }
}

export default companyIdNumberReducer;