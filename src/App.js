import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ModalDialog from './components/Modal/ModalDialog';
import NavBar from  './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import { Container } from '@material-ui/core';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return(
        <BrowserRouter>
            <NavBar />
            <Container maxWidth="xl">
                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts" />} />
                    <Route path="/posts" exact component={HomePage} />
                    <Route path="/posts/search" exact component={HomePage} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>
                <ModalDialog /> {/* Generic modal for confirmation */}
            </Container>
        </BrowserRouter>
    );
};

export default App;