/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { createUseStyles } from "react-jss";
import { CalendarField, SelectField, ResultCard } from "@components";
import "react-multi-date-picker/styles/colors/green.css";
import { useForm, useWatch } from "react-hook-form";

const useStyles = createUseStyles({
  calendarOne: {
    borderColor: "#E1F196",
  },
  calendarTwo: {
    borderColor: "#61BB8B",
  },
  calendarThree: {
    borderColor: "#25575B",
  },
});

const inputWrapper = {
  padding: 5,
  paddingLeft: 20,
};

const calendarWrapper = {
  width: "fit-content",
  display: "grid",
  gridTemplateColumns: "auto",
  gridColumnGap: 40,
};

const resultWrapper = {
  padding: 5,
  paddingTop: 17,
};

const Home = () => {
  const classes = useStyles();
  const [haidhPattern, setHaidhPattern] = useState([]);
  const first = new Date();
  const second = new Date().setMonth(new Date().getMonth() + 1);
  const third = new Date().setMonth(new Date().getMonth() + 2);
  const defaultValues = {
    firstHaidh: [first],
    secondHaidh: [second],
    thirdHaidh: [third],
    type: "pemula",
    cycle: ''
  };
  const { control, setValue, getValues } = useForm({
    defaultValues: defaultValues,
  });
  const watch = useWatch({ control });

  useEffect(() => {
    if (haidhPattern.length === 0) setHaidhPattern([watch.cycle])
  }, [watch.cycle])

  return (
    <Box sx={{ display: "flex", alignItems: "stretch" }}>
      <Box sx={inputWrapper}>
        <SelectField title="Tipe Haidh" name="type" control={control} getValues={getValues} />
        <Box sx={calendarWrapper}>
          <CalendarField
            className={`green ${classes.calendarOne}`}
            title="Haidh Pertama"
            name="firstHaidh"
            control={control}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            initialValues={first}
          />
          <CalendarField
            className={`green ${classes.calendarTwo}`}
            title="Haidh Kedua"
            name="secondHaidh"
            control={control}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            initialValues={second}
          />
          <CalendarField
            className={`green ${classes.calendarThree}`}
            title="Haidh Ketiga"
            name="thirdHaidh"
            control={control}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            initialValues={third}
          />
        </Box>
      </Box>
      <Box sx={resultWrapper}>
        Hasil :
        <ResultCard
          bgColor="#E1F196"
          title="Haidh Pertama"
          getValues={getValues}
          name="firstHaidh"
          setHaidhPattern={setHaidhPattern}
        />
        <ResultCard
          bgColor="#61BB8B"
          color="#ffffff"
          title="Haidh Kedua"
          getValues={getValues}
          name="secondHaidh"
          previousDate={watch.firstHaidh}
        />
        <ResultCard
          bgColor="#25575B"
          color="#ffffff"
          title="Haidh Ketiga"
          getValues={getValues}
          name="thirdHaidh"
          previousDate={watch.secondHaidh}
        />
      </Box>
    </Box>
  );
};

export default Home;
