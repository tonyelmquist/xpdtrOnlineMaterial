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
import PSPDFKit from "./PSPDFKit";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  fab: {
    margin: theme.spacing(2),
    position: "fixed",
    bottom: 0,
    right: 0,
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewPDF(props) {
  const classes = useStyles();

  

  const baseUrl = `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`;

  return (
    <div>
      <Dialog
        fullScreen
        open={props.editorOpen}
        onClose={props.handleSetEditorClosed}
        TransitionComponent={Transition}
      >
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
            <Typography variant="h6" className={classes.title}>
              New Filing
            </Typography>
            <Button color="inherit" onClick={props.handleSetEditorClosed}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>
        <PSPDFKit
          pdfUrl={`/pdf/${props.values.fileName}`}
          licenseKey={
            "kNj74Foqh9oIPno3e2yTLX_ebQ321ReaE4SZ75QuO7HliU56JuoOUhHeWnY5zOQYBkkkJ_hLhkIFneofY9dxWprQMF4tWBWqglVf6YVmQOTNTqsiCHUn8UpjSpewi1yl_nfQUydEGAuo9Xh13EoWOu0l3GE8WzItvFSx0RBei6CFd_fE_iu0-q3Woi1i6xYz_QCiLHzUqOi5zkxM8ek0PnRs6LV69e4-e53L2NHNrrpMxGtsfUlLc3fFvZZd6XYWo95OylvXncDIwdEkGCcNupaY-8wQcZaHHddw6r5hfMXwDpcoxBrD847xOhSEQOOo_6XEEqDCkpi1fH81xjQYRqyixrKuvPraNwLnpMs31npOCBccTiqfcSPtgfpq1hLhci5FKUNARAbt6CE86DWYKcn3__KAz5_sFptCVo6XU5ECwL-KKeVECi3IH0Ey3J2h"
          }
          baseUrl={baseUrl}
          saveFiling={props.saveFiling}
          content={props.values.content}
        />
      </Dialog>
    </div>
  );
}
