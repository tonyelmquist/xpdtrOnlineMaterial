import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Table, Segment, Tab, Form } from "semantic-ui-react";
import { compose } from "redux";
import { withFirebase, firebaseConnect } from "react-redux-firebase";

import TaskList from "./TaskList";
import FormList from "./FormList";

class ProjectDetail extends Component {
  render() {
    const user = this.props.firebase.auth().currentUser;

    const panes = [
      { menuItem: "Details", render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
      { menuItem: "Filings", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
      {
        menuItem: "Documents",  
        render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>
      },
      {
        menuItem: "Forms",
        render: () => (
          <Tab.Pane>
            <FormList user={user} project={this.props.project} />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Tasks",
        render: () => (
          <Tab.Pane>
            <TaskList project={this.props.match.params.projectId} />
          </Tab.Pane>
        )
      },
      { menuItem: "Comments", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ];

    return <Tab panes={panes} className="tab-content" />;
  }
}
export default compose(
  firebaseConnect(props => [
    {
      path: "/tasks",
      queryParams: [
        "orderByChild=projectID",
        "equalTo=" + props.match.params.projectId
      ]
    },
    {
      path: "/filings",
      queryParams: [
        "orderByChild=projectID",
        "equalTo=" + props.match.params.projectId
      ]
    },
    {
      path: "/comments",
      queryParams: [
        "orderByChild=projectID",
        "equalTo=" + props.match.params.projectId
      ]
    },
    { path: `/projects/${props.match.params.projectId}` }
  ]),
  connect((state, props) => ({
    tasks: state.firebase.data.tasks,
    filings: state.firebase.data.filings,
    comments: state.firebase.data.comments,
    project: state.firebase.data.projects[props.match.params.projectId]
  }))
)(ProjectDetail);
