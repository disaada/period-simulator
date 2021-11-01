import getQualifiedColor from "./getQualifiedColor";
import { differenceInCalendarDays } from "date-fns";

const calculateHaidh = (
  totalTime,
  dateSelected,
  startDate,
  endDate,
  attributes,
  name,
  type,
  setHaidhPattern,
  previousDate
) => {
  let haidhValue = [];
  let istihadhahValue = [];
  const allDateDiff =
    differenceInCalendarDays(new Date(endDate), new Date(startDate)) + 1;

  if (totalTime === 24) {
    if (dateSelected.length === 1) {
      haidhValue = { start: new Date(startDate) };
      istihadhahValue = [];
    } else {
      haidhValue = {
        start: new Date(startDate),
        end: new Date(endDate),
      };
      istihadhahValue = [];
    }
  } else if (totalTime >= 24) {
    if (allDateDiff <= 15) {
      haidhValue = {
        start: new Date(startDate),
        end: new Date(endDate),
      };
      istihadhahValue = [];
    } else if (allDateDiff > 15) {
      const [chosenColor, unChosenColor] = getQualifiedColor(attributes);

      if (chosenColor.length === 0) {
        haidhValue = {
          start: new Date(unChosenColor[0][0]?.date),
          end: new Date(unChosenColor[0][0]?.date),
        };
        unChosenColor.map(
          (val, idx) =>
            (idx > 0) &&
            istihadhahValue.push({
              start: new Date(val[1]?.date),
              end: new Date(val[val.length - 1]?.date),
            })
        );
      } else {
        haidhValue = {
          start: new Date(chosenColor[0]?.date),
          end: new Date(chosenColor[chosenColor.length - 1]?.date),
        };
        unChosenColor.map((val) =>
          istihadhahValue.push({
            start: new Date(val[0]?.date),
            end: new Date(val[val.length - 1]?.date),
          })
        );
      }
    }
  } else {
    haidhValue = {};
    istihadhahValue = [];
  }
  return [haidhValue, istihadhahValue];
};

export default calculateHaidh;
