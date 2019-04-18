// ##############################
// // // RegisterPage view styles
// #############################

import {
  container,
  cardTitle,
  boxShadow
} from "./../../material-dashboard-pro-react.jsx";

import customCheckboxRadioSwitch from "./../customCheckboxRadioSwitch.jsx";

const registerPageStyle = {
  ...customCheckboxRadioSwitch,
  cardFoto: {
    margin: "0 auto",
    ...boxShadow
  },
  cardImage: {
    width: "100%"
  },
  cardTitle: {
    ...cardTitle,
    textAlign: "center"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  container: {
    ...container,
    position: "relative",
    zIndex: "3"
    // paddingTop: "23vh"
  },
  cardSignup: {
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    marginBottom: "70px",
    padding: "5px 0px",
  //  marginTop: "15vh"
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  form: {
    padding: "0 20px",
    position: "relative"
  },
  socialTitle: {
    fontSize: "18px"
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  customFormControlClasses: {
    margin: "0 12px"
  },
  checkboxLabelControl: {
    margin: "0"
  },
  checkboxLabel: {
    marginLeft: "6px",
    color: "rgba(0, 0, 0, 0.26)"
  }
};

export default registerPageStyle;



// WEBPACK FOOTER //
// ./src/assets/jss/material-dashboard-pro-react/views/registerPageStyle.jsx