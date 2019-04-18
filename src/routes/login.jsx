// @material-ui/icons
//import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
/*import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";*/
// core components/views
import RegisterPage from 'views/Pages/RegisterPage.jsx';

import LoginPage from 'views/Pages/LoginPage.jsx';
/*import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";*/

const loginRoutes = [
  {
    path: '/pages/login-page',
    sidebarName: 'Login',
    navbarName: 'Login',
    component: LoginPage
  },
  {
    path: '/pages/register-page',
    sidebarName: 'Registro',
    navbarName: 'Registro',
    component: RegisterPage
  },
  { redirect: true, path: '/', to: '/pages/login-page', navbarName: 'Redirect' }
];

export default loginRoutes;
