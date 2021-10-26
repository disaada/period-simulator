import React from "react";
import { Box } from "@mui/material";

const headerWrapper = {
  padding: 10,
  paddingLeft: 20,
  paddingBottom: 0,
};

const mainTitle = {
  fontSize: 40,
  marginBottom: 2,
}

const subTitle = {
  fontSize: 18,
  color: 'gray'
}

const Header = () => {
  return (
    <Box sx={headerWrapper}>
      <Box sx={mainTitle}>Simulasi Perhitungan Haidh, Istihadhah, dan Nifas</Box>
      <Box sx={subTitle}>Menurut Fiqh Imam Syafi'i</Box>
    </Box>
  );
};

export default Header;
