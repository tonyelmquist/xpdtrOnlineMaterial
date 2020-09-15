import React, { forwardRef, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import UIToolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  Annotation,
  TextSearch,
  Inject,
  FormFields,
} from "@syncfusion/ej2-react-pdfviewer";
import Fab from "@material-ui/core/Fab";

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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewPDF = (props) => {
  const childRef = useRef();
  const classes = useStyles();

  const [saveForm, setSaveForm] = React.useState(false);

  const baseUrl = `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`;

  const handleSave = () => {


    const pdfViewer = childRef.current;


    console.log(pdfViewer);
    console.log(document.getElementById("pdfComponent").elements);


/*     pdfViewer.exportFormFieldsAsObject().then(function (value) {
      var a = JSON.parse(value);
      console.log(a);
    });
    pdfViewer.exportAnnotationsAsObject().then(function (value) {
      var a = JSON.parse(value);
      console.log(a.pdfAnnotation);
      // var annotation = a.pdfAnnotation;
    }); */
    //  props.saveFiling(annotations, formFields, props.values.id);
  };

  const onDocumentLoaded = () => {
    if (childRef.current) {
      childRef.current.importAnnotations({});
      childRef.current.importFormFields({ ApplicantLastName: "Elmquist" });
    }
  };

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
            onClick={handleSave}
            className={classes.fab}
          >
            Save
          </Fab>
          <Fab
            color="secondary"
            aria-label="close"
            className={classes.fab}
            onClick={props.handleSetEditorClosed}
          >
            Close
          </Fab>
        </div>
        <AppBar className={classes.appBar}>
          <UIToolbar>
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
          </UIToolbar>
        </AppBar>
        <form id="pdfComponent">
          <PdfViewerComponent
            id="container"
            documentPath={props.values.fileName}
            serviceUrl="/api/pdfviewer"
            style={{ height: "100%" }}
            documentLoad={onDocumentLoaded}
            ref={childRef}
          >
            <Inject
              services={[
                Toolbar,
                Magnification,
                Navigation,
                Annotation,
                LinkAnnotation,
                BookmarkView,
                ThumbnailView,
                Print,
                TextSelection,
                TextSearch,
                FormFields,
              ]}
            />
          </PdfViewerComponent>
        </form>
      </Dialog>
    </div>
  );
};

export default ViewPDF;
