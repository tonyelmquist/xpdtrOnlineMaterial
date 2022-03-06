import React from "react";

import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import useStyles from "./styles";
import PieChartWithData from "../../components/PieChartWithData/PieChartWithData";

import { tables } from "./tableDefinitions";

import Fade from "@material-ui/core/Fade";

const Charts = (props: { DOBData: any; colors: any; showTable: any }) => {
  const { DOBData, colors, showTable } = props;
  var classes = useStyles();
  var theme = useTheme();

  const allCharts = (tablesToRender: any) => {
    return;
  };

  return (
    <Fade in>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.DOBData}
            dataKey={"job_status_descrp"}
            title={"DOB BIS Data Status"}
            showTable={showTable}
            tableNumber={0}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.DOBNowData}
            dataKey={"filing_status"}
            title={"DOB Now! Status"}
            showTable={showTable}
            tableNumber={1}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.violations}
            dataKey={"violation_type"}
            title={"Violations by Type"}
            showTable={showTable}
            tableNumber={2}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.violations}
            dataKey={"violation_category"}
            title={"Violations by Category"}
            showTable={showTable}
            tableNumber={3}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.permits}
            dataKey={"permit_status"}
            title={"Permit Status"}
            showTable={showTable}
            tableNumber={4}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.permits}
            dataKey={"permit_type"}
            title={"Permit Types"}
            showTable={showTable}
            tableNumber={5}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.complaints}
            dataKey={"complaint_category"}
            title={"Complaint Types"}
            showTable={showTable}
            tableNumber={6}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.asbestos}
            dataKey={"status_description"}
            title={"Asbestos Filing Status"}
            showTable={showTable}
            tableNumber={7}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.boilers}
            dataKey={"report_status"}
            title={"Boiler Filing Status"}
            showTable={showTable}
            tableNumber={8}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.cats}
            dataKey={"status"}
            title={"CATS Filing Status"}
            showTable={showTable}
            tableNumber={9}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.ecb}
            dataKey={"violation_type"}
            title={"ECB Violations by Type"}
            showTable={showTable}
            tableNumber={10}
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <PieChartWithData
            data={DOBData.electricalNow}
            dataKey={"filing_status"}
            title={"DOB NOW! Electrical Filings"}
            showTable={showTable}
            tableNumber={11}
          />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default Charts;