import React, { useState } from "react";
import { Box } from "@mui/material";
import { createUseStyles } from "react-jss";
import { CalendarField, SelectField, ResultCard } from "@components";
import { DateObject } from "react-multi-date-picker";
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
  gridTemplateColumns: "auto auto",
  gridColumnGap: 40,
};

const resultWrapper = {
  padding: 5,
};

const Home = () => {
  const classes = useStyles();
  // const [type, setType] = useState("pemula");
  const [open, setOpen] = useState(false);
  const defaultValues = {
    firstHaidh: [new Date()],
    secondHaidh: [new Date().setMonth(new Date().getMonth() + 1)],
    thirdHaidh: [new Date().setMonth(new Date().getMonth() + 2)],
    type: 'pemula'
  };
  const { control } = useForm({ defaultValues: defaultValues });
  const watch = useWatch({control})

  console.log(watch.type);
  /* const [calendarOne, onChangeOne] = useState();
  const [calendarTwo, onChangeTwo] = useState();
  const [calendarThree, onChangeThree] = useState(); */

  const handleFirstCalendar = (dates) => {
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "stretch" }}>
      <Box sx={inputWrapper}>
        <SelectField title="Tipe Haidh" name="type" control={control} />
        <Box sx={calendarWrapper}>
          <CalendarField
            className={`green ${classes.calendarOne}`}
            title="Haidh Pertama"
            name="firstHaidh"
            control={control}
          />
          <CalendarField
            className={`green ${classes.calendarTwo}`}
            title="Haidh Kedua"
            name="secondHaidh"
            control={control}
          />
          <CalendarField
            className={`green ${classes.calendarThree}`}
            title="Haidh Ketiga"
            name="thirdHaidh"
            control={control}
          />
        </Box>
      </Box>
      <Box sx={resultWrapper}>
        Hasil :
        <ResultCard color="#E1F196" title="Haidh Pertama" />
      </Box>
    </Box>
  );
};

export default Home;
