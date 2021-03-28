import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import firebase from "firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import Dashboard from "./Dashboard";

import Fade from "@material-ui/core/Fade";

import { useLayoutState } from "../../context/LayoutContext";

import PageTitle from "../../components/PageTitle";

import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
// styles

import Loading from "../../components/Loading/Loading";

export default function DashboardProvider(props) {
  const currentUser = firebase.auth().currentUser.uid;

  const projectQuery = {
    collection: "projects",
    limitTo: 10,
    where: [
      ["userId", "==", currentUser],
      ["track", "==", true],
    ],
  };

  const contactQuery = {
    collection: "contacts",
    limitTo: 10,
    where: [
      ["userId", "==", currentUser],
      ["track", "==", true],
    ],
  };

  const buildingQuery = {
    collection: "buildings",
    limitTo: 10,
    where: [
      ["userId", "==", currentUser],
      ["track", "==", true],
    ],
  };

  useFirestoreConnect(() => [projectQuery]);
  useFirestoreConnect(() => [contactQuery]);
  useFirestoreConnect(() => [buildingQuery]);

  const { currentBuilding, currentContact, currentProject } = useLayoutState();

  var contacts = useSelector(({ firestore: { ordered } }) => ordered.contacts);

  if (currentContact && currentContact !== "") {
    contacts = contacts.filter((contact) => contact.id === currentContact);
  }

  var buildings = useSelector(
    ({ firestore: { ordered } }) => ordered.buildings,
  );

  if (currentBuilding && currentBuilding !== "") {
    buildings = buildings.filter((building) => building.id === currentBuilding);
  }

  var projects = useSelector(({ firestore: { ordered } }) => ordered.projects);

  if (currentProject && currentProject !== "") {
    projects = projects.filter((project) => project.id === currentProject);
  }

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
  if (isEmpty(contacts) && isEmpty(buildings) && isEmpty(projects)) {
    return (
      <Fade in>
        <>
          <PageTitle title="Dashboard" />
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              style={{ textAlign: "center", fontSize: "2.5rem" }}
            >
              <SentimentDissatisfiedIcon
                style={{ width: "200px", height: "200px" }}
              />
              <p>
                Uh-oh! You are not tracking any projects, buildings or people
                yet.
              </p>{" "}
              <p>
                {" "}
                Go to Buildings or Contacts or Projects to enter something to
                start tracking...
              </p>
            </Grid>
          </Grid>
        </>
      </Fade>
    );
  }

  return (
    <Dashboard
      projects={projects}
      contacts={contacts}
      buildings={buildings}
    />
  );
}
