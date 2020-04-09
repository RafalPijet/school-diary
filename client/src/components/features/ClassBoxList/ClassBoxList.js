import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Paper} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import TabPanelDiary from "../../common/TabPanelDiary/TabPanelDiary";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {style} from "../../../styles/global";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: style.contentHeight,
        width: '100%',
        padding: `0 ${style.baseSize}`
    },
    subjectInfo: {
        width: '100%',
        padding: `${style.smallSize} 0`,
        display: 'inline-flex',
        justifyContent: 'flex-end'
    }
}));

const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

const ClassBoxList = props => {
    const {loadClasses, user, availableClasses, request} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);

    useEffect(() => {
        loadClasses(user.id);
    }, [user.id, loadClasses]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <div className={classes.subjectInfo}>
                <Typography variant='subtitle1'>{`subject: ${user.subject.toUpperCase()}`}</Typography>
            </div>
            <AppBar position="static" color="secondary">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {availableClasses.map((item, i) => {
                        return <Tab key={item.id} label={item.name} {...a11yProps(i)}/>
                    })}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{width: '100%'}}
            >
                {availableClasses.map((item, i) => {
                    return (
                        <TabPanelDiary
                            item={item}
                            key={item.id}
                            teacher={user}
                            index={i}
                            value={value}
                            dir={theme.direction}/>
                )})}
            </SwipeableViews>
        </Paper>
    )
};

ClassBoxList.propTypes = {
    availableClasses: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    loadClasses: PropTypes.func.isRequired
};

export default ClassBoxList;
