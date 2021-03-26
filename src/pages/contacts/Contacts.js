import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useLocation, useHistory } from "react-router-dom";

// components


import { useLayoutDispatch, setContact, clearContact, useLayoutState} from "../../context/LayoutContext";

import {
  Edit as EditIcon,
  Dashboard as HomeIcon,
  LibraryBooks as FormsIcon,
} from "@material-ui/icons";

import PushPin from "../../images/push_pin-24px.svg";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import Button from "@material-ui/core/Button";
import NewContact from "./NewContact";
import EditContact from "./EditContact";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import Fade from "@material-ui/core/Fade";
import ConfirmDialog from "../../components/ConfirmDialog";

import { useFirestore } from "react-redux-firebase";
import DataTable from "../../components/DataTable/DataTable";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Contacts() {
  // Attach contact listener
  const currentUser = firebase.auth().currentUser.uid;

  const layoutDispatch = useLayoutDispatch();

  const history = useHistory();

  let query = useQuery();

  const contactQuery = {
    collection: "contacts",
    where: ["userId", "==", currentUser],
  };

  const [currentId, setCurrentId] = useState({
    openId: "",
    editOpen: false,
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);

  const openContact = (id) => {
    setCurrentId({ openId: id, editOpen: true });
  };

  const closeContact = () => {
    setCurrentId({ ...currentId, editOpen: false });
  };

    const goToDashboard = (id) => {
      history.push(`/app/home?cid=${id}`);
    };

    const goToForms = (id) => {
      history.push(`/app/forms?cid=${id}`);
    };

  useFirestoreConnect(() => [contactQuery]);

  const contacts = useSelector(
    ({ firestore: { ordered } }) => ordered.contacts,
  );

  const firestore = useFirestore();

  const handleDeleteContact = (data) => {
    setDataToDelete(data.data);
    setConfirmOpen(true);
  };

  const deletecontacts = () => {
    dataToDelete.forEach((element) => {
      firestore.collection("contacts").doc(contacts[element.index].id).delete();
    });
  };
  // Show a message while todos are loading
  if (!isLoaded(contacts)) {
    return "Loading";
  }

  // Show a message if there are no todos
  if (isEmpty(contacts)) {
    return (
      <>
        <PageTitle title="Contacts" />
        <Grid container spacing={4}>
          <Grid item xs></Grid>
          <Grid item xs={6} style={{ textAlign: "center", fontSize: "2.5rem" }}>
            <SentimentDissatisfiedIcon
              style={{ width: "200px", height: "200px" }}
            />
            <p>Uh-oh! You don't have any contacts yet...</p>{" "}
            <p>
              {" "}
              Click on the '+' button in the lower right-hand corner to add a
              contact...
            </p>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <NewContact user={currentUser} />
      </>
    );
  }

  const columns = [
    {
      name: "fullName",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "businessName",
      label: "BIN",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "address1",
      label: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "licenseType",
      label: "License Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "licenseNumber",
      label: "License Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "mobile",
      label: "Mobile",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
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
              <Button onClick={() => setContact(layoutDispatch, value)}>
                <img src={PushPin} />
              </Button>
              <Button onClick={() => openContact(value)}>
                <EditIcon />
              </Button>
            </>
          );
        },
      },
    },
  ];

  return (
    <>
      <Fade in>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <DataTable
              data={contacts}
              columns={columns}
              onRowsDelete={handleDeleteContact}
              title={"Contacts"}
            />
          </Grid>
        </Grid>
      </Fade>
      <NewContact user={currentUser} />
      {currentId.editOpen ? (
        <EditContact
          user={currentUser}
          id={currentId.openId}
          open={currentId.editOpen}
          onClose={closeContact}
        />
      ) : null}
      <ConfirmDialog
        title="Delete Contact(s)?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deletecontacts}
      >
        Are you sure? This action cannot be undone.
      </ConfirmDialog>
    </>
  );
}

export default Contacts;
