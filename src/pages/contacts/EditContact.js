import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

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

const EditContact = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const firestore = useFirestore();

  const contact = useSelector(
    ({ firestore: { data } }) => data.contacts && data.contacts[props.id],
  );

  const [values, setValues] = React.useState({
    ...contact,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const setFirstNameChange = (name) => (event) => {
    setValues({
      ...values,
      firstName: event.target.value,
      fullName:
        event.target.value +
        (values.MI > "" ? ` ${values.MI} ` : " ") +
        values.lastName,
    });
  };

  const setMIChange = (name) => (event) => {
    setValues({
      ...values,
      MI: event.target.value,
      fullName:
        values.firstName +
        (event.target.value > "" ? ` ${event.target.value} ` : " ") +
        values.lastName,
    });
  };

  const setLastNameChange = (name) => (event) => {
    setValues({
      ...values,
      lastName: event.target.value,
      fullName:
        values.firstName +
        (values.MI > "" ? ` ${values.MI} ` : " ") +
        event.target.value,
    });
  };

  const handleClose = () => {
    props.onClose();
  };

  function updateContact() {
    firestore
      .collection("contacts")
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
              {values.fullName}
            </Typography>
            <Button color="inherit" onClick={updateContact}>
              Save
            </Button>
            <Button color="inherit" onClick={handleClose}>
              Cancel
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={2} sm={2}>
              <TextField
                id="salutation"
                label="Salutation"
                className={classes.textField}
                value={values.salutation}
                onChange={handleChange("salutation")}
                margin="normal"
                variant="outlined"
                fullWidth
                select
              >
                <MenuItem value={"Mr."}>{"Mr."}</MenuItem>
                <MenuItem value={"Ms."}>{"Ms."}</MenuItem>
                <MenuItem value={"Mrs."}>{"Mrs."}</MenuItem>
                <MenuItem value={"Miss"}>{"Miss"}</MenuItem>
                <MenuItem value={"Dr."}>{"Dr."}</MenuItem>)
              </TextField>
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                id="firstName"
                label="First Name"
                className={classes.textField}
                value={values.firstName}
                onChange={setFirstNameChange("firstName")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={2} sm={1}>
              <TextField
                id="MI"
                label="MI"
                className={classes.textField}
                value={values.MI}
                onChange={setMIChange("MI")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                id="lastName"
                label="Last Name"
                className={classes.textField}
                value={values.lastName}
                onChange={setLastNameChange("lastName")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="fullName"
                label="Full Name"
                className={classes.textField}
                value={values.fullName}
                onChange={handleChange("fullName")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                id="businessName"
                label="Business Name"
                className={classes.textField}
                value={values.businessName}
                onChange={handleChange("businessName")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="title"
                label="Title"
                className={classes.textField}
                value={values.title}
                onChange={handleChange("title")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="address1"
                label="Address"
                className={classes.textField}
                value={values.address1}
                onChange={handleChange("address1")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="address 2"
                label="Apt/Suite"
                className={classes.textField}
                value={values.address2}
                onChange={handleChange("address2")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                id="city"
                label="City"
                className={classes.textField}
                value={values.city}
                onChange={handleChange("city")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="state"
                label="State"
                className={classes.textField}
                value={values.state}
                onChange={handleChange("state")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                id="ZIP"
                label="ZIP"
                className={classes.textField}
                value={values.ZIP}
                onChange={handleChange("ZIP")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h4"
                size="sm"
                weight="bold"
                className={classes.title}
              >
                Contact
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="telephone"
                label="Telephone"
                className={classes.textField}
                value={values.phone}
                onChange={handleChange("phone")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="mobile"
                label="Mobile"
                className={classes.textField}
                value={values.address2}
                onChange={handleChange("address2")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                label="Email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange("email")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="website"
                label="Website"
                className={classes.textField}
                value={values.website}
                onChange={handleChange("website")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography
                variant="h4"
                size="sm"
                weight="bold"
                className={classes.title}
              >
                License / Registration Details
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="licenseType"
                label="License type"
                className={classes.textField}
                value={values.licenseType}
                onChange={handleChange("licenseType")}
                margin="normal"
                variant="outlined"
                fullWidth
                select
              >
                <MenuItem value={"PE"}>{"PE"}</MenuItem>
                <MenuItem value={"RA"}>{"RA"}</MenuItem>
                <MenuItem value={"LMP"}>{"LMP"}</MenuItem>
                <MenuItem value={"Sign hanger"}>{"Sign hanger"}</MenuItem>
                <MenuItem value={"Other"}>{"Other"}</MenuItem>)
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="licenseNumber"
                label="License number"
                className={classes.textField}
                value={values.licenseNumber}
                onChange={handleChange("licenseNumber")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="frepRegistration"
                label="Filing representative registration number"
                className={classes.textField}
                value={values.frepRegistration}
                onChange={handleChange("frepRegistration")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="ssn"
                label="SSN/TIN"
                className={classes.textField}
                value={values.ssn}
                onChange={handleChange("ssn")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="insurance"
                label="Insurance policy number"
                className={classes.textField}
                value={values.insurance}
                onChange={handleChange("insurance")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="hic"
                label="HIC number"
                className={classes.textField}
                value={values.hic}
                onChange={handleChange("hic")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
};

export default EditContact;
