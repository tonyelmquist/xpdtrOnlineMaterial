import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import PdfIcon from "@material-ui/icons/PictureAsPdf";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import NewFiling from "./NewFiling";
import Loading from "../../components/Loading/Loading";
import { Grid } from "@material-ui/core";
import firebase from "firebase";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import ViewPDF from "./ViewPDF";
import { useFirestore } from "react-redux-firebase";
import Button from "@material-ui/core/Button";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmDialog from "../../components/ConfirmDialog";

function Filings() {
  // Attach building listener
  const currentUser = firebase.auth().currentUser.uid;

  const filingQuery = {
    collection: "filings",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  const [values, setValues] = React.useState({
    fileName: "",
    form: "",
    customerRef: "",
    content: "",
    dateCreated: null,
    dateUpdated: null,
    id: "",
  });

  const [editorOpen, setEditorOpen] = React.useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);

  useFirestoreConnect(() => [filingQuery]);

  const filings = useSelector(({ firestore: { ordered } }) => ordered.filings);

  const firestore = useFirestore();

  const handleDeleteFilings = (data) => {
    setDataToDelete(data.data);
    setConfirmOpen(true);
  };

  const deleteFilings = () => {
    dataToDelete.forEach((element) => {
      firestore.collection("filings").doc(filings[element.index].id).delete();
    });
  };

  const openFiling = (tableData) => {
    const { rowData } = tableData;
    setValues({
      fileName: rowData[7],
      content: rowData[5],
      annotations: rowData[6],
      form: rowData[0],
      id: rowData[4],
    });
    handleSetEditorOpen();
  };

  const saveFiling = (content, annotations, id) => {
    const dateUpdated = Date.now();

    const { form, fileName } = values;

    console.log(id)

    if (!id) {
      firestore
        .collection("filings")
        .add({
          content: content,
          userId: currentUser,
          dateCreated: dateUpdated,
          dateUpdated: dateUpdated,
          form: form,
          fileName: fileName,
          annotations: annotations,
        })
        .then(function (docRef) {
          setValues({
            ...values,
            id: docRef.id,
            content,
            userId: currentUser,
            annotations,
          });
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
      return;
    } else {
      setValues({
        ...values,
        content,
        annotations,
      });
      firestore
        .collection("filings")
        .doc(id)
        .update({
          content: content,
          dateUpdated: dateUpdated,
          annotations: annotations,
        });
    }
  };

  const handleSetEditorOpen = () => {
    setEditorOpen(true);
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleFormChange = (event) => {
    setValues({
      ...values,
      file: event.target.value,
      form: event.target.value.name,
      fileName: event.target.value.fileName,
    });
  };
  // Show a message while todos are loading
  if (!isLoaded(filings)) {
    return <Loading />;
  }

  const handleSetEditorClosed = () => {
    setEditorOpen(false);
  };

  // Show a message if there are no todos
  if (isEmpty(filings)) {
    return (
      <>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            style={{ textAlign: "center", fontSize: "2.5rem" }}
          >
            <SentimentDissatisfiedIcon
              style={{ width: "200px", height: "200px" }}
            />
            <p>Uh-oh! You don't have any filings yet...</p>{" "}
            <p>
              {" "}
              Click on the '+' button in the lower right-hand corner to add a
              filing...
            </p>
          </Grid>
        </Grid>
        <NewFiling
          user={currentUser}
          handleChange={handleChange}
          handleFormChange={handleFormChange}
          handleSetEditorOpen={handleSetEditorOpen}
          values={values}
        />
        <ViewPDF
          editorOpen={editorOpen}
          handleChange={handleChange}
          handleSetEditorOpen={handleSetEditorOpen}
          handleSetEditorClosed={handleSetEditorClosed}
          values={values}
          saveFiling={saveFiling}
          id={values.id}
        />
      </>
    );
  }

  const columns = [
    {
      name: "form",
      label: "Form Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dateCreated",
      label: "Created at",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "dateLastEdited",
      label: "Last edited",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "project",
      label: "Project",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "content",
      label: "Content",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "annotations",
      label: "Annotations",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "fileName",
      label: "File",
      options: {
        filter: true,
        sort: true,
        display: true,
      },
    },
    {
      name: "View Details",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button onClick={() => openFiling(tableMeta)}>
              <PdfIcon />
            </Button>
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
            data={filings}
            columns={columns}
            options={{
              filterType: "checkbox",
            }}
            onRowsDelete={handleDeleteFilings}
            title={"Forms"}
          />
        </Grid>
      </Grid>
      <NewFiling
        user={currentUser}
        handleChange={handleChange}
        handleFormChange={handleFormChange}
        handleSetEditorOpen={handleSetEditorOpen}
        values={values}
      />
      <ViewPDF
        editorOpen={editorOpen}
        handleChange={handleChange}
        handleSetEditorOpen={handleSetEditorOpen}
        handleSetEditorClosed={handleSetEditorClosed}
        values={values}
        saveFiling={saveFiling}
      />
      <ConfirmDialog
        title="Delete Form(s)?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteFilings}
      >
        Are you sure? This action cannot be undone.
      </ConfirmDialog>
    </>
  );
}

export default Filings;
