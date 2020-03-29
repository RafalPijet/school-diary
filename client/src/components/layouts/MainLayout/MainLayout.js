import React from 'react';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import PageContainer from '../PageContainer/PageContainter';
import NavBar from '../../features/NavBar/NavBar';
import AppThemeOptions from './../../../utilities/theme';

const MainLayout = ({children, isLogin, loggedUser}) => {
    const muiTheme = createMuiTheme(AppThemeOptions['dark']);
    return (
        <PageContainer>
            <MuiThemeProvider theme={muiTheme}>
                <NavBar isLogin={isLogin} loggedUser={loggedUser}/>
                {children}
            </MuiThemeProvider>
        </PageContainer>
    )
};

export default MainLayout;
