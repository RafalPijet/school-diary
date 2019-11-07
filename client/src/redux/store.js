import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import user from './reducers/usersReducer';
import request from './reducers/requestReducer';
import classes from './reducers/classReducer';

const reducers = combineReducers({
    user,
    request,
    classes
});

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;
