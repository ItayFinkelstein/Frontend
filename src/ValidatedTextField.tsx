import React from "react";
import TextField from "@mui/material/TextField";
import { FieldError, UseFormRegister } from "react-hook-form";

interface ValidatedTextFieldProps {
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  label?: string;
  fullWidth?: boolean;
  defaultValue?: string;
}

const ValidatedTextField: React.FC<ValidatedTextFieldProps> = (
  props: ValidatedTextFieldProps
) => {
  const label = props.label
    ? props.label
    : props.name.charAt(0).toUpperCase() + props.name.slice(1);
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth={props.fullWidth !== false}
      margin="normal"
      {...props.register(props.name)}
      error={!!props.error}
      helperText={props.error?.message}
      defaultValue={props.defaultValue}
    />
  );
};

export default ValidatedTextField;
