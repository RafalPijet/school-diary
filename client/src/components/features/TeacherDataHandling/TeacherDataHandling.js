import React, {useState} from "react";
import PropTypes from 'prop-types'
import {makeStyles} from "@material-ui/core/styles";
import {Paper, Tabs, Tab, AppBar} from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import {a11yProps} from "../../../utilities/functions";
import componentStyle from "./TeacherDataHandlingStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const TeacherDataHandling = props => {
    const [value, setValue] = useState(0);
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <AppBar position='static' className={classes.tabs}>
                <Tabs value={value} onChange={handleChange} textColor='primary' variant='fullWidth'>
                    <Tab label='students list' icon={<ListIcon/>} {...a11yProps(0)}/>
                    <Tab label="edit teacher's data" icon={<EditIcon/>} {...a11yProps(1)}/>
                </Tabs>
            </AppBar>
        </Paper>
    )
};

TeacherDataHandling.propTypes = {

};

export default TeacherDataHandling
