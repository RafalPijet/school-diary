import React from "react";
import {Paper} from "@material-ui/core";
import DiaryList from "../../features/DiaryList/DiaryList";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.secondary.dark,
        width: '100%',
        marginTop: theme.spacing(2)
    }
}));

const TabPanelDiary = props => {
    const {item, teacher, value, index, ...other} = props;
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
            {value === index && <DiaryList selectedClass={item} teacher={teacher}/>}
        </Paper>
    );
};

TabPanelDiary.propTypes = {
    teacher: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TabPanelDiary;
