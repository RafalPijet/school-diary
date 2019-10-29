import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';

const reducers = combineReducers({

});

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;
