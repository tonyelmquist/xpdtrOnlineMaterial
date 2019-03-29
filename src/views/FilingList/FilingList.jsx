import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import FilingListItem from "./FilingListItem";
import axios from "axios";
import {
  Segment,
  Form,
  Button,
  Dimmer,
  Loader
} from "semantic-ui-react";
import CustomTable from "components/CustomTable/CustomTable.jsx";

import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
//import Table from "components/Table/Table.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { compose } from "redux";
import {
  withFirebase,
  isLoaded,
  isEmpty,
  firebaseConnect
} from "react-redux-firebase";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class FilingList extends Component {
  state = {
    addFormVisible: false,
    filing: {
      userID: this.props.firebase.auth().currentUser.uid
      // projectID: this.props.project
    }
  };

  getDOBJob = jobNumber => {
    const { filings } = this.props;
    axios
      .get(
        `https://data.cityofnewyork.us/resource/rvhx-8trz.json?job__=${jobNumber}`
      ) // fetch the current XKCD comic. The site does not support CORS requests, so we make the request via a pass-through node server
      .then(response => {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleInputChange = (e, { name, value }) => {
    this.setState(prevState => ({
      filing: {
        ...prevState.filing,
        [name]: value
      }
    }));
  };

  handleFormSubmit = event => {
    this.getDOBJob(this.state.filing.DOBNumber);
    this.props.firebase.push("filings", this.state.filing);
    this.setState({
      filing: {
        userID: this.props.user.uid
      }
    });
  };
  handleDelete = key => {
    this.props.firebase
      .database()
      .ref("filings")
      .child(key)
      .remove();
  };

  renderFilings = () => {
    const { filings } = this.props;

    const loading = isLoaded(filings);

    const filingMap = _.map(filings, (value, key) => {
      return (
        <FilingListItem
          key={key}
          filingId={key}
          filing={value}
          handleDelete={this.handleDelete}
        />
      );
    });

    if (!isEmpty(filings)) {
      return filingMap;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h4>You have no filings</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  };

  toggleAddVisible = e => {
    this.setState({ addFormVisible: !this.state.addFormVisible });
  };

  addFilingRow = () => {
    const { projects } = this.props;
    const projectMap = _.map(projects, (value, key) => {
      return { text: value.projectName, value: key };
    });
    const { contacts } = this.props;
    const contactMap = _.map(contacts, (value, key) => {
      return { text: value.contactName, value: key };
    });

    return (
      <TableRow>
        <TableCell>
          <Form.Input
            name="DOBNumber"
            fluid
            placeholder="DOB Job Number"
            onChange={this.handleInputChange}
          />
        </TableCell>
        <TableCell>
          <Form.Input
            name="project"
            fluid
            placeholder="Project"
            onChange={this.handleInputChange}
          />
        </TableCell>
        <TableCell>
          <Form.Input
            name="created"
            fluid
            placeholder="Created"
            onChange={this.handleInputChange}
          />
        </TableCell>
        <TableCell>
          <Form.Input
            name="applicant"
            fluid
            placeholder="Applicant"
            onChange={this.handleInputChange}
          />
        </TableCell>
        <TableCell>
          <Form.Input
            name="filingRep"
            fluid
            placeholder="Filing Representative"
            onChange={this.handleInputChange}
          />
        </TableCell>
        <TableCell>
          <Form.Checkbox
            name="efiled"
            fluid
            onChange={this.handleInputChange}
            value="efiled"
          />
        </TableCell>
        <TableCell>
          <Form.Input
            name="description"
            fluid
            placeholder="Description"
            onChange={this.handleInputChange}
          />
        </TableCell>
        <TableCell>
          <Button
            color="green"
            onClick={() => {
              this.handleFormSubmit();
            }}
          >
            Add Filing
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  render() {
    const { filings, classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Simple Table</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
            <Table stackable selectable className="list-content">
            <TableHead>
              <TableRow>
                <TableCell>DOBNumber</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Applicant</TableCell>
                <TableCell>Filing Rep</TableCell>
                <TableCell>E-filed</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderFilings()}
              {this.state.addFormVisible ? this.addFilingRow() : null}
            </TableBody>
          </Table>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader plain color="primary">
              <h4 className={classes.cardTitleWhite}>
                Table on Plain Background
              </h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
              <CustomTable
                tableHeaderColor="primary"
                tableHead={["ID", "Name", "Country", "City", "Salary"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                  [
                    "4",
                    "Philip Chaney",
                    "$38,735",
                    "Korea, South",
                    "Overland Park"
                  ],
                  [
                    "5",
                    "Doris Greene",
                    "$63,542",
                    "Malawi",
                    "Feldkirchen in Kärnten"
                  ],
                  ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      /*       <div className="list-content">
        {!isLoaded(filings) ? (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : null}

        <Form>
          <Table stackable selectable className="list-content">
            <Table.Header>
              <TableRow>
                <TableCell>DOBNumber</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Applicant</TableCell>
                <TableCell>Filing Rep</TableCell>
                <TableCell>E-filed</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </Table.Header>
            <Table.Body>
              {this.renderFilings()}
              {this.state.addFormVisible ? this.addFilingRow() : null}
            </Table.Body>
          </Table>
        </Form>
        <Button
          className="below-table"
          onClick={() => this.toggleAddVisible()}
          color={this.state.addFormVisible ? "black" : "green"}
        >
          {this.state.addFormVisible ? "Cancel" : "New Filing"}
        </Button>
      </div> */
    );
  }
}

export default compose(
  firebaseConnect(props => [
    {
      path: "/filings",
      queryParams: ["orderByChild=userID", "equalTo=" + props.user.uid]
    },
    {
      path: "/projects",
      queryParams: ["orderByChild=userID", "equalTo=" + props.user.uid]
    }, // string equivalent 'todos'
    {
      path: "/contacts",
      queryParams: ["orderByChild=userID", "equalTo=" + props.user.uid]
    } // string equivalent 'todos'
  ]),
  connect((state, props) => ({
    filings: state.firebase.data.filings,
    projects: state.firebase.data.projects,
    contacts: state.firebase.data.contacts
  })),withStyles(styles)
)(FilingList);
