import React from "react";
import { useSelector } from "react-redux";
import {
  useFirestoreConnect,
  isLoaded,
  isEmpty,
  useFirestore,
} from "react-redux-firebase";

// components
import PageTitle from "../../components/PageTitle";
import NewProject from "./NewProject";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import DataTable from '../../components/DataTable/DataTable';

function Projects() {
  // Attach project listener
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

  useFirestoreConnect(() => [projectQuery]);
  useFirestoreConnect(() => [contactQuery]);

  const projects = useSelector(
    ({ firestore: { ordered } }) => ordered.projects,
  );

  const contacts = useSelector(
    ({ firestore: { ordered } }) => ordered.contacts,
  );

  const firestore = useFirestore();

  const deleteProjects = data => {
    console.log(data.data);
    data.data.forEach(element => {
      firestore
        .collection("projects")
        .doc(projects[element.index].id)
        .delete();
    });
  };
  // Show a message while todos are loading
  if (!isLoaded(projects)) {
    return "Loading";
  }

  // Show a message if there are no todos
  if (isEmpty(projects)) {
    return (
      <>
        <PageTitle title="Projects" />
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            style={{ textAlign: "center", fontSize: "2.5rem" }}
          >
            <SentimentDissatisfiedIcon
              style={{ width: "200px", height: "200px" }}
            />
            <p>Uh-oh! You don't have any projects yet...</p>{" "}
            <p>
              {" "}
              Click on the '+' button in the lower right-hand corner to add a
              project...
            </p>
          </Grid>
        </Grid>
        <NewProject user={currentUser} contacts={contacts} />
      </>
    );
  }

  const columns = [
    {
      name: "customerReference",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "building",
      label: "Building",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "type",
      label: "Project Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "BIS",
      label: "Job Number",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
         
            <DataTable
              data={projects}
              columns={columns}
              options={{
                filterType: "checkbox",
                onRowsDelete: deleteProjects,
              }}
              title={"Projects"}
            />
        </Grid>
      </Grid>
      <NewProject user={currentUser} contacts={contacts} />
    </>
  );
}

export default Projects;