import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import {ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Link, Paper} from "@material-ui/core";
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
                            <Typography align='left' variant='subtitle1' color='primary'>{i + 1}</Typography>
                        </Grid>
                        <Grid item lg={2}>
                            <Typography align='left' variant='subtitle1' color='primary'>{parent.lastName}</Typography>
                        </Grid>
                        <Grid item lg={2}>
                            <Typography align='left' variant='subtitle1' color='primary'>{parent.firstName}</Typography>
                        </Grid>
                        <Grid item lg={2}>
                            <Typography align='center' variant='subtitle1' color='primary'>{parent.birthDate.substring(0, 10)}</Typography>
                        </Grid>
                        <Grid item lg={3}>
                            <Typography align='center' variant='subtitle1' color='primary'><Link href={`mailto:${parent.email}`}>{parent.email}</Link></Typography>
                        </Grid>
                        <Grid item lg={1}>
                            <Typography align='center' variant='subtitle1' color='primary'>{parent.students.length}</Typography>
                        </Grid>
                    </Grid>
                    {/*<span className='text-center col-1 '>{i + 1}</span>*/}
                    {/*<span className='text-left col-2'>{parent.lastName}</span>*/}
                    {/*<span className='text-left col-2'>{parent.firstName}</span>*/}
                    {/*<span className='text-center col-2'>{parent.birthDate.substring(0, 10)}</span>*/}
                    {/*<span className='text-center col-4'><a href={`mailto:${parent.email}`}>{parent.email}</a></span>*/}
                    {/*<span className='text-center col-1'>{parent.students.length}</span>*/}
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
