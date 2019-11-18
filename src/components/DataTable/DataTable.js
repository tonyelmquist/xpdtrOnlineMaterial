import React from "react";
import MUIDataTable from "mui-datatables";
import {
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";

const getMuiTheme = () =>
  createMuiTheme({
    overrides: {
      MUIDataTable: {
        root: {
          backgroundColor: "#FF000",
        },
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "#FFF",
        },
      },
      MUIDataTableToolbar:{
        root: {
          backgroundColor: "#f89d07",
        },
        titleText: {
          backgroundColor: "#f89d07",
          color: "#002977",
          fontFamily: "Helvetica",
          fontSize: "1.75rem",
          fontWeight: "700",
          textTransform: "uppercase"
        },

      }
    },
  });

const DataTable = (props) => {

const {data, columns, title, onRowsDelete} = props

  return (
    <>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              data={data}
              columns={columns}
              options={{
                filterType: "checkbox",
                onRowsDelete: onRowsDelete,
              }}
              title={title}
            />
          </MuiThemeProvider>
    </>
  );
}

export default DataTable;
