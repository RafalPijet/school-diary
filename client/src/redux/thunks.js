import axios from 'axios';
import {API_URL} from "../config";
import {setUser, setLogin} from "./actions/usersActions";
import {loadClassByTeacher, addRatingToStudent} from "./actions/classActions";
import {startRequest, stopRequest, errorRequest, startAddingRequest, stopAddingRequest} from "./actions/requestActions";

export const loadUserByLogin = login => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/users/login`, {params: {email: login.email}});

            if (res.data !== null) {

                if (res.data.password === login.password) {
                    await dispatch(stopRequest());
                    await dispatch(setUser(res.data));
                    await dispatch(setLogin(true));
                } else {
                    dispatch(errorRequest("Wrong password!"));
                }
            } else {
                dispatch(errorRequest("User don't exist!!!"));
            }
        } catch (err) {
            dispatch(errorRequest(err.message));
        }
    }
};

export const addUser = user => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await axios.post(`${API_URL}/users/add`, user);
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(`Something went wrong.
             This email address probably already exists: ${err.message}`));
        }
    }
};

export const loadAllClassByTeacherId = teacherId => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/class/${teacherId}`);
            dispatch(loadClassByTeacher(res.data));
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const addRatingForStudent = dataPackage => {
    return async dispatch => {
        dispatch(startAddingRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.post(`${API_URL}/ratings/${dataPackage.ratingsId}`, dataPackage.rating);
            dispatch(addRatingToStudent(res.data));
            dispatch(stopAddingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};
