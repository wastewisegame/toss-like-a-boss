const animateGarbageReducer = (state = 1, action) => {
  switch (action.type) {
    case "ANIMATE_GARBAGE_CORRECT":
      return 2;
    case "ANIMATE_GARBAGE_INCORRECT":
      return 3;
    case "DEANIMATE_GARBAGE":
      return 1;
    default:
      return state;
  }
};

export default animateGarbageReducer;
