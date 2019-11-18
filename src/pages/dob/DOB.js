import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

import { Grid } from "@material-ui/core";

import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  fab: {
    margin: theme.spacing(1),
  },
  fabContainer: {
    position: "absolute",
    right: "0",
    bottom: "0"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: "3rem",
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: "1.25rem",
  },
  bigField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {},
  dob: {
    border: "none",
    width: "100%",
    height: "calc(100% - 65px)",
    borderRadius: "4px",
  },
}));

function DOB() {
  const source = "https://www1.nyc.gov/site/buildings/index.page";
  const classes = useStyles();
  //  const [source, setSource] = React.useState(false);

  return (
    <>
      <iframe title="DOB" src={source} id="DOB" className={classes.dob} />
      <div className={classes.fabContainer}>
        <Fab color="primary" aria-label="add" className={classes.fab}>
          DOB
        </Fab>
        <Fab color="primary" aria-label="add" className={classes.fab}>
          DOB
        </Fab>
        <Fab color="primary" aria-label="add" className={classes.fab}>
          DOB
        </Fab>
      </div>
    </>
  );
}

export default DOB;
