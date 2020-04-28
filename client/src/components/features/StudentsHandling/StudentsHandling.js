import React, {useState, useEffect} from 'react';
import {Paper, AppBar, Tabs, Tab} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Spinner from "../../common/Spinner/Spinner";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListIcon from '@material-ui/icons/List';
import TabPanelStudents from "../../common/TabPanelStudents/TabPanelStudents";
import Alert from "../../common/Alert/Alert";
import componentStyle from "./StudentsHandlingStyle";

const useStyles = makeStyles(theme => componentStyle((theme)));

const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

const StudentsHandling = props => {
    const {request, resetRequest, loadAllStudents} = props;
    const [value, setValue] = useState(0);
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        loadAllStudents();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleAlert = () => {
        resetRequest();
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            {request.pending && <Spinner/>}
            {request.success &&
            <>
                <AppBar position='static' className={classes.tabs}>
                    <Tabs value={value} onChange={handleChange} textColor='primary' variant='fullWidth'>
                        <Tab className={classes.tabs} label='students list' icon={<ListIcon/>} {...a11yProps(0)}/>
                        <Tab className={classes.tabs} label='add student'
                             icon={<PersonAddIcon/>} {...a11yProps(1)}/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                    style={{width: '100%'}}
                >
                    <TabPanelStudents isAdding={false} value={value} index={0} dir={theme.direction}/>
                    <TabPanelStudents isAdding={true} value={value} index={1} dir={theme.direction}/>
                </SwipeableViews>
            </>
            }
            <Alert
                isOpenAlert={request.error !== null}
                variant='error'
                message={request.error}
                handleCloseHandling={handleAlert}
            />
        </Paper>
    )
};

StudentsHandling.propTypes = {
    resetRequest: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    loadAllStudents: PropTypes.func.isRequired
};

export default StudentsHandling;
