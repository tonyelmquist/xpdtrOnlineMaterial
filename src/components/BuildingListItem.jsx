import React, { Component } from "react";
import { Table, Icon, Modal, Header, Button } from "semantic-ui-react";
import { withRouter } from "react-router";

class BuildingListItem extends Component {
    constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }


  handleClick = buildingId => {
    const { history } = this.props;
    history.push(`/BuildingDetail/${buildingId}`);
  };

  handleDelete = buildingId => {
    this.props.handleDelete(buildingId);
    this.setState({ modalOpen: false });
  };

  openModal =()  => {
    this.setState({ modalOpen: true });
  };

   closeModal =()  => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { buildingId, building } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{building["houseNumber"]}</Table.Cell>
        <Table.Cell>{building["streetName"]}</Table.Cell>
        <Table.Cell>{building["borough"]}</Table.Cell>
        <Table.Cell>{building["bin"]}</Table.Cell>
         <Table.Cell>
          <Icon name="ellipsis horizontal" onClick={() => this.handleClick(buildingId)} />
            <Icon name="delete" onClick={() => this.openModal()} />
          <Modal open={this.state.modalOpen} size="tiny">
            <Header icon="warning" content="Delete Building" />
            <Modal.Content>
              <p>Are you sure you want to delete this building?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => this.closeModal()}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={() => this.handleDelete(buildingId)}
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

export default BuildingListItem;
