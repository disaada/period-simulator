import React, { Fragment } from "react";
import { Header } from "@components";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Box>{children}</Box>
    </Fragment>
  );
};

export default Layout;
