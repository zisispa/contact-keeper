import React, { useContext, useState, useEffect } from "react";
import AlertContext from "../../context/Alert/AlertContext";
import AuthContext from "../../context/Auth/AuthContext";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

import register_img from "../../images/register.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${register_img})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#00BFA6",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }

    if (error === "User already exists.") {
      setAlert(error, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  const classes = useStyles();

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              type='text'
              name='name'
              required
              fullWidth
              label='Username'
              value={name}
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              type='email'
              required
              fullWidth
              label='Email Address'
              value={email}
              name='email'
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              value={password}
              label='Password'
              name='password'
              type='password'
              onChange={onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              value={password2}
              label='Confirm Password'
              name='password2'
              type='password'
              onChange={onChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            /> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;
