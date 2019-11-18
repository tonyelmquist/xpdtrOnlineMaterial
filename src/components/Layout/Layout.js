import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Projects from '../../pages/projects/Projects';
import Filings from '../../pages/filings/Filings';
import Buildings from '../../pages/buildings/Buildings';
import Contacts from '../../pages/contacts/Contacts';
import ToDo from '../../pages/todo/ToDo';
import DOB from '../../pages/dob/DOB';

// context
import { useLayoutState } from "../../context/LayoutContext";


function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/home" component={Dashboard} />
              <Route path="/app/projects" component={Projects} />
              <Route path="/app/buildings" component={Buildings} />
              <Route path="/app/todo" component={ToDo} />
              <Route path="/app/forms" component={Filings} />
              <Route path="/app/contacts" component={Contacts} />
              <Route path="/app/notifications" component={Notifications} />
              <Route path="/app/dob" component={DOB} />
              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
              <Route path="/app/ui/maps" component={Maps} />
              <Route path="/app/ui/icons" component={Icons} />
              <Route path="/app/ui/charts" component={Charts} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
