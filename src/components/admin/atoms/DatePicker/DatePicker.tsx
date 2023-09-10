import { SxProps, TextFieldVariants, Theme } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { ReactNode } from 'react';

interface DatePickerProps {
  value?: any;
  error?: boolean | undefined;
  helperText?: ReactNode;
  format?: string;
  variant?: TextFieldVariants;
  fullWidth?: boolean;
  sx: SxProps<Theme>;
  onChange?: (value: any) => void | undefined;
}

const DatePicker = ({
  value,
  error,
  helperText,
  format,
  variant,
  onChange,
  fullWidth,
  sx,
}: DatePickerProps) => {
  return (
    <MobileDatePicker
      format={format}
      sx={sx}
      value={value}
      slotProps={{
        textField: {
          fullWidth: fullWidth,
          variant: variant,
          error: error,
          helperText: helperText,
        },
      }}
      onChange={onChange}
    />
  );
};

export default DatePicker;
