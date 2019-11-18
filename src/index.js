import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { LayoutProvider } from "./context/LayoutContext";
import { UserProvider } from "./context/UserContext";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import configureStore from "./store";
import { firebase as fbConfig, reduxFirebase as rfConfig } from "./config";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Login from "./pages/login/Login";

const initialState = window && window.__INITIAL_STATE__; // set initial state here

const store = configureStore(initialState);
// Initialize Firebase instance

firebase.initializeApp(fbConfig);
class SignInScreen extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
  };
 
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isSignedIn: !!user }));
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <Provider store={store}>
          <ReactReduxFirebaseProvider
            firebase={firebase}
            config={rfConfig}
            dispatch={store.dispatch}
            createFirestoreInstance={createFirestoreInstance}
          >
            <LayoutProvider>
              <UserProvider>
                <ThemeProvider theme={Themes.default}>
                  <Login firebase={firebase} />
                </ThemeProvider>
              </UserProvider>
            </LayoutProvider>
          </ReactReduxFirebaseProvider>
        </Provider>
      );
    }
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider
          firebase={firebase}
          config={rfConfig}
          dispatch={store.dispatch}
          createFirestoreInstance={createFirestoreInstance}
        >
          <LayoutProvider>
            <UserProvider>
              <ThemeProvider theme={Themes.default}>
                <CssBaseline />
                <App user={firebase.auth().currentUser} />
              </ThemeProvider>
            </UserProvider>
          </LayoutProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<SignInScreen />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
