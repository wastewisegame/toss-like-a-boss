const incorrectSnackBarReducer = (state = false, action) => {
  switch (action.type) {
    case "FIRST_TRY_INCORRECT":
      return true;
    case "INCORRECT_ANSWER":
      return true;
    case "CLOSE_INCORRECT_SNACK_BAR":
      return false;
    default:
      return state;
  }
};

export default incorrectSnackBarReducer;
