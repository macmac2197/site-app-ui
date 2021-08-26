import { POSTS_ACTIONS_TYPE } from '../actions/posts';
const IPostState = {
    posts: [],
    post: null,
    currentPage: 1,
    numberOfPages: 1,
    isLoading: true
}

export const posts = (state = IPostState, action) => {
    switch (action.type) {
        case POSTS_ACTIONS_TYPE.START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case POSTS_ACTIONS_TYPE.END_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case POSTS_ACTIONS_TYPE.GET_ALL_POSTS:
            return {
                ...state,
                posts: [...action.payload.posts],
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case POSTS_ACTIONS_TYPE.GET_POST_BY_ID:
            return {
                ...state,
                post: action.payload
            }
        case POSTS_ACTIONS_TYPE.FETCH_BY_SEARCH:
            return {
                ...state,
                posts: [...action.payload]
            }
        case POSTS_ACTIONS_TYPE.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case POSTS_ACTIONS_TYPE.UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case POSTS_ACTIONS_TYPE.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case POSTS_ACTIONS_TYPE.REACT_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        case POSTS_ACTIONS_TYPE.COMMENT_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)
            }
        default:
            return state;
    }
}