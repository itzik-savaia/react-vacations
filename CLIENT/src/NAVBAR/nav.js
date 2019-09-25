import React, { useState } from 'react';
import Login from './log_in';
import Logout from './logout';
import Register from './register';
import Vacation from './vacation';
import Dashboard from './Dashboard/Dashboard';
import CssBaseline from '@material-ui/core/CssBaseline';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom";
//redux
import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}),
);

function Nav(props) {
    var dispatch = useDispatch();
    const {
        username,
        islogin = false,
        role = 2,
    } = useSelector(state => ({
        ...state.combineReducers,
        ...state.userReducer
    }));
    const logout = () => {
        localStorage.clear()
        dispatch({ type: 'USER_LOGOUT' });
        console.log("cliasdk");
        props.history.push("/users/login/")
    }
    return (
        <Router>
            <div>
                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="relative" component="h1" variant="h6" color="inherit" >
                        <Toolbar>
                            <CameraIcon className={Nav.icon} />
                            {islogin === true ?
                                <>
                                    <Typography variant="h6" noWrap>
                                        <Link className="nav-link" to="/all"><Button className={Nav.button}>Vacation</Button></Link>
                                    </Typography >

                                    {role == 2 ?
                                        <Typography variant="h6" >
                                            <Link className="nav-link" to="/admin/dashboard/"><Button>Dashboard</Button></Link>
                                        </Typography >
                                        : null}

                                    {islogin === true ?
                                        <Typography variant="h6">{`Hellow:${username}`}</Typography >
                                        : null}

                                    <Typography variant="h6" className="ml-auto">
                                        <Link className="nav-link" to="/users/logout/">
                                            <Button onClick={logout}>Logout</Button>
                                        </Link>
                                    </Typography>

                                </>
                                :
                                <>
                                    <Typography variant="h6" className="ml-auto">
                                        <Link className="nav-link" to="/users/register/">
                                            <Button>Register</Button></Link>
                                    </Typography >

                                    <Typography variant="h6">
                                        <Link className="nav-link" to="/users/login/" >
                                            <Button>Log-In</Button></Link>
                                    </Typography >
                                </>
                            }
                        </Toolbar>
                    </AppBar>
                </React.Fragment>

                <Route path="/all" component={Vacation} />
                <Route path="/admin/dashboard/" component={Dashboard} />
                <Route path="/users/register/" component={Register} />
                <Route path="/users/login/" component={Login} />
                <Route path="/users/logout/" component={Logout} />
            </div>
        </Router>
    )
} export default (Nav)