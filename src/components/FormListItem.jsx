import React, { Component } from "react";
import { Table, Icon, Modal, Header, Button} from "semantic-ui-react";
import { withRouter } from "react-router";

class FormListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }
  handleClick = formId => {
    const { history } = this.props;
    history.push(`/formDetail/${formId}`);
  };

  handleDelete = formId => {
    this.props.handleDelete(formId);
    this.setState({ modalOpen: false });
  };

  openModal =()  => {
    this.setState({ modalOpen: true });
  };

   closeModal =()  => {
    this.setState({ modalOpen: false });
  };
  render() {
    const { formId, form } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{form["formName"]}</Table.Cell>
        <Table.Cell>{form["created"]}</Table.Cell>
        <Table.Cell>{form["lastEdited"]}</Table.Cell>
        <Table.Cell>{form["notes"]}</Table.Cell>
         <Table.Cell>
          <Icon name="ellipsis horizontal" onClick={() => this.handleClick(formId)} />
            <Icon name="delete" onClick={() => this.openModal()} />
          <Modal open={this.state.modalOpen} size="tiny">
            <Header icon="warning" content="Delete form" />
            <Modal.Content>
              <p>Are you sure you want to delete this form?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => this.closeModal()}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={() => this.handleDelete(formId)}
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

export default withRouter(FormListItem);
