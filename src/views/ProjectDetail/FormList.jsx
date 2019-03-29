import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import FormListItem from "../../components/FormListItem";
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

class FormList extends Component {
  state = {
    addFormVisible: false,
    form: {
      userID: this.props.user.uid
      // projectID: this.props.project
    }
  };

  handleInputChange = (e, { name, value }) => {
    console.log(e);

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  };

  handleFormSubmit = event => {
    this.props.firebase.push("forms", this.state.form);
    this.setState({
      form: {
        userID: this.props.user.uid
      }
    });
  };

  handleDelete = key => {
    this.props.firebase
      .database()
      .ref("forms")
      .child(key)
      .remove();
  };

  renderforms = () => {
    const { forms } = this.props;

    const loading = isLoaded(forms);

    const formMap = _.map(forms, (value, key) => {
      return (
        <FormListItem
          key={key}
          formId={key}
          form={value}
          handleDelete={this.handleDelete}
        />
      );
    });

    if (!isEmpty(forms)) {
      return formMap;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h4>You have no forms</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  };

  toggleAddVisible = e => {
    this.setState({ addFormVisible: !this.state.addFormVisible });
  };

  addformRow = () => {
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
            name="formName"
            fluid
            placeholder="Form Name"
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
            name="lastEdited"
            fluid
            placeholder="Edited"
            onChange={this.handleInputChange}
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            name="comments"
            fluid
            placeholder="Comments"
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
            Add form
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  render() {
    const { forms } = this.props;
    return (
      <div className="list-content">
        {!isLoaded(forms) ? (
          <Dimmer active inverted>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : null}

        <Form>
          <Table stackable selectable className="list-content">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Form Name</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell>Last Edited</Table.HeaderCell>
                <Table.HeaderCell>Comments</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderforms()}
              {this.state.addFormVisible ? this.addformRow() : null}
            </Table.Body>
          </Table>
        </Form>
        <Button
          className="below-table"
          onClick={() => this.toggleAddVisible()}
          color={this.state.addFormVisible ? "black" : "green"}
        >
          {this.state.addFormVisible ? "Cancel" : "New Form"}
        </Button>
      </div>
    );
  }
}

export default compose(
  firebaseConnect(props => [
    {
      path: "/forms",
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
    forms: state.firebase.data.forms,
    projects: state.firebase.data.projects,
    contacts: state.firebase.data.contacts
  }))
)(FormList);
