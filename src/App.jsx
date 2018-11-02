import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";

import "assets/css/main.less";
import "../node_modules/semantic-ui-css/semantic.min.css";

import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import { firebaseReducer, reactReduxFirebase } from "react-redux-firebase";
// import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
// import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable

import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Firebase config

// react-redux-firebase options
const config = {
  userProfile: "users", // firebase root where user profiles are stored
  enableLogging: false // enable/disable Firebase's database logging
};

const hist = createBrowserHistory();


// Setup react-redux so that connect HOC can be used

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      visible: true,
      location: "home",
      isSignedIn: false,
      user: {}
    };
  }
  componentDidMount() {
    this.unregisterAuthObserver = this.props.firebase
      .auth()
      .onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user, user });
        // this.props.fetchUser(user.uid);
      });
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  logout = () => {
    this.props.firebase.auth().signOut();
  };

  render() {
    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: "popup",
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        this.props.firebase.auth.EmailAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        this.props.firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          const isNewUser = authResult.additionalUserInfo.isNewUser;
          this.setState({ isNewUser });
          return false;
        }
      }
    };
    const user = this.props.firebase.auth().currentUser;
    console.log("user", user);
    if (!this.state.isSignedIn) {
      return (
        <Router history={hist}>
          <div className="full-height">
            <h1>XPDTR</h1>
            <p>Please sign-in:</p>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={this.props.firebase.auth()}
            />
          </div>
        </Router>
      );
    }
    return (
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return (
              <Route
                path={prop.path}
                component={prop.component}
                key={key}
                user={this.state.user}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}

export default compose(
  firebaseConnect(props => [
    { path: "projects" } // string equivalent 'todos'
  ]),
  connect((state, props) => ({
    projects: state.firebase.data.projects
  }))
)(App);
