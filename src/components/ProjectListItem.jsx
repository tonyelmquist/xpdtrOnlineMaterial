import React, { Component } from "react";
import { Table, Icon, Modal, Header, Button } from "semantic-ui-react";
import { withRouter } from "react-router";

class ProjectListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  handleClick = projectId => {
    const { history } = this.props;
    history.push(`/ProjectDetail/${projectId}`);
  };

  handleDelete = projectId => {
    this.props.handleDelete(projectId);
    this.setState({ modalOpen: false });
  };

  openModal =()  => {
    this.setState({ modalOpen: true });
  };

   closeModal =()  => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { projectId, project, key } = this.props;
    return (
      <Table.Row onClick={() => this.handleClick(projectId)}>
        <Table.Cell>{project["projectName"]}</Table.Cell>
        <Table.Cell>{project["building"]}</Table.Cell>
        <Table.Cell>{project["projectType"]}</Table.Cell>
        <Table.Cell>
          <Icon name="ellipsis horizontal" />
            <Icon name="delete" onClick={() => this.openModal()} />
          <Modal open={this.state.modalOpen} size="tiny">
            <Header icon="warning" content="Delete Project" />
            <Modal.Content>
              <p>Are you sure you want to delete this project?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => this.closeModal()}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={() => this.handleDelete(projectId)}
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

export default withRouter(ProjectListItem);
