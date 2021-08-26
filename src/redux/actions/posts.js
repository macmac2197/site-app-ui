import { fetchAllPosts, createPost, updatePost, deletePost, likePost, fetchPostBySearch, fetchPostById, commentPost } from '../services/postsServices';

export const POSTS_ACTIONS_TYPE = {
    GET_ALL_POSTS: 'GET_ALL_POSTS',
    CREATE_POST: 'CREATE_POST',
    UPDATE_POST: 'UPDATE_POST',
    DELETE_POST: 'DELETE_POST',
    REACT_POST: 'REACT_POST',
    FETCH_BY_SEARCH: 'FETCH_BY_SEARCH',
    START_LOADING: 'START_LOADING',
    END_LOADING: 'END_LOADING',
    GET_POST_BY_ID: 'GET_POST_BY_ID',
    COMMENT_POST: 'COMMENT_POST',
};

export const dispatchGetPostById = (id) => async dispatch => {
    try {
        dispatch({
            type: POSTS_ACTIONS_TYPE.START_LOADING
        });

        const { data } = await fetchPostById(id);

        dispatch({
            type: POSTS_ACTIONS_TYPE.GET_POST_BY_ID,
            payload: data
        });

        dispatch({
            type: POSTS_ACTIONS_TYPE.END_LOADING
        });
    } catch (error) {
        console.log(error);
    }
}

export const dispatchGetAllPosts = (page) => async dispatch => {
    try {
        dispatch({
            type: POSTS_ACTIONS_TYPE.START_LOADING
        });

        const { data } = await fetchAllPosts(page);

        dispatch({
            type: POSTS_ACTIONS_TYPE.GET_ALL_POSTS,
            payload: data
        });

        dispatch({
            type: POSTS_ACTIONS_TYPE.END_LOADING
        });
    } catch (error) {
        console.log(error);
    }
}

export const dispatchGetSearchPost = (searchQuery) => async dispatch => {
    try {
        dispatch({
            type: POSTS_ACTIONS_TYPE.START_LOADING
        });

        const { data: { data }} = await fetchPostBySearch(searchQuery);
        
        dispatch({
            type: POSTS_ACTIONS_TYPE.FETCH_BY_SEARCH,
            payload: data
        });

        dispatch({
            type: POSTS_ACTIONS_TYPE.END_LOADING
        });
    } catch (error) {
        console.log(error);
    }
}

export const dispatchCreatePost = (postData, onSuccess, history) => async dispatch => {
    try {
        dispatch({
            type: POSTS_ACTIONS_TYPE.START_LOADING
        });

        const { data } = await createPost(postData);

        history.push(`/posts/${data._id}`);

        dispatch({
            type: POSTS_ACTIONS_TYPE.CREATE_POST,
            payload: data
        })
        onSuccess()
    } catch (error) {
        console.log(error);
    }
}

export const dispatchUpdatePost = (postId, postData, onSuccess) => async dispatch => {
    try {
        const posts = await updatePost(postId, postData);

        dispatch({
            type: POSTS_ACTIONS_TYPE.UPDATE_POST,
            payload: posts.data
        })
        onSuccess()
    } catch (error) {
        console.log(error);
    }
}

export const dispatchDeletePost = (postId) => async dispatch => {
    try {
        await deletePost(postId);

        dispatch({
            type: POSTS_ACTIONS_TYPE.DELETE_POST,
            payload: postId
        })
    } catch (error) {
        console.log(error);
    }
}

export const dispatchReactPost = (postId, type) => async dispatch => {
    try {
        const posts = await likePost(postId, {type});

        dispatch({
            type: POSTS_ACTIONS_TYPE.REACT_POST,
            payload: posts.data
        })
    } catch (error) {
        console.log(error);
    }
}

export const dispatchCommentPost = (comment, id) => async dispatch => {
    try {
        const { data } = await commentPost(comment, id);
        
        dispatch({
            type: POSTS_ACTIONS_TYPE.COMMENT_POST,
            payload: data
        })

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}