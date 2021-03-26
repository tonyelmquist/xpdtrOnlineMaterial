import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

import { useLayoutDispatch, setBuilding } from "../../context/LayoutContext";

// components
import PageTitle from "../../components/PageTitle";
import ConfirmDialog from "../../components/ConfirmDialog";
import {
  Edit as EditIcon,
  Dashboard as HomeIcon,
  LibraryBooks as FormsIcon,
} from "@material-ui/icons";

import PushPin from "../../images/push_pin-24px.svg";

import Button from "@material-ui/core/Button";
import NewBuilding from "./NewBuilding";
import EditBuilding from "./EditBuilding";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

import { useFirestore } from "react-redux-firebase";
import DataTable from "../../components/DataTable/DataTable";

function Buildings() {
  // Attach building listener
  const currentUser = firebase.auth().currentUser.uid;

  const history = useHistory();

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

  const openBuilding = (id) => {
    setCurrentId({ openId: id, editOpen: true });
  };

  const closeBuilding = () => {
    setCurrentId({ ...currentId, editOpen: false });
  };

  const goToDashboard = (id) => {
    history.push(`/app/home?bid=${id}`);
  };

  const goToForms = (id) => {
    history.push(`/app/forms?bid=${id}`);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);

  useFirestoreConnect(() => [buildingQuery]);

  const buildings = useSelector(
    ({ firestore: { ordered } }) => ordered.buildings,
  );

  const firestore = useFirestore();

  const handleDeleteBuilding = (data) => {
    setDataToDelete(data.data);
    setConfirmOpen(true);
  };

  const deletebuildings = () => {
    dataToDelete.forEach((element) => {
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
              <Button onClick={() => setBuilding(layoutDispatch, value)}>
                <img src={PushPin} />
              </Button>
              <Button onClick={() => openBuilding(value)}>
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
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DataTable
            data={buildings}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
            onRowsDelete={handleDeleteBuilding}
            title={"Buildings"}
          />
        </Grid>
      </Grid>
      <NewBuilding user={currentUser} />
      {currentId.editOpen ? (
        <EditBuilding
          user={currentUser}
          id={currentId.openId}
          open={currentId.editOpen}
          onClose={closeBuilding}
        />
      ) : null}
      <ConfirmDialog
        title="Delete Building(s)?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deletebuildings}
      >
        Are you sure? This action cannot be undone.
      </ConfirmDialog>
    </>
  );
}

export default Buildings;
