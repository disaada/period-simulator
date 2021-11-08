import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";
import { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Controller } from "react-hook-form";
import TimeRecordForm from "./TimeRecordForm";
import PeriodTypeForm from "./PeriodTypeForm";
import { createUseStyles } from "react-jss";
import Brightness1Icon from "@mui/icons-material/Brightness1";

const useStyles = createUseStyles({
  customBg: { fontWeight: "bold" },
});

const calendarWrapper = {
  textAlign: "center",
  width: "fit-content",
  marginBottom: 5,
};

const weekDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const CalendarField = ({
  title,
  control,
  name,
  setValue,
  getValues,
  initialValues,
  ...props
}) => {
  const classes = useStyles();
  const attributes = getValues(`${name}Attributes`);

  const getColor = (color) => {
    let colorCode = "";
    if (color === "hitam") colorCode = "#160F0F";
    if (color === "merah") colorCode = "#5C170F";
    if (color === "kuning kemerahan") colorCode = "#E34534";
    if (color === "kuning") colorCode = "#F2BF56";
    if (color === "keruh") colorCode = "#F7CB9C";

    return colorCode;
  };

  const formatFunction = ({ format, date }) => {
    const dateName = date?.format("DDMMYY");
    const selectAttrb = attributes?.filter((val) => val.code === dateName);
    const time = attributes ? selectAttrb[0]?.time : 24;
    const color = attributes ? getColor(selectAttrb[0]?.color) : "";

    return (
      <Fragment>
        <Brightness1Icon sx={{ fontSize: 10, color }} /> {format} ({time} jam)
      </Fragment>
    );
  };

  const handleChange = (arr, value, onChange) => {
    const formattedArr = Array.from(arr, (val) => val.format("DDMMYY"));
    const formattedValue = Array.from(value, (val) =>
      new DateObject(val).format("DDMMYY")
    );
    const difference = formattedValue.filter((x) => !formattedArr.includes(x));

    if (difference.length > 0) {
      const attr = [ ...attributes ];
      const selectAttrb = attr.filter((val) => val.code !== difference[0]);
      setValue(`${name}Attributes`, selectAttrb);
    }
    onChange(arr);
  };

  return (
    <Box sx={calendarWrapper}>
      <Typography variant="h6" gutterBottom component="div">
        {title}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...rest } }) => (
          <Calendar
            sort
            multiple
            value={value}
            format="DD MMM YYYY"
            weekStartDayIndex={1}
            weekDays={weekDays}
            mapDays={({ date, isSameDate }) => {
              let props = {};

              if (attributes) {
                const selectAttrb = attributes.filter(
                  (val) => val.code === date.format("DDMMYY")
                );
                const backgroundColor = selectAttrb.length > 0 ? getColor(selectAttrb[0].color) : ""
                props.style = { backgroundColor };
              }

              return props;
            }}
            plugins={[
              <DatePanel
                sort="date"
                formatFunction={formatFunction}
                markFocused
                focusedClassName={classes.customBg}
              />,
              <TimeRecordForm
                state
                name={name}
                control={control}
                position="bottom"
                setValue={setValue}
                getValues={getValues}
              />,
              <PeriodTypeForm
                state
                name={name}
                control={control}
                position="bottom"
                setValue={setValue}
                getValues={getValues}
              />,
            ]}
            onChange={(arr) => {
              handleChange(arr, value, onChange);
            }}
            {...rest}
            {...props}
          />
        )}
      />
    </Box>
  );
};

export default CalendarField;
