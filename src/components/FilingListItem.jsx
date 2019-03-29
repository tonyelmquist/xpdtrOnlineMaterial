import React, { Component } from "react";
import { Table, Icon, Modal, Header, Button} from "semantic-ui-react";

class FilingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  handleClick = filingId => {
    const { history } = this.props;
    history.push(`/FilingDetail/${filingId}`);
  };

  handleDelete = filingId => {
    this.props.handleDelete(filingId);
    this.setState({ modalOpen: false });
  };

  openModal =()  => {
    this.setState({ modalOpen: true });
  };

   closeModal =()  => {
    this.setState({ modalOpen: false });
  };
  render() {
    const { filingId, filing } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{filing["DOBNumber"]}</Table.Cell>
        <Table.Cell>{filing["project"]}</Table.Cell>
        <Table.Cell>{filing["created"]}</Table.Cell>
        <Table.Cell>{filing["applicant"]}</Table.Cell>
        <Table.Cell>{filing["filingRep"]}</Table.Cell>
                <Table.Cell>{filing["efiled"]}</Table.Cell>
        <Table.Cell>{filing["description"]}</Table.Cell>
         <Table.Cell>
          <Icon name="ellipsis horizontal" onClick={() => this.handleClick(filingId)} />
            <Icon name="delete" onClick={() => this.openModal()} />
          <Modal open={this.state.modalOpen} size="tiny">
            <Header icon="warning" content="Delete Filing" />
            <Modal.Content>
              <p>Are you sure you want to delete this filing?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => this.closeModal()}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={() => this.handleDelete(filingId)}
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

export default FilingListItem;
