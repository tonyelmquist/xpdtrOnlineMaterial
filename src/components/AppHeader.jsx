import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router';
import {  NavLink } from "react-router-dom";
import HamburgerButton from "../components/HamburgerButton";
import {
  Segment,
  Header,
  Button,
  Icon,
  Menu,
  Container,
  Dropdown,
  Checkbox
} from "semantic-ui-react";


const AppHeader = props => (
  <Menu fixed="top" inverted className="app-header">
    <Container>
    <HamburgerButton
                active={props.visible}
                handleClick={props.toggleVisibility}
              />


      <div className="byline">XPDTR - Your paperwork, expedited.</div>
      <Menu.Item as="a">{props.location.pathname.split('/')[1]}</Menu.Item>
      {props.userName ? 
      <Dropdown item simple text={props.userName} className="logout-menu">
        <Dropdown.Menu>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item onClick={props.logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> : null}
    </Container>
  </Menu>
);

AppHeader.defaultProps = {};

AppHeader.propTypes = {
};

export default withRouter(AppHeader);
