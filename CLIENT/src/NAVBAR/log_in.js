import React, { useState, useEffect, useContext, } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
//redux
import { useSelector, useDispatch, } from 'react-redux';



const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Login(props) {
    var classes = useStyles();
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
            if (localStorage.getItem('token', res.data.accessToken && islogin)) {
                localStorage.clear()
                dispatch({ type: 'USER_LOGOUT' });
            }
            if (localStorage.getItem('token', res.data.accessToken)) {
                alert('user alredy in')
                dispatch({ type: 'ALREDY_IN' });
                props.history.push('/users/login/')

            } else if (roles === 2 || 3) {
                dispatch({ type: 'ADMIN', payload: res.data });
                localStorage.setItem('token', res.data.accessToken)
                console.log('roles', res.data.user.roles);
                props.history.push('/all')

            } else if (roles === 1) {
                dispatch({ type: 'LOGIN', payload: res.data });
                localStorage.setItem('token', res.data.accessToken)
                console.log('res data', res.data)
                console.log('roles', res.data.user)
                console.log('rolesrolesrolesrolesroles', roles)
                props.history.push('/all')

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
        dispatch({ type: 'USER_NAME', payload: event.target.value })
    }
    function password_update(event) {
        dispatch({ type: 'USER_PASSWORD', payload: event.target.value })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in</Typography>
                <form onSubmit={OnSubmitLog_In} className={classes.form}>
                    <Grid container spacing={2} className={classes.textField}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={username}
                            onChange={username_update}
                            onInput={() => dispatch({ type: 'USER_NAME', payload: username })}
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={password}
                            onChange={password_update}
                            onInput={() => dispatch({ type: 'USER_PASSWORD', payload: password })}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>Sign In
                        </Button>

                        <Link to="/users/register" variant="body2">
                            Already have an account? register
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default (Login)