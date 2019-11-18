import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GridOnIcon from "@material-ui/icons/GridOn";

import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";

import { Typography } from "../../components/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";

// components
import Widget from "../../components/Widget";

import firebase from "firebase";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";

import axios from "axios";

// styles
import useStyles from "./styles";

// components
import columns from "./columnDefinitions";
import DataTable from "../../components/DataTable/DataTable";
import Fab from "@material-ui/core/Fab";
import PageTitle from "../../components/PageTitle/PageTitle";
import Loading from "../../components/Loading/Loading";

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  useEffect(() => {
    if (DOBData.DOBCalled === false && contacts && buildings && projects)
      getDOBJobs();
    if (DOBData.DOBNowCalled === false && contacts && buildings && projects)
      getDOBNowJobs();
    if (DOBData.violationsCalled === false && contacts && buildings && projects)
      getViolations();
  });

  const currentUser = firebase.auth().currentUser.uid;

  const projectQuery = {
    collection: "projects",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  const contactQuery = {
    collection: "contacts",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  const buildingQuery = {
    collection: "buildings",
    limitTo: 10,
    where: ["userId", "==", currentUser],
  };

  useFirestoreConnect(() => [projectQuery]);
  useFirestoreConnect(() => [contactQuery]);
  useFirestoreConnect(() => [buildingQuery]);

  const contacts = useSelector(
    ({ firestore: { ordered } }) => ordered.contacts,
  );

  const buildings = useSelector(
    ({ firestore: { ordered } }) => ordered.buildings,
  );

  const projects = useSelector(
    ({ firestore: { ordered } }) => ordered.projects,
  );

  var [DOBData, setDOBData] = useState({
    DOBData: [],
    DOBCalled: false,
    DOBNowData: [],
    DOBNowCalled: false,
    violations: [],
    violationsCalled: false,
    pieData: [],
    pie2Data: [],
  });

  var applicantLicenseNumbers =
    contacts &&
    contacts
      .map(contact => {
        if (contact.licenseNumber) return `"${contact.licenseNumber}"`;
      })
      .filter(contact => contact);

  var BINs =
    buildings &&
    buildings
      .map(building => {
        if (building.BIN) return `"${building.BIN}"`;
      })
      .filter(bin => bin);

  var projectBIS =
    projects &&
    projects
      .map(project => {
        if (project.BIS) return `"${projects.BIS}"`;
      })
      .filter(bis => bis);

  applicantLicenseNumbers && applicantLicenseNumbers.push('"xxx"');
  BINs && BINs.push('"xxx"');
  projectBIS && projectBIS.push('"xxx"');

  const getDOBJobs = () => {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/rvhx-8trz.json?$where=applicant_license__%20in(${applicantLicenseNumbers}) OR job__%20in(${projectBIS}) OR bin__%20in(${BINs})`,
      )
      .then(response => {
        let pieData = response.data.reduce(function(acc, curr) {
          // Check if there exist an object in empty array whose CategoryId matches
          let isElemExist = acc.findIndex(function(item) {
            return item.job_status_descrp === curr.job_status_descrp;
          });
          if (isElemExist === -1) {
            let obj = {};
            obj.job_status_descrp = curr.job_status_descrp;
            obj.count = 1;
            acc.push(obj);
          } else {
            acc[isElemExist].count += 1;
          }
          return acc;
        }, []);
        pieData = pieData.map((pie, index) => ({
          name: pie.job_status_descrp,
          value: pie.count,
          color: colors[index],
        }));
        setDOBData({
          ...DOBData,
          DOBData: response.data,
          pieData: pieData,
          DOBCalled: true,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

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

  const getDOBNowJobs = () => {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/w9ak-ipjd.json?$where=applicant_license%20in(${applicantLicenseNumbers}) OR job_filing_number%20in(${projectBIS}) OR bin%20in(${BINs})`,
      )
      .then(response => {
        let pie2Data = response.data.reduce(function(acc, curr) {
          // Check if there exist an object in empty array whose CategoryId matches
          let isElemExist = acc.findIndex(function(item) {
            return item.filing_status === curr.filing_status;
          });
          if (isElemExist === -1) {
            let obj = {};
            obj.filing_status = curr.filing_status;
            obj.count = 1;
            acc.push(obj);
          } else {
            acc[isElemExist].count += 1;
          }
          return acc;
        }, []);
        pie2Data = pie2Data.map((pie, index) => ({
          name: pie.filing_status,
          value: pie.count,
          color: colors[index],
        }));
        setDOBData({
          ...DOBData,
          DOBNowData: response.data,
          pie2Data: pie2Data,
          DOBNowCalled: true,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getViolations = () => {
    axios
      .get(
        `https://data.cityofnewyork.us/resource/3h2n-5cm9.json?$where=bin%20in(${BINs})`,
      )
      .then(response => {
        setDOBData({
          ...DOBData,
          violations: response.data,
          violationsCalled: true,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  if (!DOBData.DOBCalled || !DOBData.DOBNowCalled) {
    return (
      <>
        <PageTitle title="Home" />
        <Grid container spacing={4}>
          <Grid item xs></Grid>
          <Grid item xs={6} style={{ textAlign: "center", fontSize: "2.5rem" }}>
            <Loading />
            Preparing your dashboard... Please hold...
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      {" "}
      <div className={classes.fabContainer}>
        <Fab
          color="primary"
          variant="extended"
          aria-label="add"
          className={classes.fab}
        >
          <DashboardIcon className={classes.fabIcon} />
          Summary
        </Fab>
        <Fab
          color="secondary"
          variant="extended"
          aria-label="add"
          className={classes.fab}
        >
          <GridOnIcon className={classes.fabIcon} />
          Table view
        </Fab>
      </div>
      <Grid container spacing={4}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Widget title="BIS Status" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart margin={{ left: theme.spacing(2) }}>
                    <Pie data={DOBData.pieData} dataKey="value">
                      {DOBData.pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {DOBData.pieData.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography
                        style={{
                          whiteSpace: "nowrap",
                          textTransform: "capitalize",
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
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Widget title="DOBNow! Status" upperTitle className={classes.card}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart margin={{ left: theme.spacing(2) }}>
                    <Pie data={DOBData.pie2Data} dataKey="value">
                      {DOBData.pie2Data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.pieChartLegendWrapper}>
                  {DOBData.pie2Data.map(({ name, value, color }, index) => (
                    <div key={color} className={classes.legendItemContainer}>
                      <Dot color={color} />
                      <Typography
                        style={{
                          whiteSpace: "nowrap",
                          textTransform: "capitalize",
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
        </Grid>
        <Grid item xs={12}>
          <DataTable
            data={DOBData.DOBData}
            columns={columns}
            title={"Job Applications"}
          />
        </Grid>
      </Grid>
    </>
  );
}
