import { combineReducers } from 'redux';
import { posts } from './posts';
import { modalReducer } from './modalReducers';
import { authReducers } from './authReducers';

export default combineReducers({
    posts,
    modalState: modalReducer,
    authState: authReducers,
});