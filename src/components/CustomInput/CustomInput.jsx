import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import customInputStyle from "./../../assets/jss/material-dashboard-pro-react/components/customInputStyle.jsx";

function CustomInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    type,
    value,
    name,
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
    color,
    placeholder,
    endAdornment
  } = props;

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
    [classes.input]: true,
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
    [classes. formHelperText]: true
  });
  return ( 
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined && (type !== "date" || type == null) ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}     
      
      <Input
        classes={{
          root: marginTop,
          input: inputClasses,
          disabled: classes.disabled,
          underline: underlineClasses
        }}   
        id={id}
        name={name}
        {...inputProps}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        required={required}
        error={error}
        success={success}
        placeholder={placeholder}
        endAdornment={endAdornment}
      />
      
      {helpText !== undefined ? (
        <FormHelperText id={id + "-text"} className={helpTextClasses}>
          {helpText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
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

export default withStyles(customInputStyle)(CustomInput);



// WEBPACK FOOTER //
// ./src/components/CustomInput/CustomInput.jsx