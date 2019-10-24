const animateCompostReducer = (state = 1, action) => {
  switch (action.type) {
    case "ANIMATE_COMPOST_CORRECT":
      return 2;
    case "ANIMATE_COMPOST_INCORRECT":
      return 3;
    case "DEANIMATE_COMPOST":
      return 1;
    default:
      return state;
  }
};

export default animateCompostReducer;
