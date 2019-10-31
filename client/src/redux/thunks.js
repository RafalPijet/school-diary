import axios from 'axios';
import {API_URL} from "../config";
import {setUser, setLogin} from "./actions/usersActions";

export const loadUserByLogin = login => {
    return async dispatch => {

        try {
            let res = await axios.get(`${API_URL}/users/login`, {params: {email: login.email}});

            if (res.data !== null) {

                if (res.data.password === login.password) {
                    dispatch(setUser(res.data));
                    dispatch(setLogin(true));
                } else {
                    console.log("Wrong password!");
                }
            } else {
                console.log("User don\n't exist!!!")
            }
        } catch (err) {
            console.log(err.message);
        }
    }
};
