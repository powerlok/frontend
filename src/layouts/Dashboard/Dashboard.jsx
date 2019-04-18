import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import compose from "recompose/compose";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import AddAlert from "@material-ui/icons/AddAlert";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "./../../components/Header/Header.jsx";
import Footer from "./../../components/Footer/Footer.jsx";
import Sidebar from "./../../components/Sidebar/Sidebar.jsx";
//import FixedPlugin from "./../../components/FixedPlugin/FixedPlugin.jsx";

import Router from "./../../routes/dashboard";

import appStyle from "./../../assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "./../../assets/img/sidebar-2.jpg";
import logoWhite from "./../../assets/img/logo-white.svg";
import logoBlue from "./../../assets/img/logo.svg";
import { PrivateRoute } from "./../../_components";

import Snackbar from "./../../components/Snackbar/Snackbar.jsx";
import { alertActions } from "./../../_actions/alert.actions";
import { userActions } from "../../_actions/user.actions";

var switchRoutes = (dashboardRoutes, props) => (
  <Switch>
    {dashboardRoutes &&
      dashboardRoutes.map((prop, key) => {
        //let token = JSON.parse(localStorage.getItem("user")).token;
        //if(token)  props.dispatch(userActions.verifyToken(token));

        if (prop.redirect)
          return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
        if (prop.collapse)
          return prop.views.map((prop, key) => {
            return (
              <PrivateRoute
                path={prop.path}
                component={prop.component}
                key={key}
              />
            );
          });
        return (
          <PrivateRoute path={prop.path} component={prop.component} key={key} />
        );
      })}
  </Switch>
);

var removerID = function(itens, name) {
  return itens.filter(item => !name.includes(item.name));
};

//var ps;
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 3000,
      mobileOpen: false,
      miniActive: false,
      image: image,
      color: "blue",
      bgColor: "black",
      hasImage: true,
      fixedClasses: "dropdown show",
      dashboardRoutes: this.switchUser(Router)
      // type: ''
    };

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleBgColorClick = this.handleBgColorClick.bind(this);
    this.handleFixedClick = this.handleFixedClick.bind(this);
    this.resizeFunction = this.resizeFunction.bind(this);
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);

    this.props.dispatch(alertActions.clear());

  }

  switchUser = function(m) {
    var v = [];
    if (this.props.authentication.user !== undefined) {
      if (this.props.authentication.user.basico === 0) {
        v.push("Dashboard", "Cadastros", "Financeiro");
      }

      if (this.props.authentication.user.trader === 0) {
        v.push("Trader");
      }

      if (this.props.authentication.user.fiscal === 0) {
        v.push("Fiscal");
      }
      
      if (this.props.authentication.user.administrador === 0) {
        v.push("Administrador");
      }

      return removerID(m, v);
    }
  };

  handleClose = (event, reason) => {
    /*if (reason === 'clickaway') {
      return;
    }*/
    //setTimeout(() => {
    this.props.dispatch(alertActions.clear());
    //},3000);
  };

  handleImageClick(image) {
    this.setState({ image: image });
  }

  handleColorClick(color) {
    this.setState({ color: color });
  }

  handleBgColorClick(bgColor) {
    this.setState({ bgColor: bgColor });
  }

  handleFixedClick() {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  componentDidMount() {
    /* if (navigator.platform.indexOf('Win') > -1) {
       ps = new PerfectScrollbar(this.refs.mainPanel, {
         suppressScrollX: true,
         suppressScrollY: false
       });
       document.body.style.overflow = 'hidden';
     }*/
    window.addEventListener("resize", this.resizeFunction);
  }

  componentWillUnmount() {
    // this.setState({ dashboardRoutes : Router });
    /* if (navigator.platform.indexOf('Win') > -1) {
       ps.destroy();
     }*/
    window.removeEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  /*componentWillReceiveProps(nextProps) { 
    if (nextProps.alert !== this.props.alert) { console.log(nextProps);
      if(nextProps.alert.error == "Token expirou"){
        
      }
    }
  }*/

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }

  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  render() {
    const { classes, alert, ...rest } = this.props;
  
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div className={classes.wrapper}>
        {this.props.authentication && (
          <Sidebar
            routes={this.state.dashboardRoutes}
            logoText={"Orçamento"}
            logo={this.state.bgColor === "white" ? logoBlue : logoWhite}
            image={this.state.image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color={this.state.color}
            bgColor={this.state.bgColor}
            miniActive={this.state.miniActive}
            {...rest}
          />
        )}
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={this.state.dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />

          {alert && alert.type && (
            <Snackbar
              place="tc"
              color={alert.type}
              icon={AddAlert}
              message={alert.message || ""}
              open={alert.open}
              onClose={this.handleClose}
              autoHideDuration={this.state.autoHideDuration}
              close
            />
          )}
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>
                {switchRoutes(this.state.dashboardRoutes, this.props)}
              </div>
            </div>
          ) : (
            <div className={classes.map}>
              {switchRoutes(this.state.dashboardRoutes, this.props)}
            </div>
          )}
          {this.getRoute() ? <Footer fluid /> : null}
          {/* {
             <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleBgColorClick={this.handleBgColorClick}
            handleHasImage={this.handleHasImage}
            color={this.state["color"]}
            bgColor={this.state["bgColor"]}
            bgImage={this.state["image"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
          />} */}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { alert: state.alert, authentication: state.authentication.user };
};

export default compose(
  connect(mapStateToProps),
  withStyles(appStyle)
)(Dashboard);
//export default withStyles(appStyle)(Dashboard);

// WEBPACK FOOTER //
// ./src/layouts/Dashboard.jsx
