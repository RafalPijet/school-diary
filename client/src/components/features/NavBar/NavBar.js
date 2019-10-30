import React from 'react';
import MainMenu from '../../layouts/MainMenu/MainMenu';
import Logo from "../../common/Logo/Logo";
import logo from '../../../images/logo.png';
import '../../features/NavBar/NavBar.scss';

class NavBar extends React.Component {
    state = {
        loginLinks: [
            {path: "/login", title: "LogIn"},
            {path: "/registration", title: "Registration"}
        ]
    };

    render() {
        const {loginLinks} = this.state;
        return (
            <div className='navbar-main'>
                <Logo image={logo} name='logo' style='logo-200'/>
                <MainMenu links={loginLinks}/>
            </div>
        )
    }
}

export default NavBar;
