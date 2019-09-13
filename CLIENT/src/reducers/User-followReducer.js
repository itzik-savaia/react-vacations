import { UserType, AlertType } from '../actions/types';

const initialState = {
    USER_FOLLOW: false,
    IS_LOG_IN: false,


}



// export const User_followcounter = (state = initialState, action) => {
//     switch (action.type) {
//         case UserType.FOLLOW:
//             return {
//                 follow: true,
//                 user: action.user
//             };

//         case UserType.UNFOLLOW:
//             return {
//                 follow: false,
//                 user: action.user
//             };

//         default:
//             return state;
//     }
// }

export const userConnect = (state = initialState, action) => {
    switch (action.type) {
        case UserType.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case UserType.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case UserType.LOGIN_FAILURE:
            return {};

        case UserType.LOGOUT:
            return {};
        default:
            return state
    }
}
export const alert = (state = {}, action) => {
    switch (action.type) {
        case AlertType.SUCCESS:
            return {
                type: 'alert-success',
                message: action.message
            };

        case AlertType.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };

        case AlertType.CLEAR:
            return {};

        default:
            return state
    }
}

export default (alert)


