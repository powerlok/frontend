import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { alertActions } from '../../_actions';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";
//import badgeStyle from "assets/jss/material-dashboard-pro-react/components/badgeStyle.jsx";
import { history } from '../../_helpers';

function Alert({ ...props }) {
  const { alert, dispatch } = props;

  
history.listen((location, action) => {
    // clear alert on location change
    dispatch(alertActions.clear());
});
  
  return (
    <Snackbar
      place="tc"
      color= {alert.type}
      icon={AddAlert}
      message= {alert.message}
      open={this.state.tc}
      closeNotification={() => this.setState({ tc: false })}
      close
    />
  );
}

Alert.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles()(Alert);



// WEBPACK FOOTER //
// ./src/components/Badge/Badge.jsx