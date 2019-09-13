import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { array } from 'prop-types';


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
    button: {
        margin: theme.spacing(1)
    },
    input: {
        display: "none"
    }
}));


export default function AddVacationFrom() {
    const classes = useStyles();
    const [file, setFile] = useState("");
    const [filename, setFilename] = useState("Choose File");
    const [uploadedFile, setUploadedFile] = useState({ file });

    const [description, setDescription] = useState("");
    const [destination, setDestination] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [price, setPrice] = useState("");

    const onChangeFileName = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }
    const onSubmitToSend = async e => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('file', file);
        formData.append('uploadedFile', uploadedFile);
        formData.append('description', description);
        formData.append('destination', destination);
        formData.append('fromDate', fromDate);
        formData.append('toDate', toDate);
        formData.append('price', price);
        console.log(Array.from(formData));
        try {
            const res = await axios.post('http://localhost:4000/users/admin/upload', formData)
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });

        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">

            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Add Vacation
                    </Typography>
                <form onSubmit={onSubmitToSend} className={classes.form}>
                    <Grid container spacing={4} className={classes.textField}>
                        <Grid item xs={12} sm={6} >
                            <TextField
                                variant="outlined"
                                className={classes.textField}
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                name="description"
                                label="description"
                                type="description"
                                id="description"
                                autoComplete="uname"
                                required
                            /></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                className={classes.textField}
                                fullWidth
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                name="destination"
                                label="destination"
                                type="destination"
                                id="destination"
                                autoComplete="uname"
                                required
                            /></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                className={classes.textField}
                                fullWidth
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                name="fromDate"
                                label="fromDate"
                                type="fromDate"
                                id="fromDate"
                                autoComplete="uname"
                                required
                            /></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                className={classes.textField}
                                fullWidth
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                name="toDate"
                                label="toDate"
                                type="toDate"
                                id="toDate"
                                autoComplete="uname"
                                required
                            /></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                className={classes.textField}
                                fullWidth
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                name="price"
                                label="price"
                                type="price"
                                id="price"
                                autoComplete="uname"
                                required
                            /></Grid>
                        <Grid className='custom-file' item xs={12} sm={12}>
                            <input
                                type="file"
                                accept="image/*"
                                className={classes.input}
                                className="custom-file-input"
                                id="contained-button-file"
                                multiple
                                onChange={onChangeFileName}
                            />
                            <label className="custom-file-label" htmlFor="contained-button-file">
                            {filename}
                            </label>
                        </Grid>
                                                <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>Upload

                        </Button>
                        </Grid>
                    </Grid>


                </form>
            </div>
        </Container >

    );
}