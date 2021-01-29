import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useFirestoreConnect,
  isLoaded,
  isEmpty,
  useFirestore,
} from "react-redux-firebase";

// components
import PageTitle from "../../components/PageTitle";
import EditIcon from "@material-ui/icons/Edit";
import Loading from "../../components/Loading";
import Button from "@material-ui/core/Button";
import NewProject from "./NewProject";
import EditProject from "./EditProject";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmDialog from "../../components/ConfirmDialog";

import Fade from "@material-ui/core/Fade";

function Projects() {
  // Attach project listener
  const currentUser = firebase.auth().currentUser.uid;

  const buildingQuery = {
    collection: "buildings",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  const [currentId, setCurrentId] = useState({
    openId: "",
    editOpen: false,
  });

  const openProject = (id) => {
    setCurrentId({ openId: id, editOpen: true });
  };

  const closeProject = () => {
    setCurrentId({ ...currentId, editOpen: false });
  };

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
  useFirestoreConnect(() => [buildingQuery]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);

  const projects = useSelector(
    ({ firestore: { ordered } }) => ordered.projects,
  );

  const contacts = useSelector(
    ({ firestore: { ordered } }) => ordered.contacts,
  );

  const buildings = useSelector(
    ({ firestore: { ordered } }) => ordered.buildings,
  );

  const extendedProjects =
    projects &&
    projects.map((project) => ({
      ...project,
      buildingName:
        buildings &&
        buildings.find((building) => building.id === project.building)
          .buildingName,
      clientName:
        contacts &&
        contacts.find((contact) => contact.id === project.client).fullName,
    }));

  const firestore = useFirestore();

  const handleDeleteProject = (data) => {
    setDataToDelete(data.data);
    setConfirmOpen(true);
  };

  const deleteprojects = () => {
    dataToDelete.forEach((element) => {
      firestore.collection("projects").doc(projects[element.index].id).delete();
    });
  };

  // Show a message while todos are loading
  if (!isLoaded(projects)) {
    return "Loading";
  }

  // Show a message if there are no todos
  if (isEmpty(projects)) {
    return (
      <Fade in>
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
      </Fade>
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
      name: "buildingName",
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
    {
      name: "clientName",
      label: "Client",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "projectManager",
      label: "PM",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "id",
      label: " ",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button onClick={() => openProject(value)}>
              <EditIcon />
            </Button>
          );
        },
      },
    },
  ];

  if (buildings === undefined || contacts === undefined) return (<Loading />);

  return (
    <>
      <Fade in={true}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <DataTable
              data={extendedProjects}
              columns={columns}
              options={{
                filterType: "checkbox",
              }}
              onRowsDelete={handleDeleteProject}
              title={"Projects"}
            />
          </Grid>
        </Grid>
      </Fade>
      <NewProject
        user={currentUser}
        contacts={contacts}
        buildings={buildings}
      />
      {currentId.editOpen ? (
        <EditProject
          user={currentUser}
          id={currentId.openId}
          open={currentId.editOpen}
          onClose={closeProject}
          buildings={buildings}
          contacts={contacts}
        />
      ) : null}
      <ConfirmDialog
        title="Delete Project(s)?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteprojects}
      >
        Are you sure? This action cannot be undone.
      </ConfirmDialog>
    </>
  );
}

export default Projects;
