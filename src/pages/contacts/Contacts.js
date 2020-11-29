import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import NewContact from "./NewContact";
import EditContact from "./EditContact";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import Fade from "@material-ui/core/Fade";

import { useFirestore } from "react-redux-firebase";
import DataTable from "../../components/DataTable/DataTable";
import { FormatListBulleted } from "@material-ui/icons";

function Contacts() {
  // Attach contact listener
  const currentUser = firebase.auth().currentUser.uid;

  const contactQuery = {
    collection: "contacts",
    where: ["userId", "==", currentUser],
  };

  const [currentId, setCurrentId] = useState({
    openId: "",
    editOpen: false,
  });

  const openContact = (tableData) => {
    setCurrentId({ openId: tableData.rowData[9], editOpen: true });
  };

  const closeContact = () => {
    setCurrentId({ ...currentId, editOpen: false });
  };

  useFirestoreConnect(() => [contactQuery]);

  const contacts = useSelector(
    ({ firestore: { ordered } }) => ordered.contacts,
  );

  const firestore = useFirestore();

  const deletecontacts = (data) => {
    console.log("DELETING");
    console.log(data.data);
    data.data.forEach((element) => {
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
      name: "id",
      label: " ",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button onClick={() => openContact(tableMeta)}>
              <EditIcon />
            </Button>
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
              onRowsDelete={deletecontacts}
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
    </>
  );
}

export default Contacts;
