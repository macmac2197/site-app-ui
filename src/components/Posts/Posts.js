import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import { toggleModal, setModalProps } from '../../redux/actions/modalActions';
// import { deletePostCallback } from '../../utils/modalUtils';
import { dispatchDeletePost } from '../../redux/actions/posts';

const Posts = (props) => {
    const dispatch = useDispatch();
    const {
        postCurrentId,
        setPostCurrentId
    } = props;

    const { posts, isLoading } = useSelector((state) => state.posts);

    const handleDeletePost = async (id) => {
        dispatch(dispatchDeletePost(id));

        // dispatch(toggleModal(true));
        // dispatch(setModalProps(
        //     'Delete Item',
        //     'Are you sure you want to delete the selected item?',
        //     'CONFIRM',
        //     'Delete',
        //     'Cancel',
        //     deletePostCallback(id)
        // ));
    }

    // Check if no posts avaialble
    if (!posts.length && !isLoading) return 'No posts available!';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid
                container
                alignContent="stretch"
                spacing={3}
            >
                {
                    posts.map((post) => {
                        return (
                            <Grid key={post._id} item xs={12} sm={6}>
                                <Post 
                                    post={ post } 
                                    postCurrentId={ postCurrentId }
                                    setPostCurrentId={ setPostCurrentId }
                                    handleDeletePost={ handleDeletePost }
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    )
};

export default Posts;