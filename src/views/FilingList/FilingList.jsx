import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import FilingListItem from "./FilingListItem";
import axios from "axios";
import {
  Table,
  Segment,
  Form,
  Button,
  Dimmer,
  Loader
} from "semantic-ui-react";
import { compose } from "redux";
import {
  withFirebase,
  isLoaded,
  isEmpty,
  firebaseConnect
} from "react-redux-firebase";

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
      <Table.Row>
        <Table.Cell>
          <Form.Input
            name="DOBNumber"
            fluid
            placeholder="DOB Job Number"
            onChange={this.handleInputChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            name="project"
            fluid
            placeholder="Project"
            onChange={this.handleInputChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            name="created"
            fluid
            placeholder="Created"
            onChange={this.handleInputChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            name="applicant"
            fluid
            placeholder="Applicant"
            onChange={this.handleInputChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            name="filingRep"
            fluid
            placeholder="Filing Representative"
            onChange={this.handleInputChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Checkbox
            name="efiled"
            fluid
            onChange={this.handleInputChange}
            value="efiled"
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            name="description"
            fluid
            placeholder="Description"
            onChange={this.handleInputChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Button
            color="green"
            onClick={() => {
              this.handleFormSubmit();
            }}
          >
            Add Filing
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  render() {
    const { filings } = this.props;
    return (
      <div className="list-content">
        {!isLoaded(filings) ? (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : null}

        <Form>
          <Table stackable selectable className="list-content">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>DOBNumber</Table.HeaderCell>
                <Table.HeaderCell>Project</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell>Applicant</Table.HeaderCell>
                <Table.HeaderCell>Filing Rep</Table.HeaderCell>
                <Table.HeaderCell>E-filed</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
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
      </div>
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
  }))
)(FilingList);
