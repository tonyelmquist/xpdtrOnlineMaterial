import React from "react";
import Select from "@material-ui/core/Select";

import { Paper } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import { DriveEtaOutlined, MoreVert as MoreIcon } from "@material-ui/icons";
import { GridOn } from "@material-ui/icons";
import classnames from "classnames";
import TextField from "@material-ui/core/TextField";
import DayJSUtils from "@date-io/dayjs";
import DayJS from "dayjs";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const Card = ({ title, assignedTo, dueDate, description, project }) => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54"),
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DayJSUtils}>
      <Paper elevation={3} style={{ padding: "10px", marginBottom: "10px" }}>
        <div>
          <TextField
            label="Title"
            id="title"
            defaultValue="Title"
            size="small"
            value={title}
          ></TextField>
        </div>
        <div>
          <TextField
            label="Description"
            id="description"
            size="large"
            multiline
            rowsMax={4}
            value={description}
          ></TextField>
        </div>
        <div>
          <Select label="Project" id="project" size="small" value={project}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div>
          <Select
            label="Assigned to"
            id="assignedTo"
            size="small"
            value={assignedTo}
          >
          
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="M/D/YYYY"
            margin="normal"
            id="dueDate"
            label="Due Date"
            value={dueDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </div>
      </Paper>
    </MuiPickersUtilsProvider>
  );
};

export default Card;
