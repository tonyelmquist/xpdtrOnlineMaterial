import React, { Component } from "react";
import { connect } from "react-redux";
import { completeToDo } from "../actions";
import {Icon, Button, Segment, Header} from 'semantic-ui-react'

class ToDoListItem extends Component {
  handleCompleteClick = completeToDoId => {
    const { completeToDo } = this.props;
    completeToDo(completeToDoId);
  };
w
  renderFilings = (filings) => {
    return filings.map(filing => {
      return (
        <Segment>Status: {filing['job_status_descrp']} Description: {filing['job_description']}</Segment>
      )
    })
  }

  render() {
    const { todoId, todo } = this.props;
    return (
      <Segment key="toDoName" className="to-do-item">

          <Header>Job ID: {todo.title}{" "}</Header>
          {todo.filings ? this.renderFilings(todo.filings) : ''}
          <Button
            onClick={() => this.handleCompleteClick(todoId)}
          >
            <Icon name="check" />
          </Button>

      </Segment>
    );
  }
}

export default connect(null, { completeToDo })(ToDoListItem);