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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import customSelectStyle from "./../../assets/jss/material-dashboard-pro-react/components/customSelectStyle.jsx";


function CustomSelect({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    value,
    name,
    required,
    onChange,
    onBlur,
    className,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    helpText,
    options,
    selectValue,
    menuProps,
    classesList,
    variant,
    multiple,
    autoWidth,
    onClick,
    color
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
  const selectClasses = classNames({
    [classes.select]: true,
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

  var menu = classNames({
    [classes.menuItem]: true
  })

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
      <Select
        classes={{
          select: selectClasses,
          root: marginTop,
          disabled: classes.disabled 
        //  outlined: underlineClasses
        }}
        className={{
          underline: underlineClasses        
        }}
        MenuProps ={menuProps}
        id={id}
        name={name}
        {...inputProps}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className}
        required={required}
        variant={variant}
        multiple={multiple}
        autoWidth={autoWidth}
        error={error}
        success={success}
        onClick={onClick}
      >
      <MenuItem value="" classes={classesList} selected> -- </MenuItem>;
       
        {options.map(function (item, key) { 
          if (selectValue === item.value) {
            return <MenuItem key={key} classes={classesList} className={menu} selected value={
              item.value
            } > {
                item.label
              } </MenuItem>;
          } else {
            return <MenuItem key={key} classes={classesList} className={menu} value={
              item.value
            } > {
                item.label
              } </MenuItem>;
          }

        })}

      </Select>
      {helpText !== undefined ? (
        <FormHelperText id={id + "-text"} className={helpTextClasses}>
          {helpText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  // type: PropTypes.string,
  value: PropTypes.any,
  required: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
 // white: PropTypes.bool,
  helpText: PropTypes.node,
  options: PropTypes.array,
  autoWidth: PropTypes.bool,
  variant: PropTypes.string,
  multiple: PropTypes.bool,
  onClick: PropTypes.func,
  selectValue: PropTypes.string || PropTypes.number
};

export default withStyles(customSelectStyle)(CustomSelect);



// WEBPACK FOOTER //
// ./src/components/CustomInput/CustomInput.jsx