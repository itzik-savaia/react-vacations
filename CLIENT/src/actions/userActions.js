import { AlertType, UserType } from './types';

export const AlertType = {
    success,
    error,
    clear
};

export const UserType = {
    login_success,
    login_fail,
    login_request,

    User_FOLLOW,
    User_UNFOLLOW
};

//alert
export const success = (message) => {
    //need to do fach to server
    return { type: AlertType.SUCCESS, message }
}
export const error = (message) => {
    //need to do fach to server
    return { type: AlertType.ERROR, message }
}
export const clear = (message) => {
    //need to do fach to server
    return { type: AlertType.CLEAR, message }
}
//alert
export const fetch_user = () => {
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

//log in 
export const login_success = () => {
    //need to do fach to server
    return function (dispatch) {
        dispatch({ type: UserType.LOGIN_SUCCESS, payload: LOG_IN });
    }
}


export const login_request = () => {
    //need to do fach to server
    return function (dispatch) {
        dispatch({ type: LOG_OUT, payload: LOG_OUT });
    }
}
export const logout_request = () => {
    //need to do fach to server
    return function (dispatch) {
        dispatch({ type: LOG_OUT, payload: LOG_OUT });
    }
}
//log in 

export const User_FOLLOW = (FOLLOW) => {
    //need to do fach to server
    return function (dispatch) {
        dispatch({ type: UserType.FOLLOW, payload: FOLLOW });
    }
}
export const User_UNFOLLOW = (UNFOLLOW) => {
    //need to do fach to server
    return function (dispatch) {
        dispatch({ type: UserType.UNFOLLOW, payload: UNFOLLOW });
    }
}