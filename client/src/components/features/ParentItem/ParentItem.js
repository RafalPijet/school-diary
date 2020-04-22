import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Link} from "@material-ui/core";
import {Grid, Typography} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ParentItemCollapse from '../ParentItemCollapse/ParentItemCollapseContainer';
// import './ParentItem.scss';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        margin: `${theme.spacing(.2)}px 0`
    },
    item: {
        backgroundColor: theme.palette.secondary.dark
    },
    select: {
        width: '100%',
        margin: `${theme.spacing(1)}px 0`
    },
    selected: {
        fontWeight: '800'
    }
}));

const ParentItem = props => {
    const {parent, i, selectedItem, collapseHandling} = props;
    const classes = useStyles();

    useEffect(() => {
    }, [selectedItem]);

    const collapseSetting = () => {
        collapseHandling(i);
    };

    return (
        <div className={selectedItem === i ? classes.select : classes.root}>
            <ExpansionPanel className={classes.item} expanded={selectedItem === i} onChange={collapseSetting}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Grid container>
                        <Grid item lg={1}>
                            <Typography
                                className={selectedItem === i ? classes.selected : ''}
                                align='left'
                                variant='subtitle1'
                                color='primary'>
                                {i + 1}
                            </Typography>
                        </Grid>
                        {selectedItem === i ?
                            (<Grid item lg={4}>
                                <Typography
                                    className={classes.selected}
                                    align='center'
                                    variant='subtitle1'
                                    color='primary'>
                                    {`${parent.lastName} ${parent.firstName}`}
                                </Typography>
                            </Grid>) :
                            (<>
                                    <Grid item lg={2}>
                                        <Typography
                                            align='left'
                                            variant='subtitle1'
                                            color='primary'>
                                            {parent.lastName.length > 12 ? `${parent.lastName.substring(0, 13)}...` :
                                                parent.lastName}
                                        </Typography>
                                    </Grid>
                                    <Grid item lg={2}>
                                        <Typography
                                            align='left'
                                            variant='subtitle1'
                                            color='primary'>
                                            {parent.firstName.length > 12 ? `${parent.firstName.substring(0, 13)}...` :
                                                parent.firstName}
                                        </Typography>
                                    </Grid>
                                </>
                            )}
                        <Grid item lg={2}>
                            <Typography
                                className={selectedItem === i ? classes.selected : ''}
                                align='center'
                                variant='subtitle1'
                                color='primary'>
                                {parent.telephone}
                            </Typography>
                        </Grid>
                        <Grid item lg={3}>
                            <Typography
                                className={selectedItem === i ? classes.selected : ''}
                                align='center'
                                variant='subtitle1'
                                color='primary'>
                                <Link href={`mailto:${parent.email}`}>{parent.email}</Link>
                            </Typography>
                        </Grid>
                        <Grid item lg={1}>
                            <Typography
                                className={selectedItem === i ? classes.selected : ''}
                                align='center'
                                variant='subtitle1'
                                color='primary'>
                                {parent.students.length}
                            </Typography>
                        </Grid>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <ParentItemCollapse parent={parent}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
};

ParentItem.propTypes = {
    parent: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    selectedItem: PropTypes.number,
    collapseHandling: PropTypes.func.isRequired
};

export default ParentItem;
