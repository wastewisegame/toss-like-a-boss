const animateRecycleReducer = (state = 1, action) => {
  switch (action.type) {
    case "ANIMATE_RECYCLE_CORRECT":
      return 2;
    case "ANIMATE_RECYCLE_INCORRECT":
      return 3
    case "DEANIMATE_RECYCLE":
      return 1;
    default:
      return state;
  }
};

export default animateRecycleReducer;
