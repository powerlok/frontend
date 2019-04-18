import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from '@material-ui/core/TextField';
import customTextFieldStyle from "./../../assets/jss/material-dashboard-pro-react/components/customTextFieldStyle.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import MomentUtils from "@date-io/moment";// choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "material-ui-pickers";
import moment from "moment";

import "moment/locale/pt-br";

moment.locale("pt-br");


function CustomTextField({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    type,
    value,
    name,
    rows,
    required,
    onChange,
    className,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    helpText,
    onBlur,
    defaultValue,
    color
  } = props;

  
var setFechaDesde = (x,event) => {
  //console.log(JSON.stringify(event));
  console.log(moment(x).format('YYYY-MM-DD'));   
  
  return {
     target: {
        name: name,
        value: moment(x).format('YYYY-MM-DD'),
        id: id
      }
    }
}
  
  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,

    [" " + classes.labelRootError]: color,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.textField]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  var helpTextClasses = classNames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error,
    [classes.formHelperText]: true
  });

  const valueLocal = value && type.toUpperCase() === "DATE" ? value : null;
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
  
      {type.toUpperCase() === "DATE" ? (
    
	   
        <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
           <DatePicker 
             id={id}
             label={labelText}
             value={valueLocal}  
             onChange={(x, event) => onChange(setFechaDesde(x,event)) } 
            // onClose={(x, event) => onBlur(setFechaDesde(x,event))} 
             className={className}
             name={name} 
             autoOk
             //clearable
             format="DD/MM/YYYY"
             views={["year", "month", "day"]}
           //  error={error}     
             //onFocus={this.props.onFocus}        
             //={success}
             mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
             InputLabelProps={{
              shrink: true,
              className: classes.labelRoot + " " + labelClasses
            }}
             InputProps={{
              classes: {
                root: marginTop,
                input: inputClasses,
                disabled: classes.disabled,
                underline: underlineClasses
              }
            }}/>
        </MuiPickersUtilsProvider>)
        :
          (<TextField
            id={id}
            label={labelText}
            name={name}
            {...inputProps}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={className}
            required={required}
            error={error}
            rows={rows}
            success={success}
            InputLabelProps={{
              shrink: true,
              className: classes.labelRoot + " " + labelClasses
            }}
            InputProps={{
              classes: {
                root: marginTop,
                input: inputClasses,
                disabled: classes.disabled,
                underline: underlineClasses
              },
            }}
          />)
          }
      
      {helpText !== undefined ? (
        <FormHelperText id={id + "-text"} className={helpTextClasses}>
          {helpText}
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}

CustomTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helpText: PropTypes.node,
  onBlur: PropTypes.func,
  defaultValue: PropTypes.string
};

export default withStyles(customTextFieldStyle)(CustomTextField);



// WEBPACK FOOTER //
// ./src/components/CustomInput/CustomInput.jsx