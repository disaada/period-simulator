import React from "react";
import { Box, Typography } from "@mui/material";
import { Calendar } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Controller } from "react-hook-form";

const calendarWrapper = {
  textAlign: "center",
  width: "fit-content",
  marginBottom: 5,
};

const weekDays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

const CalendarField = ({ title, control, name, ...props }) => {
  return (
    <Box sx={calendarWrapper}>
      <Typography variant="h6" gutterBottom component="div">
        {title}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Calendar
            multiple
            format="DD MMM YYYY"
            sort
            plugins={[<DatePanel sort="date" />]}
            weekStartDayIndex={1}
            weekDays={weekDays}
            {...field}
            {...props}
          />
        )}
      />
    </Box>
  );
};

export default CalendarField;
