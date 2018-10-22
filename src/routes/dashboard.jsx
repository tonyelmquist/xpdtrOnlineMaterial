// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/table",
    sidebarName: "Projects",
    navbarName: "Projects",
    icon: "content_paste",
    component: TableList
  },
  {
    path: "/typography",
    sidebarName: "Buildings",
    navbarName: "Buildings",
    icon: "location_city",
    component: Typography
  },
  {
    path: "/icons",
    sidebarName: "Filings",
    navbarName: "Filings",
    icon: "ballot",
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "Violations",
    navbarName: "Violations",
    icon: "warning",
    component: Maps
  },
  {
    path: "/tasks",
    sidebarName: "Tasks",
    navbarName: "Tasks",
    icon: "assignment_turned_in",
    component: NotificationsPage
  },
  {
    path: "/notifications",
    sidebarName: "Contacts",
    navbarName: "Contacts",
    icon: "people",
    component: NotificationsPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },

  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
