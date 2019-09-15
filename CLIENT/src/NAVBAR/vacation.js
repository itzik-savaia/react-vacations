import React, { Fragment, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Modal from '@material-ui/core/Modal';
import FavoriteIcon from "@material-ui/icons/Favorite";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import axios from "axios";
import uploadedFile from './Dashboard/addVacationFrom';


//redux
import { connect } from 'react-redux';
import { useSelector, useDispatch, } from 'react-redux';
import { fetch_Vacations } from '../actions/vacationActions';
import { user_username } from "../actions/userActions";


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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [vacation, setVacation] = useState([]);
  var [vacation_id, setVacation_id] = useState('')
  const dispatch = useDispatch();

  //----- redux and dispatch the action
  // const username = () => dispatch(user_username());
  // const followUP = () => dispatch(followplus());
  const getVacations = () => dispatch(fetch_Vacations());

  useEffect(() => {
    getVacations();
  }, [])

  function handleChange(event, newValue) {
    setValue(newValue);
    alert('follow')
  }
  var DELETE_Card = e => {
    e.preventDefault();
    let vacation_id
    console.log(vacation_id);
    var confirm = window.confirm('You are sure you want to delete ?');
    if (confirm == true) {
      axios.delete(`http://localhost:4000/users/admin/delete/${vacation_id}`)
    } else {
      alert("You pressed Cancel!")
    }

  }
  const PUT_Card = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:4000/users/admin/put/${Vacation.id}`)
      .then({})
  }

  useEffect(() => {
    axios.get(`http://localhost:4000/vacation`)
      .then(res => {
        console.log(res.data);
        setVacation(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}

        <Grid className={classes.heroContent} >

          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Vacation
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
                    <Grid>

                      <Fab color="secondary" aria-label="edit" className={classes.fab} onClick={PUT_Card} key={vacation.id}>
                        <EditIcon />
                      </Fab>
                      <Fab aria-label="delete"
                        className={classes.fab}
                        onClick={DELETE_Card}
                        onChange={(e) => setVacation_id(e.target.value)}
                        key={vacation.id}
                        value={vacation.id}>
                        <DeleteIcon />
                      </Fab>

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
                          Follows={props.followcounter}
                        </Typography>
                      </Button>
                      {/* countert */}
                      <BottomNavigation
                        value={value}
                        onChange={handleChange}
                        className={classes.root}
                      >
                        <BottomNavigationAction
                          label="Follow"
                          value="Follow"
                          icon={<FavoriteIcon />}
                        />
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
function mapStateToProps(state) {
  console.log(state);
  const {
    FollowCounter,
  } = state
  return {
    followcounter: state.followcounter,
    vacations: state.vacations,
  }
}
function mapDispachToProps(dispatch) {
  return {
    username: (user_username) => dispatch(user_username()),
    // followUP: (followplus) => dispatch(followplus),
    getVacations: (fetch_Vacations) => dispatch(fetch_Vacations),
  }
}

export default connect(mapStateToProps, mapDispachToProps)(Vacation)