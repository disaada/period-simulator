import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const selectWrapper = {
  marginBottom: 5,
  width: "50%",
};

const SelectField = ({ title, control, name, ...props }) => {
  return (
    <Box sx={selectWrapper}>
      <FormControl fullWidth>
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
    </Box>
  );
};

export default SelectField;
