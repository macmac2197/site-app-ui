import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbDown from '@material-ui/icons/ThumbDown';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { dispatchReactPost } from '../../../redux/actions/posts';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
    leftButton: {
        marginLeft: 'auto',
    }
}));

const Post = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        post,
        setPostCurrentId,
        handleDeletePost
    } = props;
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result.googleId || user?.result?._id;
    const [likes, setLikes] = useState(post?.likes);
    const [disLikes, setDisLikes] = useState(post?.disLikes);

    // check if the user alreay like or dislike the post
    const hasLikePost = post.likes.find((like) => like === userId);
    const hasDisLikePost = post.disLikes.find((like) => like === userId);

    const openPost = () => {
        history.push(`/posts/${post._id}`);
    }

    const handleReactPost = async (id, type) => {
        dispatch(dispatchReactPost(id, type));

        if (type === 'like') {
            if (hasLikePost) {
                setLikes(post.likes.filter((id) => id !== userId));
            } else {
                setLikes([...post.likes, userId]);
                setDisLikes(post.disLikes.filter((id) => id !== userId));
            }
        }

        if (type === 'dislike') {
            if (hasDisLikePost) {
                setDisLikes(post.disLikes.filter((id) => id !== userId));
            } else {
                setDisLikes([...post.disLikes, userId]);
                setLikes(post.likes.filter((id) => id !== userId));
            }
        }
    }

    // Check if the user already like this post
    const LikeCount = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === userId)
                ? (
                    <>
                        <IconButton aria-label="heart-react" onClick={() => handleReactPost(post._id, 'like')}>
                            <FavoriteIcon color="secondary" />
                        </IconButton>
                        <Typography variant="body2" color="textPrimary">
                            { likes.length }
                            {/* { likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`} */}
                        </Typography>
                    </>
                ) : (
                    <>
                        <IconButton aria-label="heart-react" onClick={() => handleReactPost(post._id, 'like')}>
                            <FavoriteIcon color="inherit" />
                        </IconButton>
                        <Typography variant="body2" color="textPrimary">
                            { likes.length }
                            {/* { likes.length === 1 ? `Like` :  `Likes`} */}
                        </Typography>
                    </>
                );
        }

        return  (
            <>
                <IconButton aria-label="heart-react" onClick={() => handleReactPost(post._id, 'like')}>
                    <FavoriteIcon color="disabled" />
                </IconButton>
                <Typography variant="body2" color="textPrimary">
                    0
                </Typography>
            </>
        );
    }

    const DisLikesCount = () => {
        if (disLikes.length > 0) {
            return disLikes.find((like) => like === userId)
                ? (
                    <>
                        <IconButton aria-label="heart-react" onClick={() => handleReactPost(post._id, 'dislike')}>
                            <ThumbDown color="primary" />
                        </IconButton>
                        <Typography variant="body2" color="textPrimary">
                            { disLikes.length }
                            {/* { disLikes.length > 2 ? `You and ${disLikes.length - 1} others` : `${disLikes.length} like${disLikes.length > 1 ? 's' : ''}`} */}
                        </Typography>
                    </>
                ) : (
                    <>
                        <IconButton aria-label="heart-react" onClick={() => handleReactPost(post._id, 'dislike')}>
                            <ThumbDown color="primary" />
                        </IconButton>
                        <Typography variant="body2" color="textPrimary">
                            { disLikes.length }
                            {/* { disLikes.length === 1 ? `Like` :  `Likes`} */}
                        </Typography>
                    </>
                );
        }

        return  (
            <>
                <IconButton aria-label="heart-react" onClick={() => handleReactPost(post._id, 'dislike')}>
                    <ThumbDown color="disabled" />
                </IconButton>
                <Typography variant="body2" color="textPrimary">
                    0
                </Typography>
            </>
        );
    }

    return (
        <Card className={classes.root} raised elevation={6}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        { post.name.charAt(0) }
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={ post.name }
                subheader={ moment(post.createdAt).fromNow() }
            />
            <CardMedia
                className={classes.media}
                image={ post.selectedFile }
                title={ post.title }
                onClick={openPost}
            />
            <CardContent>
                <Typography 
                    variant="h6"
                    color="textPrimary"
                >
                    { post.title }
                </Typography>
                <Typography 
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    { post.tags.map((tag) => `#${tag} `)}
                </Typography>
                <Typography 
                    variant="body2" 
                    color="textPrimary" 
                    component="p"
                >
                    { post.message }
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <LikeCount />
                <DisLikesCount />
                { (user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
                    <>
                        <IconButton 
                            aria-label="edit"
                            className={ classes.leftButton }
                            onClick={ () => setPostCurrentId(post._id) }
                        >
                                <EditIcon />
                        </IconButton>
                        <IconButton 
                            aria-label="delete" 
                            className={ classes.leftButton }
                            onClick={() => handleDeletePost(post._id) }
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </CardActions>
        </Card>
    )
};

export default Post;