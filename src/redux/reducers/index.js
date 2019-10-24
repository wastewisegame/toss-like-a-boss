import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import gameScoreReducer from './gameScoreReducer';
import gameWrongAnswerReducer from './gameWrongAnswerReducer';
import leaderboardReducer from './leaderboardReducer';
import gameItemsReducer from './gameItemsReducer';
import orgSettings from './orgSettingsReducer';
import teamSettings from './teamSettingsReducer';
import contestSettings from './contestSettingsReducer';
import compostBinReducer from './compostBinReducer';
import currentGameValueReducer from './currentGameValueReducer';
import item from './itemReducer';
import gameTimeReducer from './gameTimeReducer';
import contestUserInfoReducer from './contestUserInfoReducer';
import contestCompostBooleanReducer from './contestCompostBooleanReducer';
import correctSnackBarReducer from './correctSnackBarReducer';
import wasteWiseAdminUsers from './wasteWiseAdminReducer';
import organizationTeamNameReducer from './organizationTeamNameReducer';
import incorrectSnackBarReducer from './incorrectSnackBarReducer';
import animateGarbageReducer from './animateGarbageReducer';
import animateRecycleReducer from './animateRecycleReducer';
import animateCompostReducer from './animateCompostReducer';
import imageUrlReducer from './imageUrlReducer';
import currentContestInfo from './currentContestInfoReducer';
import companyIdNumberReducer from './companyIdNumberReducer';
import teamIdNumberReducer from './teamIdNumberReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  gameScoreReducer, //will have score of game
  gameWrongAnswerReducer, //array of wrong answers
  leaderboardReducer, //list of scores to display for organization leaderboard
  gameItemsReducer, //has list of items for game
  orgSettings, //has data for the organization admin to edit on settings page
  teamSettings, //has list of teams that belong to the organization on the organization's settings page
  contestSettings, //has list of contests that belong to the organization on the organization's settings page
  compostBinReducer, //stores whether player has compost bin or not
  currentGameValueReducer, //stores value for knowing what index of game items array user is on
  item,
  gameTimeReducer, //stores value of timer after game ends
  contestUserInfoReducer, //stores user info for contest
  contestCompostBooleanReducer, //stores whether compost bin is in contest game
  correctSnackBarReducer, //sets status for snack bar open/close on correct answer
  wasteWiseAdminUsers, //retrieves the users that are admin
  organizationTeamNameReducer, //team names for dropdown on game launch
  incorrectSnackBarReducer, //sets status for snack bar open/close on incorrect answer
  animateGarbageReducer, // set animation for garbage
  animateRecycleReducer, // set animation for Recycling
  animateCompostReducer, // set animation for compost
  imageUrlReducer, //returns image url from AWS
  currentContestInfo, //grabs current contest info for date/time validation
  companyIdNumberReducer, //grabs company ID number
  teamIdNumberReducer, //holds team id number for current player
});

export default rootReducer;
