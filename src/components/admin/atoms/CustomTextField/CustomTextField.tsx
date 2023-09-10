import {
  FilledInputProps,
  InputProps,
  OutlinedInputProps,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';
import { HTMLInputTypeAttribute, ReactNode } from 'react';

interface CustomTextFieldProps {
  sx?: SxProps<Theme>;
  margin: 'dense' | 'normal' | 'none' | undefined;
  id?: string | undefined;
  label?: ReactNode;
  fullWidth: boolean;
  autoComplete?: string | undefined;
  type: HTMLInputTypeAttribute | undefined;
  error?: boolean;
  helperText?: ReactNode;
  value?: unknown;
  inputProps?:
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | Partial<InputProps>
    | undefined;
}

const CustomTextField = ({
  id,
  sx,
  label,
  fullWidth,
  margin,
  autoComplete,
  error,
  helperText,
  type,
  inputProps,
  value,
  ...props
}: CustomTextFieldProps) => {
  return (
    <TextField
      id={id}
      InputProps={inputProps}
      sx={sx}
      value={value}
      margin={margin}
      label={label}
      type={type}
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      error={error}
      helperText={helperText}
      {...props}
    />
  );
};

export default CustomTextField;
