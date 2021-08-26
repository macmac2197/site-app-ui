import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid, Grow, ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { dispatchGetPostById, dispatchGetSearchPost } from '../../redux/actions/posts';
import CommentSection from './CommentSection';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        borderRadius: '15px'
    },
    imgDiv: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        margin: '5px',
        padding: '5px'
    },
    img: {
        borderRadius: '10px',
        width: '100%',
        height: 'auto'
    },
    leftSide: {
        padding: '0px 8px 4px 8px'
    },
    rootRecommend: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}))

const PostDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const { id } = useParams();
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    
    useEffect(() => {
        dispatch(dispatchGetPostById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (post) {
            dispatch(dispatchGetSearchPost({ search: '', tags: post?.tags.join(',') }));
        }
    }, [dispatch, post]);

    if (!post){
        return null;
    }

    if (isLoading) {
        return (
            <Paper elevation={6}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id );

    const openPost = (postId) => history.push(`/posts/${postId}`);

    return (
        <Paper className={ classes.root } elevation={6}>
            <Grow in>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                >
                    <Grid item lg={6} className={ classes.leftSide }>
                        <Typography variant="h3" component="h2" >
                            { post.title }
                        </Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2" >
                            { post.tags.map((tag) => `#${tag } `) }
                        </Typography>
                        <Typography gutterBottom variant="body1" component="p" >
                            { post.message }
                        </Typography>
                        <Typography variant="h6">
                            {`Create by: ${ post.name }`}
                        </Typography>
                        <Typography variant="body1">
                            { moment(post.createdAt).fromNow() }
                        </Typography>
                        <Divider />
                        <Typography variant="body1" color="textSecondary">
                            Realtime Chat: Coming soon!
                        </Typography>
                        <Divider />
                        <CommentSection post={ post }/>
                        <Divider />
                    </Grid>
                    <Grid item lg={6}>
                        <div className={ classes.img }>
                            <img className={ classes.img } src={ post.selectedFile } alt={ post.title } />
                        </div>
                    </Grid>
                    { recommendedPosts.length ? (
                        <Grid item lg={12}>
                            <Typography gutterBottom variant="h5">You might also like: </Typography>
                            <Divider />
                            <div className={classes.rootRecommend}>
                                <ImageList className={classes.imageList} cols={2.5}>
                                    { 
                                        posts?.map((item) => (
                                        <ImageListItem key={ item._id }>
                                            <img src={ item.selectedFile } alt={ item.title } />
                                                <ImageListItemBar
                                                title={ item.title }
                                                classes={{
                                                    root: classes.titleBar,
                                                    title: classes.title,
                                                }}
                                                actionIcon={
                                                    <IconButton aria-label={`star ${ item.title }`}>
                                                    <StarBorderIcon className={ classes.title } />
                                                    </IconButton>
                                                }
                                                onClick={() => openPost(item._id)}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </div>
                        </Grid>
                    ) : ''}
                </Grid>
            </Grow>
        </Paper>
    )
}

export default PostDetails;