import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { dispatchCreatePost, dispatchUpdatePost } from '../../redux/actions/posts';

const IPostSate = {
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
};

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    submitBtn: {
        // width: "50%",
        marginTop: theme.spacing(1)
    },
    paper: {
        // margin: theme.spacing(0.5),
        marginTop: theme.spacing(1),
        padding: theme.spacing(1)
    },
}));

const Form = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        postCurrentId,
        setPostCurrentId
    } = props;

    const [postData, setPostData] = useState(IPostSate);
    const postList = useSelector((state) => state.posts);
    const [userName, setUserName] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleInputChange = e => {
        const {name, value} = e.target;

        setPostData({
            ...postData,
            [name]: value
        });
    }

    const handleTagsChange = e => {
        const { name } = e.target;

        setPostData({
            ...postData,
            [name]: e.target.value.split(',')
        })
    }

    const handleImageInputChange = e => {
        setPostData({
            ...postData,
            selectedFile: e.base64,
        });
    }
    
    const resetForm = () => {
        setPostCurrentId(null);
        setPostData(IPostSate);
    }

    const onSuccess = () => {
        console.log('Successfully data save!');
        resetForm()
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (postCurrentId)
            dispatch(dispatchUpdatePost(postCurrentId, { ...postData, name: userName}, onSuccess))
        else
            dispatch(dispatchCreatePost({ ...postData, name: userName}, onSuccess, history));
    }

    useEffect(() => {
        if (user?.result?.name) {
            setUserName(user?.result?.name);
        } else {
            setUserName(`${user?.result?.firstName} ${user?.result?.lastName}`);
        }
    }, [user])

    useEffect(() => {
        if (postCurrentId) {
            setPostData({
                ...postList.posts.find(post => post._id === postCurrentId)
            })
        }
    }, [postCurrentId, postList.posts])

    return (
        <>
            <Paper variant="outlined" className={classes.paper}>
                <form 
                    autoComplete="off" 
                    noValidate 
                    className={ `${classes.root} ${classes.form}` }
                    onSubmit={ handleSubmit }
                >
                    <Typography variant="h5">
                        {
                            postCurrentId ? 'Edit Post' : 'Create Post'
                        }
                    </Typography>
                    <TextField
                        name="title"
                        variant="outlined"
                        label="Title"
                        fullWidth
                        value={ postData.title }
                        onChange={ handleInputChange }
                    />
                    <TextField
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={ postData.tags }
                        onChange={ handleTagsChange }
                    />
                    <TextField
                        name="message"
                        variant="outlined"
                        label="Message"
                        multiline
                        rows="4"
                        fullWidth
                        value={ postData.message }
                        onChange={ handleInputChange }
                    />
                    <FileBase 
                        type="file"
                        name="selectedFile"
                        multiple={false}
                        onDone={handleImageInputChange}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        size="large"
                        type="submit"
                        className={classes.submitBtn}
                    >
                        {
                            postCurrentId ? 'Update' : 'Submit'
                        }
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        color="secondary"
                        size="large"
                        onClick={resetForm}
                        className={classes.submitBtn}
                    >
                        Reset
                    </Button>
                </form>
            </Paper>
        </>
    )
};

export default Form;