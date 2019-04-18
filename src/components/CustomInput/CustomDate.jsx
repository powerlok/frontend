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
import Datetime from "react-datetime";

import customDateStyle from "../../assets/jss/material-dashboard-pro-react/components/customDateStyle.jsx";

function CustomDate({ ...props }) {
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
    dateFormat,
    timeFormat,
    locale
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
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
    [classes.labelRootSuccess]: success && !error
  });
  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Datetime
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        timeFormat={timeFormat}
        dateFormat={dateFormat}
        id={id}
        name={name}
        {...inputProps}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        required={required}
        error={error}
        success={success}
        locale={locale}
      />
      {helpText !== undefined ? (
        <FormHelperText id={id + "-text"} className={helpTextClasses}>
          {helpText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

CustomDate.propTypes = {
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
  dateFormat: PropTypes.string,
  locale: PropTypes.string
};

export default withStyles(customDateStyle)(CustomDate);



// WEBPACK FOOTER //
// ./src/components/CustomInput/CustomDate.jsx