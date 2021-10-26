import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ResultCard = ({ color, title }) => {
  const cardWrapper = {
    width: "100%",
    marginTop: 5,
    backgroundColor: color,
  };
  return (
    <Card sx={cardWrapper}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          color="text.secondary"
          sx={{ mb: 1.5 }}
        >
          {title}
        </Typography>
        <Typography variant="body2">
          Haidh : 
          <br />
          Istihadhah :
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
