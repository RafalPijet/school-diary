import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import App from './App';
import store from './redux/store';
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/global.scss';

const Root = () => (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(<Root/>, document.getElementById('root'));

