import React from "react";
import {Paper} from "@material-ui/core";
import StudentsContent from "../../features/StudentsContent/StudentsContent";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.dark,
        width: '100%',
        marginTop: theme.spacing(2)
    }
}));

const TabPanelStudents = props => {
    const {isAdding, children, value, index, ...other} = props;
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
            {value === index && <StudentsContent isAdding={isAdding}>{children}</StudentsContent>}
        </Paper>
    );
};

TabPanelStudents.propTypes = {
    isAdding: PropTypes.bool.isRequired,
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TabPanelStudents;
