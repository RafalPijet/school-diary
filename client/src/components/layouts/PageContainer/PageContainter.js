import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, Grid} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {style} from '../../../styles/global';

const useStyles = makeStyles({
    root: {
        margin: `${style.baseSize} auto`
    }
});

const PageContainer = ({children}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth='lg' className={classes.root}>
                <Grid container item lg={12} spacing={2}>
                    {children}
                </Grid>
            </Container>
        </React.Fragment>
    )
};

PageContainer.propTypes = {
    children: PropTypes.node
};

export default PageContainer;
