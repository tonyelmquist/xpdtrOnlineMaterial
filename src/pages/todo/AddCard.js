import React from "react";

import { Paper, Button } from "@material-ui/core";
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

export const AddCard = ({ title, description, project, assignedTo }) => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54"),
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Paper elevation={3} style={{ padding: "10px", marginBottom: "10px" }}>
      <div>
        <TextField
          label="Title"
          id="title"
          defaultValue="Title"
          size="small"
        ></TextField>
      </div>
      <MuiPickersUtilsProvider utils={DayJSUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="M/D/YYYY"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <div>
        <TextField
          label="Project"
          id="filled-size-small"
          defaultValue="Project"
          size="small"
          select
        ></TextField>
      </div>
      <div>
        <TextField
          label="Assigned to"
          id="filled-size-small"
          defaultValue="Name"
          size="small"
        ></TextField>
      </div>
      <Button>Add</Button>
      <Button>Cancel</Button>
    </Paper>
  );
};
