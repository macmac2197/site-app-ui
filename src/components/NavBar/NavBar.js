import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/HomeOutlined';
import Logout from '@material-ui/icons/ExitToApp';
import { red } from '@material-ui/core/colors';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { authLogout } from '../../redux/actions/authActions';
import decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: theme.spacing(1)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleLogout = () => {
        dispatch(authLogout());
        history.push('/');
        setUser(null);
    }
    
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location, user?.token])

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton 
                    edge="start" 
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="menu" 
                    component={ Link }
                    to="/">
                    <MenuIcon />
                </IconButton>
                <Typography 
                    variant="h6" 
                    className={classes.title}
                >
                    Memories App
                </Typography>
                {
                    user ? (
                        <>
                            <IconButton 
                                edge="end" 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="user-info"
                            >
                                <Avatar 
                                    aria-label="user-avatar"
                                    className={classes.avatar}
                                    alt={user.result?.name ? user.result?.name : `${user.result?.firstName} ${user.result?.lastName}`}
                                    src={user.result?.imageUrl}
                                    
                                >
                                    {user.result?.name ? user.result?.name.charAt(0) : user.result?.firstName.charAt(0)}
                                </Avatar>
                            </IconButton>
                            <Typography variant="h6">{ user.result?.name ? user.result?.name : `${user.result?.firstName} ${user.result?.lastName}` }</Typography>
                            <IconButton 
                                edge="end" 
                                className={classes.menuButton} 
                                color="inherit" 
                                aria-label="user-logout"
                                onClick={handleLogout}
                            >
                                <Logout />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Button    
                                variant="contained"
                                color="primary"
                                component={ Link }
                                to="/auth"
                            >
                                Sign in
                            </Button>
                        </>
                    )
                }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;