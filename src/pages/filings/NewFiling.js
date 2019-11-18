import React from "react";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import formNames from "./formNames.json";
import Widget from "../../components/Widget/Widget";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const classes = useStyles();

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Widget title="New form" upperTitle className={classes.card}>
          <DialogContent>
            <DialogContentText>
              What type of filing would you like to add?
            </DialogContentText>
            <Select
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              value={props.values.file}
              fullWidth
              onChange={props.handleFormChange}
            >
              {formNames.map(form => (
                <MenuItem value={form.form}>{form.name}</MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={props.handleSetEditorOpen} color="primary">
              Select
            </Button>
          </DialogActions>
        </Widget>
      </Dialog>
    </>
  );
}
