import Dashboard from '../layouts/Dashboard/Dashboard.jsx';
//import Login from "../layouts/Login/Login.jsx";
import Pages from '../layouts/Pages.jsx'; //'./layouts/Pages.jsx';

const indexRoutes = [
  { path: '/admin', component: Dashboard },
  { path: '/', component: Pages }
];

export default indexRoutes;
