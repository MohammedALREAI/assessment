import React, { useState } from 'react';
import {FormControl, Stack, styled ,FormLabel} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";


interface MyDatePickerProps {
  label: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  onChange: (date: Date | null) => void;
  value: Date | null;
  direction?: 'row' | 'column'; 
  name:string
  placeholder?:string

}


const DatePickerStyled = styled(DatePicker)({
    '& .MuiFormControl-root': {
      width: '100%',
      height:"40px"
    },
    '& .MuiOutlinedInput-input': {
      padding: '6px',
      height:"40px"
    },
  
  })
  
  
  const MyDatePicker: React.FC<MyDatePickerProps> = ({
    required = false,
    error = false,
    helperText,
    name,
    onChange,
    value,
    placeholder="",
    direction = 'column', 
    label,
...rest

}) => {
  const [internalError, setInternalError] = useState('');

  const handleDateChange = (date: Date | null) => {
    if (required && !date) {
      setInternalError("Date is required");
    } else {
      setInternalError("");
    }

    // Call the parent's onChange handler
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl error={error || !!internalError} fullWidth
           
            >
              <Stack direction={direction}
                display="flex"
              spacing={2} alignItems="flex-start" alignContent="center">
          <FormLabel style={{ minWidth: 180, flexShrink: 0 }}>{label}</FormLabel>
            
          <DatePickerStyled
            label={label}
            value={value}
            name={name}
            format="dd/MM/yyyy"

            
         
            sx={{ width: "100%" , height: "100%"}}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                required: required,
                error: !!error, 
                helperText: helperText,
                placeholder: placeholder,
              },
            }}
        
            {...rest}
          />
        
        </Stack>
      </FormControl>
    </LocalizationProvider>
  );
};

export default MyDatePicker;