import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import PSPDFKit from "./PSPDFKit";
import { FireplaceSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  fab: {
    margin: theme.spacing(1),
  },
  fabContainer: {
    position: "absolute",
    right: "0",
    bottom: "0",
    zIndex: "1000",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewPDF = (props) => {
  const classes = useStyles();

  const saveData = () => {
    var viewer = document.getElementById("container").ej2_instances[0];
    const fieldsFilledOut = viewer.formFieldCollections.filter(
      (field) =>
        (field.value !== null &&
          field.value !== "" &&
          field.type === "Textbox") ||
        field.isSelected ||
        field.isChecked,
    );

    console.log(JSON.stringify(fieldsFilledOut));

    if (viewer.annotationCollection.length > 0) {
      viewer.exportAnnotationsAsObject().then(function (value) {
        props.saveFiling(JSON.stringify(fieldsFilledOut), value, props.id);
      });
    } else {
      props.saveFiling(JSON.stringify(fieldsFilledOut), "", props.id);
    }
  };

  function importAnnotation() {
    const exportObject = JSON.parse(props.values.annotations);
    var viewer = document.getElementById("container").ej2_instances[0];
    viewer.importAnnotation(exportObject);
  }

  const baseUrl = `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`;

  return (
    <div>
      <Dialog
        fullScreen
        open={props.editorOpen}
        onClose={props.handleSetEditorClosed}
        TransitionComponent={Transition}
      >
        <div className={classes.fabContainer}>
          <Fab
            color="primary"
            aria-label="save"
            onClick={() => saveData()}
            className={classes.fab}
          >
            Save
          </Fab>
          <Fab
            color="secondary"
            aria-label="close"
            className={classes.fab}
            onClick={importAnnotation}
          >
            Close
          </Fab>
        </div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleSetEditorClosed}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h3"
              size="sm"
              weight="bold"
              className={classes.title}
            >
              {props.values.form}
            </Typography>
            <Button color="inherit" onClick={props.handleSetEditorClosed}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>

        <PSPDFKit
          pdfUrl={`${props.values.fileName}`}
          saveFiling={saveData}
          content={props.values.content}
          annotations={props.values.annotations}
          formId={props.values.id}
        />
      </Dialog>
    </div>
  );
};

export default ViewPDF;
