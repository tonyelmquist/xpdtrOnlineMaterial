import React, { Component } from "react";
import { Table, Icon, Modal, Header, Button} from "semantic-ui-react";

class TaskListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  handleClick = taskId => {
    const { history } = this.props;
    history.push(`/TaskDetail/${taskId}`);
  };

  handleDelete = taskId => {
    this.props.handleDelete(taskId);
    this.setState({ modalOpen: false });
  };

  openModal =()  => {
    this.setState({ modalOpen: true });
  };

   closeModal =()  => {
    this.setState({ modalOpen: false });
  };
  render() {
    const { taskId, task } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{task["title"]}</Table.Cell>
        <Table.Cell>{task["assignedTo"]}</Table.Cell>
        <Table.Cell>{task["project"]}</Table.Cell>
        <Table.Cell>{task["dueDate"]}</Table.Cell>
        <Table.Cell>{task["status"]}</Table.Cell>
        <Table.Cell>{task["description"]}</Table.Cell>
         <Table.Cell>
          <Icon name="ellipsis horizontal" onClick={() => this.handleClick(taskId)} />
            <Icon name="delete" onClick={() => this.openModal()} />
          <Modal open={this.state.modalOpen} size="tiny">
            <Header icon="warning" content="Delete Task" />
            <Modal.Content>
              <p>Are you sure you want to delete this task?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => this.closeModal()}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={() => this.handleDelete(taskId)}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default TaskListItem;
