import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Paper, AppBar, Tabs, Tab} from "@material-ui/core";
import Spinner from "../../common/Spinner/Spinner";
import TabPanelRatings from "../../common/TabPanelRatings/TabPanelRatings";
import {a11yProps} from "../../../utilities/functions";
import componentStyle from "./RatingsBoxStyle";

const useStyles = makeStyles(theme => componentStyle(theme));

const RatingsBox = props => {
    const {user, getClassesName, request} = props;
    const [value, setValue] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {

        if (Object.values(user.students).length && !isReady) {
            let studentsId = user.students.map(student => student.id);
            getClassesName(studentsId);
            setIsReady(true);
        }
    }, [user, isReady]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper variant='outlined' className={clsx(classes.root, request.geting ? classes.spinner : '')}>
            {request.geting ? <Spinner/> :
                <>
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
                                    label={`${item.firstName} ${item.lastName} - ${item.className}`}
                                    {...a11yProps(i)}/>
                            })}
                        </Tabs>
                    </AppBar>

                    {user.students.map((item, i) => {
                        return <TabPanelRatings
                            item={item}
                            index={i}
                            value={value}
                            key={item.id}
                            dir={theme.direction}
                        />
                    })}
                </>
            }
        </Paper>
    )
};

RatingsBox.propTypes = {
    user: PropTypes.object.isRequired,
    getClassesName: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired
};

export default RatingsBox;
