import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GridOnIcon from "@material-ui/icons/GridOn";

import axios from "axios";
// styles
import useStyles from "./styles";
import Fab from "@material-ui/core/Fab";
import PageTitle from "../../components/PageTitle/PageTitle";
import Loading from "../../components/Loading/Loading";
import Tables from "./Tables";
import Charts from "./Charts";



import Fade from "@material-ui/core/Fade";

export default function Dashboard(props) {
  const { contacts, projects, buildings } = props;

  var classes = useStyles();

  var theme = useTheme();

  const [table, setTables] = useState({
    showTable: false,
    tableToShow: 0,
    data: [],
    title: ""
  });

  const showTable = (tableToShow, data, title) => {
    
    setTables({ showTable: true, tableToShow, data, title });
  };

  const hideTable = () => {
    setTables({ showTable: false, tableToShow: 0, data: [] });
  };

  var [DOBData, setDOBData] = useState({
    DOBData: [],
    DOBNowData: [],
    violations: [],
    permits: [],
    complaints: [],
    loading: true,
  });

  useEffect(() => {
    Promise.all([
      getDOBJobs(),
      getDOBNowJobs(),
      getViolations(),
      getPermits(),
      getComplaints(),
      getAsbestosFilings(),
      getBoilers(),
      getCats(),
      getEcbViolations(),
      getElectricalNow(),
    ]).then(
      ([
        DOBData,
        DOBNowData,
        violations,
        permits,
        complaints,
        asbestos,
        boilers,
        cats,
        ecb,
        electricalNow,
      ]) => {
        console.log(asbestos);
        setDOBData({
          DOBData,
          DOBNowData,
          violations,
          permits,
          complaints,
          asbestos,
          boilers,
          cats,
          ecb,
          electricalNow,
          loading: false,
        });
      },
    );
  }, []);

  var applicantLicenseNumbers =
    contacts &&
    contacts
      .map((contact) => {
        if (contact.licenseNumber) return `"${contact.licenseNumber}"`;
      })
      .filter((contact) => contact);

  var BINs =
    buildings &&
    buildings
      .map((building) => {
        if (building.BIN) return `"${building.BIN}"`;
      })
      .filter((bin) => bin);

  var projectBIS =
    projects &&
    projects
      .map((project) => {
        if (project.BIS) return `"${projects.BIS}"`;
      })
      .filter((bis) => bis);

  const getPermits = () => {
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/ipu4-2q9a.json?$where=bin__%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  const getCats = () => {
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/f4rp-2kvy.json?$where=bin%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  const getBoilers = () => {
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/52dp-yji6.json?$where=bin_number%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  const getElectricalNow = () => {
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/dm9a-ab7w.json?$where=bin%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  const getEcbViolations = () => {
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/6bgk-3dad.json?$where=bin%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  const getAsbestosFilings = () => {
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/vq35-j9qm.json?$where=bin%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  const getComplaints = () => {
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/rbx6-tga4?$where=bin%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  const getDOBJobs = () => {
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/rvhx-8trz.json?$where=applicant_license__%20in(${applicantLicenseNumbers}) OR job__%20in(${projectBIS}) OR bin__%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
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
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/w9ak-ipjd.json?$where=applicant_license%20in(${applicantLicenseNumbers}) OR job_filing_number%20in(${projectBIS}) OR bin%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  const getViolations = () => {
    return axios
      .get(
        `https://data.cityofnewyork.us/resource/3h2n-5cm9.json?$where=bin%20in(${BINs})`,
      )
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
  };

  if (DOBData.loading) {
    return (
      <>
        <Fade in>
          <Grid container spacing={4}>
            <Grid item xs></Grid>
            <Grid
              item
              xs={6}
              style={{ textAlign: "center", fontSize: "2.5rem" }}
            >
              <Loading />
              Retrieving data from NYC agencies... Please hold...
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Fade>
      </>
    );
  }

  return (
    <>
      <Tables table={table} hideTable={hideTable} />

      <Charts DOBData={DOBData} colors={colors} showTable={showTable} />
    </>
  );
}
