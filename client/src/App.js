import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {getLogin, getUser} from "./redux/actions/usersActions";
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
import Logout from './components/pages/Logout/Logout';

class App extends React.Component {
  render() {
      const {isLogin, loggedUser} = this.props;

      if (isLogin) {
          return (
              <MainLayout isLogin={isLogin} loggedUser={loggedUser}>
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
      } else {
          return (
              <MainLayout isLogin={isLogin}>
                  <Switch>
                      <Route path='/' exact component={Welcome}/>
                      <Route path='/login' exact component={Login}/>
                      <Route path='/registration' exact component={Registration}/>
                      <Route component={PageNotFound}/>
                  </Switch>
              </MainLayout>
          );
      }
  }
}

const mapStateToProps = state => ({
    isLogin: getLogin(state),
    loggedUser: getUser(state)
});
export default connect(mapStateToProps)(App);
