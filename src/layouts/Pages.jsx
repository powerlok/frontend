import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import PagesHeader from '../components/Header/PagesHeader.jsx';
import Footer from '../components/Footer/Footer.jsx';

import pagesRoutes from '../routes/pages.jsx';

import pagesStyle from '../assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx';

import bgImage from '../assets/img/register.jpeg';

import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Snackbar from "../components/Snackbar/Snackbar.jsx";
import { alertActions } from "../_actions/alert.actions"
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'

class Pages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoHideDuration: 6000,
      open: false,
      loading: false
    };
  }

  componentDidMount() {
    document.body.style.overflow = 'unset';
    document.body.style.zoom = "100%";
  }

  handleClick = () => {
    this.setState({ open: true });
  };

  componentWillReceiveProps(proxProps) {   
    if (proxProps.alert.message != null && proxProps.alert.message != '') {
      this.handleClick();
    }
    
    if (proxProps.authentication.loading !== this.props.authentication.loading) {
       this.setState({loading: proxProps.authentication.loading});
    }
  }

  handleClose = (event, reason) => {
   /*if (reason === 'clickaway') {
      return;
    }*/

    this.setState({ open: false });
  };

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false }, () => {
        window.setTimeout(() => { this.props.dispatch(alertActions.clear()) }, 1);
      });
    }
  }
  
  render() {
    const { classes, alert, ...rest } = this.props;
    
    return (
      <div>
        {/* <PagesHeader {...rest} /> */}
        <div className={classes.wrapper} ref="wrapper">
          <div
            className={classes.fullPage}
            style={{ backgroundImage: 'url(' + bgImage + ')' }}
          >
           <Loading
              show={this.state.loading}
              color="red"
             // change={false}
              showSpinner={false}
            />
            <Snackbar
              place="tc"
              color={alert.type}
              icon={AddAlert}
              message={alert.message || ''}
              open={this.state.open}
              onClose={this.handleClose}
              autoHideDuration={this.state.autoHideDuration}
              close
            />
            <Switch>
              {pagesRoutes.map((prop, key) => {
                if (prop.collapse) {
                  return null;
                }
                if (prop.redirect) {
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                }
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
            <Footer white />
          </div>
        </div>
      </div>
    );
  }
}

Pages.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { alert: state.alert, authentication: state.authentication }
}


export default compose(
  connect(mapStateToProps),
  withStyles(pagesStyle))
  (Pages);


// WEBPACK FOOTER //
// ./src/layouts/Pages.jsx