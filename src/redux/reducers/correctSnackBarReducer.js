const correctSnackBarReducer = (state = false, action) => {
  switch (action.type) {
    case "ADD_CORRECT_ANSWER":
      return true;
    case "INCREMENT_CURRENT_GAME_VALUE":
      return true;
    case "CLOSE_CORRECT_SNACK_BAR":
      return false;
    default:
      return state;
  }
};

export default correctSnackBarReducer;
