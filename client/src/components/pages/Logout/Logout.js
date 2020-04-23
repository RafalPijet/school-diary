import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {setLogin} from "../../../redux/actions/usersActions";
import {resetRequest} from "../../../redux/actions/requestActions";
import {Redirect} from "react-router";

const Logout = props => {
    const {setLogin, resetRequest} = props;

    useEffect(() => {
        setLogin(false);
        resetRequest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return <Redirect to='/'/>

};

const mapDispatchToProps = dispatch => ({
   setLogin: isLogin => dispatch(setLogin(isLogin)),
   resetRequest: () => dispatch(resetRequest())
});

export default connect(null, mapDispatchToProps)(Logout);
