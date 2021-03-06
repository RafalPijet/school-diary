import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import MainMenu from '../../layouts/MainMenu/MainMenuContainer';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from '@material-ui/core';
import Logo from "../../common/Logo/Logo";
import logo from '../../../images/diaryLogo.png';
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Group';
import ParentsIcon from '@material-ui/icons/Wc';
import StudentIcon from '@material-ui/icons/School';
import TeachersIcon from '@material-ui/icons/SupervisedUserCircle';
import LogoutIcon from '@material-ui/icons/MeetingRoom';
import LoginIcon from '@material-ui/icons/ExitToApp';
import RegIcon from '@material-ui/icons/HowToReg';
import DataIcon from '@material-ui/icons/Assignment';
import RatingIcon from '@material-ui/icons/Dvr';
import DiariesIcon from '@material-ui/icons/LibraryBooks';

const availableLinks = {
    loginLinks: [
        {path: "/", title: "Home", icon: <HomeIcon fontSize='large'/>},
        {path: "/login", title: "LogIn", icon: <LoginIcon fontSize='large'/>},
        {path: "/registration", title: "Registration", icon: <RegIcon fontSize='large'/>}
    ],
    studentLinks: [
        {path: "/", title: "Home", icon: <HomeIcon fontSize='large'/>},
        {path: "/grades", title: "Grades", icon: <RatingIcon fontSize='large'/>},
        {path: "/data", title: "Parent Data", icon: <DataIcon fontSize='large'/>},
        {path: "/teachers", title: "Teachers", icon: <TeachersIcon fontSize='large'/>},
        {path: "/logout", title: "LogOut", icon: <LogoutIcon fontSize='large'/>}
    ],
    teacherLinks: [
        {path: "/", title: "Home", icon: <HomeIcon fontSize='large'/>},
        {path: "/diaries", title: "Class Diaries", icon: <DiariesIcon fontSize='large'/>},
        {path: "/data", title: "Teacher's data", icon: <DataIcon fontSize='large'/>},
        {path: "/logout", title: "LogOut", icon: <LogoutIcon fontSize='large'/>}
    ],
    principalLinks: [
        {path: "/", title: "Home", icon: <HomeIcon fontSize='large'/>},
        {path: "/classes", title: "Classes", icon: <ClassIcon fontSize='large'/>},
        {path: "/teachers", title: "Teachers", icon: <TeachersIcon fontSize='large'/>},
        {path: "/students", title: "Students", icon: <StudentIcon fontSize='large'/>},
        {path: "/parents", title: "Parents", icon: <ParentsIcon fontSize='large'/>},
        {path: "/logout", title: "LogOut", icon: <LogoutIcon fontSize='large'/>}
    ]
};

const useStyles = makeStyles(theme => ({
    paperLogo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        height: '105px',
        backgroundColor: theme.palette.secondary.light
    },
    logo: {
        width: '170px',
        height: '65px',
        margin: '0'
    }
}));

const NavBar = props => {
    const [activeLink, setActiveLink] = useState([]);
    const {isLogin, loggedUser} = props;
    const {loginLinks, studentLinks, teacherLinks, principalLinks} = availableLinks;
    const classes = useStyles();

    useEffect(() => {

        if (isLogin && loggedUser.status === 'parent') {
            setActiveLink(studentLinks);
        } else if (isLogin && loggedUser.status === 'teacher') {
            setActiveLink(teacherLinks);
        } else if (isLogin && loggedUser.status === 'principal') {
            setActiveLink(principalLinks);
        } else {
            setActiveLink(loginLinks);
        }
    }, [isLogin, loggedUser, loginLinks, principalLinks, studentLinks, teacherLinks]);

    return (
        <>
            <Paper elevation={9} className={classes.paperLogo}>
                <Logo image={logo} name='logo' myStyle={classes.logo}/>
            </Paper>
            <Paper elevation={9}>
                <MainMenu links={activeLink}/>
            </Paper>
        </>
    )
};

NavBar.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object
};

export default NavBar;
