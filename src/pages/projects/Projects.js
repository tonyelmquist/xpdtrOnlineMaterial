import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useFirestoreConnect,
  isLoaded,
  isEmpty,
  useFirestore,
} from "react-redux-firebase";

import { useLocation, useHistory } from "react-router-dom";

// components

import {
  Edit as EditIcon,
  Dashboard as HomeIcon,
  LibraryBooks as FormsIcon,
} from "@material-ui/icons";

import PushPin from "../../images/push_pin-24px.svg";

import { useLayoutDispatch, setProject } from "../../context/LayoutContext";

// components
import PageTitle from "../../components/PageTitle";

import Loading from "../../components/Loading";
import Button from "@material-ui/core/Button";
import NewProject from "./NewProject";
import EditProject from "./EditProject";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmDialog from "../../components/ConfirmDialog";

import Fade from "@material-ui/core/Fade";

function Projects() {
  // Attach project listener

  const history = useHistory();
  const currentUser = firebase.auth().currentUser.uid;

  var layoutDispatch = useLayoutDispatch();

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

  const goToDashboard = (id) => {
    history.push(`/app/home?pid=${id}`);
  };

  const goToForms = (id) => {
    history.push(`/app/forms?pid=${id}`);
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
    projects.map((project) => {
      const building =
        buildings &&
        buildings.find((building) => building.id === project.building);

      const client =
        contacts && contacts.find((contact) => contact.id === project.client);

      return {
        ...project,
        buildingName: building && building.customerReference,
        clientName: client && client.fullName,
      };
    });

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
      name: "jobNumber",
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
      name: "track",
      label: "Track",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <FormControlLabel
              value={value ? "Yes" : "No"}
              control={
                <Switch
                  color="primary"
                  checked={value}
                  value={value ? "Yes" : "No"}
                />
              }
              /*               onChange={(event) => {
                updateValue(event.target.value === "Yes" ? false : true);
              }} */
            />
          );
        },
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
            <>
              <Button onClick={() => setProject(layoutDispatch, value)}>
                <img src={PushPin} />
              </Button>
              <Button onClick={() => openProject(value)}>
                <EditIcon />
              </Button>
            </>
          );
        },
      },
    },
  ];

  if (buildings === undefined || contacts === undefined) return <Loading />;

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
