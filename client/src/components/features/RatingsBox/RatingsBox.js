import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Paper, AppBar, Tabs, Tab} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import TabPanelRatings from "../../common/TabPanelRatings/TabPanelRatings";
import componentStyle from "./RatingsBoxStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

const RatingsBox = props => {
    const {user} = props;
    const [value, setValue] = useState(0);
    const classes = useStyles();
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            <AppBar position="static" className={classes.tabs}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                >
                    {user.students.map((item, i) => {
                        return <Tab
                            className={classes.tabs}
                            key={item.id}
                            label={`${item.firstName} ${item.lastName}`}
                            {...a11yProps(i)}/>
                    })}
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{width: '100%'}}
            >
                {user.students.map((item, i) => {
                    return <TabPanelRatings
                        item={item}
                        index={i}
                        value={value}
                        key={item.id}
                        dir={theme.direction}
                    />
                })}
            </SwipeableViews>
        </Paper>
    )
};

RatingsBox.propTypes = {
    user: PropTypes.object.isRequired
};

export default RatingsBox;
