import React, { Component } from "react";
import { Icon, Modal, Header, Button} from "semantic-ui-react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
      <TableRow>
        <TableCell>{filing["DOBNumber"]}</TableCell>
        <TableCell>{filing["project"]}</TableCell>
        <TableCell>{filing["created"]}</TableCell>
        <TableCell>{filing["applicant"]}</TableCell>
        <TableCell>{filing["filingRep"]}</TableCell>
                <TableCell>{filing["efiled"]}</TableCell>
        <TableCell>{filing["description"]}</TableCell>
         <TableCell>
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
        </TableCell>
      </TableRow>
    );
  }
}

export default FilingListItem;
