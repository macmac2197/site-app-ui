import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { dispatchCommentPost } from '../../redux/actions/posts';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
    },
    outerContainer: {
        marginTop: '5px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    innerContainer: {
        height: '200px', 
        overflow: 'auto',
        marginRight: '30px',
    },
    commentBtn: {
        marginTop: '5px',
    }
}));

const CommentSection = ({ post }) => {
    const {
        _id,
       comments
    } = post;
    const classes = useStyles();
    const dispatch = useDispatch();

    const [useComments, setUserComments] = useState(comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleComment = (e) => {
        setComment(e.target.value);
    }

    const handleSubmitComment = async () => {
        const userName = user?.result?.name ? user?.result?.name : `${user?.result?.firstName} ${user?.result?.lastName}`
        const userComment = `${userName}: ${comment}`;
        
        const newComment = await dispatch(dispatchCommentPost(userComment, _id));

        setUserComments(newComment);
        setComment('');

        // to view the latest comment of user
        commentsRef.current.scrollIntoView({ behavior: 'smooth'});
    }

    return (
        <>
            <div className={classes.outerContainer} >
                <div className={classes.innerContainer} >
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    { useComments.map((comment, index) => (
                        <Typography key={index} gutterBottom variant="subtitle1">
                            <strong>{ comment.split(': ')[0]}</strong>
                            { comment.split(':')[1]}
                        </Typography>
                    )) }
                    <div ref={commentsRef} />
                </div>
                <div style={{width: '70%'}}>
                    { (user?.result?.name || user?.result?.firstName) && (
                        <>
                            <Typography gutterBottom variant="h6">Write a comment</Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                rows={4}
                                lable="Comments"
                                multiline
                                value={comment}
                                onChange={(e) => handleComment(e)}
                            />
                            <Button
                                className={classes.commentBtn}
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={!comment}
                                onClick={handleSubmitComment}
                            >
                                Submit
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default CommentSection;
