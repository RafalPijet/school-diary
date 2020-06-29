import React from 'react';
import PageTitle from '../../common/PageTitle/PageTitle';
import UserWelcome from "../../features/UserWelcome/UserWelcome";

const buttonsData = [];

const description = [
    'Test1',
    'Test2',
    'Test3'
];

const HomePrincipal = () => (
    <div>
        <PageTitle>Principal Zone</PageTitle>
        <UserWelcome
            description={description}
            userType='principal'
            delay={1}
            duration={5}
            buttons={buttonsData}
        />
    </div>
);

export default HomePrincipal;
