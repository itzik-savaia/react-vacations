import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Link } from "react-router-dom";
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



function Log_In() {
    const classes = useStyles();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    // const getUsers = () => dispatch(fetch_Users());
    let OnSubmitLog_In = async (e) => {
        e.preventDefault();
        const data = { username, password }
        await axios.post("http://localhost:4000/users/signin", data, {
        }).then((response) => {
            localStorage.setItem('token', response.data.accessToken)
            console.log('response data', response.data)
            console.log('response config', response.config.data)
            alert(JSON.stringify(response.config.data))
        }, (error) => { console.log('error', error) });
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
                            onChange={(e) => setUsername(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Grid item>
                            <Link to="/users/register" variant="body2">
                                Already have an account? register
                        </Link>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                    </Button>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
function mapStateToProps(state) {
    console.log(state);
    // const { FollowCounter } = state
    // return { followcounter: state.followcounter }
}
function mapDispachToProps(dispatch) {
    return {
        // followUP: (followplus) => dispatch(followplus),
        // getVacations: (fetch_Vacations) => dispatch(fetch_Vacations),
        // getUsers: (fetch_Users) => dispatch(fetch_Users),
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Log_In)