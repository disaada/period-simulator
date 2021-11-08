/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect, Fragment } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { differenceInCalendarDays } from "date-fns";
import { calculateHaidh } from "@lib";
import { DateObject } from "react-multi-date-picker";

const ResultCard = ({
  bgColor,
  title,
  color,
  getValues,
  name,
  previousDate,
  setHaidhPattern,
}) => {
  const [haidh, setHaidh] = useState({});
  const [istihadhah, setIstihadhah] = useState([]);

  const cardWrapper = {
    width: "100%",
    marginTop: 5,
    backgroundColor: bgColor,
    color,
  };

  const type = getValues("type");
  const dateSelected = getValues(name);
  const startDate = dateSelected[0];
  const endDate = dateSelected[dateSelected.length - 1];
  const attributes = getValues(`${name}Attributes`);
  const totalTime = useMemo(
    () =>
      attributes
        ? attributes.reduce((sum, val) => sum + (val?.time || 0), 0)
        : 0,
    [attributes]
  );
  const dateDiff = useMemo(() => {
    return (
      differenceInCalendarDays(
        haidh?.end || new Date(endDate),
        haidh?.start || new Date(startDate)
      ) + 1
    );
  }, [haidh]);

  useEffect(() => {
    const [haidhValue, istihadhahValue] = calculateHaidh(
      totalTime,
      dateSelected,
      startDate,
      endDate,
      attributes,
      name,
      type,
      setHaidhPattern,
      previousDate
    );
    setHaidh(haidhValue);
    setIstihadhah(istihadhahValue);
  }, [dateSelected, attributes, type]);

  return (
    <Card sx={cardWrapper}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 2 }}>
          Durasi Haidh :{" "}
          {totalTime < 24
            ? "kurang dari"
            : totalTime === 24
            ? "pas"
            : "lebih dari"}{" "}
          24 jam
          <br />
          <b>
            HAIDH : {new DateObject(haidh?.start).format("DD MMM YYYY") || "-"}{" "}
            {haidh?.end &&
              dateDiff > 1 &&
              `- ${new DateObject(haidh?.end).format("DD MMM YYYY")}`}{" "}
            ({dateDiff || 0} hari)
          </b>
          <br />
          <b>
            ISTIHADHAH :{" "}
            {(istihadhah.length > 0) && istihadhah.map((val, idx) => (
              <Fragment key={idx}>
                {new DateObject(val?.start).format("DD MMM YYYY")}
                {(+val?.start !== +val?.end) &&
                  ` - ${new DateObject(val?.end).format("DD MMM YYYY")}, `}
              </Fragment>
            ))}
            {istihadhah.length === 0 && '-'}
          </b>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
