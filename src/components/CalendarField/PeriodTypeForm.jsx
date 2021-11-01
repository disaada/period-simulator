/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

const PeriodTypeForm = ({ control, state, setValue, name, getValues }) => {
  const { focused, selectedDate } = state;
  const activeDate = focused || selectedDate[0];
  const dateName = activeDate?.format("DDMMYY");
  const attributes = getValues(`${name}Attributes`) || [];

  return (
    <Box sx={{ marginTop: 2 }}>
      {activeDate && (
        <FormControl fullWidth size="small">
          <InputLabel>Warna Darah</InputLabel>
          <Controller
            name={`${name}Attributes`}
            control={control}
            render={({ field: { value, onChange, ...rest } }) => {
              const selectAttrb = attributes?.filter(val => val.code === dateName)
              const val = value ? selectAttrb[0]?.color : "hitam";
              const index = attributes?.indexOf(selectAttrb[0])
              return (
                <Fragment>
                  {val !== undefined && (
                    <Select
                      value={val}
                      label="Warna Darah"
                      onChange={(evt) => {
                        const attr = [ ...value ];
                        attr[index]["color"] = evt.target.value;
                        setValue(`${name}Attributes`, attr);
                      }}
                      {...rest}
                    >
                      <MenuItem value="hitam">Hitam</MenuItem>
                      <MenuItem value="merah">Merah</MenuItem>
                      <MenuItem value="kuning kemerahan">
                        Kuning Kemerahan
                      </MenuItem>
                      <MenuItem value="kuning">Kuning</MenuItem>
                      <MenuItem value="keruh">Keruh</MenuItem>
                    </Select>
                  )}
                </Fragment>
              );
            }}
          />
        </FormControl>
      )}
    </Box>
  );
};

export default PeriodTypeForm;
