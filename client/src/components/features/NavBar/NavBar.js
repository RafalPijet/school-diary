import React from 'react';
import PropTypes from 'prop-types';
import MainMenu from '../../layouts/MainMenu/MainMenu';
import Logo from "../../common/Logo/Logo";
import logo from '../../../images/logo.png';
import '../../features/NavBar/NavBar.scss';

class NavBar extends React.Component {
    state = {
        loginLinks: [
            {path: "/login", title: "LogIn"},
            {path: "/registration", title: "Registration"}
        ],
        studentLinks: [
            {path: "/", title: "Home"},
            {path: "/ratings", title: "Ratings"},
            {path: "/attendance", title: "Attendance"},
            {path: "/data", title: "Student Data"},
            {path: "/teachers", title: "Teachers"}
        ]
    };

    render() {
        const {loginLinks, studentLinks} = this.state;
        const {isLogin, loggedUser} = this.props;
        return (
            <div className='navbar-main'>
                <Logo image={logo} name='logo' style='logo-200'/>
                <MainMenu links={isLogin ? studentLinks : loginLinks}/>
            </div>
        )
    }
}

NavBar.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object
};

export default NavBar;
