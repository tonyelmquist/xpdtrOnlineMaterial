import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
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

export default function NewProject(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const firestore = useFirestore();

  const [values, setValues] = React.useState({
    customerReference: "",
    dateCreated: Date.now(),
    building: "",
    type: "",
    projectManager: "",
    filingRepresentative: "",
    architect: "",
    engineer: "",
    client: "",
    tenant: "",
    dateClosed: null,
    DOBNumber: "",
    closed: false,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCheckbox = (name) => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const handleClose = () => {
    setOpen(false);
  };

  function addProject() {
    setOpen(false);
    return firestore
      .collection("projects")
      .add({ ...values, userId: props.user });
  }

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <Dialog
        maxWidth={"xl"}
        open={open}
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
              New Project
            </Typography>
            <Button color="inherit" onClick={addProject}>
              save
            </Button>
            <Button color="inherit" onClick={handleClose}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h4"
                size="sm"
                weight="bold"
                className={classes.title}
              >
                General
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="customerReference"
                label="Name"
                className={classes.textField}
                value={values.customerReference}
                onChange={handleChange("customerReference")}
                margin="normal"
                variant="outlined"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="building"
                label="Building"
                className={classes.textField}
                value={values.building}
                onChange={handleChange("building")}
                margin="normal"
                variant="outlined"
                fullWidth
                select
              >
                {props.buildings &&
                  props.buildings.map((building) => (
                    <MenuItem value={building.id}>
                      {building.customerReference}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="client"
                label="Client"
                className={classes.textField}
                value={values.client}
                onChange={handleChange("client")}
                margin="normal"
                variant="outlined"
                fullWidth
                select
              >
                {props.contacts && props.contacts.map((contact) => (
                  <MenuItem value={contact.id}>{contact.fullName}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="dateCreated"
                label="Created"
                className={classes.textField}
                value={values.dateCreated}
                onChange={handleChange("dateCreated")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="dateStart"
                label="Start date"
                className={classes.textField}
                value={values.dateStart}
                onChange={handleChange("dateStart")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="type"
                label="Type"
                className={classes.textField}
                value={values.dateClosed}
                onChange={handleChange("dateClosed")}
                margin="normal"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="status"
                label="Status"
                className={classes.textField}
                value={values.status}
                onChange={handleChange("status")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={1} sm={1} className={classes.checkBox}>
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
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
}
