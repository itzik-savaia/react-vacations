import React, { Fragment, useState, useEffect, useContext, } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import axios from "axios";
import uploadedFile from './Dashboard/addVacationFrom';
import DeleteIcon from '@material-ui/icons/Delete';

//redux
import { useSelector, useDispatch, } from 'react-redux';



// Footer function
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with love by the "}
      <Link color="inherit" to="/">
        Material-UI
      </Link>
      {" team."}
    </Typography>
  );
}
// Footer function


const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  root: {
    width: 500
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  id: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

const Vacation = (props) => {
  //material
  const classes = useStyles();
  const [open, setOpen] = React.useState(Boolean(false));
  const [follows, sefollows] = React.useState(0);
  //vacation
  const [vacation, setVacation] = useState([]);
  //putcard
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [price, setPrice] = useState("");

  //dispatch redux
  const dispatch = useDispatch();
  const {
    role = 2,
    username,
    Vacations,
  } = useSelector(state => ({
    ...state.combineReducers,
    ...state.userReducer,
    ...state.vacationsReducer
  }));

  // ----- redux and dispatch the action
  const getVacations = () => dispatch(fetch_Vacations());

  useEffect(() => {
    getVacations();
  }, [])

  function handleChange(event, newValue) {
    sefollows(newValue);
    alert('follow')
  }


  const PutCard = async e => {
    e.preventDefault();
    const data = { description, destination, fromDate, toDate, price }
    console.log(data);
    try {
      await axios.put(`http://localhost:4000/users/admin/put/:${Vacation.id}`, data)
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:4000/vacation`)
      .then(res => {
        // console.log(res.data);
        setVacation(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const fetch_Vacations = () => {
    return function (dispatch) {
      axios.get('http://localhost:4000/vacation')
        .then(res => {
          console.log(res);
          dispatch({ type: 'FETCH_VACATIONS', payload: res.data });
        }).catch(err => {
          console.log(err);
        })
    }
  };

  const DeleteCard = (e) => {
    e.preventDefault();
    const id = e.target.id
    const confirm = window.confirm(`You are sure you want to delete vacation number ?${id}`);
    if (confirm == true) {
      axios.delete(`http://localhost:4000/users/admin/delete/${id}`)
    } else {
      alert("You pressed Cancel!")
    }
  };

  return (
    <Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <Grid className={classes.heroContent} >

          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Vacations
              {/* <vacations_Store /> */}
            </Typography>
          </Container>
        </Grid>

        <Grid> {/* cards */}

          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container justify="center" spacing={4}>
              {vacation.map(vacation => (
                <Grid key={vacation.id} item xs={12} md={6} lg={4}>

                  <Card className={classes.card}>
                    <Grid className="ml-auto">
                      {role == 2 ? <>

                        <Button color="secondary"
                          aria-label="edit"
                          className={classes.fab}
                          onClick={() => setOpen(true)} //open modal
                          key={vacation.id}>
                          <div>
                            <EditIcon />

                            <form onSubmit={PutCard} className={classes.form}>
                              <Dialog open={open}
                                aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Change card</DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    Update card Values ​​need to be entered.
                                </DialogContentText>

                                  <TextField
                                    variant="outlined"
                                    className={classes.textField}
                                    fullWidth
                                    value={description}
                                    onInput={(e) => setDescription(e.target.value)}
                                    name="description"
                                    label="description"
                                    type="description"
                                    id="description"
                                    autoComplete="uname" />

                                  <TextField
                                    variant="outlined"
                                    className={classes.textField}
                                    fullWidth
                                    value={destination}
                                    onInput={(e) => setDestination(e.target.value)}
                                    name="destination"
                                    label="destination"
                                    type="destination"
                                    id="destination"
                                    autoComplete="uname" />

                                  <TextField
                                    variant="outlined"
                                    className={classes.textField}
                                    fullWidth
                                    value={fromDate}
                                    onInput={(e) => setFromDate(e.target.value)}
                                    name="fromDate"
                                    label="fromDate"
                                    type="fromDate"
                                    id="fromDate"
                                    autoComplete="uname" />

                                  <TextField
                                    variant="outlined"
                                    className={classes.textField}
                                    fullWidth
                                    value={toDate}
                                    onInput={(e) => setToDate(e.target.value)}
                                    name="toDate"
                                    label="toDate"
                                    type="toDate"
                                    id="toDate"
                                    autoComplete="uname" />

                                  <TextField
                                    variant="outlined"
                                    className={classes.textField}
                                    fullWidth
                                    value={price}
                                    onInput={(e) => setPrice(e.target.value)}
                                    name="price"
                                    label="price"
                                    type="price"
                                    id="price"
                                    autoComplete="uname" />

                                </DialogContent>
                                <DialogActions>
                                  <Button
                                    onClick={() => setOpen(false)}
                                    fullWidth
                                    variant="contained"
                                    color="secondary">Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>Send
                                  </Button>
                                </DialogActions>
                              </Dialog>
                            </form>
                          </div>
                        </Button >


                        <Button aria-label="delete"
                          id={vacation.id}
                          value={vacation.id}
                          key={vacation.id}
                          onClick={DeleteCard}>
                          <DeleteIcon id={vacation.id} onClick={DeleteCard} pathLength={vacation.id}></DeleteIcon>
                        </Button>
                      </> : null}
                    </Grid>
                    {uploadedFile ? (
                      <CardMedia
                        className={classes.cardMedia}
                        image={`http://localhost:4000/uploads/${vacation.img}`}
                      ></CardMedia>
                    ) : null}
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h4" component="h2">
                        {uploadedFile.fileName}
                        {vacation.description}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h2">
                        {vacation.destination}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="h1">
                        from - {vacation.fromDate}
                        <hr></hr>
                        to - {vacation.toDate}
                        <hr></hr>
                        price - {vacation.price}
                        <hr></hr>
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button size="small" color="primary">
                        <Typography>
                          Follows={vacation.follower}
                        </Typography>
                      </Button>
                      {/* countert */}
                      <BottomNavigation
                        value={follows}
                        onChange={handleChange}
                        className={classes.root}
                      >{role == 1 ?
                        <>
                          <BottomNavigationAction
                            label="Follow"
                            value="Follow"
                            icon={<FavoriteIcon />}
                          />
                        </>
                        : null}
                      </BottomNavigation>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>

        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        ></Typography>
        <MadeWithLove />
      </footer>
      {/* End  footer */}
    </Fragment >
  );
}
export default (Vacation)