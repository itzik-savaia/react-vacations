import accessToken from '../NAVBAR/log_in'

const initialState = {
    role: '',
    islogin: false,
    username: '',
    password: '',
    token: accessToken,
    loginError: '',
    user_alredy_in: '',
    user_log_out: '',
};

export function userReducer(state = initialState, action) {
    // console.log('USER-action', action.payload);
    switch (action.type) {
        case 'USER_NAME':
            return {
                ...state,
                username: action.payload,
            };

        case 'USER_PASSWORD':
            return {
                ...state,
                password: action.payload,
            };
        case 'NO_ACCESS':
            return {
                loginError: 'incorrect username or password'
            };

        case 'ALREDY_IN':
            return {
                user_alredy_in: 'user alredy in'
            };

        case 'LOGIN':
            return {
                ...state,
                role: action.payload.user.roles[0].id,
                islogin: true,
                username: action.payload.user.username,
                password: action.payload.user.password,
                token: action.payload.accessToken,
            };
        case 'ADMIN':
            return {
                role: action.payload.user.roles[0].id,
                islogin: true,
                username: action.payload.user.username,
                password: action.payload.user.password,
                token: action.payload.accessToken,
            };
        case 'USER_LOGOUT':
            return {
                ...state,
                user_log_out: 'user_log_out'
            }
        default:
            return state;
    }
}
