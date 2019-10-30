import React from 'react';
import PageContainer from '../PageContainer/PageContainter';
import NavBar from '../../features/NavBar/NavBar';

const MainLayout = ({children}) => (
    <PageContainer>
        <NavBar/>
        {children}
    </PageContainer>
);

export default MainLayout;
