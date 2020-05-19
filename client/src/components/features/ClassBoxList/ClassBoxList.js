import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from "clsx";
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "../../common/Alert/Alert";
import componentStyle from "./ClassBoxListStyle";
import Spinner from "../../common/Spinner/Spinner";
import ModalAreYouSure from "../../common/ModalAreYouSure/ModalAreYouSure";
import {Zoom} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {a11yProps} from "../../../utilities/functions";
import DiaryList from "../DiaryList/DiaryListContainer";

const useStyles = makeStyles(theme => componentStyle(theme));

const ClassBoxList = props => {
    const {
        loadClasses,
        loadClassById,
        user,
        availableClasses,
        request,
        resetRequest,
        modalYesNot,
        setModalYesNot,
        deleteRating,
        selectedClass,
        setSelectedClass
    } = props;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [alertIsOpen, setAlertIsOpen] = useState(false);
    const [isClasses, setIsClasses] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isOpenDiary, setIsOpenDiary] = useState(false);

    useEffect(() => {

        if (request.success === null) loadClasses(user.id);
        if (request.success && availableClasses.length && !isClasses) {
            loadClassById(availableClasses[value].id);
            setIsClasses(true);
        }

        setAlertIsOpen(request.error !== null);
        setIsChecked(Object.keys(selectedClass).length > 0);

        if (isChecked) {
            setIsOpenDiary(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request.error, request.success, request.geting, availableClasses.length, isClasses, selectedClass]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        if (newValue !== value) {
            setIsOpenDiary(false);
        }
    };

    const changeClass = async () => {
        await setSelectedClass({});
        await setIsClasses(false);
    };

    const handleAlert = () => {
        resetRequest();
    };

    const handleModal = isTrue => {
        const {id, _id, classId, studentId} = modalYesNot.content.data;
        setModalYesNot(false, {description: '', data: {}});

        if (isTrue) {
            deleteRating(id, _id, classId, studentId);
        }
    };

    return (
        <Paper variant='outlined' className={clsx(classes.root, classes.padding)}>
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
                                return <Tab
                                    disabled={!isChecked || !isOpenDiary}
                                    className={classes.tabs}
                                    key={item.id}
                                    label={item.name}
                                    {...a11yProps(i)}/>
                            })}
                        </Tabs>
                    </AppBar>
                    <Paper className={clsx(classes.root, classes.image)}>
                        {request.geting && <Spinner style={{marginLeft: '92px', marginTop: '55px'}} />}
                        {isChecked &&
                        <Zoom
                            in={isOpenDiary}
                            timeout={500}
                            onExited={changeClass}
                            unmountOnExit
                        >
                            <Paper elevation={4} style={{width: '100%'}}>
                                <DiaryList selectedClass={selectedClass} teacher={user}/>
                            </Paper>
                        </Zoom>
                        }
                    </Paper>
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
    selectedClass: PropTypes.object.isRequired,
    setSelectedClass: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    request: PropTypes.object.isRequired,
    loadClassById: PropTypes.func.isRequired,
    loadClasses: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    modalYesNot: PropTypes.object.isRequired,
    setModalYesNot: PropTypes.func.isRequired,
    deleteRating: PropTypes.func.isRequired
};

export default ClassBoxList;
