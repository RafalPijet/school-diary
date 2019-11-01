import axios from 'axios';
import {API_URL} from "../config";
import {setUser, setLogin} from "./actions/usersActions";
import {startRequest, stopRequest, errorRequest} from "./actions/requestActions";

export const loadUserByLogin = login => {
    return async dispatch => {
        dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${API_URL}/users/login`, {params: {email: login.email}});

            if (res.data !== null) {

                if (res.data.password === login.password) {
                    await dispatch(stopRequest());
                    await dispatch(setLogin(true));
                    await dispatch(setUser(res.data));
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
