/* eslint-disable */
import React from "react";
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AddAlert from "@material-ui/icons/AddAlert";
import loginRoutes from "./../../routes/login.jsx";

//import loginStyle from "assets/jss/material-dashboard-react/layouts/loginStyle.jsx";
import dashboardStyle from "./../../assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";
import Snackbar from "./../../components/Snackbar/Snackbar.jsx";
import { alertActions } from "./../../_actions/alert.actions";

const switchRoutes = (
  <Switch>
    {loginRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoHideDuration: 3000,
      open: false,
      loading: false
    };
  }  
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  /*handleClick = () => {
    this.setState({ open: true });
  };*/


  handleClose = (event, reason) => {
    /*if (reason === 'clickaway') {
      return;
    }*/
    //setTimeout(() => {
      this.props.dispatch(alertActions.clear());
   // },3000);
  };
  
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
     
      this.setState({ open: false }, () => {
        window.setTimeout(() => {this.props.dispatch(alertActions.clear())},2);
      });
    }

  }
  
render() {
    const { classes, alert, ...rest } = this.props;
    
    return (
      <div className={classes.wrapper}> 
      <Snackbar
            place="tc"
            color={alert.type}
            icon={AddAlert}
            message={alert.message || ''}
            open={alert.open}
            onClose={this.handleClose}
            autoHideDuration={this.state.autoHideDuration}
            close
          />
         {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { alert: state.alert, 
    authentication: state.authentication   }
}


export default compose(
  connect(mapStateToProps),
  withStyles(dashboardStyle))
  (App);