import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
//redux
import { connect } from 'react-redux';
import { useSelector, useDispatch, } from 'react-redux';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SingUp() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [lname, setLname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState(['user']);

    let OnSubmitRegister = async (e) => {
        e.preventDefault();
        const data = { name, lname, username, password, roles }
        await axios.post("http://localhost:4000/users/signup", data, {
        }).then((response) => { console.log('response', response) }
            , (error) => { console.log('error', error) });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign up
                    </Typography>
                <form onSubmit={OnSubmitRegister} className={classes.form} >
                    <Grid container spacing={2} className={classes.textField}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                className={classes.textField}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                id="name"
                                label="First Name"
                                autoFocus
                                required
                            /></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                className={classes.textField}
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                                fullWidth
                                id="lname"
                                label="Last Name"
                                name="lname"
                                autoComplete="lname"
                                required
                            /></Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                className={classes.textField}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                name="username"
                                label="User Name"
                                type="username"
                                id="username"
                                autoComplete="uname"
                                required
                            /></Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                required
                            /></Grid>
                        <Link to="/users/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>Sign Up
                        </Button>
                    </Grid>


                </form>
            </div>
        </Container>
    );
}
function mapStateToProps(state) {
    console.log(state);
    const { name, lname, username, password, roles } = state
    return { followcounter: state.followcounter }
}
function mapDispachToProps(dispatch) {
    return {
        // followUP: (followplus) => dispatch(followplus),
        // getVacations: (fetch_Vacations) => dispatch(fetch_Vacations),
        // getUsers: (fetch_Users) => dispatch(fetch_Users),
    }
}

export default connect(mapStateToProps, mapDispachToProps)(SingUp)