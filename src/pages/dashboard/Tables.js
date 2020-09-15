import React, { useRef, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Fade, Button, Typography, IconButton, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import { useTheme } from "@material-ui/styles";

// components
import Widget from "../../components/Widget";
import useStyles from "./styles";

import PopupTable from "./PopupTable";

// components

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Tables = (props) => {
  const { table, hideTable } = props;

  var classes = useStyles();
  var theme = useTheme();
  return (
    <Dialog
      maxWidth={"xl"}
      open={table.showTable}
      onClose={hideTable}
      TransitionComponent={Transition}
    >
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={hideTable}
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
                JOB APPLICATIONS - BIS
              </Typography>
            </Toolbar>
          </AppBar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={hideTable}
            aria-label="close"
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <PopupTable table={table} />
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default Tables;
