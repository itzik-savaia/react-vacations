import React, { useState, useEffect, useContext, } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import Login from './log_in';
import axios from 'axios';
//redux
import { useSelector, useDispatch, } from 'react-redux';

function Logout(props) {
    var dispatch = useDispatch();
    console.log(props, 'props');

    const { 
        username,
         password,
         islogin = true
    } = useSelector((state) => ({
        ...state.combineReducers,
        ...state.userReducer,
    }));


    const OnSubmitLog_In = (event) => {
        event.preventDefault();
        var data = { username, password }
        console.log(data, 'data');
        console.log('event', event);
        console.log('props', props);

        axios.post("http://localhost:4000/users/signin", data).then((res) => {
            let roles = res.data.user.roles[0].id
            if(localStorage.getItem('token', res.data.accessToken && islogin)){
                localStorage.clear()
                dispatch({ type: 'USER_LOGOUT' });
            }
            if (localStorage.getItem('token', res.data.accessToken)) {
                alert('user alredy in')
                dispatch({ type: 'ALREDY_IN' });
                // props.history.push('/users/login/')

            } else if (roles === 2 || 3) {
                dispatch({ type: 'ADMIN', payload: res.data });
                localStorage.setItem('token', res.data.accessToken)
                console.log('roles', res.data.user.roles);
                // props.history.push('/all')

            } else if (roles === 1) {
                dispatch({ type: 'LOGIN', payload: res.data });
                localStorage.setItem('token', res.data.accessToken)
                console.log('res data', res.data)
                console.log('roles', res.data.user)
                console.log('rolesrolesrolesrolesroles', roles)
                // props.history.push('/all')

            }
        }, (error) => {
            console.log('error', error)
            if (405) {
                alert('user not found')
                dispatch({ type: 'NO_ACCESS' });
            } else if (500) {
                alert('user not found try again')
                dispatch({ type: 'NO_ACCESS' });
            }
        });
    }

    function username_update(event) {
        dispatch({
            type: 'USER_NAME',
            payload: event.target.value
        })
    }
    function password_update(event) {
        dispatch({
            type: 'USER_PASSWORD',
            payload: event.target.value
        })
    }

    return (
        <Login/>
    );
}
export default (Logout)