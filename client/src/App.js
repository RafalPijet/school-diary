import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import { getLogin, getUser, setLogin } from "./redux/actions/usersActions";
import { getIsDark, setPath } from "./redux/actions/valuesActions";
import MainLayout from './components/layouts/MainLayout/MainLayout';
import Welcome from './components/pages/Welcome/Welcome';
import Login from './components/pages/Login/Login';
import Registration from './components/pages/Registration/Reagistration';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';
import Logout from './components/pages/Logout/Logout';
import ResetPassword from './components/pages/ResetPassword/ResetPassword';
import { loadUserById } from './redux/thunks';
const HomeTeacher = React.lazy(() => import('./components/pages/HomeTeacher/HomeTeacher'));
const ClassDiaries = React.lazy(() => import('./components/pages/ClassDiaries/ClassDiaries'));
const TeacherData = React.lazy(() => import('./components/pages/TeacherData/TeacherData'));
const Home = React.lazy(() => import('./components/pages/Home/Home'));
const StudentRatings = React.lazy(() => import('./components/pages/StudentRatings/StudentRatings'));
const StudentData = React.lazy(() => import('./components/pages/StudentData/StudentData'));
const StudentTeachers = React.lazy(() => import('./components/pages/StudentTeachers/StudentTeachers'));
const HomePrincipal = React.lazy(() => import('./components/pages/HomePrincipal/HomePrincipal'));
const Classes = React.lazy(() => import('./components/pages/Classes/Classes'));
const Teachers = React.lazy(() => import('./components/pages/Teachers/Teachers'));
const Students = React.lazy(() => import('./components/pages/Students/Students'));
const Parents = React.lazy(() => import('./components/pages/Parents/Parents'));

const App = props => {
    const { isLogin, loggedUser, isDark, setLogin, loadUserById, setPath } = props;
    let pathname = useLocation().pathname;

    useEffect(() => {
        
        if (pathname.includes('change')) {
            setPath(pathname);
            return
        }
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        const userId = localStorage.getItem('userId');

        if (!token || !expiryDate) {
            return;
        }

        if (new Date(expiryDate) <= new Date()) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('expiryDate');
            setLogin(false);
            return;
        }

        if (!isLogin && userId) {
            loadUserById(userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);

    if (isLogin && loggedUser.status === 'parent') {
        return (
            <MainLayout isLogin={isLogin} loggedUser={loggedUser} isDark={isDark}>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/grades' exact component={StudentRatings} />
                    <Route path='/data' exact component={StudentData} />
                    <Route path='/teachers' exact component={StudentTeachers} />
                    <Route path='/logout' exact component={Logout} />
                    <Route component={PageNotFound} />
                </Switch>
            </MainLayout>
        )
    } else if (isLogin && loggedUser.status === 'teacher') {
        return (
            <MainLayout isLogin={isLogin} loggedUser={loggedUser} isDark={isDark}>
                <Switch>
                    <Route path='/' exact component={HomeTeacher} />
                    <Route path='/diaries' exact component={ClassDiaries} />
                    <Route path='/data' exact component={TeacherData} />
                    <Route path='/logout' exact component={Logout} />
                    <Route component={PageNotFound} />
                </Switch>
            </MainLayout>
        )
    } else if (isLogin && loggedUser.status === 'principal') {
        return (
            <MainLayout isLogin={isLogin} loggedUser={loggedUser} isDark={isDark}>
                <Switch>
                    <Route path='/' exact component={HomePrincipal} />
                    <Route path='/classes' exact component={Classes} />
                    <Route path='/teachers' exact component={Teachers} />
                    <Route path='/students' exact component={Students} />
                    <Route path='/parents' exact component={Parents}/>
                    <Route path='/logout' exact component={Logout} />
                    <Route component={PageNotFound} />
                </Switch>
            </MainLayout>
        )
    } else {
        return (
            <MainLayout isLogin={isLogin} isDark={isDark}>
                <Redirect to='/' />
                <Switch>
                    <Route path='/' exact component={Welcome} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/registration' exact component={Registration} />
                    <Route path='/change'>
                        <ResetPassword/>
                    </Route>
                    <Route component={PageNotFound} />
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
const mapDispatchToProps = dispatch => ({
    setLogin: isLogin => dispatch(setLogin(isLogin)),
    loadUserById: userId => dispatch(loadUserById(userId)),
    setPath: path => dispatch(setPath(path))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
