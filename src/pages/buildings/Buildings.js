import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";


// components
import PageTitle from "../../components/PageTitle";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import NewBuilding from "./NewBuilding";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { useFirestore } from "react-redux-firebase";
import DataTable from '../../components/DataTable/DataTable';

function Buildings() {
  // Attach building listener
  const currentUser = firebase.auth().currentUser.uid;

  const buildingQuery = {
    collection: "buildings",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  const openBuilding = (tableData) => {
    console.log(tableData)
  }

  useFirestoreConnect(() => [buildingQuery]);

  const buildings = useSelector(
    ({ firestore: { ordered } }) => ordered.buildings,
  );

  const firestore = useFirestore();

  const deletebuildings = data => {
    console.log(data.data);
    data.data.forEach(element => {
      firestore
        .collection("buildings")
        .doc(buildings[element.index].id)
        .delete();
    });
  };
  // Show a message while todos are loading
  if (!isLoaded(buildings)) {
    return "Loading";
  }

  // Show a message if there are no todos
  if (isEmpty(buildings)) {
    return (
      <>
        <PageTitle title="Buildings" />
        <Grid container spacing={4}>
          <Grid item xs></Grid>
          <Grid item xs={6} style={{ textAlign: "center", fontSize: "2.5rem" }}>
            <SentimentDissatisfiedIcon
              style={{ width: "200px", height: "200px" }}
            />
            <p>Uh-oh! You don't have any buildings yet...</p>{" "}
            <p>
              {" "}
              Click on the '+' button in the lower right-hand corner to add a
              building...
            </p>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <NewBuilding user={currentUser} />
      </>
    );
  }

  const columns = [
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button onClick={() => openBuilding(tableMeta)}>
              <EditIcon />
            </Button>
          );
        },
      },
    },
    {
      name: "customerReference",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "BIN",
      label: "BIN",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "houseNumber",
      label: "House #",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "streetName",
      label: "Street",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "block",
      label: "Block",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "lot",
      label: "Lot",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "cb",
      label: "CB",
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
            data={buildings}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: deletebuildings,
            }}
            title={"Buildings"}
          />
        </Grid>
      </Grid>
      <NewBuilding user={currentUser} />
    </>
  );
}

export default Buildings;