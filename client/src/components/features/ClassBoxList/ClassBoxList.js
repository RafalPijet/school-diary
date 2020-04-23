import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Paper} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Alert from "../../common/Alert/Alert";
import componentStyle from "./ClassBoxListStyle";
import TabPanelDiary from "../../common/TabPanelDiary/TabPanelDiary";
import Spinner from "../../common/Spinner/Spinner";
import ModalAreYouSure from "../../common/ModalAreYouSure/ModalAreYouSure";
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => componentStyle(theme));

const a11yProps = index => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
};

const ClassBoxList = props => {
    const {
        loadClasses,
        user,
        availableClasses,
        request,
        resetRequest,
        modalYesNot,
        setModalYesNot,
        deleteRating
    } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [alertIsOpen, setAlertIsOpen] = useState(false);

    useEffect(() => {

        if (request.success === null) loadClasses(user.id);
        setAlertIsOpen(request.error !== null);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request.error]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAlert = () => {
        resetRequest();
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleModal = isTrue => {
        const {id, _id, classId, studentId} = modalYesNot.content.data;
        setModalYesNot(false, {description: '', data: {}});

        if (isTrue) {
            deleteRating(id, _id, classId, studentId);
        }
    };

    return (
        <Paper variant='outlined' className={classes.root}>
            {request.pending ? <Spinner/> :
                <>
                    <div className={classes.subjectInfo}>
                        <Typography variant='subtitle1'>{`subject: ${user.subject.toUpperCase()}`}</Typography>
                    </div>
                    <AppBar position="static" className={classes.tabs}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                        >
                            {availableClasses.map((item, i) => {
                                return <Tab className={classes.tabs} key={item.id} label={item.name} {...a11yProps(i)}/>
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
                            return <TabPanelDiary
                                item={item}
                                key={item.id}
                                teacher={user}
                                index={i}
                                value={value}
                                dir={theme.direction}
                            />
                        })}
                    </SwipeableViews>
                    <Alert
                        message={request.error}
                        isOpenAlert={alertIsOpen}
                        variant='error'
                        handleCloseHandling={handleAlert}
                    />
                    <ModalAreYouSure
                        description={modalYesNot.content.description}
                        isOpen={modalYesNot.isOpen}
                        isConfirm={handleModal}
                    />
                </>
            }
        </Paper>
    )
};

ClassBoxList.propTypes = {
    availableClasses: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    loadClasses: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    modalYesNot: PropTypes.object.isRequired,
    setModalYesNot: PropTypes.func.isRequired,
    deleteRating: PropTypes.func.isRequired
};

export default ClassBoxList;
