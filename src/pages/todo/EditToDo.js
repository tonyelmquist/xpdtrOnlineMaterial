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
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import { PinDropRounded } from "@material-ui/icons";

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
  textArea: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: "1.25rem",
    width: "100%",
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

export default function EditToDo(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({});

  React.useEffect(() => {
    let { title, description, details, assignedTo, due, id } = props.values;
    title = title === undefined ? "" : title;
    description = description === undefined ? "" : description;
    details = details === undefined ? "" : details;
    assignedTo = assignedTo === undefined ? "" : assignedTo;
    due = due === undefined ? "" : due;
    console.log(id)
    setValues({ title, description, details, assignedTo, due, id });
  }, [props.values]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClose = () => {
    props.toggleEdit();
  };

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
              onClick={props.closeEdit}
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
              {values.title}
            </Typography>
            <Button color="inherit" onClick={() => props.handleEdit(values)}>
              save
            </Button>
            <Button color="inherit" onClick={props.closeEdit}>
              cancel
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
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

            <Grid item xs={12} sm={12}>
              <TextField
                id="description"
                label="Description"
                className={classes.textField}
                value={values.description}
                onChange={handleChange("description")}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="details"
                label="Details"
                className={classes.textArea}
                value={values.details}
                onChange={handleChange("details")}
                margin="normal"
                variant="outlined"
                fullWidth
                multiline
                rows="10"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="assignedTo"
                label="Assigned to"
                className={classes.textField}
                value={values.assignedTo}
                onChange={handleChange("assignedTo")}
                margin="normal"
                variant="outlined"
                fullWidth
                select
              >
                {props.contacts &&
                  props.contacts.length !== 0 &&
                  props.contacts.map((contact) => (
                    <MenuItem value={contact.fullName}>
                      {contact.fullName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                id="due"
                label="Due Date"
                className={classes.textField}
                value={values.due}
                onChange={handleChange("due")}
                margin="normal"
                variant="outlined"
                fullWidth
                type="date"
              />
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
}
