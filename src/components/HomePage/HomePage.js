import React, { useState } from 'react';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination/Pagination';
import ChipInput from 'material-ui-chip-input';
import { dispatchGetSearchPost } from '../../redux/actions/posts';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    appBar: {
        marginTop: theme.spacing(0.5),
        padding: theme.spacing(2)
    },
    chipInput: {
        marginTop: theme.spacing(1)
    },
    btnSearch: {
        marginTop: theme.spacing(1)
    },
}));

// To know which page is currentl on? What search string are we looking for
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const HomePage = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const classes = useStyles();

    // Get the number pages in none by default 1
    const page = query.get('page') || 1;
    // Get the search query
    const searchQuery = query.get('searchQuery');

    const [ postCurrentId, setPostCurrentId ] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPres = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAddTag = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDeleteTAg = (tagDelete) => {
        setTags(tags.filter((tag) => tag !== tagDelete));
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(dispatchGetSearchPost({ search, tags: tags.join(',')} ));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags}`);
        } else {
            history.push('/');
        }
    }

    // useEffect(() => {
    //     dispatch(dispatchGetAllPosts())
    // }, [postCurrentId, dispatch]);

    return (
        <div>
            <Container maxWidth="xl">
                <Grow in>
                    <Container spacing="3">
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="stretch"
                        >
                            <Grid item xs={12} sm={7}>
                                <Posts {...{ postCurrentId, setPostCurrentId }}/>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <AppBar position="static" color="inherit" className={classes.appBar}>
                                     <TextField 
                                        name="search" 
                                        variant="outlined" 
                                        fullWidth
                                        label="Search Memories"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyPress={handleKeyPres}
                                    />
                                    <ChipInput 
                                        className={classes.chipInput}
                                        variant="outlined"
                                        label="Search Tags"
                                        value={tags}
                                        onAdd={handleAddTag}
                                        onDelete={handleDeleteTAg}
                                    />
                                    <Button
                                        className={classes.btnSearch} 
                                        variant="contained" 
                                        fullWidth 
                                        color="primary"
                                        onClick={searchPost}
                                    >
                                        Search
                                    </Button>
                                </AppBar>
                                <Form {...{ postCurrentId, setPostCurrentId}}/>
                                {( !searchQuery && !tags.length ) && (
                                    <Paper elevation={1}>
                                        <Pagination page={page}/>
                                    </Paper>
                                )}
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </div>
    )
}

export default HomePage;
