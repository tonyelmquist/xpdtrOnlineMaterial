import React from "react";

import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

import { Typography } from "../Wrappers/Wrappers";
import Loading from "../Loading/Loading";

// components
import Widget from "../Widget/Widget";

// components

import useStyles from "./styles";

import Fade from "@material-ui/core/Fade";

const colors = [
  "#0074D9",
  "#FF4136",
  "#2ECC40",
  "#FF851B",
  "#7FDBFF",
  "#B10DC9",
  "#FFDC00",
  "#001f3f",
  "#39CCCC",
  "#01FF70",
  "#85144b",
  "#F012BE",
  "#3D9970",
  "#111111",
  "#AAAAAA",
];

const PieChartWithData = ({ data, dataKey, title, showTable, tableNumber }) => {
  var classes = useStyles();
  var theme = useTheme();
  if (!data) return <Loading />;

  if (data.length === 0) return null;

  var chartData = data.reduce(function (obj, v) {
    // increment or set the property
    // `(obj[v.status] || 0)` returns the property value if defined
    // or 0 ( since `undefined` is a falsy value
    obj[v[dataKey]] = (obj[v[dataKey]] || 0) + 1;
    // return the updated object
    return obj;
    // set the initial value as an object
  }, {});

  chartData = Object.entries(chartData).map((entry, index) => ({
    name: entry[0],
    value: entry[1],
    color: colors[index],
  }));

  return (
    <Fade in>
      <Widget
        title={title}
        upperTitle
        className={classes.card}
        showTable={showTable}
        tableNumber={tableNumber}
        data={data}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart margin={{ left: theme.spacing(2) }}>
                <Pie data={chartData} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.pieChartLegendWrapper}>
              {chartData.map(({ name, value, color }, index) => (
                <div key={color} className={classes.legendItemContainer}>
                  <Typography
                    style={{
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                      color: color,
                    }}
                  >
                    &nbsp;{name.toLowerCase()}&nbsp;
                  </Typography>
                  <Typography color="text" colorBrightness="secondary">
                    &nbsp;{value}
                  </Typography>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Widget>
    </Fade>
  );
};

export default PieChartWithData;
