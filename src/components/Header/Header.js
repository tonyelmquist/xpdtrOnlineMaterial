import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useFirestoreConnect,
  isLoaded,
  isEmpty,
  useFirestore,
} from "react-redux-firebase";

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Fab,
  Chip,
} from "@material-ui/core";

import FaceIcon from "@material-ui/icons/Face";
import {
  Menu as MenuIcon,
  MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
  FolderOpen,
  ContactPhone as PeopleIcon,
  LibraryBooks as FormsIcon,
  Home as HomeIcon,
  QuestionAnswer as SupportIcon,
  Settings,
  Business as BuildingIcon,
  PlaylistAddCheck as TaskIcon,
  LocationCity as DOB,
  Help as HelpIcon,
  Group as GroupIcon,
} from "@material-ui/icons";

import queryString from "query-string";

import classNames from "classnames";
import x from "../../images/x.svg";
import p from "../../images/p.svg";
import d from "../../images/d.svg";
import t from "../../images/t.svg";
import r from "../../images/r.svg";

import firebase from "firebase";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
  clearBuilding,
  clearContact,
  clearProject,
} from "../../context/LayoutContext";

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
      // An error happened
    });
};

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  var layoutDispatch = useLayoutDispatch();

  const { currentBuilding, currentContact, currentProject } = useLayoutState();

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);

  const { displayName, email } = firebase.auth().currentUser;

  const location = useLocation();
  const history = useHistory();

  const onDeleteParam = (paramToDelete) => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.delete(paramToDelete);
    history.replace({
      search: queryParams.toString(),
    });
  };

  const buildings = useSelector((store) => store.firestore.ordered.buildings);

  const buildingName =
    buildings && buildings.find((building) => building.id === currentBuilding);

  const buildingCustomerReference =
    buildingName && buildingName.customerReference;

  const contacts = useSelector((store) => store.firestore.ordered.contacts);

  const contactName =
    contacts && contacts.find((contact) => contact.id === currentContact);

  const contactFullName = contactName && contactName.fullName;

  const projects = useSelector((store) => store.firestore.ordered.projects);

  const projectName =
    projects && projects.find((project) => project.id === currentProject);

  const projectFullName = projectName && projectName.customerReference;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <IconButton>
          <img src={x} style={{ width: "40px", height: "40px" }} />
          <img src={p} style={{ width: "40px", height: "40px" }} />
          <img src={d} style={{ width: "40px", height: "40px" }} />
          <img src={t} style={{ width: "40px", height: "40px" }} />
          <img src={r} style={{ width: "40px", height: "40px" }} />
        </IconButton>
        {buildingName && (
          <Chip
            icon={<BuildingIcon />}
            label={buildingCustomerReference}
            color="secondary"
            onDelete={() => clearBuilding(layoutDispatch)}
          />
        )}

        {contactName && (
          <Chip
            icon={<PeopleIcon />}
            label={contactFullName}
            color="secondary"
            onDelete={() => clearContact(layoutDispatch)}
          />
        )}
        {projectName && (
          <Chip
            icon={<FolderOpen />}
            label={projectFullName}
            color="secondary"
            onDelete={() => clearProject(layoutDispatch)}
          />
        )}

        <div className={classes.grow} />
        {/*   <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          /> 
        </div>*/}

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
