import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import FacebookAuth from 'react-facebook-auth';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Button from "../CustomButtons/Button.jsx";
import { userActions } from '../../_actions/user.actions.js';
import GoogleLogin from 'react-google-login';
import { download } from '../../_helpers/utils.js';

const style = theme => ({
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: "#FFFFFF"
    },
    marginLeft: "5px",
    marginRight: "5px",
    cursor: "pointer"
  }
});


function OthersAuth({ ...props }) {
  const { classes, color, key, tipo, round } = props;

  const MyFacebookButton = ({ onClick }) => (

    <Button onClick={onClick} color={(color) ? color : "facebook"} round={round} justIcon className={classes.customButtonClass}>
      <i className={(tipo == "LOGIN") ? "fab fa-facebook-square" : "fab fa-facebook-f"} />
    </Button>
  );

  const MyGoogleButton = ({ onClick }) => (
    <Button onClick={onClick} color={(color) ? color : "google"} round={round} justIcon className={classes.customButtonClass}>
      <i className={(tipo == "LOGIN") ? "fab fa-google" : "fab fa-google"} />
    </Button>
  );

  const authenticateGoogle = (response) => {
    if (response) {
      if (response.profileObj) {
        var email = response.profileObj.email;
        var nome  = response.profileObj.givenName + ' ' + response.profileObj.familyName;
        
        download(response.profileObj.imageUrl,  function(foto) {
          props.dispatch(userActions.loginOthers(JSON.stringify({ email, foto, nome })));
        
          /*if (tipo == "LOGIN") {
            props.dispatch(userActions.loginOthers(JSON.stringify({ email, foto, nome })));
          }
          else {
            getUserSocialInfo(nome, email, foto, "GOOGLE");
          }*/
        });
        
      }
    }
  };

  const authenticateFacebook = (response) => {
    if (response) {
      if (response.email) {
        var email = response.email;
        var nome  = response.name;
        download(response.picture.data.url,  function(foto) { 
          props.dispatch(userActions.loginOthers(JSON.stringify({ email, foto, nome })));
          /*if (tipo == "LOGIN") {
            props.dispatch(userActions.loginOthers(JSON.stringify({ email, foto, nome })));
          }
          else {
            getUserSocialInfo(nome, email, foto, "FACEBOOK");
          }*/
        });
      }
    }
  };

  return (
    <div className="App">
      <FacebookAuth
        appId="188622242070930"
        fields="name,email,picture"
        callback={authenticateFacebook}
        component={MyFacebookButton}
        reAuthenticate={true}
      />{'   '}
      <GoogleLogin
        // clientId="1069694055625-p5r9pmpn8jn3ehqsplokrhmdnm02olim.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
        //1069694055625-ke0dv3k7g7ess0amm81bgau15l2eqb3a.apps.googleusercontent.com
        clientId="1069694055625-mhklr0utt94ua7vkcp2sv3qr4ipjpjuh.apps.googleusercontent.com"
        //clientId="1091165249777-5a450kc7dluap9pdr59dgdc5mn2fs0o5.apps.googleusercontent.com"
        render={MyGoogleButton}
        onSuccess={authenticateGoogle}
        onFailure={authenticateGoogle}
      //autoLoad={true}
      />
    </div>
  );
}

OthersAuth.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  return { alert: state.alert }
}

export default compose(
  connect(mapStateToProps),
  withStyles(style)
)(OthersAuth);