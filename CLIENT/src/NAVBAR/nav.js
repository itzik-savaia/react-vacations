import React from 'react';
import LogIn from './log_in';
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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//redux
import { connect } from 'react-redux';
import { useSelector, useDispatch, } from 'react-redux';


const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}),
);

function nav() {
    // const dispatch = useDispatch();
    // const getUsers = () => dispatch(fetch_Users());

    
    return (
        <Router>

            <div>
                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="relative">

                        <Toolbar>
                            <CameraIcon className={nav.icon} />
                            <Typography variant="h6" noWrap>
                                <Link className="nav-link" color="inherit" to="/"><Button className={nav.button}>Vacation</Button></Link>
                            </Typography >
                            
                            <Typography variant="h6" >
                                <Link className="nav-link" to="/users/register/"><Button>Register</Button></Link>
                            </Typography >

                            <Typography variant="h6" >
                                <Link className="nav-link" to="/users/login/"><Button>LogIn</Button></Link>
                            </Typography >

                            {/* admin */}
                            <Typography variant="h6" >
                                <Link className="nav-link" to="/admin/dashboard/"><Button>Admin-Dashboard</Button></Link>
                            </Typography >

                        </Toolbar>
                    </AppBar>
                </React.Fragment>

                <Route path="/" exact component={Vacation} />
                <Route path="/users/register/" component={Register} />
                <Route path="/users/login/" component={LogIn} />
                <Route path="/admin/dashboard/" component={Dashboard} />
            </div>
        </Router>
    )
}
function mapStateToProps(state) {
    console.log(state);
    return { IS_LOG_IN: state.IS_LOG_IN }
}
function mapDispachToProps(dispatch) {
    return {
        // followUP: (followplus) => dispatch(followplus),
        // getVacations: (fetch_Vacations) => dispatch(fetch_Vacations),
        // getUsers: (fetch_Users) => dispatch(fetch_Users),
    }
}

export default connect(mapStateToProps, mapDispachToProps)(nav)