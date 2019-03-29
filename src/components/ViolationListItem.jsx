import React, { Component } from "react";
import { Table, Icon, Modal, Header, Button } from "semantic-ui-react";
import { withRouter } from "react-router";

class ViolationListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  handleClick = violationId => {
    const { history } = this.props;
    history.push(`/ViolationDetail/${violationId}`);
  };

  handleDelete = violationId => {
    this.props.handleDelete(violationId);
    this.setState({ modalOpen: false });
  };

  openModal =()  => {
    this.setState({ modalOpen: true });
  };

   closeModal =()  => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { violationId, violation, key } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{violation["number"]}</Table.Cell>
         <Table.Cell>{violation["violation_category"]}</Table.Cell>
         <Table.Cell>{violation["violation_type"]}</Table.Cell>
        <Table.Cell>{`${violation["house_number"]} ${violation["street"]}`}</Table.Cell>
        <Table.Cell>{violation["disposition_date"]}</Table.Cell>
        <Table.Cell>{violation["disposition_comments"]}</Table.Cell>
        <Table.Cell>{violation["device_number"]}</Table.Cell>
        <Table.Cell>{violation["description"]}</Table.Cell>
        <Table.Cell>
          <Icon name="ellipsis horizontal" onClick={() => this.handleClick(projectId)} />
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

export default withRouter(ViolationListItem);
