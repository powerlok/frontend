import PricingPage from './../views/Pages/PricingPage.jsx';
import LoginPage from './../views/Pages/LoginPage.jsx';
import RegisterPage from './../views/Pages/RegisterPage.jsx';
//import LockScreenPage from './../views/Pages/LockScreenPage.jsx';

// @material-ui/icons
import PersonAdd from '@material-ui/icons/PersonAdd';
import Fingerprint from '@material-ui/icons/Fingerprint';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
//import LockOpen from '@material-ui/icons/LockOpen';

const pagesRoutes = [
  {
    path: '/pages/register-page',
    name: 'Register Page',
    short: 'Registrar',
    mini: 'RP',
    icon: PersonAdd,
    component: RegisterPage,
    show: false
  },
  {
    path: '/pages/login-page',
    name: 'Login Page',
    short: 'Acessar',
    mini: 'LP',
    icon: Fingerprint,
    component: LoginPage,
    show: false
  },
  /*{
    path: '/pages/pricing-page',
    name: 'Nossos Preços',
    short: 'Preço',
    mini: 'PP',
    icon: MonetizationOn,
    component: PricingPage,
    show: true
  },*/
  /*{
    path: "/pages/lock-screen-page",
    name: "Lock Screen Page",
    short: "Lock",
    mini: "LSP",
    icon: LockOpen,
    component: LockScreenPage
  },*/
  {
    redirect: true,
    path: '/',
    pathTo: '/pages/login-page',
    name: 'Acessar'
  }
];

export default pagesRoutes;



// WEBPACK FOOTER //
// ./src/routes/pages.jsx