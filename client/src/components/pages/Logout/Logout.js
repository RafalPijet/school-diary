import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Paper, Typography, Zoom} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {setLogin, setUser, loadParents, loadTeachers} from "../../../redux/actions/usersActions";
import {resetRequest} from "../../../redux/actions/requestActions";
import {loadAllClasses, loadClassByTeacher, setSelectedClass} from "../../../redux/actions/classActions";
import {loadAllStudents} from "../../../redux/actions/studentActions";
import {setPath} from "../../../redux/actions/valuesActions";
import {Redirect} from "react-router";
import PageTitle from "../../common/PageTitle/PageTitle";
import {style} from "../../../styles/global";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: style.contentHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    info: {
        padding: theme.spacing(1),
        fontSize: style.bigSize,
        textAlign: 'center',
        width: '100%'
    }
}));

const Logout = props => {
    const {
        setLogin,
        resetRequest,
        setUser,
        loadTeachers,
        loadParents,
        loadAllClasses,
        loadClassByTeacher,
        loadAllStudents,
        setSelectedClass,
        setPath
    } = props;
    const [counter, setCounter] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const [isExit, setIsExit] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const timer = setInterval(
            () => setCounter(counter => counter + 1), 1000
        );

        return () => {
            setLogin(false);
            resetRequest();
            setUser({});
            loadParents([]);
            loadTeachers([]);
            loadClassByTeacher([]);
            loadAllClasses([]);
            loadAllStudents([]);
            setSelectedClass({});
            setPath('/');
            clearInterval(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (counter === 0) setIsShow(true);
        if (counter === 5) setIsShow(false);
    }, [counter, isExit]);


    return (
        <>
            <PageTitle>Logout</PageTitle>
            <Paper elevation={9} className={classes.root}>
                <Zoom in={isShow} timeout={500} onExited={() => setIsExit(true)}>
                    <div>
                        <Typography className={classes.info} color='secondary'>
                            Thank you for using our application.
                        </Typography>
                        <Typography className={classes.info} color='secondary'>
                            See you soon.
                        </Typography>
                    </div>
                </Zoom>
                {isExit && <Redirect to='/'/>}
            </Paper>
        </>
    )

};

const mapDispatchToProps = dispatch => ({
    setLogin: isLogin => dispatch(setLogin(isLogin)),
    setUser: user => dispatch(setUser(user)),
    setSelectedClass: classItem => dispatch(setSelectedClass(classItem)),
    loadTeachers: teachers => dispatch(loadTeachers(teachers)),
    loadParents: parents => dispatch(loadParents(parents)),
    loadAllClasses: classes => dispatch(loadAllClasses(classes)),
    loadClassByTeacher: classes => dispatch(loadClassByTeacher(classes)),
    loadAllStudents: students => dispatch(loadAllStudents(students)),
    resetRequest: () => dispatch(resetRequest()),
    setPath: path => dispatch(setPath(path))
});

export default connect(null, mapDispatchToProps)(Logout);
