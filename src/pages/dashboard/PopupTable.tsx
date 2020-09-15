
import * as React from "react";

import columns from "./columnDefinitions";
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
        columns={columns}
        title={"Job Applications"}
      />
    );
  }
}
