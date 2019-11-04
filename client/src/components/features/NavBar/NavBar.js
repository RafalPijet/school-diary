import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from '../../layouts/MainMenu/MainMenu';
import Logo from "../../common/Logo/Logo";
import logo from '../../../images/logo.png';
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
            activeLink: []
        };
        // this.linksHandling();
    }

    componentDidMount() {
        const {isLogin, loggedUser} = this.props;
        this.linksHandling(isLogin, loggedUser);
    }

    componentWillReceiveProps(nextProps) {
        this.linksHandling(nextProps.isLogin, nextProps.loggedUser);
    }

    linksHandling = (isLogin, loggedUser) => {
        const {loginLinks, studentLinks, teacherLinks} = this.state;

        if (isLogin && loggedUser.status === 'student') {
            this.setState({activeLink: studentLinks})
        } else if (isLogin && loggedUser.status === 'teacher') {
            this.setState({activeLink: teacherLinks})
        } else {
            this.setState({activeLink: loginLinks})
        }
    };

    render() {
        const {activeLink} = this.state;
        return (
            <div className='navbar-main'>
                <Logo image={logo} name='logo' style='logo-200'/>
                <MainMenu links={activeLink}/>
            </div>
        )
    }
}

NavBar.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object
};

export default NavBar;
