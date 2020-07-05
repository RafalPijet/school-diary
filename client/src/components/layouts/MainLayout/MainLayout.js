import React from 'react';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import {Grid} from '@material-ui/core';
import PageContainer from '../PageContainer/PageContainter';
import NavBar from '../../features/NavBar/NavBar';
import Footer from "../../features/Footer/FooterContainer";
import LoggedUser from "../../features/LoggedUser/LoggedUserContainer";
import AppThemeOptions from './../../../utilities/theme';

const MainLayout = ({children, isLogin, loggedUser, isDark}) => {
    const muiTheme = createMuiTheme(AppThemeOptions[`${isDark ? 'dark' : 'light'}`]);
    return (
        <MuiThemeProvider theme={muiTheme}>
            <PageContainer>
                <Grid item lg={2}>
                    <NavBar isLogin={isLogin} loggedUser={loggedUser}/>
                </Grid>
                <Grid item lg={10}>
                    <LoggedUser/>
                    {children}
                </Grid>
                <Grid item lg={12}>
                    <Footer/>
                </Grid>
            </PageContainer>
        </MuiThemeProvider>

    )
};

export default MainLayout;
