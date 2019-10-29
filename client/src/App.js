import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout/MainLayout';
import Welcome from './components/pages/Welcome/Welcome';
import Login from './components/pages/Login/Login';
import Registration from './components/pages/Registration/Reagistration';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';

class App extends React.Component {
  render() {
    return (
        <MainLayout>
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
export default App;
