import { combineReducers } from 'redux';
import { AllVacations, } from './vacationsReducer';
import { alert } from './User-followReducer';


export default combineReducers({
  AllVacations,
  // User_followcounter,
  alert

});