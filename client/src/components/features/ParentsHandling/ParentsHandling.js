import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Paper, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Spinner from '../../common/Spinner/Spinner';
import ParentItem from '../ParentItem/ParentItem';
// import './ParentsHandling.scss';
import {style} from "../../../styles/global";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.light
    },
    info: {
        padding: `${style.smallSize} ${theme.spacing(20)}px 0 ${theme.spacing(4)}px`,
        display: 'flex-inline',
        justifyContent: 'space-between'
    },
    content: {
        padding: `0 ${style.baseSize}`
    },
    correctFirst: {
        paddingRight: '56px'
    },
    correctSecond: {
        paddingRight: '76px'
    },
    correctThird: {
        paddingRight: '80px'
    },
    correctFourth: {
        paddingRight: '20px'
    }
}));

const ParentsHandling = props => {
    const {loadParents, loadClasses, loadStudents, request, parents, resetRequest} = props;
    const [selectedItem, setSelectedItem] = useState(0);
    const classes = useStyles();

    useEffect(() => {
        loadParents();
        loadClasses();
        loadStudents();
        return () => {
            resetRequest();
        }
    }, [loadParents, loadClasses, loadStudents, resetRequest]);

    const collapseHandling = index => {
        setSelectedItem(index);
    };

    if (request.pending || request.working) {
        return <Spinner/>
    } else if (request.success) {
        return (
            <Paper variant='outlined' className={classes.root}>
                <Grid container className={classes.info}>
                    <Typography variant='subtitle2' color='primary'>Pos</Typography>
                    <Typography className={classes.correctFourth} variant='subtitle2' color='primary'>Last name</Typography>
                    <Typography className={classes.correctThird} variant='subtitle2' color='primary'>First name</Typography>
                    <Typography className={classes.correctSecond} variant='subtitle2' color='primary'>Birth date</Typography>
                    <Typography className={classes.correctFirst} variant='subtitle2' color='primary'>Email</Typography>
                    <Typography variant='subtitle2' color='primary'>Students</Typography>
                </Grid>
                <Grid container className={classes.content}>
                    {parents.map((parent, i) => {
                        return <ParentItem
                            i={i}
                            key={i}
                            parent={parent}
                            selectedItem={selectedItem}
                            collapseHandling={collapseHandling}
                        />
                    })}
                </Grid>

            </Paper>
        )
    } else {
        return (
            <div>Parents Searching...</div>
        )
    }
};

ParentsHandling.propTypes = {
    loadParents: PropTypes.func.isRequired,
    loadClasses: PropTypes.func.isRequired,
    loadStudents: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    parents: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired
};

export default ParentsHandling;
