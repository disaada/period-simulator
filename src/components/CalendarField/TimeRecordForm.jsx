/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";

const radioWrapper = {
  "& .MuiFormControlLabel-label": {
    fontSize: 14,
  },
};

const InputField = ({ setValue, name, value, dateName }) => {
  const selectAttrb = value?.filter(val => val.code === dateName)
  const val = value ? selectAttrb[0].time : 24;
  const index = value?.indexOf(selectAttrb[0])
  return (
    <TextField
      label="Masukkan Jumlah Jam"
      variant="outlined"
      size="small"
      value={val && val !== 24 ? val : ""}
      onChange={(evt) => {
        const attr = [ ...value ];
        attr[index]["time"] = parseInt(evt.target.value || 0);
        setValue(`${name}Attributes`, attr);
      }}
    />
  );
};

const TimeRecordForm = ({ control, state, setValue, name, getValues }) => {
  const { focused, selectedDate } = state;
  const activeDate = focused || selectedDate[0];
  const dateName = activeDate?.format("DDMMYY");
  const attributes = getValues(`${name}Attributes`) || [];

  useEffect(() => {
    const selectAttrb = attributes?.filter(val => val.code === dateName)
    if (dateName && selectAttrb.length === 0) {
      const attr = [ ...attributes ];
      attr.push({
        time: 24,
        color: "hitam",
        date: activeDate,
        code: dateName
      });
      setValue(`${name}Attributes`, attr);
    }
  }, [activeDate]);

  return (
    <Box sx={{ marginTop: 2 }}>
      {activeDate && (
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 1.5 }}>
            Durasi Keluar{" "}
            {activeDate && `(${activeDate.format("DD MMM YYYY")})`}
          </FormLabel>
          <Controller
            name={`${name}Attributes`}
            control={control}
            render={({ field: { value, onChange, ...rest } }) => {
              const selectAttrb = attributes?.filter(val => val.code === dateName)
              const val = value ? selectAttrb[0]?.time : 24;
              const index = attributes?.indexOf(selectAttrb[0])
              return (
                <Fragment>
                  {val !== undefined && (
                    <RadioGroup
                      row
                      value={val}
                      onChange={(evt) => {
                        const attr = [ ...value ];
                        attr[index]["time"] = parseInt(evt.target.value || 0);
                        setValue(`${name}Attributes`, attr);
                      }}
                      {...rest}
                    >
                      <FormControlLabel
                        sx={radioWrapper}
                        value={24}
                        control={<Radio />}
                        label="24 Jam"
                      />
                      <FormControlLabel
                        sx={radioWrapper}
                        value={val !== 24 ? val : 0}
                        control={<Radio />}
                        label={
                          <InputField
                            setValue={setValue}
                            value={value}
                            dateName={dateName}
                            name={`${name}Attributes`}
                          />
                        }
                      />
                    </RadioGroup>
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

export default TimeRecordForm;
