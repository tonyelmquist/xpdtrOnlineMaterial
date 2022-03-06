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
  Button
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

import BuyNow from "./BuyNow"
import Startup from "./Startup";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
  clearBuilding,
  clearContact,
  clearProject,
  setPro,
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

const initPaddle = () => {
  //Init the Paddle after it's loaded from their server.
  //There is no callback or an event so we use intervals to wait until it's loaded.
  //We also must load their script from their servers to get the freshest code.
  let interval = setInterval(() => {
    if (typeof window.Paddle !== "undefined") {
      //Credentials: https://vendors.paddle.com/account
      window.Paddle.Setup({
        vendor: 104757,
        debug: false,
      });
      clearInterval(interval);
    }
  }, 500);
};

const checkout = (email) => {
  window.Paddle.Checkout.open({ product: 576518, email: email });
};

export default function Header(props) {
  var classes = useStyles();

  const { displayName, email } = firebase.auth().currentUser;

  const layoutDispatch = useLayoutDispatch();
  const checkIfPro = (currentUser) => {
    // Send email and PRO_PRODUCT_ID to check.php.
    // check.php must get the list of all users from Paddle, then see if current user is among Pro users.
    const userEmail = currentUser;
    const PRODUCT_ID = 576518; //See this ID in the Paddle dashboard.
    const URL = "https://beta.xpdtr.com/check.php";
    const data = {
      email: userEmail,
      productID: PRODUCT_ID,
    };
    const PARAMS = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
      method: "POST",
    };
    fetch(URL, PARAMS)
      .then((res) => res.text())
      .then((response) => {
        let res = JSON.parse(response);
        console.log(res)
        //PHP script returns an object.
        if (res.isPro === "true") {
          setPro(layoutDispatch);
        } else {
          // It's a free-plan user.
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    initPaddle();
    checkIfPro(email);
  }, []);

  // global
  var layoutState = useLayoutState();

  const { currentBuilding, currentContact, currentProject } = useLayoutState();

   const [buyNowOpen, setByNowOpen] = useState(false);
   const [startupOpen, setStartupOpen] = useState(true);

   const toggleBuyNow = () => {
     setByNowOpen(!buyNowOpen)
   }

    const toggleStartup = () => {
      setStartupOpen(!startupOpen);
    };

  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);

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
            className={"headerChip"}
            onDelete={() => clearBuilding(layoutDispatch)}
          />
        )}

        {contactName && (
          <Chip
            icon={<PeopleIcon />}
            label={contactFullName}
            color="secondary"
            className={"headerChip"}
            onDelete={() => clearContact(layoutDispatch)}
          />
        )}
        {projectName && (
          <Chip
            icon={<FolderOpen />}
            label={projectFullName}
            color="secondary"
            className={"headerChip"}
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
        {!layoutState.isPro && (
          <Button
            size="large"
            color="secondary"
            data-product="576518"
            onClick={() => toggleBuyNow()}
            variant="contained"
          >
            Get a free 14-day trial of XPDTR!
          </Button>
        )}
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {displayName}
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="primary"
              href="https://flatlogic.com"
            >
              {email}
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut()}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
      <BuyNow open={buyNowOpen} toggleBuyNow={toggleBuyNow} email={email} />
      <Startup open={startupOpen} toggleBuyNow={toggleStartup} email={email} />
    </AppBar>
  );
}
