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
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { useFirestore } from "react-redux-firebase";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
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

export default function NewProject(props){

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const firestore = useFirestore();

  const [values, setValues] = React.useState({
    customerReference: '',
    building: '',
    BIS: '',
    type: ''
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function addProject() {
    setOpen(false);
    return firestore.collection('projects').add({...values, userId: props.user})
 
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
        fullScreen
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
            <Typography variant="h6" className={classes.title}>
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
          <TextField
            required
            id="customerReference"
            label="Customer Reference"
            className={classes.textField}
            value={values.customerReference}
            onChange={handleChange("customerReference")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="type"
            label="Type"
            className={classes.textField}
            value={values.type}
            onChange={handleChange("type")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="building"
            label="Building"
            className={classes.textField}
            value={values.building}
            onChange={handleChange("building")}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="BIS"
            label="BIS"
            className={classes.textField}
            value={values.BIS}
            onChange={handleChange("BIS")}
            margin="normal"
            variant="outlined"
          />
        </form>
      </Dialog>
    </div>
  );
}
