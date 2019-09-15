import { combineReducers } from 'redux';
import { AllVacations, } from './vacationsReducer';
import { alert, userConnect } from './User-followReducer';


export default combineReducers({
  AllVacations,
  userConnect,
  alert

});