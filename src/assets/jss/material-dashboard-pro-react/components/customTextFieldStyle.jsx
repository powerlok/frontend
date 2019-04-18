import {
  primaryColor,
  dangerColor,
  successColor,
  defaultFont
} from "../../material-dashboard-pro-react.jsx";

const customInputStyle = {  
  formHelperText: {
    marginTop: "0px !important"
  },
  disabled: {
    "&:before": {
      borderColor: "transparent !important"
    }
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: "#D2D2D2 !important",
      borderWidth: "1px !important"
    },
    "&:after": {
      borderColor: primaryColor
    }
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor
    }
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor
    }
  },
  colorline: {
    "&:after": {
    borderColor: dangerColor
    }
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "1.42857",
    top: "0px",
    "& + $underline": {
      marginTop: "16px"
    }
  },
  labelRootError: {
    color: dangerColor + " !important"
  },
  labelRootSuccess: {
    color: successColor + " !important"
  },
  formControl: {
    margin: "0px -1px 0 !important",
    paddingTop: "0",
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057"
    }
  },
  whiteUnderline: {
    "&:hover:not($disabled):before,&:before": {
      backgroundColor: "#FFFFFF"
    },
    "&:after": {
      backgroundColor: "#FFFFFF"
    }
  },
  textField: {
    color: "#495057",
    "&,&::placeholder": {
      fontSize: "12px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1"
    },
    "&::placeholder": {
      color: "#AAAAAA"
    }
  },
  whiteInput: {
    "&,&::placeholder": {
      color: "#FFFFFF",
      opacity: "1"
    }
  }
};

export default customInputStyle;



// WEBPACK FOOTER //
// ./src/assets/jss/material-dashboard-pro-react/components/customInputStyle.jsx