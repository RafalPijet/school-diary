import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Paper, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Spinner from '../../common/Spinner/Spinner';
import ParentItem from '../ParentItem/ParentItem';
import componentStyle from "./ParentsHandlingStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const ParentsHandling = props => {
    const {
        loadParents,
        loadStudents,
        request,
        parents,
        resetRequest,
        allStudents
    } = props;
    const [selectedItem, setSelectedItem] = useState(0);
    const [isReady, setReady] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        loadStudents();

        if (allStudents.length && !isReady) {
            setReady(true);
            loadParents();
        }

        return () => {
            resetRequest();
        }
    }, [allStudents.length]);

    const collapseHandling = index => {
        setSelectedItem(index);
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <Grid container className={classes.info}>
                <Grid item lg={1}>
                    <Typography variant='subtitle2' color='primary'>Pos</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography variant='subtitle2' color='primary'>Last name</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography variant='subtitle2' color='primary'>First name</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography style={{paddingLeft: '26px'}} variant='subtitle2' color='primary'>Phone</Typography>
                </Grid>
                <Grid item lg={2}>
                    <Typography align='center' variant='subtitle2' color='primary'>Email</Typography>
                </Grid>
                <Grid item lg={3}>
                    <Typography style={{paddingLeft: '34px'}} variant='subtitle2' color='primary'>Students</Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.content}>
                {request.pending || request.working ? <Spinner/> :
                    parents.map((parent, i) => {
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
};

ParentsHandling.propTypes = {
    loadParents: PropTypes.func.isRequired,
    loadStudents: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    parents: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    allStudents: PropTypes.array.isRequired
};

export default ParentsHandling;
