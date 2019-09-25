import { combineReducers } from 'redux';
import { Vacations, } from './vacationsReducer';
import { userReducer } from './UserReducer';


export default combineReducers({
  Vacations,
  userReducer,
});