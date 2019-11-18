import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";

import { firebase as fbConfig, reduxFirebase as rfConfig } from "../../config";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import x from "../../images/x.svg";
import p from "../../images/p.svg";
import d from "../../images/d.svg";
import t from "../../images/t.svg";
import r from "../../images/r.svg";

import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/xpdtr.png";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";

function Login(props) {
  const firebase = props.firebase;

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img
          src={x}
          style={{ width: "100px", height: "100px" }}
          className={classes.logoLetter}
        />
        <img
          src={p}
          style={{ width: "100px", height: "100px" }}
          className={classes.logoLetter}
        />
        <img
          src={d}
          style={{ width: "100px", height: "100px" }}
          className={classes.logoLetter}
        />
        <img
          src={t}
          style={{ width: "100px", height: "100px" }}
          className={classes.logoLetter}
        />
        <img
          src={r}
          style={{ width: "100px", height: "100px" }}
          className={classes.logoLetter}
        />
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant="h1" className={classes.greeting}>
              Good Morning, User
            </Typography>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2019 XPDTR AS. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default Login;
