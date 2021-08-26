import { AUTH_ACTIONS_TYPE } from '../../constants/authActionsType';
import * as authAPI from '../services/authService';

export const authLoginSuccess = (response) => dispatch => {
    dispatch({
        type: AUTH_ACTIONS_TYPE.AUTH_LOGIN,
        payload: response
    })
}

export const authLogout = () => async dispatch => {
    dispatch({
        type: AUTH_ACTIONS_TYPE.AUTH_LOGOUT
    })
}

export const userSignUp = (authData, history) => async dispatch =>{
    try {
        const { data }  = await authAPI.userSignUp(authData);
        
        dispatch({
            type: AUTH_ACTIONS_TYPE.AUTH_LOGIN,
            payload: data
        })

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}

export const userSignIn = (authData, history) => async dispatch => {
    try {
        const { data } = await authAPI.userSignIn(authData);

        dispatch({
            type: AUTH_ACTIONS_TYPE.AUTH_LOGIN,
            payload: data
        })

        history.push('/');
    } catch (error) {
        console.log(error);
    }
}