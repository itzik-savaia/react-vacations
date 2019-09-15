import { UserType, AlertType } from '../actions/types';

const initialState = {
    USER: [
        UserType.user_username,
        UserType.user_password,
        UserType.user_token,
        // USER_FOLLOW = false,
    ]

}
export const userConnect = (state = initialState.USER, action) => {
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
const user = { userConnect, alert }

export default (user)


