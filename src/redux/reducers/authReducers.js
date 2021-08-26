import { AUTH_ACTIONS_TYPE } from '../../constants/authActionsType';

const IAuthState = {
    result: null,
    token: ''
}

export const authReducers = (state = IAuthState, action) => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPE.AUTH_LOGIN:
            // User profile save to localStorage
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

            return {
                ...state,
                result: action?.payload.result,
                token: action?.payload.token
            }
        case AUTH_ACTIONS_TYPE.AUTH_LOGOUT:
            localStorage.clear();
            return {
                ...state,
                result: null,
                token: null,
            }
        default:
            return state;
    }
}