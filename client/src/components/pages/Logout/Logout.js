import React from 'react';
import {connect} from 'react-redux';
import {setLogin} from "../../../redux/actions/usersActions";
import {resetRequest} from "../../../redux/actions/requestActions";
import {Redirect} from "react-router";

const Logout = props => {
    props.setLogin(false);
    props.resetRequest();

    return (
        <Redirect to='/'/>
)};

const mapDispatchToProps = dispatch => ({
   setLogin: isLogin => dispatch(setLogin(isLogin)),
   resetRequest: () => dispatch(resetRequest())
});

export default connect(null, mapDispatchToProps)(Logout);
