import React from "react";
import {Paper} from "@material-ui/core";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import ClassContent from "../../features/ClassContent/ClassContentContainer";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.dark,
        width: '100%',
        height: '430px',
        marginTop: theme.spacing(1)
    }
}));

const TabPanelClass = props => {
    const {item, value, index, ...other} = props;

    const classes = useStyles();

    return (
        <Paper
            className={classes.root}
            elevation={9}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            >
            {value === index && <ClassContent classItem={item}/>}
        </Paper>
    )
};

TabPanelClass.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TabPanelClass;
