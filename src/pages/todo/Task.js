import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog.js";

import classnames from "classnames";
import TextField from "@material-ui/core/TextField";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import styles from "../../components/Layout/styles";

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    fontSize: "12px",
  },
  card: {
    maxWidth: 345,
    padding: "10px",
    marginBottom: "10px",
    width: "250px",
  },
  cardTitle: {
    fontSize: "1.25rem",
    textTransform: "none",
    color: "white",
  },
  cardDescription: {
    fontSize: "1rem",
    color: theme.palette.secondary.light,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",

    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Task = ({
  title,
  description,
  assignedTo,
  details,
  due,
  id,
  openEdit,
  handleDelete
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };
  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          title={title}
          subheader={description}
          classes={{
            root: classes.cardHeader, // class name, e.g. `classes-nesting-root-x`
            title: classes.cardTitle,
            subheader: classes.cardDescription, // class name, e.g. `classes-nesting-label-x`
          }}
        />
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            color="secondary"
          >
            <ExpandMoreIcon />
          </IconButton>
          <IconButton
            onClick={() => openEdit({
              title,
              description,
              assignedTo,
              details,
              due,
              id,
            })}
            aria-label="edit"
            color="secondary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleConfirmOpen}
            aria-label="delete"
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <TextField
              label="Details"
              multiline
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              margin="normal"
              value={details}
            />
            <TextField
              label="Assigned to"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              margin="normal"
              value={assignedTo}
            />
            <TextField
              label="Due date"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              margin="normal"
              value={due}
            />
          </CardContent>
        </Collapse>
      </Card>
      <ConfirmDialog
        title="Delete Task?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => handleDelete(id)}
      ></ConfirmDialog>
    </>
  );
};

export default Task;
