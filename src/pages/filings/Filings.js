import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import MUIDataTable from "mui-datatables";
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
    customerRef: "",
    content: "",
    dateCreated: "",
    dateUpdated: "",
  });

  const [editorOpen, setEditorOpen] = React.useState(false);

  useFirestoreConnect(() => [filingQuery]);

  const filings = useSelector(({ firestore: { ordered } }) => ordered.filings);

  const firestore = useFirestore();

  const deleteFilings = data => {
    data.data.forEach(element => {
      firestore
        .collection("filings")
        .doc(filings[element.index].id)
        .delete();
    });
  };

  const openFiling = tableData => {
    const {rowData} = tableData;
    setValues({fileName: rowData[6], content: rowData[5], form: rowData[0]})
    handleSetEditorOpen();
  };

  const saveFiling = content => {
    setValues({ ...values, content: content });
    return firestore
      .collection("filings")
      .add({ ...values, content: content, userId: currentUser });
  };

  const handleSetEditorOpen = () => {
    setEditorOpen(true);
  };

  const handleChange = name => event => {
    console.log(event.target);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleFormChange = event => {
    console.log(event.target.value);
    setValues({
      ...values,
      file: event.target.value,
      form: event.target.value.name,
      fileName: event.target.value.file,
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
        <PageTitle title="Filings" />
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
        <NewFiling user={currentUser} />
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
        filter: true,
        sort: true,
        display: false,
      },
    },
    {
      name: "fileName",
      label: "File",
      options: {
        filter: true,
        sort: true,
        display: false,
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
      <PageTitle title="Filings" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            data={filings}
            columns={columns}
            options={{
              filterType: "checkbox",
              onRowsDelete: deleteFilings,
            }}
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
    </>
  );
}

export default Filings;
