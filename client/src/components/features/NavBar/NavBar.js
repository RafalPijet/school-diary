import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from '../../layouts/MainMenu/MainMenu';
import Logo from "../../common/Logo/Logo";
import logo from '../../../images/logo.png';
import LoggedUser from '../../features/LoggedUser/LoggedUser';
import '../../features/NavBar/NavBar.scss';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginLinks: [
                {path: "/login", title: "LogIn"},
                {path: "/registration", title: "Registration"}
            ],
            studentLinks: [
                {path: "/", title: "Home"},
                {path: "/ratings", title: "Ratings"},
                {path: "/attendance", title: "Attendance"},
                {path: "/data", title: "Student Data"},
                {path: "/teachers", title: "Teachers"},
                {path: "/logout", title: "LogOut"}
            ],
            teacherLinks: [
                {path: "/", title: "Home"},
                {path: "/diaries", title: "Class Diaries"},
                {path: "/data", title: "Teacher data"},
                {path: "/logout", title: "LogOut"}
            ],
            principalLinks: [
                {path: "/", title: "Home"},
                {path: "/classes", title: "Classes"},
                {path: "/teachers", title: "Teachers"},
                {path: "/students", title: "Students"},
                {path: "/logout", title: "LogOut"}
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
