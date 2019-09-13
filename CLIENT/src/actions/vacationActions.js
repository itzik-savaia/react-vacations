import { FETCH_VACATIONS, FOLLOW_PLUS, FOLLOW_MINUS } from './types';
import Axios from 'axios';



export const fetch_Vacations = () => {
    return function (dispatch) {
        Axios.get('http://localhost:4000/vacation')
            .then(res => {
                console.log(res);
                dispatch({ type: FETCH_VACATIONS, payload: res.data });
            }).catch(err => {
                console.log(err);
            })
    }
};

export const followplus = () => {
    //need to do fach to server
    return function (dispatch) {
        dispatch({ type: FOLLOW_PLUS, payload: +1 });
    }
}

export const followminus = () => {
        //need to do fach to server
    return function (dispatch) {
        dispatch({ type: FOLLOW_MINUS, payload: -1 });
    }
}

