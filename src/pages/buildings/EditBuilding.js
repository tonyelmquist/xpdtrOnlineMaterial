import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { useFirestore } from "react-redux-firebase";
const useStyles = makeStyles((theme) => ({
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
    margin: theme.spacing(2),
    position: "fixed",
    bottom: 0,
    right: 0,
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditBuilding(props) {
  const classes = useStyles();

  const firestore = useFirestore();

  const building = useSelector(
    ({ firestore: { data } }) => data.buildings && data.buildings[props.id],
  );

  const [values, setValues] = useState({
    ...building,
  });

  const handleCheckbox = (name) => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    props.onClose();
  };

  function updateBuilding() {
    firestore
      .collection("buildings")
      .doc(props.id)
      .update({ ...values, userId: props.user, id: props.id });
    handleClose();
  }

  return (
    <div>
      <Dialog
        maxWidth={"xl"}
        open={props.open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
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
              {values.customerReference}
            </Typography>
            <Button color="inherit" onClick={updateBuilding}>
              save
            </Button>
            <Button color="inherit" onClick={handleClose}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              required
              id="customerReference"
              label="Name"
              className={classes.textField}
              value={values.customerReference}
              onChange={handleChange("customerReference")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="BIN"
              label="BIN"
              className={classes.textField}
              value={values.BIN}
              onChange={handleChange("BIN")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="houseNumber"
              label="House #"
              className={classes.textField}
              value={values.houseNumber}
              onChange={handleChange("houseNumber")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="streetName"
              label="Street"
              className={classes.bigField}
              value={values.streetName}
              onChange={handleChange("streetName")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="block"
              label="Block"
              className={classes.textField}
              value={values.block}
              onChange={handleChange("block")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="lot"
              label="Lot"
              className={classes.textField}
              value={values.lot}
              onChange={handleChange("lot")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="cb"
              label="CB"
              className={classes.textField}
              value={values.cb}
              onChange={handleChange("cb")}
              margin="normal"
              variant="outlined"
            />
            <FormControlLabel
              label={"Track?"}
              value={values.track ? "Yes" : "No"}
              control={
                <Switch
                  color="primary"
                  checked={values.track}
                  value={values.track ? "Yes" : "No"}
                />
              }
              onChange={handleCheckbox("track")}
            />
          </form>
        </Grid>
      </Dialog>
    </div>
  );
}
