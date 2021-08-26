import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { dispatchGetAllPosts } from '../../redux/actions/posts';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1), 
    },
}));

const Paginate = ({ page }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const { numberOfPages } = useSelector((state) => state.posts);

    useEffect(() => {
        if (page) dispatch(dispatchGetAllPosts(page));
    }, [dispatch, page]);

    return (
        <Pagination
            className={classes.root}
            count={ numberOfPages }
            page={ Number(page) || 1 }
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem 
                    { ...item }
                    component={Link}
                    to={`posts?page=${ item.page }`}
                />
            )}
        ></Pagination>
    );
};

export default Paginate;