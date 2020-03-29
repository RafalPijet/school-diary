import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from '../../layouts/MainMenu/MainMenu';
import Logo from "../../common/Logo/Logo";
import logo from '../../../images/logo.png';
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Group';
import ParentsIcon from '@material-ui/icons/Wc';
import StudentIcon from '@material-ui/icons/Face';
import TeachersIcon from '@material-ui/icons/SupervisedUserCircle';
import LogoutIcon from '@material-ui/icons/MeetingRoom';
import LoginIcon from '@material-ui/icons/ExitToApp';
import RegIcon from '@material-ui/icons/HowToReg';
import DataIcon from '@material-ui/icons/Assignment';
import RatingIcon from '@material-ui/icons/Dvr';
import DiariesIcon from '@material-ui/icons/LibraryBooks';
import TodayIcon from '@material-ui/icons/Today';
import LoggedUser from '../../features/LoggedUser/LoggedUser';
import '../../features/NavBar/NavBar.scss';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginLinks: [
                {path: "/login", title: "LogIn", icon: <LoginIcon fontSize='large'/>},
                {path: "/registration", title: "Registration", icon: <RegIcon fontSize='large'/> }
            ],
            studentLinks: [
                {path: "/", title: "Home", icon: <HomeIcon fontSize='large'/>},
                {path: "/ratings", title: "Ratings", icon: <RatingIcon fontSize='large'/>},
                {path: "/attendance", title: "Attendance", icon: <TodayIcon fontSize='large'/>},
                {path: "/data", title: "Student Data", icon: <DataIcon fontSize='large'/>},
                {path: "/teachers", title: "Teachers", icon: <TeachersIcon fontSize='large'/>},
                {path: "/logout", title: "LogOut", icon: <LogoutIcon fontSize='large'/>}
            ],
            teacherLinks: [
                {path: "/", title: "Home", icon: <HomeIcon  fontSize='large'/>},
                {path: "/diaries", title: "Class Diaries", icon: <DiariesIcon fontSize='large'/>},
                {path: "/data", title: "Teacher data", icon: <DataIcon fontSize='large'/>},
                {path: "/logout", title: "LogOut", icon: <LogoutIcon fontSize='large'/>}
            ],
            principalLinks: [
                {path: "/", title: "Home", icon: <HomeIcon fontSize='large'/>},
                {path: "/classes", title: "Classes", icon: <ClassIcon fontSize='large'/>},
                {path: "/teachers", title: "Teachers", icon: <TeachersIcon fontSize='large'/>},
                {path: "/students", title: "Students", icon: <StudentIcon fontSize='large'/>},
                {path: "/parents", title: "Parents", icon: <ParentsIcon fontSize='large'/>},
                {path: "/logout", title: "LogOut", icon: <LogoutIcon fontSize='large'/>}
            ],
            activeLink: []
        };
    }

    componentDidMount() {
        const {isLogin, loggedUser} = this.props;
        this.linksHandling(isLogin, loggedUser);
    }

    componentWillReceiveProps(nextProps) {
        this.linksHandling(nextProps.isLogin, nextProps.loggedUser);
    }

    linksHandling = (isLogin, loggedUser) => {
        const {loginLinks, studentLinks, teacherLinks, principalLinks} = this.state;

        if (isLogin && loggedUser.status === 'student') {
            this.setState({activeLink: studentLinks})
        } else if (isLogin && loggedUser.status === 'teacher') {
            this.setState({activeLink: teacherLinks})
        } else if (isLogin && loggedUser.status === 'principal') {
            this.setState({activeLink: principalLinks})
        } else {
            this.setState({activeLink: loginLinks})
        }
    };

    render() {
        const {activeLink} = this.state;
        const {isLogin, loggedUser} = this.props;
        return (
            <div className='navbar-main'>
                <Logo image={logo} name='logo' style='logo-200'/>
                <div className='menu-box'>
                    <MainMenu links={activeLink}/>
                    <LoggedUser hidden={!isLogin} firstName={isLogin ? loggedUser.firstName : ''}
                                lastName={isLogin ? loggedUser.lastName : ''}/>
                </div>
            </div>
        )
    }
}

NavBar.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object
};

export default NavBar;
