import { AlertType, UserType } from './types';

// export const Alert_Type = {
//     success,
//     error,
//     clear
// };

// export const User_Type = {
//     login_success,
//     login_fail,
//     login_request,
//     user_username,
//     user_password,
//     user_token
// };

//alert
export const success = (message) => {
    return { type: AlertType.SUCCESS, message }
}
export const error = (message) => {
    return { type: AlertType.ERROR, message }
}
export const clear = (message) => {
    return { type: AlertType.CLEAR, message }
}
//alert



//log in 
export const login_success = () => {
    return function (dispatch) {
        dispatch({ type: UserType.LOGIN_SUCCESS });
    }
}
export const login_request = () => {
    return function (dispatch) {
        dispatch({ type: UserType.REGISTER_REQUEST });
    }
}
export const login_fail = () => {
    return function (dispatch) {
        dispatch({ type: UserType.REGISTER_FAILURE });
    }
}
//log in

//user-data
export const user_username = () => {
    return  { type: UserType.USER_USERNAME }
}
export const user_password = () => {
    return function (dispatch) {
        dispatch({ type: UserType.USER_PASSWORD });
    }
}
export const user_token = () => {
    return function (dispatch) {
        dispatch({ type: UserType.USER_TOKEN });
    }
}