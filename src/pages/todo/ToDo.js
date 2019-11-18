import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

// components
import NewContact from "./NewToDo";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { useFirestore } from "react-redux-firebase";
import DataTable from '../../components/DataTable/DataTable';

const ToDo = () => {
  // Attach contact listener
  const currentUser = firebase.auth().currentUser.uid;

  const contactQuery = {
    collection: "todos",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  useFirestoreConnect(() => [contactQuery]);

  const contacts = useSelector(
    ({ firestore: { ordered } }) => ordered.contacts,
  );

  const firestore = useFirestore();

  const deletecontacts = data => {
    console.log(data.data);
    data.data.forEach(element => {
      firestore
        .collection("contacts")
        .doc(contacts[element.index].id)
        .delete();
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
        <Grid container spacing={4}>
          <Grid item xs></Grid>
          <Grid item xs={6} style={{ textAlign: "center", fontSize: "2.5rem" }}>
            <SentimentDissatisfiedIcon
              style={{ width: "200px", height: "200px" }}
            />
            <p>Uh-oh! You don't have any todos yet...</p>{" "}
            <p>
              {" "}
              Click on the '+' button in the lower right-hand corner to add a
              todo...
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
  ];

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DataTable
            data={contacts}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: deletecontacts,
            }}
            title={"Contacts"}
          />
        </Grid>
      </Grid>
      <NewContact user={currentUser} />
    </>
  );
}

export default ToDo;
