import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getLogin, getUser} from "./redux/actions/usersActions";
import {getIsDark} from "./redux/actions/valuesActions";
import MainLayout from './components/layouts/MainLayout/MainLayout';
import Welcome from './components/pages/Welcome/Welcome';
import Login from './components/pages/Login/Login';
import Registration from './components/pages/Registration/Reagistration';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';
import StudentRatings from './components/pages/StudentRatings/StudentRatings';
import StudentData from './components/pages/StudentData/StudentData';
import StudentAttendance from './components/pages/StudentAttendance/StudentAttendance';
import Teachers from './components/pages/Teachers/Teachers';
import Home from './components/pages/Home/Home';
import HomeTeacher from './components/pages/HomeTeacher/HomeTeacher';
import ClassDiaries from './components/pages/ClassDiaries/ClassDiaries';
import TeacherData from './components/pages/TeacherData/TeacherData';
import HomePrincipal from './components/pages/HomePrincipal/HomePrincipal';
import Classes from './components/pages/Classes/Classes';
import Students from './components/pages/Students/Students';
import Parents from './components/pages/Parents/Parents';
import Logout from './components/pages/Logout/Logout';

const App = props => {
    const {isLogin, loggedUser, isDark} = props;

    if (isLogin && loggedUser.status === 'parent') {
        return (
            <MainLayout isLogin={isLogin} loggedUser={loggedUser} isDark={isDark}>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/ratings' exact component={StudentRatings}/>
                    <Route path='/attendance' exact component={StudentAttendance}/>
                    <Route path='/data' exact component={StudentData}/>
                    <Route path='/teachers' exact component={Teachers}/>
                    <Route path='/logout' exact component={Logout}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </MainLayout>
        )
    } else if (isLogin && loggedUser.status === 'teacher') {
        return (
            <MainLayout isLogin={isLogin} loggedUser={loggedUser} isDark={isDark}>
                <Switch>
                    <Route path='/' exact component={HomeTeacher}/>
                    <Route path='/diaries' exact component={ClassDiaries}/>
                    <Route path='/data' exact component={TeacherData}/>
                    <Route path='/logout' exact component={Logout}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </MainLayout>
        )
    } else if (isLogin && loggedUser.status === 'principal') {
        return (
            <MainLayout isLogin={isLogin} loggedUser={loggedUser} isDark={isDark}>
                <Switch>
                    <Route path='/' exact component={HomePrincipal}/>
                    <Route path='/classes' exact component={Classes}/>
                    <Route path='/teachers' exact component={Teachers}/>
                    <Route path='/students' exact component={Students}/>
                    <Route path='/parents' exact component={Parents}/>
                    <Route path='/logout' exact component={Logout}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </MainLayout>
        )
    } else {
        return (
            <MainLayout isLogin={isLogin} isDark={isDark}>
                <Switch>
                    <Route path='/' exact component={Welcome}/>
                    <Route path='/login' exact component={Login}/>
                    <Route path='/registration' exact component={Registration}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </MainLayout>
        );
    }
};

const mapStateToProps = state => ({
    isLogin: getLogin(state),
    loggedUser: getUser(state),
    isDark: getIsDark(state)
});
export default connect(mapStateToProps)(App);
