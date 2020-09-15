import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import firebase from "firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import Dashboard from "./Dashboard";

import Fade from "@material-ui/core/Fade";

// styles

import Loading from "../../components/Loading/Loading";

export default function DashboardProvider(props) {
  const currentUser = firebase.auth().currentUser.uid;

  const projectQuery = {
    collection: "projects",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  const contactQuery = {
    collection: "contacts",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  const buildingQuery = {
    collection: "buildings",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  useFirestoreConnect(() => [projectQuery]);
  useFirestoreConnect(() => [contactQuery]);
  useFirestoreConnect(() => [buildingQuery]);

  const contacts = useSelector(
    ({ firestore: { ordered } }) => ordered.contacts,
  );

  const buildings = useSelector(
    ({ firestore: { ordered } }) => ordered.buildings,
  );

  const projects = useSelector(
    ({ firestore: { ordered } }) => ordered.projects,
  );

  if (!isLoaded(contacts) || !isLoaded(buildings) || !isLoaded(projects)) {
    return (
      <>
        <Fade in>
          <Grid container spacing={4}>
            <Grid item xs></Grid>
            <Grid
              item
              xs={6}
              style={{ textAlign: "center", fontSize: "2.5rem" }}
            >
              <Loading />
              Retrieving your settings...
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Fade>
      </>
    );
  }

  return (
    <Dashboard projects={projects} contacts={contacts} buildings={buildings} />
  );
}
