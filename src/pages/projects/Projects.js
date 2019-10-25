import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import NewProject from "./NewProject";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';


import { useFirestore } from 'react-redux-firebase'
function Projects() {
  // Attach project listener
  const currentUser = firebase.auth().currentUser.uid;

  const projectQuery = {
    collection: "projects",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  useFirestoreConnect(() => [projectQuery]);

  const projects = useSelector(
    ({ firestore: { ordered } }) => ordered.projects,
  );

  const firestore = useFirestore();

  const deleteProjects = (data) => {
    console.log(data.data)
    data.data.forEach(element => {

      firestore.collection('projects').doc(projects[element.index].id).delete();
      
    });
  }
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
        <Grid item xs={12} style={{textAlign: 'center', fontSize: '2.5rem'}}>
        <SentimentDissatisfiedIcon style={{width: '200px', height: '200px'}}/>
          <p>Uh-oh! You don't have any projects yet...</p> <p> Click on the '+' button in the lower right-hand corner to add a project...</p>
        </Grid>
      </Grid>
        <NewProject user={currentUser} />
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
      <PageTitle title="Projects" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            data={projects}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: deleteProjects
            }}
          />
        </Grid>
      </Grid>
      <NewProject user={currentUser} />
    </>
  );
}

export default Projects;
