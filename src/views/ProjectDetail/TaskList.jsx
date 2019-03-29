import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import TaskListItem from "../../components/TaskListItem";
import axios from "axios";
import { Table, Segment, Form, Button, Dimmer, Loader } from "semantic-ui-react";
import { compose } from 'redux'
import { withFirebase, isLoaded, isEmpty, firebaseConnect } from "react-redux-firebase";

class TaskList extends Component {
  state = {
    addFormVisible: false,
    task: {
      userID: this.props.user.uid,
     // projectID: this.props.project
    }
  };

  handleInputChange = (e, { name, value, text }) => {
    console.log(e, e.target, name, value, text);
    this.setState(prevState => ({
      task: {
        ...prevState.task,
        [name]: value
      }
    }));
  };

  handleProjectChange = (e, { name, value, text }) => {
    this.setState(prevState => ({
      task: {
        ...prevState.task,
        [name]: value
      }
    }));
  };

  handleFormSubmit = event => {
    this.props.firebase.push("tasks", this.state.task);
    this.setState({task: {
      userID: this.props.user.uid,
    }})
  };
  handleDelete = (key) => {
    this.props.firebase.database().ref('tasks').child(key).remove();
  }


  renderTasks = () => {
    const { tasks } = this.props;

    const loading = isLoaded(tasks);

    const taskMap = _.map(tasks, (value, key) => {
      return (
        <TaskListItem key={key} taskId={key} task={value} handleDelete={this.handleDelete}/>
      );
    });

    if (!isEmpty(tasks)) {
      return taskMap;
    }
    return (
      <div className="col s10 offset-s1 center-align">
        <h4>You have no tasks</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  toggleAddVisible = (e) => {
    this.setState({addFormVisible: !this.state.addFormVisible});
  }


  addTaskRow = () => {
    const { projects } = this.props;
    const projectMap = _.map(projects, (value, key) => {
      return {text: value.projectName, value: key};
    });


      return(       
      <Table.Row>     
        <Table.Cell><Form.Input name="title" fluid placeholder="Title" onChange={this.handleInputChange} /></Table.Cell>
        <Table.Cell><Form.Input name="assignedTo" fluid placeholder="Assigned To" onChange={this.handleInputChange} /></Table.Cell>
        <Table.Cell><Form.Dropdown name="projectId" fluid search selection placeholder="Project" onChange={this.handleInputChange} options={projectMap}/></Table.Cell>
        <Table.Cell><Form.Input name="dueDate" fluid placeholder="Due Date" onChange={this.handleInputChange} /></Table.Cell>
        <Table.Cell><Form.Input name="status" fluid placeholder="Status" onChange={this.handleInputChange} /></Table.Cell>
        <Table.Cell><Form.Input name="description" fluid placeholder="Description" onChange={this.handleInputChange} /></Table.Cell>   
         <Table.Cell><Button color="green" onClick={() => {this.handleFormSubmit()}}>Add Task</Button></Table.Cell>        
      </Table.Row>   
      )
  }

  render() {
     const { tasks } = this.props;
    return (
      <div className="list-content">
      {!isLoaded(tasks)?  <Dimmer active inverted>
        <Loader>Loading</Loader>
      </Dimmer> : null }

      <Form>
      <Table stackable selectable className="list-content">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Assigned To</Table.HeaderCell>
            <Table.HeaderCell>Project</Table.HeaderCell>
            <Table.HeaderCell>Due Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderTasks()}{this.state.addFormVisible ? this.addTaskRow() : null}</Table.Body>
      </Table>
      </Form>
      <Button className="below-table" onClick={() => this.toggleAddVisible()} color={this.state.addFormVisible ? 'black' : 'green'}>{this.state.addFormVisible ? 'Cancel' : 'New Task'}</Button>
   </div>
    );
  }
}

export default compose(
  firebaseConnect((props) => [
 { path: '/tasks', queryParams: [ 'orderByChild=userID', 'equalTo=' + props.user.uid ] },
 { path: '/projects', queryParams: [ 'orderByChild=userID', 'equalTo=' + props.user.uid ] }// string equivalent 'todos'
  ]),
  connect((state, props) => ({
    tasks: state.firebase.data.tasks,
    projects: state.firebase.data.projects
  }))
)(TaskList)
