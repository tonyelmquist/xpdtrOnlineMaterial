
import * as React from "react";

import {tables} from "./tableDefinitions";
import DataTable from "../../components/DataTable/DataTable";

type MyProps = {
  // using `interface` is also ok
  table: any;
  columnDefinitions: any;
};

export default class PopupTable extends React.Component<MyProps> {

  public render() {

    return (
      <DataTable
        data={this.props.table.data}
        columns={tables[this.props.table.tableToShow].columns}
        title={"Job Applications"}
      />
    );
  }
}
