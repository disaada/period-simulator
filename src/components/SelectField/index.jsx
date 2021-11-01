import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment
} from "@mui/material";
import { Controller } from "react-hook-form";

const selectWrapper = {
  marginBottom: 5,
};

const SelectField = ({ title, control, name, getValues, ...props }) => {
  const type = getValues("type");

  return (
    <Box sx={selectWrapper}>
      <FormControl>
        <InputLabel>{title}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select label={title} {...props} {...field}>
              <MenuItem value="pemula">Pemula</MenuItem>
              <MenuItem value="pengalaman">Pengalaman</MenuItem>
            </Select>
          )}
        />
      </FormControl>
      {type === "pengalaman" && (
        <Controller
          name="cycle"
          control={control}
          render={({ field: { value, ...rest } }) => (
            <TextField
              variant="outlined"
              label="Siklus Haid"
              sx={{ marginLeft: 3 }}
              value={value}
              InputProps={{
                endAdornment: <InputAdornment position="end">hari</InputAdornment>,
              }}
              {...rest}
            />
          )}
        />
      )}
    </Box>
  );
};

export default SelectField;
