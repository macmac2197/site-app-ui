import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Avatar, Button, Container, Paper, Typography, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles';
import InputTextField from '../Generic/InputTextField';
import { GoogleLogin } from 'react-google-login';
import GoogleTranslate from '@material-ui/icons/GTranslate';
import { authLoginSuccess, userSignIn, userSignUp } from '../../redux/actions/authActions';
import { useHistory } from 'react-router-dom';

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
        marginTop: theme.spacing(1)
    },
    paper: {
        textAlign: 'center'
    },
    avatar: {
        margin: 'auto'
    }
}));

const IAuthState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''

}

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ isSignUp, setIsSignUp ] = useState(false);
    const [ isShowPassword, setIsShowPassword ] = useState(false);
    const [ authData, setAuthData ] = useState(IAuthState);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAuthData({
            ...authData,
            [name]: value
        });
    }

    const hanldeSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(userSignUp(authData, history));
        } else {
            dispatch(userSignIn(authData, history));
        }
    }

    const handleShowPassword = () => setIsShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    }

    const handleGoogleFailure = (error) => {
        console.log('Google sign in fail!', error);
    }

    const handleGoogleSuccess = async (res) => {
        const response = {
            result: res?.profileObj,
            token: res?.tokenId
        }

        try {
            await dispatch(authLoginSuccess(response))
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper variant="outlined" elevation={3} className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    { isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={hanldeSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <InputTextField 
                                        name="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={authData.firstName}
                                        half
                                        handleOnChange={handleInputChange}
                                    />
                                    <InputTextField 
                                        name="lastName"
                                        label="Last Name"
                                        value={authData.lastName}
                                        half
                                        handleOnChange={handleInputChange}
                                    />
                                </>
                            )
                        }
                        <InputTextField 
                            name="email"
                            label="Email Address"
                            value={authData.email}
                            type="email"
                            handleOnChange={handleInputChange}
                        />
                        <InputTextField 
                            name="password"
                            label="Password"
                            value={authData.password}
                            type={ isShowPassword ? "text" : "password"}
                            handleOnChange={handleInputChange}
                            handleShowPassword={handleShowPassword}
                        />
                        {
                            isSignUp && (
                                <>
                                    <InputTextField 
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        value={authData.confirmPassword}
                                        type="password"
                                        handleOnChange={handleInputChange}
                                    />
                                </>
                            )
                        }
                    </Grid>
                    <Button 
                        variant="contained" 
                        fullWidth 
                        type="submit" 
                        color="primary"
                        className={classes.submitBtn}
                    >
                        { isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="296748599822-pi3b97dtq4t2b2sj0njdeu618qgf9h38.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                className={classes.submitBtn}
                                color="primary"
                                fullWidth
                                variant="contained"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<GoogleTranslate />}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onFailure={handleGoogleFailure}
                        onSuccess={handleGoogleSuccess}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
